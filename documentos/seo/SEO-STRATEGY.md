# Estrategia SEO — Nano. / Mariano González

Fecha: 24 de septiembre de 2026 (revisada el mismo día)
Sitio: https://sanmarianito.github.io/Nano-Perfil/
Plantilla base: `generic.md`, recortada a la medida de un perfil personal transitorio.

## Marco del plan

Tres condiciones definen qué tiene sentido hacer:

1. **El sitio es un paso previo.** Mariano está terminando un proyecto de negocio propio; este perfil lo acompaña mientras tanto. No habrá dominio propio.
2. **No habrá páginas nuevas.** Los casos y el portafolio viven en Behance.
3. **El texto visible no se toca.** En el sitio solo se trabaja en el `<head>`, el JSON-LD, `robots.txt`, `sitemap.xml` y el manifest.

La consecuencia es que **el activo que hay que construir no es el sitio sino la entidad**: Mariano González, "Nano", diseñador de comunicación corporativa en Medellín. Esa entidad vive en Behance, LinkedIn y el JSON-LD, y viaja con él al negocio nuevo. Lo que se invierta en la URL de `github.io` se queda atrás; lo que se invierta en la entidad y en los perfiles externos no.

## 1. Diagnóstico

### Negocio y público

- **Qué es:** un diseñador independiente con 20 años de trayectoria, 16 en comunicación corporativa de una multinacional de telecomunicaciones.
- **Oferta:** tres frentes. Cultura y público interno; reputación e institucional (informes anuales y de sostenibilidad, identidad corporativa); marca y mercadeo.
- **Quién compra:** áreas de comunicaciones, gestión humana, sostenibilidad, secretaría general y marca de empresas medianas y grandes en Colombia, además de agencias que subcontratan ejecución.
- **Cómo se usa el sitio:** como carta de presentación que se comparte por WhatsApp o LinkedIn. El SEO tiene que servir sobre todo a quien busca el nombre para verificarlo antes de una reunión.

### Estado técnico

| Aspecto | Estado |
|---|---|
| HTTPS, móvil, `robots.txt` | Correcto. Permite los rastreadores de IA. |
| Search Console | Verificado. |
| Páginas indexables | Home y CV, ambas en el sitemap. |
| `tarifario.html`, `tarjeta.html` | Privadas: `noindex, follow`, fuera del sitemap (tarifario corregido el 24/09/2026). |
| Title y description | Únicos y dentro de longitud. |
| JSON-LD | `Person` completo en la home, credenciales en el CV. Es mejor que el de la competencia revisada. |

### Riesgo principal

"Mariano González" es un nombre muy común. Lo que distingue la entidad es la combinación "Nano" + Medellín + comunicación corporativa + Behance/LinkedIn. Esa combinación tiene que ser idéntica en todas partes.

## 2. Objetivos

1. **Búsqueda de marca:** que "Mariano González diseñador Medellín" y "Nano diseñador gráfico" devuelvan el sitio, Behance y LinkedIn en el top 3.
2. **Asistentes de IA:** que ChatGPT, Perplexity y Google describan la entidad correctamente cuando alguien pregunte por él.
3. **Nicho vía Behance:** que los proyectos de Behance aparezcan para búsquedas como "diseño informe de sostenibilidad" o "manual de marca Medellín".
4. **Traspaso limpio:** cuando exista el negocio propio, que la entidad pase sin fricción y este sitio no compita con el nuevo.

Queda fuera: competir con el sitio por términos genéricos ("diseñador gráfico Medellín"), link building hacia `github.io`, blog y páginas de servicio.

## 3. Palabras clave

Sin datos de volumen (no hay herramientas de datos SEO conectadas).

| Grupo | Ejemplos | Dónde se trabaja |
|---|---|---|
| Marca | mariano gonzález diseñador, nano diseñador gráfico medellín | Title y description del sitio, JSON-LD, perfiles |
| Reputación | diseño informe de sostenibilidad, informe anual diseño colombia, informe web navegable | Títulos y descripciones de Behance |
| Identidad | manual de marca, sistema de identidad corporativa, plantillas corporativas | Behance |
| Cultura | diseño comunicación interna, campaña de cultura organizacional | Behance, LinkedIn |
| Marca y mercadeo | landing page corporativa, key visual campaña | Behance; `keywords` y `knowsAbout` del sitio |

## 4. Base técnica (solo metadatos)

- **JSON-LD de la home:** convertir `worksFor` en un nodo `Organization` con `@id` propio y añadir `makesOffer` con los tres frentes como `Service` y `areaServed: CO`. Así los asistentes entienden qué ofrece, sin tocar la copia.
- **JSON-LD del CV:** referenciar el `Person` de la home por `@id` en vez de duplicarlo.
- **`sameAs`:** añadir cada perfil externo nuevo que se cree.
- **`robots.txt`:** declarar `GPTBot` de forma explícita.
- **`llms.txt`:** resumen factual de la entidad en la raíz. Es barato y no toca la copia.
- **Core Web Vitals:** medir una vez con PageSpeed Insights. Un sitio estático debería pasar sin cambios.

## 5. Contenido

Todo el contenido nuevo va a Behance y LinkedIn. Ver `CONTENT-CALENDAR.md`.

## 6. Traspaso al negocio propio

Cuando el negocio nuevo tenga sitio, hay dos caminos:

- **Convivir:** el perfil sigue como página personal. El `Person` apunta al negocio con `worksFor` o `founder`, y el sitio nuevo enlaza al perfil. Sirve si Mariano quiere mantener una marca personal aparte.
- **Retirar:** reemplazar las páginas por una redirección con `<meta http-equiv="refresh">` y `rel=canonical` al sitio nuevo. GitHub Pages no permite 301, pero Google trata el refresh inmediato como redirección.

En ambos casos, Behance y LinkedIn conservan todo lo construido.

## 7. KPI

Sin línea base todavía; se toma en la fase 1.

| Métrica | Línea base | 3 meses | 6 meses |
|---|---|---|---|
| Posición media de consultas de marca (GSC) | Por medir | Top 3 | Top 1 |
| Impresiones de marca/mes (GSC) | Por medir | +30 % | +60 % |
| Proyectos de Behance en el top 10 para una consulta de nicho | Por medir | 1 | 3 |
| Asistentes de IA que describen bien la entidad (prueba manual) | Por medir | 1 de 3 | 3 de 3 |
| Páginas indexadas | 2 | 2 | 2 |
| CWV móvil | Por medir | Verde | Verde |

No hay metas a 12 meses: el horizonte del sitio depende del negocio nuevo.

## 8. Recursos y riesgos

- **Tiempo técnico:** unas 2 a 3 horas en total para los metadatos. Behance, unas 1 a 2 horas por proyecto.
- **Costo:** ninguno.
- **Riesgos:**
  - Homónimos. Mitigación: "Nano" y Medellín siempre juntos.
  - Que el sitio nuevo y el perfil se canibalicen. Mitigación: decidir entre convivir o retirar (§6) el día que se lance el negocio.
