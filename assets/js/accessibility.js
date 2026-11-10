/* Accessibility toolbar: text size + high contrast (remembered between visits) */
(function () {
  var root = document.documentElement;
  var sizes = ['text-sm', '', 'text-lg', 'text-xl'];
  var idx = 1, contrast = false;
  try {
    idx = parseInt(localStorage.getItem('eb-size'), 10);
    if (isNaN(idx) || idx < 0 || idx > 3) idx = 1;
    contrast = localStorage.getItem('eb-contrast') === '1';
  } catch (e) {}
  var btn = document.getElementById('a11y-contrast');

  function apply() {
    sizes.forEach(function (c) { if (c) root.classList.remove(c); });
    if (sizes[idx]) root.classList.add(sizes[idx]);
    root.classList.toggle('high-contrast', contrast);
    if (btn) btn.setAttribute('aria-pressed', contrast ? 'true' : 'false');
    try { localStorage.setItem('eb-size', idx); localStorage.setItem('eb-contrast', contrast ? '1' : '0'); } catch (e) {}
  }
  var big = document.getElementById('a11y-bigger'), small = document.getElementById('a11y-smaller');
  if (big) big.addEventListener('click', function () { idx = Math.min(3, idx + 1); apply(); });
  if (small) small.addEventListener('click', function () { idx = Math.max(0, idx - 1); apply(); });
  if (btn) btn.addEventListener('click', function () { contrast = !contrast; apply(); });
  apply();
})();
