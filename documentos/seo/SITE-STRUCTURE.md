# Estructura del sitio

La estructura actual es la definitiva mientras dure el sitio. No se añaden páginas.

```
/                    index.html      indexable · en sitemap · ProfilePage + Person
/cv.html             cv.html         indexable · en sitemap · ProfilePage + BreadcrumbList
/tarifario.html      tarifario.html  noindex · privada, se comparte a mano
/tarjeta.html        tarjeta.html    noindex · privada
/404.html            404.html        noindex
robots.txt · sitemap.xml · site.webmanifest · llms.txt (por crear)
```

## Enlaces

- Internos: home ↔ CV. Tarifario → home. Es suficiente para dos páginas indexables.
- Salientes: Behance, LinkedIn y WhatsApp. Behance es donde viven los casos.
- Entrantes: de Behance y LinkedIn hacia la home. Todo enlace externo nuevo (directorios, gremios, clientes) conviene dirigirlo a Behance o LinkedIn, que sobreviven al sitio, y no a `github.io`.

## Sitemap

| URL | Entra |
|---|---|
| `/` | Sí |
| `/cv.html` | Sí |
| `/tarifario.html`, `/tarjeta.html`, `/404.html` | No (`noindex`) |

Mantener `lastmod` real: la fecha del último cambio de contenido, no la del despliegue.

## Recorridos de usuario

1. **Referido** (WhatsApp, LinkedIn): home → Behance o CV → WhatsApp.
2. **Verificador** (busca el nombre): resultado de marca → home → CV.
3. **Buscador de nicho:** llega a un proyecto de Behance → perfil de Behance → sitio o WhatsApp.
