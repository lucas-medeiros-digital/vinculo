import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Bell, TrendingUp, Check } from 'lucide-react'
import { Reveal, StaggerGroup, StaggerItem, AnimatedUnderline, CARD_HOVER } from '../ui/motion'
import { useDiagnosticForm, IMPROVE_IDS } from '../../context/DiagnosticFormContext'

/**
 * "Servicios más solicitados" — a results-first showcase of the top services,
 * each with a device mockup and floating notification cards (social proof).
 * Reuses the form pre-select flow from the CTA.
 */
export function PopularServices() {
  const { selectServiceAndScroll } = useDiagnosticForm()

  return (
    <section className="bg-[#072620] px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:px-12 lg:pb-28 lg:pt-28">
      <div className="mx-auto max-w-[1440px]">
        <Reveal className="max-w-2xl">
          <p className="font-jakarta text-[13px] font-medium uppercase tracking-[0.2em] text-[#C8A45A]">
            Servicios más solicitados
          </p>
          <h2
            className="mt-3 font-fraunces font-medium leading-[1.12] tracking-[-0.02em] text-[#F7F5F0]"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 3.2rem)' }}
          >
            Lo que más nos piden para{' '}
            <AnimatedUnderline>vender más</AnimatedUnderline>.
          </h2>
          <p className="mt-4 max-w-xl font-jakarta text-[15px] leading-relaxed text-[#F7F5F0]/70">
            Tres frentes que mueven la aguja en negocios que ya funcionan. Elegí
            el que más te urge y arrancá el diagnóstico con esa opción ya marcada.
          </p>
        </Reveal>

        <StaggerGroup className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 lg:grid-cols-3">
          <ServiceCard
            title="Web y landing pages"
            desc="Sitios rápidos, claros y pensados para convertir desde el primer día."
            onClick={() => selectServiceAndScroll(IMPROVE_IDS.web)}
            mockup={<WebMockup />}
          />
          <ServiceCard
            title="Publicidad digital"
            desc="Meta y Google Ads con foco en ventas reales, no en likes ni impresiones."
            onClick={() => selectServiceAndScroll(IMPROVE_IDS.publicidad)}
            mockup={<AdsMockup />}
          />
          <ServiceCard
            title="WhatsApp y automatizaciones"
            desc="Flujos que responden al instante y convierten cada consulta en venta."
            onClick={() => selectServiceAndScroll(IMPROVE_IDS.whatsapp)}
            mockup={<WhatsAppMockup />}
          />
        </StaggerGroup>
      </div>
    </section>
  )
}

interface ServiceCardProps {
  title: string
  desc: string
  onClick: () => void
  mockup: ReactNode
}

function ServiceCard({ title, desc, onClick, mockup }: ServiceCardProps) {
  return (
    <StaggerItem
      whileHover={CARD_HOVER}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#F7F5F0]/10 bg-[#0A2E26] p-5 transition-colors duration-300 hover:border-[#C8A45A]/40"
    >
      {/* Mockup stage */}
      <div className="relative mb-6 h-52 overflow-hidden rounded-xl bg-gradient-to-br from-[#0C3A30] to-[#061d18] p-4">
        {mockup}
      </div>

      <h3 className="font-fraunces text-[20px] font-medium text-[#F7F5F0] sm:text-[22px]">
        {title}
      </h3>
      <p className="mt-2 flex-1 font-jakarta text-[14px] leading-relaxed text-[#F7F5F0]/60 sm:text-[15px]">
        {desc}
      </p>

      <button
        type="button"
        onClick={onClick}
        className="mt-5 inline-flex items-center gap-2 self-start font-jakarta text-[14px] font-semibold text-[#C8A45A] transition-colors hover:text-[#DDBB74]"
      >
        Quiero este servicio
        <ArrowRight
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </button>
    </StaggerItem>
  )
}

/** Floating notification chip that gently bobs. */
function FloatingNote({
  icon,
  text,
  className = '',
  delay = 0,
}: {
  icon: ReactNode
  text: string
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={`absolute z-10 flex items-center gap-2 rounded-lg bg-white px-3 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.25)] ${className}`}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#0C3A30]">
        {icon}
      </span>
      <span className="whitespace-nowrap font-jakarta text-[11px] font-semibold text-[#0F1A15]">
        {text}
      </span>
    </motion.div>
  )
}

