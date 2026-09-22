import { TrendingUp, Eye, Users, BarChart3, ArrowRight, type LucideIcon } from 'lucide-react'
import { ToolsStrip } from '../components/ToolsStrip'
import { Reveal, StaggerGroup, StaggerItem, AnimatedUnderline } from '../components/ui/motion'
import { openCalendly } from '../lib/constants'

interface Value {
  icon: LucideIcon
  title: string
  body: string
}

const VALUES: Value[] = [
  {
    icon: TrendingUp,
    title: 'Resultados primero',
    body: 'Nos medimos por ventas y crecimiento real, no por métricas de vanidad.',
  },
  {
    icon: Eye,
    title: 'Transparencia',
    body: 'Reportes claros y comunicación directa. Siempre sabés qué hacemos y por qué.',
  },
  {
    icon: Users,
    title: 'Cercanía',
    body: 'Trabajamos como parte de tu equipo, involucrados en cada decisión.',
  },
  {
    icon: BarChart3,
    title: 'Datos y tecnología',
    body: 'Decisiones fundamentadas, con las mejores herramientas del mercado.',
  },
]

export function AboutPage() {
  return (
    <div>
      {/* HEADER */}
      <section className="relative overflow-hidden bg-[#0C3A30] px-5 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-32 lg:px-12 lg:pb-24">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="font-jakarta text-[13px] font-medium uppercase tracking-[0.2em] text-[#C8A45A]">
              Quiénes somos
            </p>
            <h1
              className="mt-3 font-fraunces font-medium leading-[1.1] tracking-[-0.02em] text-[#F7F5F0]"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.8rem)' }}
            >
              Más que una agencia: un equipo obsesionado con tus resultados.
            </h1>
            <p className="mx-auto mt-6 max-w-xl font-jakarta text-[15px] leading-relaxed text-[#F7F5F0]/70 sm:text-[17px]">
              En Vínculo no vendemos acciones sueltas. Nos integramos a tu negocio
              como un socio estratégico de largo plazo para profesionalizar lo
              digital y escalar lo que ya funciona.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SOBRE VÍNCULO */}
      <section className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2
              className="font-fraunces font-medium leading-[1.12] tracking-[-0.02em] text-[#0F1A15]"
              style={{ fontSize: 'clamp(1.6rem, 4vw, 2.8rem)' }}
            >
              El <AnimatedUnderline>vínculo</AnimatedUnderline> es nuestro método.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-col gap-4 font-jakarta text-[15px] leading-[1.7] text-gray-700 sm:text-[16px]">
              <p>
                Antes de proponer una sola acción, nos tomamos el tiempo de
                entender tu negocio de verdad: cómo vendés, quiénes son tus
                clientes y a dónde querés llegar.
              </p>
              <p>
                La palabra que nos da el nombre también describe cómo trabajamos:
                creamos un vínculo real entre estrategia, tecnología y ejecución —
                y entre tu negocio y el nuestro. De esa relación cercana nacen
                decisiones claras y resultados medibles.
              </p>
              <p>
                Somos un equipo chico, flexible y cercano, con la mirada
                estratégica de una gran consultora y la agilidad que tu negocio
                necesita para crecer.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-[#F7F5F0] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="font-jakarta text-[13px] font-medium uppercase tracking-[0.2em] text-[#C8A45A]">
              Nuestros valores
            </p>
            <h2
              className="mt-3 font-fraunces font-medium leading-[1.12] tracking-[-0.02em] text-[#0F1A15]"
              style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}
            >
              Lo que nos sostiene.
            </h2>
          </Reveal>
          <StaggerGroup className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value) => (
              <StaggerItem
                key={value.title}
                className="rounded-2xl border border-[#EBE8DF] bg-white p-6"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full bg-[#0C3A30]">
                  <value.icon size={20} className="text-[#C8A45A]" />
                </span>
                <h3 className="mb-2 mt-4 font-fraunces text-[19px] font-medium text-[#0F1A15]">
                  {value.title}
                </h3>
                <p className="font-jakarta text-[14px] leading-relaxed text-gray-600">
                  {value.body}
                </p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* TOOLS */}
      <section className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="font-jakarta text-[13px] font-medium uppercase tracking-[0.2em] text-[#C8A45A]">
              Nuestro stack
            </p>
            <h2
              className="mt-3 font-fraunces font-medium leading-[1.12] tracking-[-0.02em] text-[#0F1A15]"
              style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}
            >
              Las herramientas con las que trabajamos.
            </h2>
          </Reveal>
          <ToolsStrip className="mt-12 sm:mt-16" />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#072620] px-5 py-20 text-center sm:px-8 lg:px-12 lg:py-28">
        <Reveal className="mx-auto max-w-2xl">
          <h2
            className="font-fraunces font-medium leading-[1.1] text-[#F7F5F0]"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)' }}
          >
            Hagamos crecer tu negocio juntos.
          </h2>
          <p className="mx-auto mt-5 max-w-md font-jakarta text-[15px] leading-relaxed text-[#F7F5F0]/70 sm:text-[17px]">
            Agendá una reunión y conocé cómo podemos ayudarte a escalar.
          </p>
          <button
            type="button"
            onClick={openCalendly}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#C8A45A] px-7 py-3.5 font-jakarta text-[15px] font-semibold text-[#0F1A15] transition-colors hover:bg-[#B8942F]"
          >
            Agendá una reunión
            <ArrowRight size={18} />
          </button>
        </Reveal>
      </section>
    </div>
  )
}
