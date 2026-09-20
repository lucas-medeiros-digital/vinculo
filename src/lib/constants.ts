// Placeholder WhatsApp number — replace 598XXXXXXXX with the real Vínculo line.
export const WHATSAPP_NUMBER = '598XXXXXXXX'

export const WHATSAPP_MESSAGE = 'Hola, me gustaría coordinar una reunión con Vínculo'

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE,
)}`

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
  { label: 'Clientes', to: '/#clientes' },
  { label: 'Contacto', to: '/contacto' },
] as const
