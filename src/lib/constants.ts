// Placeholder WhatsApp number — replace 598XXXXXXXX with the real Vínculo line.
export const WHATSAPP_NUMBER = '598XXXXXXXX'

export const WHATSAPP_MESSAGE = 'Hola, me gustaría solicitar un diagnóstico'

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE,
)}`

// Standard hover easing used across the whole site.
export const EASE = 'ease-[cubic-bezier(0.25,0.1,0.25,1)]'

export const NAV_LINKS = [
  { label: 'Método', href: '#metodo' },
  { label: 'Soluciones', href: '#soluciones' },
  { label: 'Clientes', href: '#clientes' },
  { label: 'Contacto', href: '#contacto' },
] as const
