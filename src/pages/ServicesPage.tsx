import { type ReactNode } from 'react'
import {
  Megaphone,
  Globe,
  ShoppingBag,
  Palette,
  MessageCircle,
  Check,
  ArrowRight,
  Search,
  PenTool,
  Rocket,
  LineChart,
  type LucideIcon,
} from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { TiltLogo } from '../components/Logo3D'
import { Reveal, StaggerGroup, StaggerItem } from '../components/ui/motion'
import { useDiagnosticForm, IMPROVE_IDS } from '../context/DiagnosticFormContext'
import { openCalendly } from '../lib/constants'

interface Service {
  icon: LucideIcon
  serviceId: string
  name: string
  tagline: string
  description: string
  bullets: string[]
  visual: ReactNode
}

const SERVICES: Service[] = [
  {
    icon: Megaphone,
    serviceId: IMPROVE_IDS.publicidad,
    name: 'Publicidad digital',
    tagline: 'Campañas que convierten',
    description:
      'Diseñamos y gestionamos campañas de Meta Ads, Google Ads y Mercado Ads con foco en ventas reales. Optimizamos semana a semana para bajar el costo por cliente y escalar lo que funciona.',
    bullets: [
      'Meta Ads (Facebook + Instagram)',
      'Google Ads (Search, Display, YouTube)',
      'Mercado Ads y remarketing',
      'Optimización semanal y reportes claros',
      'Enfoque en conversión y ROAS',
    ],
    visual: <AdsVisual />,
  },
  {
    icon: Globe,
    serviceId: IMPROVE_IDS.web,
    name: 'Web y landing pages',
    tagline: 'Tu vendedor digital 24/7',
    description:
      'Sitios rápidos, claros y pensados para convertir. Diseñados a la medida de tu marca y optimizados para captar clientes desde el primer día.',
    bullets: [
      'Diseño personalizado alineado a tu identidad',
      'Optimización de velocidad y SEO básico',
      'Integración con WhatsApp y formularios',
      'Landing pages para campañas específicas',
      'Hosting y dominio incluidos',
    ],
    visual: <WebVisual />,
  },
  {
    icon: ShoppingBag,
    serviceId: IMPROVE_IDS.mercadolibre,
    name: 'Tiendas Mercado Libre',
    tagline: 'Donde la gente ya está comprando',
    description:
      'Montamos y optimizamos tu tienda en el marketplace más grande del país para que vendas más, con mejor presencia y menos fricción.',
    bullets: [
      'Setup completo de tienda oficial',
      'Diseño de banners y branding visual',
      'Estructura de categorías y publicaciones',
      'Gestión de Mercado Ads',
      'Optimización de reputación y posicionamiento',
    ],
    visual: <StoreVisual />,
  },
  {
    icon: Palette,
    serviceId: IMPROVE_IDS.contenido,
    name: 'Contenido y creatividades',
    tagline: 'Storytelling que conecta',
    description:
      'Contenido pensado estratégicamente para tu audiencia. Piezas que comunican valor, refuerzan tu marca y generan acción.',
    bullets: [
      'Piezas para redes sociales',
      'Reels y video corto',
      'Creatividades para campañas',
      'Fotografía de producto (según proyecto)',
      'Copywriting alineado a tu voz de marca',
    ],
    visual: <ContentVisual />,
  },
  {
    icon: MessageCircle,
    serviceId: IMPROVE_IDS.whatsapp,
    name: 'WhatsApp y automatizaciones',
    tagline: 'Convertí conversaciones en ventas',
    description:
      'Configuramos flujos de WhatsApp para que ningún mensaje quede sin respuesta y cada consulta avance hacia una venta.',
    bullets: [
      'Click-to-WhatsApp desde campañas',
      'Mensajes automáticos de bienvenida',
      'Respuestas rápidas configuradas',
      'Integración con formularios web',
      'Flujos de calificación de leads',
    ],
    visual: <ChatVisual />,
  },
]

const PROCESS = [
  { icon: Search, title: 'Diagnóstico', desc: 'Auditamos tu operación digital y detectamos oportunidades.' },
  { icon: PenTool, title: 'Estrategia', desc: 'Diseñamos un plan a medida de tu negocio y tu momento.' },
  { icon: Rocket, title: 'Ejecución', desc: 'Lanzamos campañas, web y flujos — con vos, paso a paso.' },
  { icon: LineChart, title: 'Optimización', desc: 'Medimos, iteramos y escalamos lo que genera resultados.' },
]

