// WhatsApp line (+598 95 026329, digits only for wa.me).
export const WHATSAPP_NUMBER = '59895026329'

export const WHATSAPP_MESSAGE = 'Hola, me gustaría coordinar una reunión con Vínculo'

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE,
)}`

// Contact emails shown across the site.
export const CONTACT_EMAILS = ['lucas@vinculo.uy', 'matias@vinculo.uy'] as const

// Where form submissions are delivered.
export const FORM_TO_EMAIL = 'lucas@vinculo.uy'

// Calendly booking link.
export const CALENDLY_URL = 'https://calendly.com/lucas2002medeiros/30min'

/** Opens Calendly as a popup widget (loaded in index.html); falls back to a new tab. */
export function openCalendly() {
  const w = window as unknown as {
    Calendly?: { initPopupWidget: (opts: { url: string }) => void }
  }
  if (w.Calendly?.initPopupWidget) {
    w.Calendly.initPopupWidget({ url: CALENDLY_URL })
  } else {
    window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer')
  }
}

// Standard hover easing used across the whole site.
export const EASE = 'ease-[cubic-bezier(0.25,0.1,0.25,1)]'

// `to` is a react-router path; may include a hash for home-section anchors.
export const NAV_LINKS = [
  { label: 'Servicios', to: '/servicios' },
  { label: 'Nosotros', to: '/quienes-somos' },
  { label: 'Clientes', to: '/#clientes' },
  { label: 'Contacto', to: '/contacto' },
] as const
