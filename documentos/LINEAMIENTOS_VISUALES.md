# Lineamientos Visuales — Nano Perfil

Este documento establece las guías, especificaciones y tokens del sistema visual de **Nano Perfil** (perfil de presentación personal y hoja de vida de Mariano González). Garantiza la coherencia estética y técnica en todas las páginas e implementaciones futuras del proyecto.

---

## 1. Filosofía y Concepto Visual

El proyecto adopta una **atmósfera oscura sobria, editorial y técnica** ("El mundo oscuro de NANO"), caracterizada por:

- **Monocromía de alto contraste con acentos funcionales:** Un fondo profundo donde la jerarquía del contenido se construye mediante niveles de opacidad y acentos de color asociados a frentes de servicio.
- **Estética técnico-editorial:** Combinación de titulares condensados con etiquetas monospaciadas en mayúsculas y números tabulares.
- **Grano analógico y estructuración sutil:** Uso de textura de ruido sutil y filetes de 1px para delimitar secciones sin recargar la pantalla.

---

## 2. Paleta de Color y Tokens CSS

Todos los colores están parametrizados como variables en el `:root` de [`style.css`](file:///Users/nanogon/Library/CloudStorage/GoogleDrive-sanmarianito@gmail.com/Mi%20unidad/Proyectos%20Recientes/Nano%20Perfil/style.css).

### 2.1 Colores Base
| Token | Valor Hex | Uso / Descripción |
|---|---|---|
| `--ink` | `#0E0E10` | Fondo principal de la página (Atmósfera oscura continua). |
| `--surface` | `#16161A` | Fondo de contenedores (tarjetas, marco del retrato). |
| `--bone` | `#EDE9E1` | Tonalidad base del texto y líneas. |

### 2.2 Acentos Cromaticos Funcionales
Cada frente de servicio y categoría tiene asignado un color de acento distintivo:

| Token | Valor Hex | Frente / Ámbito |
|---|---|---|
| `--accent` | `#FF9726` | Reputación e Institucional / Marca personal / Elementos globales |
| `--accent-ci` | `#96C800` | Cultura y público interno / Estado disponible |
| `--accent-dg` | `#C0BEFF` | Marca y mercadeo |

### 2.3 Jerarquía de Texto (Escala de Opacidad)
El texto utiliza el tono `--bone` (`#EDE9E1`) ajustando su opacidad para denotar peso y relevancia:

| Token | Opacidad / Canal Alfa | Uso |
|---|---|---|
| `--text` | `100%` | Titulares principales (`h1`, `h2`), números destacados |
| `--text-strong` | `90%` | Párrafos introductorios, enfatizados y texto de lectura principal |
| `--text-body` | `78%` | Cuerpo de texto general |
| `--text-muted` | `70%` | Descripciones secundarias, sub-roles |
| `--text-dim` | `55%` | Etiquetas monospaciadas, leyendas, indicadores |
| `--text-faint` | `45%` | Fuentes de datos, años, metadatos secundarios |
| `--text-ghost` | `34%` | Marcas de tiempo, pie de página, separadores |

### 2.4 Bordes, Líneas y Estados Hover
| Token | Opacidad | Uso |
|---|---|---|
| `--line-soft` | `10%` | Divisiones entre secciones y filas secundarias |
| `--line` | `12%` | Líneas estructurales genéricas |
| `--line-mid` | `14%` | Bordes superiores e inferiores de bandas anchas (cifras, barra) |
| `--line-box` | `16%` | Bordes de contenedores, marcos y tags |
| `--line-btn` | `30%` | Bordes de botones tipo píldora |
| `--hover-row` | `5%` | Fondo sutil al pasar el cursor sobre filas o bloques interactivos |

---

## 3. Tipografía y Jerarquía Textual

El proyecto utiliza dos familias tipográficas complementarias (con una opción de reemplazo para producción).

### 3.1 Familias Tipográficas

1. **Tipografía Principal / Display & Body:**
   - **En producción actual:** `Archivo` (Google Fonts, variable).
   - **Variación de ancho:** `wdth 92` (comprimida) para el titular del Hero (`<h1>`), y `wdth 100` para cuerpo de texto y subtítulos (`<h2>`).
   - **Sustituto editorial del estudio (opcional vía Typekit):** `Gothiks` (`use.typekit.net/umo1shx.css`).
2. **Tipografía Técnica / Monospaciada:**
   - **Fuente:** `JetBrains Mono`.
   - **Uso:** Etiquetas (`.mono`, `.eyebrow`), valores tabulares, categorías, cifras y botones.
   - **Formato habitual:** `text-transform: uppercase`, `letter-spacing: 0.09em` a `0.20em`, `font-size: 11px - 12px`.

### 3.2 Escala Tipográfica Fluida (`clamp`)

| Nivel / Elemento | Regla CSS / Clamp | Rango de Tamaño |
|---|---|---|
| Nombre Hero (`h1`) | `clamp(44px, 8.4vw, 132px)` | 44px – 132px |
| Título de Sección (`h2`) | `clamp(26px, 3.4vw, 46px)` | 26px – 46px |
| Título de Fila / Frente | `clamp(21px, 2.4vw, 34px)` | 21px – 34px |
| Cifras / Estadísticas | `clamp(30px, 3.6vw, 52px)` | 30px – 52px |
| Párrafo Lead | `clamp(16px, 1.32vw, 20px)` | 16px – 20px |

---

## 4. Tratamiento de Imagen y Fotografía

El retrato del Hero ([`retrato.webp`](file:///Users/nanogon/Library/CloudStorage/GoogleDrive-sanmarianito@gmail.com/Mi%20unidad/Proyectos%20Recientes/Nano%20Perfil/retrato.webp)) sigue reglas específicas para integrarse visualmente con el fondo oscuro:

- **Proporción y Formato:** Relación de aspecto `4:5` (recorte 1000×1250 px, optimizado en WebP a calidad 80).
- **Filtro Grayscale:** CSS `filter: grayscale(1) contrast(1.06)` aplicado a la imagen para neutralizar el color original.
- **Velo de Acento Cálido (Overlay):** Degradado superior a inferior en pseudo-elemento `::after`:
  ```css
  background: linear-gradient(
    180deg,
    rgb(255 151 38 / .10) 0%,
    rgb(14 14 16 / 0) 46%,
    rgb(14 14 16 / .72) 100%
  );
  ```
- **Contenedor:** Fondo `--surface` con borde de `1px solid var(--line-box)`.

---

## 5. Texturas y Efectos Visuales

### 5.1 Capa de Grano (Noise Overlay)
Para replicar el acabado impreso/editorial del estudio, la página incluye un patrón de ruido fractal vectorial no intrusivo fijado sobre toda la pantalla:
- **Clase:** `.noise` (elemento `<div class="noise"></div>`).
- **Implementación:** SVG inline en `background-image` con `feTurbulence` (baseFrequency 0.85).
- **Estilos:** `position: fixed`, `inset: 0`, `z-index: 80`, `pointer-events: none`, `opacity: 0.05`.

---

## 6. Layout, Grilla y Espaciado

- **Contenedor Principal (`.wrap`):** `max-width: 1440px`, centrado con margen automático, y relleno lateral fluido `padding-inline: clamp(20px, 4vw, 56px)`.
- **Espaciado Vertical entre Secciones (`--pad-y`):** `clamp(52px, 7vw, 104px)`.
- **Estructura Split Asimétrica (`.split`, `.hero`, `.contact`, `.front`):**
  - Columna izquierda (etiqueta/titular): ~38% (`minmax(0, 0.82fr)`).
  - Columna derecha (contenido/lista): ~62% (`minmax(0, 1.18fr)`).
- **Grillas de 4 Columnas (`.figures`, `.bar`):**
  - Escritorio: 4 columnas (`repeat(4, 1fr)`).
  - Tablet (`< 820px` / `< 1000px`): 2 columnas (`repeat(2, 1fr)`).
  - Móvil (`< 420px` / `< 560px`): 1 columna (`1fr`).

---

## 7. Componentes y Microinteracciones

### 7.1 Botones y Enlaces Píldora (`.pill-link`)
- Bordes completamente redondeados (`border-radius: 999px`).
- Animación de transición en hover de `0.35s` con curva `cubic-bezier(.16, 1, .3, 1)`.
- Al hacer hover, se invierte el fondo a `--bone` y el texto a `--ink`, desplazando suavemente la flecha adjunta (`transform: translate(2px, -2px)`).

### 7.2 Barra Inferior de Navegación (`.bar__btn`)
- Fila modular en la parte inferior de la página.
- En hover, el fondo cambia al color asignado (`--btn-color`), el texto cambia a `--ink` y la flecha se desplaza (`translate(3px, -3px)`).

### 7.3 Indicadores de Estado y Puntos de Color (`.status__dot`, `.front__dot`)
- Pequeños círculos con relieve sutil (`box-shadow: 0 0 0 3px rgb(... / .16)`).
- Asignación de color según el mapa de acentos funcionales.

---

## 8. Accesibilidad y Rendimiento

- **Foco Teclado (`:focus-visible`):** Anillo de enfoque de alto contraste: `outline: 2px solid var(--accent); outline-offset: 3px`.
- **Movimiento Reducido:** Soporte para `@media (prefers-reduced-motion: reduce)` anulando las transiciones y animaciones.
- **Sin JavaScript Obligatorio:** Toda la interfaz es completamente funcional mediante HTML5 semántico y CSS3 puro.
- **Carga de Imágenes:** Fotografías optimizadas en formato `.webp` para garantizar tiempos de carga ultra rápidos.
