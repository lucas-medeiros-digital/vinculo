# Vínculo — contexto del proyecto

> Léelo primero en cualquier chat nuevo sobre este repo. Resume qué es el proyecto,
> la marca, cómo se publica y qué falta. (El `NOTAS.md` es más viejo y parcial:
> este archivo manda.)

## Qué es
**Vínculo** es una agencia de **growth marketing en Uruguay** (Montevideo). El repo
contiene:
- **Sitio principal** (`vinculo.uy`): app **React + Vite + TypeScript + Tailwind**,
  animaciones con `framer-motion`, hero con shader (librería `shaders`) y una "V" 3D
  (`three.js`). Rutas con `react-router-dom`.
- **Landings standalone** (un solo `index.html` autocontenido cada una, sin build),
  pensadas para subdominios:
  - `landing-ia/` → **ia.vinculo.uy** (acento **dorado**).
  - `landing-marketing/` → **marketing.vinculo.uy** (acento **verde**).
  - `landing-agenda/` → **agenda.vinculo.uy** (acento dorado; opcional, booking directo).
  Las tres comparten estructura "premium near-black" inspirada en AtomLabs, con la "V"
  de Vínculo en el hero.

## Marca (tokens)
- **Verde:** `#0C3A30` · verde oscuro `#072620` · `#0A2E26`
- **Dorado:** `#C8A45A` (soft `#DCC083`)
- **Verde esmeralda (landing marketing):** `#4FBF8C`
- **Crema:** `#F7F5F0` · líneas sobre crema `#EBE8DF` · texto `#0F1A15`
- **Fuentes:** `Fraunces` (serif, títulos) + `Plus Jakarta Sans` (texto). Mono: `JetBrains Mono`.
- **Logo/isotipo:** `public/logos/vinculo-*` (horizontal cream/gold/green, isotipo gold/green).
  La "V" como SVG de un trazo: `src/assets/vinculo-iso.svg` (se puede pintar con `fill: var(--accent)`).
- **Tono:** español rioplatense (vos), cercano pero profesional. **No** copiar referencias ni
  caer en clichés; mostrar trabajo real > "confiá en nosotros".

## Integraciones y datos clave (`src/lib/constants.ts` + heads)
- **WhatsApp:** `59893837694` (wa.me). Mensaje por defecto varía por página.
- **Calendly:** `https://calendly.com/lucas2002medeiros/30min` (reunión 30 min, Google Meet).
- **Meta Pixel:** `971709422659035` (instalado en las 3 landings + sitio principal).
- **GA4:** placeholder `G-XXXXXXXXXX` en todos — **falta el ID real** y reemplazarlo.
- **Emails:** `lucas@vinculo.uy`, `matias@vinculo.uy`.
- **Redes:** instagram.com/vinculo.uy, linkedin.com/company/vinculo.

## Tracking de conversiones (ya implementado)
- Click en WhatsApp → evento Pixel `Contact` + GA `whatsapp_click`.
- Reunión agendada en Calendly → `Schedule` + `reunion_agendada` (escucha el postMessage del widget).
- Formulario de contacto (sitio principal) → `Lead` + redirección a **`/gracias`** (URL medible).
- Helpers en `src/lib/track.ts`; listeners globales en `App.tsx`. Las landings tienen
  el mismo patrón inline antes del `</body>`.
- ⚠️ Los formularios del sitio usan **`mailto:`** (abren el correo del visitante, no envían
  solos). Pendiente: pasar a un servicio real (Web3Forms/Formspree) para que lleguen al inbox.

## Dónde se publica (Hostinger)
El dueño (Lucas, `lucas-medeiros-digital/vinculo`) publica en **Hostinger** subiendo archivos
por el Administrador de archivos (no hay CI de deploy automático confiable; se entrega por **zip**).
- **Sitio principal:** `npm run build` → carpeta `dist/` → zip → extraer en `public_html`.
  ⚠️ Al actualizar, **no borrar** las carpetas de los subdominios (`ia/`, `marketing/`, `agenda/`).
- **Landings:** cada carpeta `landing-*` → zip de su contenido → subir a la carpeta del subdominio
  (creado en hPanel → Subdominios con "Custom folder" = `ia` / `marketing` / `agenda`).
  Alternativa sin DNS: subcarpetas de `public_html` (`vinculo.uy/ia`), funcionan porque el
  `.htaccess` del SPA no reescribe carpetas/archivos que existen.
- El `.htaccess` (SPA fallback + gzip + cache) está en `public/.htaccess` → va al build.

## Cómo trabajar en este repo
- **Rama:** desarrollar en la rama asignada, commits descriptivos en español, push a esa rama.
  Para que un chat nuevo vea todo esto, **mergear a `main`** (ver abajo).
- **Verificar visualmente:** levantar con `npm run dev` (o `vite preview` para el build) y sacar
  capturas con Playwright (`/opt/node22/lib/node_modules/playwright`), sirviendo las landings con
  `python3 -m http.server`. Para ver secciones con reveal, forzar `.reveal.in` o scrollear.
- ⚠️ **La red del sandbox bloquea hosts externos** (Calendly, Google Fonts, sitios de referencia):
  en las capturas el calendario sale vacío y las fuentes caen a fallback. En el hosting real cargan.
  Por eso, para referencias visuales, pedir al usuario una **grabación de pantalla / capturas**.
- Entregables: capturas + **zips** listos para subir a Hostinger.

## Qué falta / roadmap
1. **GA4 ID real** (reemplazar `G-XXXXXXXXXX` en las 4 páginas).
2. **Formulario real** (Web3Forms/Formspree) para que los mensajes lleguen al inbox.
3. **Rediseño del sitio principal**: más visual, menos texto, scroll-interactivo (referencias que
   le gustan: planner.uy, AtomLabs). Mostrar **trabajo real / casos** (lo más importante, ver NOTAS.md).
4. **Landing para feria/pymes** (QR en tarjeta): mobile-first, muy visual, CTA = WhatsApp.
5. Pruebas reales: capturas de webs, campañas, resultados; logos de clientes reales; stats reales
   (hoy hay estimados: +7 negocios, 4.2x ROAS, etc. — confirmar/ajustar con datos reales).

## Sección "Quién está detrás"
Lucas Medeiros — Founder & Director. Foto en `public/img/lucas.jpg` (B&N por CSS). Componente
`src/components/sections/FounderSection.tsx` en la home; versión HTML en las landings ia/marketing.
