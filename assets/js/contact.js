/* Contact form: sends the message to the site owner's email through FormSubmit (works on GitHub Pages). */
(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;
  var loading = form.querySelector('.loading'), err = form.querySelector('.error-message'), ok = form.querySelector('.sent-message');
  var btn = form.querySelector('button[type="submit"]');
  function show(el, text) { [loading, err, ok].forEach(function (x) { x.classList.remove('d-block'); }); if (el) { if (text) el.textContent = text; el.classList.add('d-block'); } }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (form.querySelector('[name="_honey"]').value) return;           // bots fill this hidden field
    if (!navigator.onLine) { show(err, 'You are offline. Please connect to the internet and try again.'); return; }
    show(loading); btn.disabled = true;
    fetch(form.getAttribute('data-endpoint'), { method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' } })
      .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, data: d }; }); })
      .then(function (res) {
        if (res.ok && String(res.data.success) === 'true') { show(ok); form.reset(); }
        else { throw new Error((res.data && res.data.message) || 'The message could not be sent.'); }
      })
      .catch(function () { show(err, 'Sorry, your message could not be sent. Please try again in a moment.'); })
      .then(function () { btn.disabled = false; });
  });
})();
