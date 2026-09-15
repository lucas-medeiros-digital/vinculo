# Notas del proyecto Vínculo

Contexto y decisiones para retomar el trabajo en chats futuros. Cualquier sesión nueva sobre este repo debería leer este archivo primero.

## Estado actual
- Publicación: la página ya está online en Netlify. La cuenta/deploy los maneja Lucas (dueño del repo lucas-medeiros-digital/vinculo), que conectó el repo a Netlify. Cada cambio que llega a la rama principal se publica solo.
- Stack: React + Vite + TypeScript + Tailwind. Animaciones con framer-motion. Hero con fondo animado por shader (librería shaders).
- Tracking pendiente: en index.html los IDs de Google Analytics (GA_MEASUREMENT_ID) y Meta Pixel (META_PIXEL_ID) son placeholders, no miden nada todavía.

## Secciones que ya tiene la página
Hero, Problemas ("¿Te suena familiar?"), Quiénes somos, Por qué elegirnos, Nuestro método, Soluciones (pestañas), Clientes (logos en placeholder), CTA final con formulario de diagnóstico.

## El norte (lo más importante)
La página hoy afirma pero no demuestra: dice "somos tu socio", "resultados medibles", etc., pero no muestra ninguna prueba. El objetivo de la próxima etapa es demostrar el trabajo real hecho con clientes para bajar la desconfianza. No copiar ninguna referencia ni caer en clichés: el concepto es pasar de "confiá en nosotros" a "mirá lo que hicimos". Al mostrar trabajo real, además, se resuelve la falta de imágenes (peso visual con sentido, no fotos de stock de relleno).

Lo grueso que falta:
1. Prueba de trabajos reales (lo más importante).
2. Declaraciones concretas de cómo se trabaja con el cliente (el proceso real).
3. Peso visual, que llega como consecuencia de mostrar lo anterior.

## Ideas evaluadas (referencia mirada: easydigitalagency.com, NO para copiar)
- Mockups de dispositivos (notebook/celular) mostrando trabajo real. El marco del dispositivo es puro código; la pantalla de adentro necesita capturas reales (mientras tanto se puede rellenar con la propia web de Vínculo o un ejemplo).
- Grilla de logos de clientes reales (ya existe el hueco en la sección Clientes).
- Sección de "Casos / Trabajos" con capturas de webs y campañas.
- Capturas de resultados (ej. chats de WhatsApp, difuminando datos).
- Palabra rotativa en el título del hero (puro código).
- Logos de plataformas (Meta, Google, Mercado Libre).
Descartado por no encajar: webinar, series de videos a cámara, copiar el orden/estilo exacto de la referencia.

## Plan por tandas
- Tanda 1 (sin conseguir material): palabra rotativa en el hero, logos de plataformas, mockups armados (marco + relleno con la web de Vínculo o ejemplo), estructura de "Casos" y "Logos de clientes" con placeholders prolijos.
- Tanda 2 (con material real): reemplazar las pantallas de los mockups por trabajos reales, sumar logos de clientes reales y capturas de resultados.

## Forma de trabajo
Se trabaja con Claude corriendo localmente (en la compu), que edita y sube con las credenciales de Matías (colaborador con permiso de push). Abrir la terminal, cd a la carpeta del repo, y ejecutar claude.