export function ServicesPage() {
  return (
    <div>
      {/* HEADER */}
      <section className="relative overflow-hidden bg-[#0C3A30]">
        <Navbar />
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-10 px-5 pb-16 pt-10 sm:px-8 sm:pb-20 lg:grid-cols-[1fr_360px] lg:px-12 lg:pb-24 lg:pt-14">
          <Reveal>
            <p className="font-jakarta text-[13px] font-medium uppercase tracking-[0.2em] text-[#C8A45A]">
              Nuestros servicios
            </p>
            <h1
              className="mt-3 font-fraunces font-medium leading-[1.08] tracking-[-0.02em] text-[#F7F5F0]"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.8rem)' }}
            >
              Todo lo que tu negocio necesita para escalar.
            </h1>
            <p className="mt-5 max-w-xl font-jakarta text-[15px] leading-relaxed text-[#F7F5F0]/70 sm:text-[17px]">
              Cada servicio se diseña a la medida de tu empresa y se ejecuta bajo
              una misma dirección estratégica. Sin recetas genéricas: soluciones
              pensadas para llevar lo que ya funciona al próximo nivel.
            </p>
          </Reveal>

          <div className="flex justify-center lg:justify-end">
            <TiltLogo className="h-56 w-56 sm:h-64 sm:w-64" />
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-16 sm:gap-24">
          {SERVICES.map((service, i) => (
            <ServiceRow key={service.name} service={service} flip={i % 2 === 1} />
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-[#F7F5F0] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="font-jakarta text-[13px] font-medium uppercase tracking-[0.2em] text-[#C8A45A]">
              Cómo trabajamos
            </p>
            <h2
              className="mt-3 font-fraunces font-medium leading-[1.12] tracking-[-0.02em] text-[#0F1A15]"
              style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}
            >
              Un proceso claro, de principio a fin.
            </h2>
          </Reveal>
          <StaggerGroup className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((step, i) => (
              <StaggerItem
                key={step.title}
                className="rounded-2xl border border-[#EBE8DF] bg-white p-6"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-[#0C3A30]">
                    <step.icon size={20} className="text-[#C8A45A]" />
                  </span>
                  <span className="font-fraunces text-[28px] font-medium text-[#C8A45A]">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mb-2 mt-4 font-fraunces text-[19px] font-medium text-[#0F1A15]">
                  {step.title}
                </h3>
                <p className="font-jakarta text-[14px] leading-relaxed text-gray-600">
                  {step.desc}
                </p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#072620] px-5 py-20 text-center sm:px-8 lg:px-12 lg:py-28">
        <Reveal className="mx-auto max-w-2xl">
          <h2
            className="font-fraunces font-medium leading-[1.1] text-[#F7F5F0]"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)' }}
          >
            ¿Listo para escalar tu negocio?
          </h2>
          <p className="mx-auto mt-5 max-w-md font-jakarta text-[15px] leading-relaxed text-[#F7F5F0]/70 sm:text-[17px]">
            Agendá una llamada con nosotros. Analizamos tu caso y te mostramos
            por dónde empezar — sin compromiso.
          </p>
          <button
            type="button"
            onClick={openCalendly}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#C8A45A] px-7 py-3.5 font-jakarta text-[15px] font-semibold text-[#0F1A15] transition-colors hover:bg-[#B8942F]"
          >
            Agendá una llamada
            <ArrowRight size={18} />
          </button>
        </Reveal>
      </section>
    </div>
  )
}

function ServiceRow({ service, flip }: { service: Service; flip: boolean }) {
  const { selectServiceAndScroll } = useDiagnosticForm()
  const Icon = service.icon
  return (
    <Reveal>
      <div
        className={`grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
          flip ? 'lg:[&>*:first-child]:order-2' : ''
        }`}
      >
        {/* Text */}
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#0C3A30]">
              <Icon size={22} className="text-[#C8A45A]" />
            </span>
            <span className="font-jakarta text-[12px] font-semibold uppercase tracking-[0.18em] text-[#C8A45A]">
              {service.tagline}
            </span>
          </div>
          <h2 className="mb-4 mt-5 font-fraunces text-[26px] font-medium text-[#0F1A15] sm:text-[32px]">
            {service.name}
          </h2>
          <p className="mb-6 max-w-xl font-jakarta text-[15px] leading-relaxed text-gray-700">
            {service.description}
          </p>
          <ul className="flex flex-col gap-3">
            {service.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <Check size={18} className="mt-0.5 shrink-0 text-[#0C3A30]" />
                <span className="font-jakarta text-[14px] text-gray-800 sm:text-[15px]">{b}</span>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => selectServiceAndScroll(service.serviceId)}
            className="group mt-7 inline-flex items-center gap-2 rounded-full bg-[#0C3A30] px-6 py-3 font-jakarta text-[14px] font-semibold text-white transition-colors hover:bg-[#0A2E26]"
          >
            Quiero este servicio
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Visual */}
        <div className="flex justify-center">{service.visual}</div>
      </div>
    </Reveal>
  )
}

/* ---------- Service visuals (original, brand-styled) ---------- */

function VisualShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative aspect-[4/3] w-full max-w-md overflow-hidden rounded-2xl border border-[#EBE8DF] bg-gradient-to-br from-[#0C3A30] to-[#061d18] p-6 shadow-[0_20px_50px_rgba(12,58,48,0.18)]">
      {children}
    </div>
  )
}

function Chip({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`absolute flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 font-jakarta text-[11px] font-semibold text-[#0F1A15] shadow-[0_8px_24px_rgba(0,0,0,0.25)] ${className}`}
    >
      {children}
    </div>
  )
}

function AdsVisual() {
  const bars = [45, 60, 52, 74, 88, 100]
  return (
    <VisualShell>
      <div className="flex h-full flex-col rounded-xl bg-[#F7F5F0] p-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="h-2.5 w-20 rounded bg-[#0C3A30]/60" />
          <div className="rounded-full bg-[#0C3A30] px-2.5 py-1 text-[10px] font-bold text-[#C8A45A]">
            ROAS 4.2x
          </div>
        </div>
        <div className="flex flex-1 items-end gap-2">
          {bars.map((h, i) => (
            <div
              key={i}
              className={`flex-1 rounded-t ${i === bars.length - 1 ? 'bg-[#C8A45A]' : 'bg-[#0C3A30]/35'}`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
      <Chip className="-right-2 top-6">📈 +38% conversiones</Chip>
    </VisualShell>
  )
}

function WebVisual() {
  return (
    <VisualShell>
      <div className="h-full overflow-hidden rounded-xl bg-white">
        <div className="flex items-center gap-1.5 border-b border-black/5 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-[#E5544B]" />
          <span className="h-2 w-2 rounded-full bg-[#E5B02B]" />
          <span className="h-2 w-2 rounded-full bg-[#4CAF6E]" />
        </div>
        <div className="p-4">
          <div className="mb-2 h-2 w-12 rounded bg-[#0C3A30]" />
          <div className="mb-1.5 h-3 w-4/5 rounded bg-[#0C3A30]/80" />
          <div className="mb-4 h-3 w-3/5 rounded bg-[#0C3A30]/50" />
          <div className="mb-4 h-6 w-24 rounded-full bg-[#C8A45A]" />
          <div className="grid grid-cols-3 gap-2">
            <div className="h-10 rounded bg-black/5" />
            <div className="h-10 rounded bg-black/5" />
            <div className="h-10 rounded bg-black/5" />
          </div>
        </div>
      </div>
      <Chip className="-left-2 bottom-6">🔔 Nueva consulta</Chip>
    </VisualShell>
  )
}

function StoreVisual() {
  return (
    <VisualShell>
      <div className="grid h-full grid-cols-2 gap-3">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col rounded-xl bg-[#F7F5F0] p-2.5">
            <div className="mb-2 flex-1 rounded-lg bg-[#0C3A30]/10" />
            <div className="mb-1 h-2 w-3/4 rounded bg-[#0C3A30]/50" />
            <div className="h-3 w-10 rounded bg-[#C8A45A]" />
          </div>
        ))}
      </div>
      <Chip className="-right-2 top-5">🛒 Venta registrada</Chip>
    </VisualShell>
  )
}

function ContentVisual() {
  return (
    <VisualShell>
      <div className="grid h-full grid-cols-3 gap-2.5">
        <div className="col-span-2 row-span-2 rounded-xl bg-gradient-to-br from-[#C8A45A]/80 to-[#C8A45A]/30" />
        <div className="rounded-xl bg-[#F7F5F0]/90" />
        <div className="rounded-xl bg-[#F7F5F0]/60" />
        <div className="rounded-xl bg-[#F7F5F0]/80" />
        <div className="rounded-xl bg-[#F7F5F0]/40" />
      </div>
      <Chip className="-left-2 bottom-5">🎨 +2.4k alcance</Chip>
    </VisualShell>
  )
}

function ChatVisual() {
  return (
    <VisualShell>
      <div className="mx-auto flex h-full w-40 flex-col overflow-hidden rounded-[1.5rem] border-4 border-[#04120e] bg-[#0b1f1a]">
        <div className="bg-[#0C3A30] px-3 py-2 text-[11px] font-semibold text-[#F7F5F0]">Vínculo</div>
        <div className="space-y-2 p-3">
          <div className="ml-auto w-4/5 rounded-lg rounded-tr-none bg-[#C8A45A] px-2 py-1.5 text-[10px] text-[#0F1A15]">
            Hola, quiero info 👋
          </div>
          <div className="w-3/4 rounded-lg rounded-tl-none bg-[#F7F5F0] px-2 py-1.5 text-[10px] text-[#0F1A15]">
            ¡Hola! Te ayudo ahora
          </div>
          <div className="ml-auto w-2/3 rounded-lg rounded-tr-none bg-[#C8A45A] px-2 py-1.5 text-[10px] text-[#0F1A15]">
            Genial 🙌
          </div>
        </div>
      </div>
      <Chip className="-right-2 bottom-6">💬 Lead calificado</Chip>
    </VisualShell>
  )
}
