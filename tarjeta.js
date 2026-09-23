(function () {
  var card = document.getElementById('card');
  var toggle = document.getElementById('toggle');
  toggle.addEventListener('click', function () {
    var open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    card.classList.toggle('is-open', open);
  });
})();
