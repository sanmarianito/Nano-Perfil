// Profundidad del retrato: fondo y silueta se desplazan a distinto ritmo.
// Escritorio: cursor sobre la foto. Móvil: inclinación del teléfono.
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

  // La primera lectura es la posición "neutra"; luego se reajusta despacio
  // para que la foto vuelva al centro si el teléfono se queda inclinado.
  var b0, g0;
  function onTilt(e) {
    if (e.beta == null) return;
    if (b0 == null) { b0 = e.beta; g0 = e.gamma; }
    b0 += (e.beta - b0) * 0.02;
    g0 += (e.gamma - g0) * 0.02;
    layers.forEach(function (depth) { set(depth, (e.gamma - g0) / 20, (e.beta - b0) / 20); });
  }

  // iOS pide permiso para el giroscopio y solo tras un toque del usuario.
  var DOE = window.DeviceOrientationEvent;
  if (DOE && typeof DOE.requestPermission === 'function') {
    document.addEventListener('touchend', function ask() {
      document.removeEventListener('touchend', ask);
      DOE.requestPermission().then(function (s) {
        if (s === 'granted') addEventListener('deviceorientation', onTilt);
      }).catch(function () {});
    });
  } else if (DOE) {
    addEventListener('deviceorientation', onTilt);
  }
})();
