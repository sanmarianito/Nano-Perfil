// Profundidad del retrato: fondo y silueta se desplazan a distinto ritmo.
// Escritorio: cursor sobre la foto. Móvil: deriva automática o inclinación.
(function () {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var layers = document.querySelectorAll('.depth');

  function set(depth, x, y) {
    depth.style.setProperty('--x', Math.max(-1, Math.min(1, x)).toFixed(3));
    depth.style.setProperty('--y', Math.max(-1, Math.min(1, y)).toFixed(3));
  }

  layers.forEach(function (depth) {
    var photo = depth.parentNode;
    photo.addEventListener('pointermove', function (e) {
      if (e.pointerType !== 'mouse') return;
      var r = photo.getBoundingClientRect();
      set(depth, (e.clientX - r.left) / r.width * 2 - 1, (e.clientY - r.top) / r.height * 2 - 1);
    });
    photo.addEventListener('pointerleave', function () { set(depth, 0, 0); });
  });

  // Móvil: sin pedir permisos. La foto "respira" sola con una deriva lenta
  // y, si el navegador entrega el giroscopio sin preguntar (casi todos los
  // Android), la inclinación del teléfono toma el relevo. iOS no da acceso
  // al sensor sin un aviso de permiso, así que ahí se queda la deriva.
  if (!matchMedia('(hover: none)').matches) return;

  var tilting = false;
  (function drift(t) {
    if (tilting) return;
    layers.forEach(function (depth) {
      set(depth, Math.sin(t / 4200 * 2 * Math.PI) * 0.7, Math.sin(t / 5600 * 2 * Math.PI) * 0.5);
    });
    requestAnimationFrame(drift);
  })(0);

  // La primera lectura es la posición "neutra"; luego se reajusta despacio
  // para que la foto vuelva al centro si el teléfono se queda inclinado.
  var b0, g0;
  addEventListener('deviceorientation', function (e) {
    if (e.beta == null) return;
    tilting = true;
    if (b0 == null) { b0 = e.beta; g0 = e.gamma; }
    b0 += (e.beta - b0) * 0.02;
    g0 += (e.gamma - g0) * 0.02;
    layers.forEach(function (depth) { set(depth, (e.gamma - g0) / 20, (e.beta - b0) / 20); });
  });
})();
