/* Builds the content of portfolio-details.html and service-details.html from details-data.js (English) and details-data-es.js (Spanish) */
(function () {
  var F = window.EB_FEATURES || [], S = window.EB_SERVICES || [];
  var UI = {
    en: { aboutF:'About this feature', can:'What you can do', how:'How to use it', tip:'Eco tip', q:'Have questions?', contact:'Contact us',
      info:'Feature information', cat:'Category', best:'Best for', fmt:'Format', on:'Works on', onV:'Any smartphone, tablet or computer', read:'Reading level', readV:'Simple, for everyone',
      allF:'All features', rel:'Related features', aboutS:'About this service', inc:'What is included', helps:'How it helps your community', relP:'Related platform features',
      other:'Other services', allS:'All services', newTab:' (opens in a new tab)', explore:'Explore and interact',
      note:'We only link to trusted organizations. These links open on other websites and need an internet connection.',
      ctaF:'Tell us what you think of this feature or how we can improve it.', ctaS:'Want to know more about this service? Write to us.',
      home:'Home', suffix:' | EcoBridge' },
    es: { aboutF:'Sobre esta función', can:'Qué puedes hacer', how:'Cómo usarla', tip:'Consejo ecológico', q:'¿Tienes preguntas?', contact:'Escríbenos',
      info:'Información de la función', cat:'Categoría', best:'Ideal para', fmt:'Formato', on:'Funciona en', onV:'Cualquier celular, tableta o computador', read:'Nivel de lectura', readV:'Sencillo, para todos',
      allF:'Todas las funciones', rel:'Funciones relacionadas', aboutS:'Sobre este servicio', inc:'Qué incluye', helps:'Cómo ayuda a tu comunidad', relP:'Funciones relacionadas de la plataforma',
      other:'Otros servicios', allS:'Todos los servicios', newTab:' (se abre en una pestaña nueva)', explore:'Explora e interactúa',
      note:'Solo enlazamos a organizaciones confiables. Estos enlaces se abren en otros sitios web y necesitan conexión a internet.',
      ctaF:'Cuéntanos qué opinas de esta función o cómo podemos mejorarla.', ctaS:'¿Quieres saber más sobre este servicio? Escríbenos.',
      home:'Inicio', suffix:' | EcoBridge' }
  };
  var lang = function () { return window.EB_LANG === 'es' ? 'es' : 'en'; };
  var t = function (k) { return UI[lang()][k]; };
  var esc = function (x) { return String(x).replace(/[&<>"']/g, function (c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); };
  var byId = function (list, id) { return list.filter(function (x) { return x.id === id; })[0]; };

  function locF(f) {
    var e = lang() === 'es' && (window.EB_FEATURES_ES || {})[f.id]; if (!e) return f;
    return Object.assign({}, f, e, {
      cat: (window.EB_CATS_ES || {})[f.cat] || f.cat,
      features: f.features.map(function (x, i) { return [x[0], e.features[i][0], e.features[i][1]]; }),
      links: f.links.map(function (l, i) { return Object.assign({}, l, e.links[i]); })
    });
  }
  function locS(s) { var e = lang() === 'es' && (window.EB_SERVICES_ES || {})[s.id]; return e ? Object.assign({}, s, e) : s; }

  function tipBox(x) { return '<div class="detail-tip"><i class="bi bi-lightbulb"></i><div><strong>' + t('tip') + '</strong><p>' + esc(x) + '</p></div></div>'; }
  function relatedCards(ids) {
    return ids.map(function (id) {
      var f0 = byId(F, id); if (!f0) return ''; var f = locF(f0);
      return '<a class="related-item" href="portfolio-details.html?id=' + f.id + '">' +
        '<img src="assets/img/portfolio/' + f.img + '" alt="" loading="lazy" width="72" height="72">' +
        '<span><strong>' + esc(f.title) + '</strong><small>' + esc(f.cat) + '</small></span></a>';
    }).join('');
  }
  function contactCta(text) {
    return '<div class="detail-cta"><div><h3>' + t('q') + '</h3><p>' + esc(text) + '</p></div><a class="btn-detail" href="index.html#contact">' + t('contact') + '</a></div>';
  }
  function externalLinks(f) {
    if (!f.links || !f.links.length) return '';
    return '<h2 class="detail-h2">' + esc(f.linksTitle || t('explore')) + '</h2>' +
      '<div class="ext-links">' + f.links.map(function (l) {
        return '<a class="ext-link" href="' + esc(l.url) + '" target="_blank" rel="noopener noreferrer" referrerpolicy="no-referrer">' +
          '<span class="ext-type">' + esc(l.type) + '</span>' +
          '<strong>' + esc(l.title) + ' <i class="bi bi-box-arrow-up-right" aria-hidden="true"></i><span class="visually-hidden">' + t('newTab') + '</span></strong>' +
          '<span class="ext-desc">' + esc(l.desc) + '</span>' +
          '<small>' + esc(l.source) + '</small></a>';
      }).join('') + '</div>' +
      '<p class="ext-note"><i class="bi bi-shield-check"></i> ' + t('note') + '</p>';
  }

  function featureHTML(f0) {
    var i = F.indexOf(f0), prev = locF(F[(i + F.length - 1) % F.length]), next = locF(F[(i + 1) % F.length]), f = locF(f0);
    return '<div class="row gy-4 justify-content-between">' +
      '<div class="col-lg-8">' +
        '<figure class="detail-figure"><img src="assets/img/portfolio/' + f.img + '" alt="' + esc(f.title) + '" width="1000" height="600"></figure>' +
        '<h2 class="detail-h2">' + t('aboutF') + '</h2>' + f.intro.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') +
        '<h2 class="detail-h2">' + t('can') + '</h2><div class="row g-3">' +
          f.features.map(function (x) { return '<div class="col-md-6"><div class="detail-card"><i class="bi ' + x[0] + '"></i><div><h4>' + esc(x[1]) + '</h4><p>' + esc(x[2]) + '</p></div></div></div>'; }).join('') +
        '</div>' +
        '<h2 class="detail-h2">' + t('how') + '</h2><ol class="detail-steps">' + f.steps.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ol>' +
        externalLinks(f) + tipBox(f.tip) + contactCta(t('ctaF')) +
        '<div class="detail-nav"><a href="portfolio-details.html?id=' + prev.id + '"><i class="bi bi-arrow-left"></i> ' + esc(prev.title) + '</a>' +
        '<a href="portfolio-details.html?id=' + next.id + '">' + esc(next.title) + ' <i class="bi bi-arrow-right"></i></a></div>' +
      '</div>' +
      '<div class="col-lg-4"><aside class="detail-side">' +
        '<h3>' + t('info') + '</h3><ul class="detail-info">' +
          '<li><strong>' + t('cat') + '</strong>' + esc(f.cat) + '</li>' +
          '<li><strong>' + t('best') + '</strong>' + esc(f.audience) + '</li>' +
          '<li><strong>' + t('fmt') + '</strong>' + esc(f.format) + '</li>' +
          '<li><strong>' + t('on') + '</strong>' + t('onV') + '</li>' +
          '<li><strong>' + t('read') + '</strong>' + t('readV') + '</li></ul>' +
        '<a href="index.html#portfolio" class="btn-detail btn-block"><i class="bi bi-grid"></i> ' + t('allF') + '</a>' +
        '<h3 class="mt-4">' + t('rel') + '</h3>' + relatedCards(f.related) +
      '</aside></div></div>';
  }

  function serviceHTML(s0) {
    var s = locS(s0);
    var others = S.filter(function (x) { return x.id !== s.id; }).map(function (x0) {
      var x = locS(x0);
      return '<li><a href="service-details.html?id=' + x.id + '"><i class="bi ' + x.icon + '"></i> ' + esc(x.title) + '</a></li>';
    }).join('');
    return '<div class="row gy-4 justify-content-between">' +
      '<div class="col-lg-8">' +
        '<div class="detail-hero-icon detail-' + s.color + '"><i class="bi ' + s.icon + '"></i></div>' +
        '<h2 class="detail-h2">' + t('aboutS') + '</h2>' + s.intro.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') +
        '<h2 class="detail-h2">' + t('inc') + '</h2><ul class="detail-checks">' + s.includes.map(function (x) { return '<li><i class="bi bi-check-circle-fill"></i> ' + esc(x) + '</li>'; }).join('') + '</ul>' +
        '<h2 class="detail-h2">' + t('helps') + '</h2><div class="row g-3">' +
          s.benefits.map(function (b) { return '<div class="col-md-4"><div class="detail-card detail-card-col"><i class="bi bi-stars"></i><p>' + esc(b) + '</p></div></div>'; }).join('') +
        '</div>' +
        '<h2 class="detail-h2">' + t('relP') + '</h2><div class="related-grid">' + relatedCards(s.related) + '</div>' +
        tipBox(s.tip) + contactCta(t('ctaS')) +
      '</div>' +
      '<div class="col-lg-4"><aside class="detail-side">' +
        '<h3>' + t('other') + '</h3><ul class="detail-links">' + others + '</ul>' +
        '<a href="index.html#services" class="btn-detail btn-block"><i class="bi bi-grid"></i> ' + t('allS') + '</a>' +
      '</aside></div></div>';
  }

  function render() {
    var root = document.getElementById('detail-root'); if (!root) return;
    var kind = document.body.getAttribute('data-kind');
    var list = kind === 'service' ? S : F;
    var id = new URLSearchParams(location.search).get('id');
    var item = byId(list, id) || list[0];
    var shown = kind === 'service' ? locS(item) : locF(item);
    var h1 = document.getElementById('detail-title'), sub = document.getElementById('detail-tagline'), crumb = document.getElementById('detail-crumb');
    if (h1) h1.textContent = shown.title;
    if (sub) sub.textContent = shown.tagline;
    if (crumb) crumb.textContent = shown.title;
    document.title = shown.title + t('suffix');
    var meta = document.querySelector('meta[name="description"]'); if (meta) meta.setAttribute('content', shown.tagline);
    root.innerHTML = kind === 'service' ? serviceHTML(item) : featureHTML(item);
  }
  if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', render);
    document.addEventListener('eb-lang', render);
  }
  if (typeof module !== 'undefined') { module.exports = { featureHTML: featureHTML, serviceHTML: serviceHTML }; }
})();
