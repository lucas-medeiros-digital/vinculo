import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Megaphone,
  Globe,
  ShoppingBag,
  Palette,
  MessageCircle,
  Check,
  ChevronDown,
  type LucideIcon,
} from 'lucide-react'
import { Reveal, AnimatedUnderline } from '../ui/motion'
import { HoverRollButton } from '../ui/HoverRollButton'
import { useDiagnosticForm, IMPROVE_IDS } from '../../context/DiagnosticFormContext'

interface Solution {
  icon: LucideIcon
  label: string
  serviceId: string
  pretitle: string
  title: string
  desc: string
  bullets: string[]
}

const SOLUTIONS: Solution[] = [
  {
    icon: Megaphone,
    label: 'Publicidad digital',
    serviceId: IMPROVE_IDS.publicidad,
    pretitle: 'CAMPAÑAS QUE CONVIERTEN',
    title: 'Publicidad digital',
    desc: 'Diseñamos y gestionamos campañas de Meta Ads, Google Ads y Mercado Ads con foco en resultados reales — no en likes ni impresiones.',
    bullets: [
      'Meta Ads (Facebook + Instagram)',
      'Google Ads (Search, Display, YouTube)',
      'Mercado Ads',
      'Optimización semanal',
      'Enfoque en conversión y ROAS',
    ],
  },
  {
    icon: Globe,
    label: 'Web y landing pages',
    serviceId: IMPROVE_IDS.web,
    pretitle: 'TU VENDEDOR DIGITAL 24/7',
    title: 'Web y landing pages',
    desc: 'Sitios rápidos, claros y pensados para convertir. Diseñados para tu marca y optimizados para captar clientes desde el primer día.',
    bullets: [
      'Diseño personalizado alineado a tu identidad',
      'Optimización para velocidad y SEO básico',
      'Integración con WhatsApp y formularios',
      'Landing pages para campañas específicas',
      'Hosting y dominio incluidos',
    ],
  },
  {
    icon: ShoppingBag,
    label: 'Tiendas Mercado Libre',
    serviceId: IMPROVE_IDS.mercadolibre,
    pretitle: 'DONDE LA GENTE YA ESTÁ COMPRANDO',
    title: 'Tiendas Mercado Libre',
    desc: 'Montamos y optimizamos tu tienda en el marketplace más grande del país para que vendas más, con mejor presencia y menos fricción.',
    bullets: [
      'Setup completo de tienda oficial',
      'Diseño de banners y branding visual',
      'Estructura de categorías y publicaciones',
      'Gestión de Mercado Ads',
      'Optimización de reputación y posicionamiento',
    ],
  },
  {
    icon: Palette,
    label: 'Contenido y creatividades',
    serviceId: IMPROVE_IDS.contenido,
    pretitle: 'STORYTELLING QUE CONECTA',
    title: 'Contenido y creatividades',
    desc: 'Contenido pensado estratégicamente para tu audiencia. Piezas que comunican valor, refuerzan tu marca y generan acción.',
    bullets: [
      'Piezas para redes sociales',
      'Reels y video corto',
      'Creatividades para campañas',
      'Fotografía de producto (según proyecto)',
      'Copywriting alineado a tu voz de marca',
    ],
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp y automatizaciones',
    serviceId: IMPROVE_IDS.whatsapp,
    pretitle: 'CONVERTÍ CONVERSACIONES EN VENTAS',
    title: 'WhatsApp y automatizaciones',
    desc: 'Configuramos flujos de WhatsApp para que ningún mensaje quede sin respuesta y cada consulta avance hacia una venta.',
    bullets: [
      'Click-to-WhatsApp desde campañas',
      'Mensajes automáticos de bienvenida',
      'Respuestas rápidas configuradas',
      'Integración con formularios web',
      'Flujos de calificación de leads',
    ],
  },
]

