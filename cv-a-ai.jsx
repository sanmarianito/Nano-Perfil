// cv-a-ai.jsx — Arma la hoja de vida (cv.html) en Illustrator y la guarda como cv.ai junto a este script.
// Uso: Illustrator > Archivo > Scripts > Otro script… > cv-a-ai.jsx
// ponytail: el contenido está copiado a mano de cv.html; si cambia el HTML, actualizar aquí.
#target illustrator
(function () {
  var W = 595.28, H = 841.89, M = 48, CW = W - 2 * M, GAP = 24, LCOL = 170;
  var INK = [14, 14, 16], BONE = [237, 233, 225], ACC = [255, 151, 38], CI = [150, 200, 0], DG = [192, 190, 255];

  function rgb(c) { var o = new RGBColor(); o.red = c[0]; o.green = c[1]; o.blue = c[2]; return o; }
  // Opacidad del tema web resuelta sobre el fondo --ink
  function mix(a) { var r = []; for (var i = 0; i < 3; i++) r.push(Math.round(BONE[i] * a + INK[i] * (1 - a))); return r; }
  function font(names) {
    for (var i = 0; i < names.length; i++) { try { return app.textFonts.getByName(names[i]); } catch (e) {} }
    return app.textFonts[0];
  }
  var F = {
    disp: font(['Archivo-Bold', 'Archivo-SemiBold', 'Helvetica-Bold', 'Arial-BoldMT']),
    bold: font(['Archivo-SemiBold', 'Archivo-Bold', 'Helvetica-Bold', 'Arial-BoldMT']),
    body: font(['Archivo-Regular', 'Helvetica', 'ArialMT']),
    mono: font(['JetBrainsMono-Regular', 'Menlo-Regular', 'CourierNewPSMT'])
  };

  app.coordinateSystem = CoordinateSystem.DOCUMENTCOORDINATESYSTEM;
  var doc = app.documents.add(DocumentColorSpace.RGB, W, H);
  var page = -1, L, y, BOT;

  function newPage() {
    page++;
    if (page > 0) {
      var p = doc.artboards[page - 1].artboardRect;
      doc.artboards.add([p[2] + 40, p[1], p[2] + 40 + W, p[3]]);
    }
    var r = doc.artboards[page].artboardRect;
    var bg = doc.pathItems.rectangle(r[1], r[0], W, H);
    bg.fillColor = rgb(INK); bg.stroked = false; bg.zOrder(ZOrderMethod.SENDTOBACK);
    L = r[0] + M; y = r[1] - M; BOT = r[3] + M;
  }

  // Un párrafo por elemento: no usar \r dentro de s, descuadra los estilos.
  // Estilo de párrafo: s texto, f fuente, z cuerpo, c color, l interlineado, t tracking, sa espacio después, r alinear derecha
  function P(s, f, z, c, o) { o = o || {}; o.s = s; o.f = f; o.z = z; o.c = c; return o; }
  function up(s, c, sa) { return P(s.toUpperCase(), F.mono, 7.5, c || ACC, { t: 150, sa: sa === undefined ? 8 : sa }); }
  function h2(s) { return P(s, F.disp, 19, BONE, { l: 1.15 }); }
  function body(s, sa) { return P(s, F.body, 9.5, mix(.78), { l: 1.5, sa: sa === undefined ? 6 : sa }); }

  // Crea un bloque de texto de área en (x, y actual) y devuelve {f, h}
  function txt(x, w, paras) {
    var tf = doc.textFrames.areaText(doc.pathItems.rectangle(y, L + x, w, 2000));
    var strs = []; for (var i = 0; i < paras.length; i++) strs.push(paras[i].s);
    tf.contents = strs.join('\r');
    var h = 0;
    for (i = 0; i < paras.length; i++) {
      var o = paras[i], tr = tf.paragraphs[i], a = tr.characterAttributes, pa = tr.paragraphAttributes;
      a.textFont = o.f; a.size = o.z; a.fillColor = rgb(o.c);
      a.autoLeading = false; a.leading = o.z * (o.l || 1.35); a.tracking = o.t || 0;
      pa.hyphenation = false; pa.spaceBefore = 0; pa.spaceAfter = i < paras.length - 1 ? (o.sa || 0) : 0;
      pa.justification = o.r ? Justification.RIGHT : Justification.LEFT;
    }
    app.redraw();
    for (i = 0; i < paras.length; i++) {
      h += tf.paragraphs[i].lines.length * paras[i].z * (paras[i].l || 1.35);
      if (i < paras.length - 1) h += paras[i].sa || 0;
    }
    tf.textPath.height = h + 4; tf.textPath.top = y;
    return { f: tf, h: h };
  }

  // Coloca una fila de bloques; si no cabe, la pasa a una página nueva
  function row(items, after) {
    var h = 0;
    for (var i = 0; i < items.length; i++) h = Math.max(h, items[i].h);
    if (y - h < BOT) {
      var oL = L, oY = y; newPage();
      for (i = 0; i < items.length; i++) items[i].f.translate(L - oL, y - oY);
    }
    y -= h + (after || 0);
  }
  function rule(c) {
    var p = doc.pathItems.add(); p.setEntirePath([[L, y], [L + CW, y]]);
    p.filled = false; p.stroked = true; p.strokeColor = rgb(c || mix(.14)); p.strokeWidth = .5;
  }
  // Si quedan menos de 200 pt, la sección empieza en página nueva (evita títulos huérfanos)
  function section(space) { y -= space || 26; if (y - 200 < BOT) newPage(); else { rule(); y -= 22; } }
  function split(left, right, after) { row([txt(0, LCOL, left), txt(LCOL + GAP, CW - LCOL - GAP, right)], after); }
  function pair(k, v) {
    row([txt(0, CW - 150, [P(k, F.body, 10, BONE)]), txt(CW - 140, 140, [P(v.toUpperCase(), F.mono, 7, mix(.55), { t: 80, r: true })])], 7);
    rule(); y -= 7;
  }

  newPage();

  // Encabezado
  row([txt(0, CW, [
    up('Hoja de vida', ACC, 10),
    P('Mariano', F.disp, 52, BONE, { l: .95 }),
    P('González', F.disp, 52, BONE, { l: .95, sa: 12 }),
    P('Diseño Corporativo · Cultura · Reputación · Marca', F.bold, 12, mix(.9), { sa: 14 }),
    P('+57 300 695 6610  ·  nano.estudiografico@gmail.com  ·  Portafolio - behance.net/MarianoGonzalezA  ·  linkedin.com/in/mariano-nano  ·  Medellín, Colombia · remoto e híbrido', F.mono, 7.5, mix(.7), { l: 1.7 })
  ])]);

  // Perfil
  section(32);
  split([up('Perfil'), h2('El diseño es la forma en que una empresa se explica.')], [
    body('Traduzco la estrategia, la cultura y la reputación de una empresa en contenidos visuales que su gente entiende y su mercado reconoce.'),
    body('Durante 16 años fui responsable de la comunicación visual corporativa de la operación colombiana de una multinacional de telecomunicaciones. Cubrí los tres frentes que casi nunca coinciden en un mismo perfil: llevar la estrategia y la cultura a una planta de más de 4.000 empleados, sostener la reputación institucional ante públicos externos —incluidos los informes anuales y de sostenibilidad— y trabajar con el equipo de marca en las campañas comerciales de producto.'),
    body('Aporto criterio para decidir qué debe comunicar cada pieza y a quién, más la capacidad de ejecutarla al nivel que exige una compañía grande: cadenas de aprobación largas, plazos fijos y cero margen de error. Respondo por el proyecto hasta el archivo final.')
  ]);

  // Cifras
  section();
  row([txt(0, CW - 200, [P('Dimensión del trabajo en 2025', F.disp, 14, BONE)]),
       txt(CW - 200, 200, [P('REGISTRO VERIFICADO · 386 SOLICITUDES EN 49 SEMANAS', F.mono, 6.5, mix(.55), { t: 60, r: true, l: 1.5 })])], 16);
  var figs = [['11', 'áreas de negocio atendidas en 2025', BONE], ['+4.000', 'empleados alcanzados por las campañas', CI],
              ['53 %', 'del volumen del equipo de diseño', ACC], ['2', 'días de mediana entre solicitud y entrega', DG]];
  var fw = (CW - 3 * 16) / 4, cells = [];
  for (var i = 0; i < figs.length; i++)
    cells.push(txt(i * (fw + 16), fw, [P(figs[i][0], F.disp, 30, figs[i][2], { l: 1.1, sa: 4 }), P(figs[i][1], F.body, 8.5, mix(.7), { l: 1.4 })]));
  row(cells, 14);
  row([txt(0, CW, [P('Fuente: registro operativo del equipo de diseño, año 2025 completo. 386 solicitudes y 972 piezas, sobre 1.838 del equipo. La mediana de entrega y el 88 % de cumplimiento de plazo se calculan sobre las 183 solicitudes con fecha de entrega registrada. Las cifras de audiencia interna son estimaciones propias.', F.body, 7.5, mix(.55), { l: 1.5 })])]);

  // Experiencia
  section();
  row([txt(0, CW, [up('Experiencia', CI), h2('Veinte años, tres empleadores.')])], 18);
  var jobs = [
    [CI, 'May 2026 — hoy', 'En curso', 'Diseñador de comunicación corporativa, independiente', 'Nano Estudio Gráfico · Medellín',
      ['Servicios de diseño corporativo para empresas, agencias y consultoras: campañas de cultura y público interno, informes institucionales y de sostenibilidad, sistemas de identidad y campañas de marca. Acompañamiento continuo, proyecto cerrado o ejecución para terceros.']],
    [ACC, 'Ene 2024 — Abr 2026', '2 años 4 meses', 'Especialista de Contenidos Corporativos', 'Tigo Colombia · Híbrido',
      ['Estrategia visual y comunicación de la cultura organizacional para once áreas de negocio, de Gente y Presidencia a B2B, Marketing y Sostenibilidad. Sistemas de identidad visual, iconografía corporativa y look & feel de iniciativas de marca.',
       'Campañas de comunicación interna, clima laboral, bienestar, onboarding, newsletters y presentaciones ejecutivas —incluido trabajo directo con Presidencia—. En digital: landing pages, plantillas de email e informes de gestión en versión web navegable. Implantación de flujos de diseño asistidos por IA para acortar los tiempos de producción.'],
      'IDENTIDAD CORPORATIVA  /  COMUNICACIÓN INTERNA  /  INFORMES ANUALES  /  EMAIL & LANDINGS  /  PRESENTACIONES EJECUTIVAS'],
    [ACC, 'Jun 2019 — Ene 2024', '4 años 7 meses', 'Especialista Multimedia', 'Tigo Colombia (antes UNE EPM) · Medellín',
      ['Comunicación visual corporativa dirigida al público interno, con foco en la consolidación de la cultura y el ambiente laboral durante la integración de las dos compañías.']],
    [ACC, 'Nov 2009 — Jun 2019', '9 años 8 meses', 'Analista de Servicios de Comunicaciones', 'UNE EPM Telecomunicaciones · Medellín',
      ['Estrategias de comunicación y desarrollo de proyectos gráficos para la organización. Entre las piezas del período, el infográfico de estructura organizacional de UNE.']],
    [DG, 'Feb 2008 — Oct 2009', '1 año 9 meses', 'Diseñador gráfico · analista de marca', 'Eficacia · Medellín',
      ['Aplicación de marca en los inmuebles de UNE Telecomunicaciones y apoyo gráfico a las estrategias publicitarias de la compañía.']],
    [DG, 'Feb 2003 — Nov 2004', '1 año 10 meses', 'Diseñador gráfico institucional', 'Institución Universitaria Pascual Bravo · Medellín',
      ['Comunicación visual institucional: editorial, señalética y piezas promocionales.']]
  ];
  for (i = 0; i < jobs.length; i++) {
    var j = jobs[i], right = [P(j[3], F.bold, 12, BONE, { l: 1.25, sa: 3 }), P(j[4], F.mono, 7.5, j[0], { sa: 8 })];
    for (var k = 0; k < j[5].length; k++) right.push(body(j[5][k]));
    if (j[6]) right.push(P(j[6], F.mono, 6.5, mix(.55), { t: 40, l: 1.7 }));
    rule(); y -= 12;
    split([P(j[1], F.mono, 8, j[0], { sa: 3 }), P(j[2].toUpperCase(), F.mono, 6.5, mix(.55), { t: 80 })], right, 14);
  }

  // Formación
  section();
  split([up('Formación', DG), h2('Del documento impreso a la experiencia digital.')], [
    P('2018 — 2019', F.mono, 7.5, mix(.55), { sa: 2 }),
    P('Máster en Diseño Web Multidispositivo · ESdesign, Escuela Superior de Diseño de Barcelona', F.body, 10, BONE, { l: 1.4, sa: 12 }),
    P('2006', F.mono, 7.5, mix(.55), { sa: 2 }),
    P('Diseñador Gráfico, profesional universitario · Universidad Pontificia Bolivariana, Medellín', F.body, 10, BONE, { l: 1.4 })
  ], 22);
  row([txt(0, CW, [up('Herramientas', mix(.55), 0)])], 10);
  rule(); y -= 7;
  pair('Illustrator · Photoshop · InDesign · Premiere · After Effects', 'Adobe CC');
  pair('Figma · XD', 'Interfaz');
  pair('HTML · CSS · email marketing', 'Digital');
  pair('Claude · ChatGPT · Gemini · Antigravity', 'Flujos con IA');

  // Proyectos
  section();
  split([up('Proyectos seleccionados'), h2('El portafolio completo está en Behance.')],
        [body('Doce proyectos publicados. Estos seis cubren los tres frentes: reputación institucional, marca y público interno.', 0)], 16);
  rule(); y -= 7;
  pair('Annual & Sustainability Report 2025', 'Tigo · Informe');
  pair('Informe de Gestión 2024 — web', 'Tigo · Web');
  pair('Full Tigo — Key Visual Fútbol', 'Tigo · Marca');
  pair('Portafolio ContigoConectados', 'Tigo · Web & email');
  pair('Lexera — servicios jurídicos', 'Identidad');
  pair('PAHB — asesoría jurídica inmobiliaria', 'Identidad & web');

  // Contacto
  section();
  var c = [['Teléfono', '+57 300 695 6610'], ['Correo', 'nano.estudiografico@gmail.com'],
           ['Portafolio', 'behance.net/MarianoGonzalezA'], ['Ubicación', 'Medellín, Colombia · remoto e híbrido']], cr = [];
  for (i = 0; i < c.length; i++) { cr.push(P(c[i][0].toUpperCase(), F.mono, 6.5, mix(.55), { t: 80, sa: 2 })); cr.push(P(c[i][1], F.body, 11, BONE, { sa: 10 })); }
  split([up('Contacto', DG), h2('Hablemos de lo que hay que comunicar.')], cr);

  section(20);
  row([txt(0, CW / 2, [P('© 2026 MARIANO GONZÁLEZ', F.mono, 6.5, mix(.45), { t: 80 })]),
       txt(CW / 2, CW / 2, [P('CULTURA · REPUTACIÓN · MARCA', F.mono, 6.5, mix(.45), { t: 80, r: true })])]);

  doc.saveAs(new File(File($.fileName).parent + '/cv.ai'), new IllustratorSaveOptions());
  if (!$.getenv('CV_NOALERT')) alert('Listo: cv.ai (' + (page + 1) + ' páginas)');
})();