/** Browser window with an abstract landing page. */
function WebMockup() {
  return (
    <div className="relative h-full">
      <div className="h-full overflow-hidden rounded-lg bg-[#F7F5F0] shadow-lg">
        {/* Browser chrome */}
        <div className="flex items-center gap-1.5 border-b border-black/5 bg-white px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-[#E5544B]" />
          <span className="h-2 w-2 rounded-full bg-[#E5B02B]" />
          <span className="h-2 w-2 rounded-full bg-[#4CAF6E]" />
          <span className="ml-2 h-3 flex-1 rounded-full bg-black/5" />
        </div>
        {/* Fake landing content */}
        <div className="p-3">
          <div className="mb-2 h-2 w-10 rounded bg-[#0C3A30]" />
          <div className="mb-1.5 h-2.5 w-4/5 rounded bg-[#0C3A30]/80" />
          <div className="mb-3 h-2.5 w-3/5 rounded bg-[#0C3A30]/50" />
          <div className="mb-3 h-5 w-20 rounded-full bg-[#C8A45A]" />
          <div className="grid grid-cols-3 gap-1.5">
            <div className="h-8 rounded bg-black/5" />
            <div className="h-8 rounded bg-black/5" />
            <div className="h-8 rounded bg-black/5" />
          </div>
        </div>
      </div>
      <FloatingNote
        icon={<Bell size={12} className="text-[#C8A45A]" />}
        text="Nueva consulta desde tu web"
        className="-bottom-1 -right-1"
      />
    </div>
  )
}

/** Ads dashboard with a rising bar chart. */
function AdsMockup() {
  const bars = [40, 55, 48, 70, 82, 95]
  return (
    <div className="relative h-full">
      <div className="flex h-full flex-col rounded-lg bg-[#F7F5F0] p-3 shadow-lg">
        <div className="mb-2 flex items-center justify-between">
          <div className="h-2 w-14 rounded bg-[#0C3A30]/70" />
          <div className="rounded-full bg-[#0C3A30] px-2 py-0.5 text-[9px] font-bold text-[#C8A45A]">
            ROAS 4.2x
          </div>
        </div>
        <div className="flex flex-1 items-end gap-1.5">
          {bars.map((h, i) => (
            <div
              key={i}
              className={`flex-1 rounded-t ${i === bars.length - 1 ? 'bg-[#C8A45A]' : 'bg-[#0C3A30]/40'}`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
      <FloatingNote
        icon={<TrendingUp size={12} className="text-[#C8A45A]" />}
        text="Conversiones +38%"
        className="-top-1 -right-1"
        delay={0.8}
      />
    </div>
  )
}

/** Phone with a WhatsApp-style chat. */
function WhatsAppMockup() {
  return (
    <div className="relative flex h-full items-center justify-center">
      <div className="h-full w-28 overflow-hidden rounded-[1.25rem] border-4 border-[#04120e] bg-[#0b1f1a] shadow-lg">
        <div className="bg-[#0C3A30] px-2 py-1.5 text-[9px] font-semibold text-[#F7F5F0]">
          Vínculo
        </div>
        <div className="space-y-1.5 p-2">
          <div className="ml-auto w-4/5 rounded-lg rounded-tr-none bg-[#C8A45A] px-2 py-1 text-[8px] text-[#0F1A15]">
            Hola, quiero info 👋
          </div>
          <div className="w-3/4 rounded-lg rounded-tl-none bg-[#F7F5F0] px-2 py-1 text-[8px] text-[#0F1A15]">
            ¡Hola! Te ayudo ahora
          </div>
          <div className="ml-auto w-2/3 rounded-lg rounded-tr-none bg-[#C8A45A] px-2 py-1 text-[8px] text-[#0F1A15]">
            Genial 🙌
          </div>
        </div>
      </div>
      <FloatingNote
        icon={<Check size={12} className="text-[#C8A45A]" />}
        text="Lead calificado"
        className="bottom-2 -left-1"
        delay={1.4}
      />
    </div>
  )
}
