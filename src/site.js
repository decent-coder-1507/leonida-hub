// Shared by every page: theme switch and the news list.
(function () {
  'use strict';

  var THEME_KEY = 'leonida.theme';
  var STATUS_LABELS = {
    'confirmed': 'Confirmed',
    'reported': 'Reported',
    'estimate': 'Estimate',
    'unconfirmed': 'Unconfirmed',
    'not-announced': 'Not announced'
  };

  function readTheme() {
    try {
      var t = localStorage.getItem(THEME_KEY);
      return t === 'light' || t === 'dark' ? t : null;
    } catch (e) { return null; }
  }

  function applyTheme(theme) {
    if (theme) document.documentElement.setAttribute('data-theme', theme);
    else document.documentElement.removeAttribute('data-theme');
  }

  var theme = readTheme();
  applyTheme(theme);

  var themeBtn = document.getElementById('themeBtn');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      theme = (theme || 'dark') === 'dark' ? 'light' : 'dark';
      applyTheme(theme);
      try { localStorage.setItem(THEME_KEY, theme); } catch (e) { /* storage blocked */ }
    });
  }

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function formatDate(iso) {
    var d = new Date(iso + 'T00:00:00');
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  function isHttpUrl(url) { return /^https?:\/\//i.test(url); }

  function newsCard(item) {
    var card = el('article', 'news');
    var meta = el('div', 'news-meta');
    var status = STATUS_LABELS[item.status] ? item.status : 'unconfirmed';
    meta.appendChild(el('span', 'badge badge-' + status, STATUS_LABELS[status]));
    meta.appendChild(el('time', 'muted', formatDate(item.date)));
    card.appendChild(meta);
    card.appendChild(el('h3', '', item.title));
    card.appendChild(el('p', '', item.summary));

    var src = el('p', 'muted sources', 'Source: ');
    (item.sources || []).filter(function (s) { return isHttpUrl(s.url); }).forEach(function (s, i) {
      if (i > 0) src.appendChild(document.createTextNode(', '));
      var a = el('a', '', s.label);
      a.href = s.url;
      a.rel = 'noopener nofollow';
      a.target = '_blank';
      src.appendChild(a);
    });
    card.appendChild(src);
    return card;
  }

  var list = document.getElementById('newsList');
  if (list && Array.isArray(window.SITE_NEWS)) {
    var items = window.SITE_NEWS.slice().sort(function (a, b) {
      return a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
    });
    var limit = Number(list.getAttribute('data-limit'));
    var filter = 'all';

    var draw = function () {
      list.textContent = '';
      var shown = items.filter(function (n) { return filter === 'all' || n.status === filter; });
      if (limit > 0) shown = shown.slice(0, limit);
      shown.forEach(function (n) { list.appendChild(newsCard(n)); });
      if (!shown.length) list.appendChild(el('p', 'muted', 'Nothing with this label yet.'));
    };
    draw();

    var filters = document.getElementById('newsFilters');
    if (filters) {
      filters.addEventListener('click', function (e) {
        var btn = e.target.closest('button[data-status]');
        if (!btn) return;
        filter = btn.getAttribute('data-status');
        Array.prototype.forEach.call(filters.querySelectorAll('button'), function (b) {
          b.setAttribute('aria-pressed', String(b === btn));
        });
        draw();
      });
    }
  }
})();
