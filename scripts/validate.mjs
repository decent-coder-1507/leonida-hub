// Checks the site content before every deploy. Run with: node scripts/validate.mjs
// A failed check stops the deploy, so a broken or unsourced entry never goes live.
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const src = join(dirname(fileURLToPath(import.meta.url)), '..', 'src');
const errors = [];
const fail = (msg) => errors.push(msg);

function loadGlobal(file, name) {
  const sandbox = { window: {} };
  try {
    vm.runInNewContext(readFileSync(join(src, file), 'utf8'), sandbox, { filename: file });
  } catch (e) {
    fail(`${file}: does not run (${e.message})`);
    return undefined;
  }
  if (sandbox.window[name] === undefined) fail(`${file}: window.${name} is missing`);
  return sandbox.window[name];
}

// Scripts must at least parse.
for (const file of ['app.js', 'site.js']) {
  try { new vm.Script(readFileSync(join(src, file), 'utf8'), { filename: file }); }
  catch (e) { fail(`${file}: syntax error (${e.message})`); }
}

// News: every entry dated, labelled and sourced.
const STATUSES = ['confirmed', 'reported', 'estimate', 'unconfirmed', 'not-announced'];
const news = loadGlobal('news-data.js', 'SITE_NEWS');
if (Array.isArray(news)) {
  const today = new Date().toISOString().slice(0, 10);
  news.forEach((n, i) => {
    const where = `news-data.js entry ${i + 1} ("${n && n.title ? n.title : 'no title'}")`;
    if (!n || typeof n !== 'object') return fail(`${where}: not an object`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(n.date || '') || isNaN(Date.parse(n.date))) fail(`${where}: date must be YYYY-MM-DD`);
    else if (n.date > today) fail(`${where}: date is in the future`);
    if (!STATUSES.includes(n.status)) fail(`${where}: status must be one of ${STATUSES.join(', ')}`);
    if (!n.title || !n.title.trim()) fail(`${where}: title is empty`);
    if (!n.summary || !n.summary.trim()) fail(`${where}: summary is empty`);
    if (!Array.isArray(n.sources) || n.sources.length === 0) fail(`${where}: needs at least one source`);
    else n.sources.forEach((s) => {
      if (!s || !s.label || !/^https?:\/\//i.test(s.url || '')) fail(`${where}: each source needs a label and an http(s) url`);
    });
  });
} else if (news !== undefined) {
  fail('news-data.js: SITE_NEWS must be an array');
}

// Tracker: unique ids and sensible counts.
const data = loadGlobal('data.js', 'TRACKER_DATA');
if (data && Array.isArray(data.sections)) {
  const seen = new Set();
  data.sections.forEach((s) => {
    if (!s.title || !Array.isArray(s.items) || !s.items.length) fail(`data.js section "${s.id}": needs a title and items`);
    (s.items || []).forEach((it) => {
      const where = `data.js item "${it.id}"`;
      if (!it.id || seen.has(it.id)) fail(`${where}: id is missing or used twice`);
      seen.add(it.id);
      if (!it.name) fail(`${where}: name is missing`);
      if (!Number.isInteger(it.required) || it.required <= 0) fail(`${where}: required must be a whole number above 0`);
      if (!Number.isInteger(it.total) || it.total < it.required) fail(`${where}: total must be at least required`);
      if (it.step !== undefined && (!Number.isInteger(it.step) || it.step <= 0)) fail(`${where}: step must be a whole number above 0`);
    });
  });
} else if (data !== undefined) {
  fail('data.js: TRACKER_DATA.sections must be an array');
}

// Pages: local links and assets must exist.
const pages = ['index.html', 'news.html', 'guides.html', 'tracker.html', '404.html'];
for (const page of pages) {
  if (!existsSync(join(src, page))) { fail(`${page}: file is missing`); continue; }
  const html = readFileSync(join(src, page), 'utf8');
  for (const m of html.matchAll(/(?:href|src)="([^"#]+)(?:#[^"]*)?"/g)) {
    const ref = m[1];
    if (/^(https?:|mailto:|data:|\/)/i.test(ref)) continue;
    if (!existsSync(join(src, ref))) fail(`${page}: links to "${ref}", which does not exist`);
  }
}

if (errors.length) {
  console.error(`Content check failed with ${errors.length} problem(s):`);
  errors.forEach((e) => console.error(' - ' + e));
  process.exit(1);
}
console.log(`Content check passed: ${news.length} news entries, ${data.sections.length} tracker sections, ${pages.length} pages.`);
