# curero.net

Portfolio personal de Sergi. Web estàtica (HTML + CSS + JS, sense build) pensada per desplegar-se a **Cloudflare Pages**.

- Fosc i minimalista, en català / castellà / anglès (selector d'idioma).
- Públic però **no indexat**: `noindex` al HTML, `robots.txt` i capçalera `X-Robots-Tag` (`_headers`).
- CSP estricta a `_headers`: sense scripts ni estils inline.

## Estructura

```
index.html          pàgina principal
404.html            pàgina d'error
robots.txt          bloqueja cercadors
_headers            capçaleres de seguretat/noindex (Cloudflare Pages)
assets/style.css    estils
assets/app.js       traduccions i renderitzat
assets/favicon.svg  icona
data/content.json   projectes, usuari de GitHub i idiomes  <-- edita aquí
```

## Afegir o canviar projectes

Edita `data/content.json`. Cada projecte:

```json
{ "name": "Nom", "url": "https://github.com/SeergiCureero/repo", "tags": ["x"],
  "d": { "ca": "...", "es": "...", "en": "..." } }
```

Si `url` és `null`, la targeta es mostra sense enllaç.
Els textos generals (títols, "Impressió 3D", "Arduino"...) són a `assets/app.js`.

## Provar en local

`fetch` no funciona amb `file://`, cal un servidor:

```bash
python3 -m http.server 8000
# obre http://localhost:8000
```

## Desplegament (Cloudflare Pages)

Connectat a aquest repo: build command **buit**, output directory **`/`** (arrel). Cada `git push` a `main` publica automàticament.

## Per fer visible als cercadors

Treu `noindex` de `index.html`, esborra `robots.txt` i la línia `X-Robots-Tag` de `_headers`.
