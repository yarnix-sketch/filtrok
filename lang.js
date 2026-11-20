// Мова сторінки: з адреси (?lang=en), збереженого вибору або мови браузера.
(function () {
  var q = new URLSearchParams(location.search).get('lang');
  var saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) {}
  var lang = q || saved || ((navigator.language || 'uk').slice(0, 2) === 'uk' ? 'uk' : 'en');
  if (lang !== 'uk' && lang !== 'en') lang = 'uk';
  function apply(l) {
    document.documentElement.lang = l;
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.classList.toggle('on', b.dataset.set === l);
    });
    var t = document.querySelector('meta[name="title-' + l + '"]');
    if (t) document.title = t.content;
  }
  apply(lang);
  document.addEventListener('click', function (e) {
    var b = e.target.closest('.lang button');
    if (!b) return;
    apply(b.dataset.set);
    try { localStorage.setItem('lang', b.dataset.set); } catch (e2) {}
  });
})();
