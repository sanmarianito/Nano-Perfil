#!/bin/sh
# Avisa a Bing (y por IndexNow a Yandex, Seznam, Naver) que el sitio cambió.
# Correr después de cada push, cuando GitHub Pages ya haya publicado.
# Uso: sh documentos/seo/indexnow.sh
BASE="https://sanmarianito.github.io/Nano-Perfil"
KEY="f156e7cfa7cb4bee896d23d7d59ec639"
curl -s -o /dev/null -w "IndexNow: HTTP %{http_code}\n" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d "{\"host\":\"sanmarianito.github.io\",\"key\":\"$KEY\",\"keyLocation\":\"$BASE/$KEY.txt\",\"urlList\":[\"$BASE/\",\"$BASE/cv.html\",\"$BASE/tarifario.html\"]}" \
  https://api.indexnow.org/indexnow
