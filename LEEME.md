# Landing de presentación — Mariano González

Vehículo de presentación rápida: perfil, cifras 2025, tres frentes de servicio,
contacto y barra de accesos a Behance, LinkedIn y WhatsApp.

## Archivos

| Ruta | Qué es |
|---|---|
| `index.html` | La landing de presentación. Sin JavaScript. |
| `cv.html` | La hoja de vida completa. Enlazada desde el botón CV del hero y de la barra del pie. |
| `tarifario.html` | Tarifario 2026. |
| `tarjeta.html` | Tarjeta de presentación digital. |
| `404.html`, `robots.txt`, `sitemap.xml`, `site.webmanifest`, `google….html` | Archivos que GitHub Pages y los buscadores esperan en la raíz. |
| `llms.txt` | Resumen factual del perfil para asistentes de IA. |
| `f156e7cf….txt` | Clave de IndexNow. No borrar. Se usa con `documentos/seo/indexnow.sh` después de cada publicación. |
| `documentos/seo/` | Plan SEO y el script de IndexNow. |
| `css/style.css` | Todo el CSS: tokens, layout y componentes. |
| `js/tarjeta.js` | El único JavaScript, usado por `tarjeta.html`. |
| `img/` | Imágenes publicadas: `retrato.webp` (1000×1250, 4:5, 71 KB), `og-image.jpg` para redes, e `iconos/` con favicons y apple-touch-icon. |
| `descargas/mariano-gonzalez.vcf` | Contacto descargable desde la tarjeta. |
| `fuentes/fotos/` | `Foto.webp` / `Foto.jpg`, originales 3024×4032. No los referencia la página. |
| `fuentes/cv/` | Originales del CV: `cv.ai`, el script `cv-a-ai.jsx` que lo genera y los PDF. |
| `documentos/` | Lineamientos visuales y contenido para revisión. |

Las páginas HTML se quedan en la raíz para que sus URL públicas no cambien.
Las rutas a `css/`, `js/` e `img/` son relativas, así que la carpeta entera tiene que viajar junta.
Al abrir `index.html` con doble clic funciona todo salvo la tipografía de
Google Fonts, que necesita conexión.

## Sistema visual

Hereda los tokens de `nano-estudio/css/tokens.css`:

- Fondo `--ink` `#0E0E10` · Texto `--bone` `#EDE9E1` · Superficie `--surface` `#16161A`
- Acentos por frente de trabajo:
  - `#96C800` (`--accent-ci`) → Cultura y público interno
  - `#FF9726` (`--accent`) → Reputación e institucional
  - `#C0BEFF` (`--accent-dg`) → Marca y mercadeo
- Grano fijo sobre la página, filetes de 1px, etiquetas en JetBrains Mono

## La tipografía display no es Gothiks

El sitio del estudio la carga desde Typekit (`use.typekit.net/umo1shx.css`). La
landing nació como artifact de Claude, donde solo se admite Google Fonts, así
que el titular usa Archivo variable con el eje de ancho comprimido (`wdth 92`)
como sustituto.

Si la alojas en tu propio dominio, repón Gothiks en `index.html`:

```html
<link rel="stylesheet" href="https://use.typekit.net/umo1shx.css">
```

y en el bloque `:root` de `css/style.css`:

```css
--font-display:'Gothiks',Helvetica,Arial,sans-serif;
```

Revisa después el tamaño del `<h1>`: Gothiks y Archivo no tienen la misma altura
de x, y `--fs-name` puede necesitar ajuste.

## Cambiar el retrato

`img/retrato.webp` es un recorte centrado 4:5 de `fuentes/fotos/Foto.webp`, reescalado a 1000×1250
y comprimido a calidad 80. Los 2,1 MB del original no deben ir a una página: son
treinta veces el peso necesario para ese tamaño de visualización.

Para regenerarlo desde otro archivo:

```bash
python3 -c "
from PIL import Image
im=Image.open('fuentes/fotos/Foto.webp'); w,h=im.size; nh=int(w*5/4); top=(h-nh)//2
im.crop((0,top,w,top+nh)).resize((1000,1250), Image.LANCZOS).save('img/retrato.webp','WEBP',quality=80,method=6)"
```

El CSS aplica `filter:grayscale(1)` y un velo de acento en degradado sobre la
foto, así que da igual si el archivo entra en color.

## Cambiar contenido

Todo el texto está en `index.html` y `cv.html`, en bloques comentados: `Hero`, `Cifras`,
`Perfil`, `Tres frentes`, `Contacto`, `Barra de botones`.

Enlaces salientes en uso:

- `https://www.behance.net/MarianoGonzalezA`
- `https://www.linkedin.com/in/mariano-nano`
- `https://wa.me/573006956610`
- `mailto:nano.estudiografico@gmail.com`

Las cifras salen del registro verificado 2025 y van en el orden del documento de
posicionamiento: rango → alcance → peso → confiabilidad. Las 386 solicitudes y
972 piezas se dejaron fuera a propósito.
