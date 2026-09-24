# Hoja de ruta de implementación

Restricciones: en el sitio solo se modifican `<head>`, JSON-LD, `robots.txt`, `sitemap.xml` y `site.webmanifest`. Sin páginas nuevas ni dominio propio. El sitio es transitorio hasta que exista el negocio propio.

## Fase 1 — Base técnica (semanas 1–2)

- [x] Tarifario: `noindex, follow` (24/09/2026). Tarjeta ya lo tenía.
- [ ] Si Search Console muestra el tarifario indexado, pedir su retirada temporal.
- [x] Home y CV: nodo `Organization` (`#estudio`) con `OfferCatalog` de los tres frentes como `Service` y `areaServed: CO`; `Person` idéntico en ambas páginas, con credenciales (24/09/2026). Se dejó completo en las dos porque Google no une datos entre páginas.
- [x] `<link rel="me">` hacia Behance y LinkedIn en el `<head>` de la home y el CV.
- [x] `robots.txt`: GPTBot, Claude-SearchBot, Claude-User y Applebot-Extended. **Ojo:** los rastreadores solo leen `robots.txt` en la raíz del host (`sanmarianito.github.io/robots.txt`), que hoy da 404. Todo está permitido por defecto, pero el sitemap hay que enviarlo a mano en Search Console y Bing.
- [x] `llms.txt` con un resumen factual de la entidad.
- [x] IndexNow: clave en la raíz del sitio y `indexnow.sh` para avisar después de cada push.
- [ ] Validar con el Rich Results Test y el Schema Markup Validator.
- [ ] Línea base: consultas de marca en Search Console, PageSpeed móvil y una prueba manual en ChatGPT, Perplexity y Google ("¿Quién es Mariano González, diseñador de Medellín?").

## Fase 2 — Entidad y Behance (semanas 3–12)

- [ ] Behance y LinkedIn: misma ubicación, misma frase corta, enlace al sitio.
- [ ] Revisar los títulos, descripciones y etiquetas de los proyectos existentes en Behance.
- [ ] Publicar proyectos nuevos según `CONTENT-CALENDAR.md`.
- [ ] Opcional: perfiles en directorios (Clutch o Sortlist como independiente, directorio de egresados de la UPB) con enlace a Behance, y añadirlos al `sameAs`.

## Mantenimiento (mientras dure el sitio)

- [ ] Cada mes: repetir la prueba en los asistentes de IA y revisar las consultas de marca en Search Console.
- [ ] Cada trimestre: ajustar title, description y `keywords` según las consultas reales.
- [ ] Actualizar `lastmod` del sitemap solo cuando cambie el contenido.

## Traspaso (cuando se lance el negocio propio)

- [ ] Decidir entre convivir o retirar el perfil (ver `SEO-STRATEGY.md` §6).
- [ ] Si convive: `Person` con `worksFor` o `founder` apuntando a la organización nueva, y enlace cruzado entre los dos sitios.
- [ ] Si se retira: meta refresh + `rel=canonical` al sitio nuevo en cada página, y actualizar el enlace del sitio en Behance y LinkedIn.
- [ ] En ambos casos: copiar el `Person` y el `sameAs` al JSON-LD del sitio nuevo.
