import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Check, ArrowRight, MessageCircle } from 'lucide-react'
import { trackLead } from '../lib/track'
import { WHATSAPP_URL } from '../lib/constants'

/** Thank-you page shown after the contact form — a measurable conversion URL. */
export function GraciasPage() {
  useEffect(() => {
    trackLead()
  }, [])

  return (
    <section className="flex min-h-[72vh] items-center justify-center bg-[#0C3A30] px-5 py-24 text-center">
      <div className="mx-auto max-w-xl">
        <div className="mx-auto mb-7 grid h-16 w-16 place-items-center rounded-full bg-[#C8A45A]">
          <Check size={32} className="text-[#0F1A15]" />
        </div>
        <h1
          className="font-fraunces font-medium leading-[1.1] tracking-[-0.02em] text-[#F7F5F0]"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}
        >
          ¡Gracias por escribirnos!
        </h1>
        <p className="mx-auto mt-5 max-w-md font-jakarta text-[16px] leading-relaxed text-[#F7F5F0]/70">
          Recibimos tu mensaje y te respondemos a la brevedad. Si querés, podés
          adelantarte y escribirnos por WhatsApp ahora mismo.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C8A45A] px-7 py-3.5 font-jakarta text-[15px] font-semibold text-[#0F1A15] transition-colors hover:bg-[#B8942F]"
          >
            <MessageCircle size={18} />
            Escribinos por WhatsApp
          </a>
          <Link
            to="/"
            className="group inline-flex items-center gap-2 font-jakarta text-[15px] font-semibold text-[#F7F5F0]"
          >
            Volver al inicio
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
