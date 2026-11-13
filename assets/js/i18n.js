/* Language switcher (English / Spanish). English is the default; the visitor's choice is remembered. */
(function () {
  var KEY = 'eb-lang', dict = window.EB_ES || {};
  var lang = 'en';
  try { if (localStorage.getItem(KEY) === 'es') lang = 'es'; } catch (e) {}
  window.EB_LANG = lang;

  var PAGE = {
    en: { title: 'EcoBridge | Environmental Education for Every Community', desc: 'EcoBridge is a free-to-browse, mobile-friendly and offline-ready platform that brings environmental education to vulnerable communities.' },
    es: { title: 'EcoBridge | Educación ambiental para todas las comunidades', desc: 'EcoBridge es una plataforma gratuita para navegar, pensada para celulares y con modo sin internet, que lleva educación ambiental a comunidades vulnerables.' }
  };

  function apply() {
    document.documentElement.setAttribute('lang', lang);
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      if (el.dataset.en === undefined) el.dataset.en = el.innerHTML;
      var k = el.getAttribute('data-i18n');
      el.innerHTML = (lang === 'es' && dict[k] !== undefined) ? dict[k] : el.dataset.en;
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var a = pair.split(':')[0], k = pair.split(':')[1], store = 'en' + a.replace(/[^a-z]/g, '');
        if (el.dataset[store] === undefined) el.dataset[store] = el.getAttribute(a) || '';
        el.setAttribute(a, (lang === 'es' && dict[k] !== undefined) ? dict[k] : el.dataset[store]);
      });
    });
    if (document.body.classList.contains('index-page')) {
      document.title = PAGE[lang].title;
      var m = document.querySelector('meta[name="description"]'); if (m) m.setAttribute('content', PAGE[lang].desc);
    }
    var btn = document.getElementById('a11y-lang');
    if (btn) {
      btn.querySelector('span').textContent = lang === 'es' ? 'EN' : 'ES';
      btn.setAttribute('aria-label', lang === 'es' ? 'Switch to English' : 'Cambiar a español');
      btn.setAttribute('title', lang === 'es' ? 'English' : 'Español');
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    apply();
    var btn = document.getElementById('a11y-lang');
    if (btn) btn.addEventListener('click', function () {
      lang = lang === 'es' ? 'en' : 'es'; window.EB_LANG = lang;
      try { localStorage.setItem(KEY, lang); } catch (e) {}
      apply();
      document.dispatchEvent(new CustomEvent('eb-lang'));
    });
  });
})();
