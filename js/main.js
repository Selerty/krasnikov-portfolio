(function () {
  'use strict';

  var root = document.documentElement;
  var themeIcon = document.getElementById('theme-icon');

  /* ===== Theme ===== */
  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (themeIcon) themeIcon.textContent = theme === 'light' ? '☾' : '☀';
  }

  function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem('theme'); } catch (e) {}
    if (saved !== 'light' && saved !== 'dark') {
      var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      saved = prefersDark ? 'dark' : 'light';
    }
    applyTheme(saved);
  }

  initTheme();

  var toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      applyTheme(next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  /* ===== Tabs ===== */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tab'));
  var panels = Array.prototype.slice.call(document.querySelectorAll('.panel'));

  function setTab(name) {
    tabs.forEach(function (t) {
      var active = t.getAttribute('data-tab') === name;
      t.classList.toggle('is-active', active);
      t.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    panels.forEach(function (p) {
      p.classList.toggle('is-active', p.getAttribute('data-panel') === name);
    });
  }

  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      setTab(t.getAttribute('data-tab'));
    });
  });

  /* ===== Cross-panel "goto" buttons/links ===== */
  document.querySelectorAll('[data-goto]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      setTab(el.getAttribute('data-goto'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
})();
