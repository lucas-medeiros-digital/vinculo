---
name: vinculo-landing
description: >
  Usar al crear o editar una landing o página de Vínculo (agencia de growth
  marketing en Uruguay) en este repo: sitio principal React o landings
  standalone (landing-ia, landing-marketing, landing-agenda, feria/pymes, etc.).
  Trae el sistema de marca (colores, fuentes, "V"), la plantilla de landing
  "premium near-black", el cableado de WhatsApp + Meta Pixel + Calendly y el
  flujo de publicación por zip en Hostinger. Dispara con: "landing", "página
  nueva", "subdominio", "hacé una landing", "nueva web para...".
---

# Construir una landing de Vínculo

Lee también `CLAUDE.md` en la raíz para el contexto completo del proyecto.

## 1. Marca (tokens — usar siempre)
- Verde `#0C3A30` / oscuro `#072620` · dorado `#C8A45A` (soft `#DCC083`) ·
  esmeralda `#4FBF8C` · crema `#F7F5F0` · texto `#0F1A15`.
- Fuentes: `Fraunces` (serif, títulos) + `Plus Jakarta Sans` (texto) + `JetBrains Mono` (mockups).
  Cargar por Google Fonts en las landings standalone.
- "V" de Vínculo: inline SVG de `src/assets/vinculo-iso.svg`, `fill: var(--accent)`.
  Logos en `public/logos/` (horizontal cream para fondos oscuros).
- Tono: español rioplatense (vos), cercano y profesional. Mostrar trabajo real, sin clichés.

## 2. Dos formatos
- **Sitio principal** (`vinculo.uy`): React + Vite + TS + Tailwind. Secciones en
  `src/components/sections/`, rutas en `src/App.tsx`, constantes en `src/lib/constants.ts`,
  tracking en `src/lib/track.ts`.
- **Landing standalone** (subdominio): un solo `index.html` autocontenido (CSS inline,
  sin build, sin React). Copiar `landing-ia/` o `landing-marketing/` como base: ya traen
  la plantilla, animaciones y tracking. Carpeta nueva `landing-<nombre>/` con `logos/` e `img/`.

## 3. Plantilla de landing standalone (estructura)
Header fijo (logo + CTA) → Hero (eyebrow + título serif con palabra en acento + lead + CTAs +
la "V" como marca de agua) → prueba social (marquee de logos de clientes) → features numeradas
con **mockups en CSS** (chat de WhatsApp, consulta a datos, panel de métricas, navegador, post IG)
→ integraciones/herramientas (pills) → "En números" (stats) → proceso (pasos) → sección "Quién
está detrás" (Lucas Medeiros, Founder & Director, foto B&N) → CTA final con Calendly embebido →
footer. Animaciones sin librerías: entrada del hero escalonada + reveal-on-scroll con
IntersectionObserver (clase `.reveal` → `.in`), respetando `prefers-reduced-motion`.
Para feria/pymes: versión **mobile-first, corta y muy visual**, CTA principal = WhatsApp.

## 4. Cableado obligatorio (copiar de landing-ia)
- **WhatsApp:** `https://wa.me/59893837694?text=...` (urlencoded).
- **Calendly embebido:** widget inline con `data-url=.../30min?...&primary_color=<acento>`.
- **Meta Pixel** `971709422659035` + **GA4** placeholder `G-XXXXXXXXXX` en el `<head>`.
- **Eventos:** click WhatsApp → `fbq('track','Contact')`; Calendly agendado (postMessage
  `calendly.event_scheduled`) → `fbq('track','Schedule')`. En el sitio principal, `src/lib/track.ts`.

## 5. Verificar y publicar
- Verificar con Playwright (`/opt/node22/lib/node_modules/playwright`) sirviendo con
  `python3 -m http.server`. Forzar `.reveal.in` para capturar secciones con animación.
  La red del sandbox bloquea Calendly/Fonts: en capturas salen vacíos/fallback (en Hostinger cargan).
- Entregar **zip** del contenido de la carpeta (`zip -r out.zip . -x '.DS_Store'`), archivos en la
  raíz del zip. Se sube a la carpeta del subdominio en Hostinger y se extrae.
- Commit descriptivo en español; push a la rama. Para que un chat nuevo lo use, mergear a `main`.
