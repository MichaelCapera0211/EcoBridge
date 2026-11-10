/* Builds the content of portfolio-details.html and service-details.html from details-data.js */
(function () {
  var F = window.EB_FEATURES || [], S = window.EB_SERVICES || [];
  var esc = function (t) { return String(t).replace(/[&<>"']/g, function (c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); };
  var byId = function (list, id) { return list.filter(function (x) { return x.id === id; })[0]; };
  var cat = function (x) { return x.cat ? '<span class="detail-tag"><i class="bi ' + x.icon + '"></i> ' + esc(x.cat) + '</span>' : ''; };

  function tipBox(t) {
    return '<div class="detail-tip"><i class="bi bi-lightbulb"></i><div><strong>Eco tip</strong><p>' + esc(t) + '</p></div></div>';
  }
  function relatedCards(ids) {
    return ids.map(function (id) {
      var f = byId(F, id); if (!f) return '';
      return '<a class="related-item" href="portfolio-details.html?id=' + f.id + '">' +
        '<img src="assets/img/portfolio/' + f.img + '" alt="" loading="lazy" width="72" height="72">' +
        '<span><strong>' + esc(f.title) + '</strong><small>' + esc(f.cat) + '</small></span></a>';
    }).join('');
  }
  function contactCta(text) {
    return '<div class="detail-cta"><div><h3>Have questions?</h3><p>' + esc(text) + '</p></div><a class="btn-detail" href="index.html#contact">Contact us</a></div>';
  }

  function featureHTML(f) {
    var i = F.indexOf(f), prev = F[(i + F.length - 1) % F.length], next = F[(i + 1) % F.length];
    return '<div class="row gy-4 justify-content-between">' +
      '<div class="col-lg-8">' +
        '<figure class="detail-figure"><img src="assets/img/portfolio/' + f.img + '" alt="' + esc(f.title) + '" width="1000" height="600"></figure>' +
        '<h2 class="detail-h2">About this feature</h2>' + f.intro.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') +
        '<h2 class="detail-h2">What you can do</h2><div class="row g-3">' +
          f.features.map(function (x) { return '<div class="col-md-6"><div class="detail-card"><i class="bi ' + x[0] + '"></i><div><h4>' + esc(x[1]) + '</h4><p>' + esc(x[2]) + '</p></div></div></div>'; }).join('') +
        '</div>' +
        '<h2 class="detail-h2">How to use it</h2><ol class="detail-steps">' + f.steps.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ol>' +
        tipBox(f.tip) + contactCta('Tell us what you think of this feature or how we can improve it.') +
        '<div class="detail-nav"><a href="portfolio-details.html?id=' + prev.id + '"><i class="bi bi-arrow-left"></i> ' + esc(prev.title) + '</a>' +
        '<a href="portfolio-details.html?id=' + next.id + '">' + esc(next.title) + ' <i class="bi bi-arrow-right"></i></a></div>' +
      '</div>' +
      '<div class="col-lg-4"><aside class="detail-side">' +
        '<h3>Feature information</h3><ul class="detail-info">' +
          '<li><strong>Category</strong>' + esc(f.cat) + '</li>' +
          '<li><strong>Best for</strong>' + esc(f.audience) + '</li>' +
          '<li><strong>Format</strong>' + esc(f.format) + '</li>' +
          '<li><strong>Works on</strong>Any smartphone, tablet or computer</li>' +
          '<li><strong>Reading level</strong>Simple, for everyone</li></ul>' +
        '<a href="index.html#portfolio" class="btn-detail btn-block"><i class="bi bi-grid"></i> All features</a>' +
        '<h3 class="mt-4">Related features</h3>' + relatedCards(f.related) +
      '</aside></div></div>';
  }

  function serviceHTML(s) {
    var others = S.filter(function (x) { return x.id !== s.id; }).map(function (x) {
      return '<li><a href="service-details.html?id=' + x.id + '"><i class="bi ' + x.icon + '"></i> ' + esc(x.title) + '</a></li>';
    }).join('');
    return '<div class="row gy-4 justify-content-between">' +
      '<div class="col-lg-8">' +
        '<div class="detail-hero-icon detail-' + s.color + '"><i class="bi ' + s.icon + '"></i></div>' +
        '<h2 class="detail-h2">About this service</h2>' + s.intro.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') +
        '<h2 class="detail-h2">What is included</h2><ul class="detail-checks">' + s.includes.map(function (x) { return '<li><i class="bi bi-check-circle-fill"></i> ' + esc(x) + '</li>'; }).join('') + '</ul>' +
        '<h2 class="detail-h2">How it helps your community</h2><div class="row g-3">' +
          s.benefits.map(function (b) { return '<div class="col-md-4"><div class="detail-card detail-card-col"><i class="bi bi-stars"></i><p>' + esc(b) + '</p></div></div>'; }).join('') +
        '</div>' +
        '<h2 class="detail-h2">Related platform features</h2><div class="related-grid">' + relatedCards(s.related) + '</div>' +
        tipBox(s.tip) + contactCta('Want to know more about this service? Write to us.') +
      '</div>' +
      '<div class="col-lg-4"><aside class="detail-side">' +
        '<h3>Other services</h3><ul class="detail-links">' + others + '</ul>' +
        '<a href="index.html#services" class="btn-detail btn-block"><i class="bi bi-grid"></i> All services</a>' +
      '</aside></div></div>';
  }

  function render() {
    var root = document.getElementById('detail-root'); if (!root) return;
    var kind = document.body.getAttribute('data-kind');
    var list = kind === 'service' ? S : F;
    var id = new URLSearchParams(location.search).get('id');
    var item = byId(list, id) || list[0];
    var h1 = document.getElementById('detail-title'), sub = document.getElementById('detail-tagline'), crumb = document.getElementById('detail-crumb');
    if (h1) h1.textContent = item.title;
    if (sub) sub.textContent = item.tagline;
    if (crumb) crumb.textContent = item.title;
    document.title = item.title + ' | EcoBridge';
    var meta = document.querySelector('meta[name="description"]'); if (meta) meta.setAttribute('content', item.tagline);
    root.innerHTML = kind === 'service' ? serviceHTML(item) : featureHTML(item);
  }
  if (typeof document !== 'undefined') { document.addEventListener('DOMContentLoaded', render); }
  if (typeof module !== 'undefined') { module.exports = { featureHTML: featureHTML, serviceHTML: serviceHTML }; }
})();
