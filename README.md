# OSI Security Rings

An interactive, concentric view of the OSI model, extended with **Layer 0** (hardware, firmware and supply chain) on the outer ring and **Layer 8** (people and governance) at the core. **Ring set A** shows the protocols and standards at each layer, and **ring set B** shows the security controls that defend it. Each control is tagged **P**revent, **D**etect or **R**espond.

Animated dataflows show packets gaining a header at each layer as they leave the sending stack (encapsulation) and crossing the wire as bits. The receiving stack then inspects each packet and strips its headers one layer at a time. Malicious packets, from firmware implants at Layer 0 to phishing at Layer 8, are stopped by a named control, and that control lights up on the rings.

> This is a teaching model, not a trust model. Position on the rings does not confer trust, so apply Zero Trust at every ring.

Live at **<https://osi.cyberassure.uk>** · Created by [Jon Silvester](https://www.linkedin.com/in/jonsilvester).

## Features

- Hover a layer to link both ring sets, or click to pin it. The side panel then shows the layer's function, example threats, protocols, controls and the attacks stopped at that layer.
- Filter controls by function (Prevent, Detect or Respond) to see where coverage is thin. The overview panel includes a coverage table for each layer, and the PDF key shows the same counts.
- Search across all protocols and controls (press `/`). Press `0`–`8` to jump to a layer, `Space` to play or pause the dataflow, and `Esc` to clear.
- The theme switcher offers Auto (follows the system setting), Dark and Light, and remembers your choice.
- Animation is off by default for visitors whose system is set to reduce motion.
- A3 landscape PDFs are included in a dark version and a light version for printing. Printing from the browser also produces A3 landscape.
- The site has no dependencies, no build step, no trackers and no third-party requests. Fonts are self-hosted under the SIL Open Font Licence.

## Deploy

1. Create a new GitHub repository and upload every file in this folder to its root. The layout is deliberately flat (no subfolders), so dragging the files in through GitHub's **Add file → Upload files** works as-is.
2. In Vercel, choose **Add New → Project**, import the repository, and use these settings:
   - **Framework preset:** Other
   - **Build command:** leave empty
   - **Output directory:** leave empty (the repository root is served)
3. Deploy the project.

### Custom domain: osi.cyberassure.uk

1. In Vercel, open **Project → Settings → Domains** and add `osi.cyberassure.uk`.
2. At your DNS provider for `cyberassure.uk`, add the record that Vercel displays. This is normally:

   | Type  | Name | Value                                   |
   |-------|------|-----------------------------------------|
   | CNAME | osi  | `cname.vercel-dns.com` (or the project-specific value Vercel shows) |

   If the domain has CAA records, add `0 issue "letsencrypt.org"` so Vercel can issue the certificate.
3. Once the domain shows as **Valid** in Vercel, set it as the primary domain and redirect the `*.vercel.app` URL to it.

The canonical, Open Graph and Twitter tags in `index.html`, along with `robots.txt` and `sitemap.xml`, already point at `https://osi.cyberassure.uk`. After going live, run the URL through LinkedIn's [Post Inspector](https://www.linkedin.com/post-inspector/) to warm its preview cache.

## Security headers

`vercel.json` sets the following headers:

- A strict Content Security Policy: same-origin scripts, styles and fonts only, with no inline scripts and no `eval`. The policy permits inline style *attributes* only (`style-src-attr`), because the diagram colours each layer through CSS custom properties.
- HSTS (two years, including subdomains; `preload` is left off because only apex domains can join the preload list), `X-Content-Type-Options`, `X-Frame-Options: DENY` with `frame-ancestors 'none'`, a restrictive `Permissions-Policy`, `Referrer-Policy`, and COOP.

You can check the headers after deployment at <https://securityheaders.com>.

## Editing content

All the content lives in `data.js`:

- `LAYERS` holds the protocols, controls, descriptions and threats for each of Layers 0–8. Each control has an `f` tag made from the letters `P`, `D` and `R` (prevent, detect, respond); a control can have more than one.
- `CROSS_LAYER` holds the capabilities that apply to every layer.
- `THREATS` holds the attacks used in the dataflow. Each threat's `control` must exactly match a security item name at its layer.
- `BENIGN` holds the labels for legitimate traffic.

The ring layout is calculated in the browser from measured text widths, so adding or renaming items just works. If a ring overflows, a warning appears in the browser console.

## Regenerating the PDFs, OG image and icons (optional)

`og.html`, `render.py` and `serve.py` are build tools and are excluded from deployment by `.vercelignore`. To regenerate the assets, you need Python 3 with `playwright` and `Pillow` installed:

```bash
python3 serve.py . 8123 &      # local server that applies the vercel.json headers
python3 render.py              # writes og.png, favicons and both A3 PDFs
```

## Structure (flat)

```
index.html, 404.html          app shell, meta and Open Graph tags
app.css                       styles and themes
theme-init.js                 sets the theme before first paint (avoids a flash)
data.js                       content model
app.js                        layout, interaction and dataflow animation
*.woff2 + LICENSE-*-OFL.txt   Space Grotesk and IBM Plex Mono (SIL OFL 1.1)
OSI-Security-Rings-A3*.pdf    downloadable posters
og.png, favicon.*, icon-*.png, apple-touch-icon.png, site.webmanifest
robots.txt, sitemap.xml
vercel.json                   security headers and clean URLs
og.html, render.py, serve.py  asset tooling (not deployed)
```

## Note on accuracy

The mapping of protocols to layers is indicative. Several protocols span layers or sit differently in the TCP/IP model; for example, TLS spans L4–L7, and BGP runs over TCP but is shown at L3 because of its routing role.
