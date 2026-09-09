# Landing de presentación — Mariano González

Vehículo de presentación rápida: perfil, cifras 2025, tres frentes de servicio,
contacto y barra de accesos a Behance, LinkedIn y WhatsApp.

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | La landing de presentación. Sin JavaScript. |
| `cv.html` | La hoja de vida completa. Enlazada desde el botón CV del hero y de la barra del pie. |
| `style.css` | Todo el CSS: tokens, layout y componentes. |
| `retrato.webp` | El retrato en uso. 1000×1250 (4:5), 71 KB. Derivado de `Foto.webp`. |
| `Foto.webp` / `Foto.jpg` | Originales, 3024×4032. No los referencia la página. |

`index.html`, `cv.html`, `style.css` y `retrato.webp` tienen que viajar juntos. Al abrir `index.html` con
doble clic funciona todo salvo la tipografía de Google Fonts, que necesita
conexión.

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

y en el bloque `:root` de `style.css`:

```css
--font-display:'Gothiks',Helvetica,Arial,sans-serif;
```

Revisa después el tamaño del `<h1>`: Gothiks y Archivo no tienen la misma altura
de x, y `--fs-name` puede necesitar ajuste.

## Cambiar el retrato

`retrato.webp` es un recorte centrado 4:5 de `Foto.webp`, reescalado a 1000×1250
y comprimido a calidad 80. Los 2,1 MB del original no deben ir a una página: son
treinta veces el peso necesario para ese tamaño de visualización.

Para regenerarlo desde otro archivo:

```bash
python3 -c "
from PIL import Image
im=Image.open('Foto.webp'); w,h=im.size; nh=int(w*5/4); top=(h-nh)//2
im.crop((0,top,w,top+nh)).resize((1000,1250), Image.LANCZOS).save('retrato.webp','WEBP',quality=80,method=6)"
```

El CSS aplica `filter:grayscale(1)` y un velo de acento en degradado sobre la
foto, así que da igual si el archivo entra en color.

## Cambiar contenido

Todo el texto está en `index.html` y `cv.html`, en bloques comentados: `Hero`, `Cifras`,
`Perfil`, `Tres frentes`, `Contacto`, `Barra de botones`.

Enlaces salientes en uso:

- `https://www.behance.net/SanMarianito_G`
- `https://www.linkedin.com/in/mariano-nano`
- `https://wa.me/573006956610`
- `mailto:sanmarianito@gmail.com`

Las cifras salen del registro verificado 2025 y van en el orden del documento de
posicionamiento: rango → alcance → peso → confiabilidad. Las 386 solicitudes y
972 piezas se dejaron fuera a propósito.
