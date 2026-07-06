import { MessageCircle } from 'lucide-react'
import { WHATSAPP_URL } from '../lib/constants'

export function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_8px_24px_rgba(37,211,102,0.4)] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:scale-105"
    >
      <MessageCircle size={24} className="text-white" />
    </a>
  )
}
