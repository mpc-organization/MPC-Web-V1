(function (window) {
  'use strict';

  var STORAGE_KEY = 'mpc_lang';

  function getStoredLang() {
    var stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'km' ? 'km' : 'en';
  }

  var currentLang = getStoredLang();

  function translate(key) {
    var entry = window.MPC_TRANSLATIONS && window.MPC_TRANSLATIONS[key];
    if (!entry) {
      return null;
    }
    return entry[currentLang] || entry.en || '';
  }

  function applyTranslations(root) {
    var scope = root || document;

    scope.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var text = translate(key);
      if (text === null) {
        return;
      }

      if (el.getAttribute('data-i18n-html') === 'true') {
        el.innerHTML = text;
      } else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.setAttribute('placeholder', text);
      } else {
        el.textContent = text;
      }
    });
  }

  function updateToggleButtons() {
    document.querySelectorAll('.cs_translate_text').forEach(function (el) {
      el.textContent = currentLang === 'en' ? 'ខ្មែរ' : 'English';
    });

    document.querySelectorAll('.cs_translate_btn').forEach(function (btn) {
      btn.setAttribute(
        'aria-label',
        currentLang === 'en' ? 'Switch to Khmer' : 'Switch to English',
      );
    });
  }

  function setLang(lang) {
    currentLang = lang === 'km' ? 'km' : 'en';
    localStorage.setItem(STORAGE_KEY, currentLang);
    document.documentElement.lang = currentLang === 'km' ? 'km' : 'en';
    document.body.classList.toggle('mpc-lang-km', currentLang === 'km');
    document.body.classList.toggle('mpc-lang-en', currentLang === 'en');
    applyTranslations();
    updateToggleButtons();
    document.dispatchEvent(
      new CustomEvent('mpc:langchange', {
        detail: { lang: currentLang },
      }),
    );
  }

  function toggleLang() {
    setLang(currentLang === 'en' ? 'km' : 'en');
  }

  function init() {
    document.querySelectorAll('.cs_translate_btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        toggleLang();
      });
    });

    setLang(currentLang);
  }

  window.MPCI18n = {
    getLang: function () {
      return currentLang;
    },
    setLang: setLang,
    toggleLang: toggleLang,
    t: translate,
    apply: applyTranslations,
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(window);
