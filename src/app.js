(function () {
  'use strict';

  var DATA = window.TRACKER_DATA;
  var KEY = 'leonida100.v1';
  var $ = function (id) { return document.getElementById(id); };

  var allItems = [];
  DATA.sections.forEach(function (s) { s.items.forEach(function (it) { allItems.push(it); }); });

  function clamp(n, lo, hi) { return Math.min(hi, Math.max(lo, n)); }

  // Builds a clean state from anything read from storage or a pasted code.
  function sanitize(raw) {
    var s = { values: {}, hideDone: false, showNames: false };
    if (!raw || typeof raw !== 'object') return s;
    s.hideDone = raw.hideDone === true;
    s.showNames = raw.showNames === true;
    var values = raw.values && typeof raw.values === 'object' ? raw.values : {};
    allItems.forEach(function (it) {
      var v = Number(values[it.id]);
      if (Number.isFinite(v)) s.values[it.id] = clamp(Math.round(v), 0, it.total);
    });
    return s;
  }

  function load() {
    try { return sanitize(JSON.parse(localStorage.getItem(KEY))); }
    catch (e) { return sanitize(null); }
  }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); }
    catch (e) { /* storage blocked: the tracker still works for this visit */ }
  }

  var state = load();
  var query = '';

  function valueOf(it) { return state.values[it.id] || 0; }
  function isDone(it) { return valueOf(it) >= it.required; }
  function fmt(it, n) { return (it.unit || '') + n.toLocaleString('en-US'); }

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function setValue(it, n) {
    state.values[it.id] = clamp(Math.round(n) || 0, 0, it.total);
    save();
    render();
  }

  function displayName(it) {
    return it.spoilerName && state.showNames ? it.name + ': ' + it.spoilerName : it.name;
  }

  function renderItem(it) {
    var v = valueOf(it);
    var done = isDone(it);
    var card = el('div', 'item' + (done ? ' done' : ''));

    var info = el('div');
    info.appendChild(el('div', 'item-name', displayName(it)));
    var sub = done
      ? 'Requirement met'
      : 'Need ' + fmt(it, it.required) + (it.total > it.required ? ' of ' + fmt(it, it.total) : '');
    info.appendChild(el('div', 'item-sub', sub));
    card.appendChild(info);

    var step = it.step || 1;
    var controls = el('div', 'controls');
    var minus = el('button', 'step', '−');
    minus.type = 'button';
    minus.disabled = v <= 0;
    minus.setAttribute('aria-label', 'Decrease ' + it.name);
    minus.addEventListener('click', function () { setValue(it, v - step); });

    var input = el('input');
    input.type = 'number';
    input.min = '0';
    input.max = String(it.total);
    input.step = String(step);
    input.value = String(v);
    input.setAttribute('aria-label', it.name + ' count');
    input.addEventListener('change', function () { setValue(it, Number(input.value)); });

    var plus = el('button', 'step', '+');
    plus.type = 'button';
    plus.disabled = v >= it.total;
    plus.setAttribute('aria-label', 'Increase ' + it.name);
    plus.addEventListener('click', function () { setValue(it, v + step); });

    controls.appendChild(minus);
    controls.appendChild(input);
    controls.appendChild(plus);
    card.appendChild(controls);

    var bar = el('div', 'bar');
    var fill = el('div', 'fill');
    fill.style.width = Math.min(100, (v / it.required) * 100) + '%';
    bar.appendChild(fill);
    card.appendChild(bar);
    return card;
  }

  function render() {
    var list = $('list');
    list.textContent = '';
    var shown = 0;

    DATA.sections.forEach(function (s) {
      var items = s.items.filter(function (it) {
        if (state.hideDone && isDone(it)) return false;
        return !query || displayName(it).toLowerCase().indexOf(query) !== -1;
      });
      if (!items.length) return;
      shown += items.length;

      var doneCount = s.items.filter(isDone).length;
      var section = el('section', 'section');
      var head = el('div', 'section-head');
      head.appendChild(el('h2', '', s.title));
      head.appendChild(el('span', 'section-count', doneCount + ' of ' + s.items.length + ' done'));
      section.appendChild(head);
      if (s.note) section.appendChild(el('p', 'section-note', s.note));
      items.forEach(function (it) { section.appendChild(renderItem(it)); });
      list.appendChild(section);
    });

    $('empty').hidden = shown > 0;
    if (shown === 0) {
      $('empty').textContent = query
        ? 'No requirements match your search.'
        : 'Everything is complete. Untick "Hide completed" to see it all.';
    }

    var sum = 0;
    allItems.forEach(function (it) { sum += Math.min(1, valueOf(it) / it.required); });
    var pct = Math.floor((sum / allItems.length) * 100);
    var doneAll = allItems.filter(isDone).length;
    $('overallPct').textContent = String(pct);
    $('overallBar').style.width = pct + '%';
    $('overallText').textContent = doneAll + ' of ' + allItems.length + ' requirements met';
  }

  function say(msg) { $('status').textContent = msg; }

  // Progress code: base64 of the counter values only.
  function exportCode() { return btoa(JSON.stringify({ v: 1, values: state.values })); }

  function importCode(code) {
    var parsed = JSON.parse(atob(code.trim()));
    if (!parsed || parsed.v !== 1 || typeof parsed.values !== 'object') throw new Error('bad code');
    state.values = sanitize({ values: parsed.values }).values;
    save();
    render();
  }

  $('search').addEventListener('input', function (e) {
    query = e.target.value.trim().toLowerCase();
    render();
  });
  $('hideDone').checked = state.hideDone;
  $('hideDone').addEventListener('change', function (e) { state.hideDone = e.target.checked; save(); render(); });
  $('showNames').checked = state.showNames;
  $('showNames').addEventListener('change', function (e) { state.showNames = e.target.checked; save(); render(); });

  $('exportBtn').addEventListener('click', function () {
    var code = exportCode();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(
        function () { say('Progress code copied.'); },
        function () { say('Could not copy. Your code: ' + code); }
      );
    } else {
      say('Your code: ' + code);
    }
  });

  $('importBtn').addEventListener('click', function () {
    $('importText').value = '';
    $('importError').hidden = true;
    $('importDialog').showModal();
  });
  $('importConfirm').addEventListener('click', function () {
    try {
      importCode($('importText').value);
      $('importDialog').close();
      say('Progress restored.');
    } catch (e) {
      $('importError').hidden = false;
    }
  });

  $('resetBtn').addEventListener('click', function () { $('resetDialog').showModal(); });
  $('resetConfirm').addEventListener('click', function () {
    state.values = {};
    save();
    render();
    $('resetDialog').close();
    say('All progress cleared.');
  });

  $('updated').textContent = DATA.updated;
  render();
})();
