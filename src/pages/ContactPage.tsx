import { useState, type ReactNode, type FormEvent } from 'react'
import { Video, Mail, MessageCircle, MapPin, Linkedin, Instagram, Check, ArrowRight } from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { IsoV3D } from '../components/IsoV3D'
import { Reveal } from '../components/ui/motion'
import { openCalendly, WHATSAPP_URL, FORM_TO_EMAIL } from '../lib/constants'

const inputClasses =
  'w-full rounded-xl border border-[#EBE8DF] bg-white px-4 py-3 font-jakarta text-[14px] transition focus:border-[#0C3A30] focus:outline-none focus:ring-2 focus:ring-[#0C3A30]/10'

export function ContactPage() {
  return (
    <div>
      {/* HEADER */}
      <section className="relative overflow-hidden bg-[#0C3A30]">
        <Navbar />
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-10 px-5 pb-16 pt-10 sm:px-8 sm:pb-20 lg:grid-cols-[1fr_340px] lg:px-12 lg:pb-24 lg:pt-14">
          <Reveal>
            <p className="font-jakarta text-[13px] font-medium uppercase tracking-[0.2em] text-[#C8A45A]">
              Contacto
            </p>
            <h1
              className="mt-3 font-fraunces font-medium leading-[1.08] tracking-[-0.02em] text-[#F7F5F0]"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.8rem)' }}
            >
              ¿No sabés por dónde empezar? Nosotros te ayudamos.
            </h1>
            <p className="mt-5 max-w-xl font-jakarta text-[15px] leading-relaxed text-[#F7F5F0]/70 sm:text-[17px]">
              Agendá una reunión o escribinos un mensaje. Analizamos tu caso y te
              mostramos por dónde empezar — sin compromiso.
            </p>
          </Reveal>

          <div className="flex justify-center lg:justify-end">
            <IsoV3D className="h-60 w-60 sm:h-72 sm:w-72" />
          </div>
        </div>
      </section>

      {/* TWO PATHS */}
      <section className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Book a meeting */}
          <Reveal className="flex flex-col rounded-2xl border border-[#EBE8DF] bg-[#F7F5F0] p-7 sm:p-9">
            <h2 className="font-fraunces text-[24px] font-medium text-[#0F1A15] sm:text-[28px]">
              Agendá una reunión
            </h2>
            <p className="mt-3 font-jakarta text-[15px] leading-relaxed text-gray-700">
              Elegí el horario que mejor te quede y hablemos de tu negocio. Es una
              charla de 30 minutos, sin compromiso.
            </p>
            <div className="mt-6 flex items-center gap-2 rounded-xl bg-white px-4 py-3">
              <Video size={18} className="text-[#0C3A30]" />
              <span className="font-jakarta text-[14px] text-gray-700">
                La reunión es por <strong className="text-[#0F1A15]">Google Meet</strong>
              </span>
            </div>
            <button
              type="button"
              onClick={openCalendly}
              className="mt-6 inline-flex items-center justify-center gap-2 self-start rounded-full bg-[#0C3A30] px-7 py-3.5 font-jakarta text-[15px] font-semibold text-white transition-colors hover:bg-[#0A2E26]"
            >
              Ver disponibilidad
              <ArrowRight size={18} />
            </button>
          </Reveal>

          {/* Message form */}
          <Reveal className="rounded-2xl border border-[#EBE8DF] bg-white p-7 shadow-[0_10px_40px_rgba(12,58,48,0.06)] sm:p-9">
            <h2 className="font-fraunces text-[24px] font-medium text-[#0F1A15] sm:text-[28px]">
              Envianos un mensaje
            </h2>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* CONTACT INFO */}
      <section className="bg-[#072620] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <InfoItem icon={<Mail size={20} className="text-[#C8A45A]" />} title="Email">
            <div className="flex flex-col gap-1">
              <a href="mailto:lucas@vinculo.uy" className="hover:text-[#F7F5F0]">
                lucas@vinculo.uy
              </a>
              <a href="mailto:matias@vinculo.uy" className="hover:text-[#F7F5F0]">
                matias@vinculo.uy
              </a>
            </div>
          </InfoItem>
          <InfoItem icon={<MessageCircle size={20} className="text-[#C8A45A]" />} title="WhatsApp">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-[#F7F5F0]">
              Escribinos ahora
            </a>
          </InfoItem>
          <InfoItem icon={<MapPin size={20} className="text-[#C8A45A]" />} title="Ubicación">
            Montevideo, Uruguay
          </InfoItem>
          <InfoItem icon={<Linkedin size={20} className="text-[#C8A45A]" />} title="Redes">
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/company/vinculo" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-[#F7F5F0]">
                <Linkedin size={18} />
              </a>
              <a href="https://www.instagram.com/vinculo.uy" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-[#F7F5F0]">
                <Instagram size={18} />
              </a>
            </div>
          </InfoItem>
        </div>
      </section>
    </div>
  )
}

function InfoItem({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div>
      <span className="mb-3 grid h-11 w-11 place-items-center rounded-full bg-[#0A2E26]">{icon}</span>
      <h3 className="font-jakarta text-[12px] uppercase tracking-[0.18em] text-[#C8A45A]">{title}</h3>
      <div className="mt-1.5 font-jakarta text-[15px] text-[#F7F5F0]/80">{children}</div>
    </div>
  )
}

function ContactForm() {
  const [sent, setSent] = useState(false)
  const [data, setData] = useState({ nombre: '', email: '', mensaje: '' })
  const valid = data.nombre.trim() !== '' && data.email.trim() !== '' && data.mensaje.trim() !== ''

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!valid) return
    // Interim delivery via the visitor's mail client (no backend yet).
    // TODO(dev): replace with a form service (Netlify Forms / Formspree).
    const subject = `Nuevo mensaje de ${data.nombre} — Vínculo`
    const body = `Nombre: ${data.nombre}\nEmail: ${data.email}\n\nMensaje:\n${data.mensaje}`
    window.location.href = `mailto:${FORM_TO_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  if (sent) {
    return (
      <div className="py-6 text-center">
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-[#0C3A30]">
          <Check size={28} className="text-[#C8A45A]" />
        </div>
        <h3 className="font-fraunces text-[20px] font-medium text-[#0F1A15]">¡Mensaje enviado!</h3>
        <p className="mx-auto mt-2 max-w-xs font-jakarta text-[14px] text-gray-600">
          Te respondemos a la brevedad. Si querés, también podés agendar una
          reunión directamente.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
      <label className="block">
        <span className="mb-1.5 block font-jakarta text-[13px] font-medium text-gray-700">
          Nombre y apellido<span className="text-[#C8A45A]">*</span>
        </span>
        <input
          type="text"
          value={data.nombre}
          onChange={(e) => setData({ ...data, nombre: e.target.value })}
          className={inputClasses}
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block font-jakarta text-[13px] font-medium text-gray-700">
          Email<span className="text-[#C8A45A]">*</span>
        </span>
        <input
          type="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          className={inputClasses}
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block font-jakarta text-[13px] font-medium text-gray-700">
          Mensaje<span className="text-[#C8A45A]">*</span>
        </span>
        <textarea
          rows={4}
          value={data.mensaje}
          onChange={(e) => setData({ ...data, mensaje: e.target.value })}
          className={`${inputClasses} resize-none`}
        />
      </label>
      <button
        type="submit"
        disabled={!valid}
        className="inline-flex items-center justify-center gap-2 self-start rounded-full bg-[#C8A45A] px-6 py-3 font-jakarta text-[14px] font-semibold text-[#0F1A15] transition-colors hover:bg-[#B8942F] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Enviar mensaje
        <ArrowRight size={16} />
      </button>
    </form>
  )
}