export function OurSolutions() {
  const [active, setActive] = useState(0)
  const activeSolution = SOLUTIONS[active] ?? SOLUTIONS[0]

  return (
    <section
      id="soluciones"
      className="bg-[#F7F5F0] px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:px-12 lg:pb-28 lg:pt-28"
    >
      <div className="mx-auto max-w-[1440px]">
        <Reveal className="max-w-2xl">
          <p className="font-inter text-[13px] font-medium uppercase tracking-[0.2em] text-[#C8A45A]">
            Nuestras soluciones
          </p>
          <h2
            className="mt-3 font-fraunces font-medium leading-[1.12] tracking-[-0.02em] text-[#0F1A15]"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 3.2rem)' }}
          >
            Potenciamos tu negocio con
            <br />
            <AnimatedUnderline>estrategia y ejecución</AnimatedUnderline>.
          </h2>
          <p className="mt-4 max-w-2xl font-inter text-[15px] leading-relaxed text-gray-600">
            Diseñamos, ejecutamos y optimizamos cada canal digital para que tu
            marca crezca de forma sostenible.
          </p>
        </Reveal>

        {/* DESKTOP — vertical tabs + content panel */}
        <Reveal className="mt-12 hidden gap-8 sm:mt-16 lg:grid lg:grid-cols-[320px_1fr]">
          <div className="flex flex-col gap-3">
            {SOLUTIONS.map((solution, i) => (
              <TabButton
                key={solution.title}
                solution={solution}
                active={i === active}
                onClick={() => setActive(i)}
              />
            ))}
          </div>

          <div className="rounded-2xl border border-[#EBE8DF] bg-white p-8 sm:p-10 lg:min-h-[440px]">
            <motion.div
              key={activeSolution.title}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <PanelContent solution={activeSolution} />
            </motion.div>
          </div>
        </Reveal>

        {/* MOBILE / TABLET — accordion */}
        <div className="mt-12 flex flex-col gap-3 lg:hidden">
          {SOLUTIONS.map((solution, i) => (
            <div key={solution.title}>
              <TabButton
                solution={solution}
                active={i === active}
                expandable
                onClick={() => setActive(active === i ? -1 : i)}
              />
              <AnimatePresence initial={false}>
                {i === active && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-2 rounded-xl border border-[#EBE8DF] bg-white p-6">
                      <PanelContent solution={solution} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

interface TabButtonProps {
  solution: Solution
  active: boolean
  expandable?: boolean
  onClick: () => void
}

function TabButton({ solution, active, expandable, onClick }: TabButtonProps) {
  const Icon = solution.icon
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-xl border px-5 py-4 text-left transition-all duration-300 ${
        active
          ? 'border-[#153B2E] bg-[#153B2E] text-white'
          : 'border-[#EBE8DF] bg-white hover:border-[#C8A45A]'
      }`}
    >
      <span
        className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${
          active ? 'bg-[#C8A45A]/20' : 'bg-[#F7F5F0]'
        }`}
      >
        <Icon size={18} className={active ? 'text-[#C8A45A]' : 'text-[#153B2E]'} />
      </span>
      <span className="font-inter text-[14px] font-medium sm:text-[15px]">
        {solution.label}
      </span>
      {expandable && (
        <ChevronDown
          size={18}
          className={`ml-auto shrink-0 transition-transform duration-300 ${
            active ? 'rotate-180' : ''
          }`}
        />
      )}
    </button>
  )
}

function PanelContent({ solution }: { solution: Solution }) {
  const { selectServiceAndScroll } = useDiagnosticForm()
  return (
    <>
      <p className="font-inter text-[12px] font-medium uppercase tracking-[0.18em] text-[#C8A45A]">
        {solution.pretitle}
      </p>
      <h3
        className="mb-4 mt-2 font-fraunces font-medium text-[#0F1A15]"
        style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}
      >
        {solution.title}
      </h3>
      <p className="mb-6 max-w-xl font-inter text-[15px] leading-relaxed text-gray-700">
        {solution.desc}
      </p>
      <div className="my-6 h-px bg-[#EBE8DF]" />
      <ul className="flex flex-col gap-3">
        {solution.bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-3">
            <Check size={18} className="mt-0.5 shrink-0 text-[#153B2E]" />
            <span className="font-inter text-[14px] text-gray-800 sm:text-[15px]">
              {bullet}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <HoverRollButton
          text="Quiero este servicio"
          onClick={() => selectServiceAndScroll(solution.serviceId)}
          className="bg-[#C8A45A] py-2.5 pl-5 text-[#0F1A15] hover:bg-[#B8942F]"
          textClassName="text-[13px] sm:text-[14px]"
          circleClassName="w-8 h-8 bg-[#F7F5F0]"
          arrowClassName="w-4 h-4 text-[#0F1A15]"
        />
      </div>
    </>
  )
}
