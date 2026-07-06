import { Reveal, StaggerGroup, StaggerItem, AnimatedUnderline } from '../ui/motion'

// Real logos pending — swap each placeholder for `/logos/{name}.svg` later.
const CLIENTS: (string | null)[] = [
  'Pirez Aluminio',
  'Clínica Vítola',
  'Semillero de Innovación',
  null,
  null,
  null,
]

const RUBROS = [
  'Construcción',
  'Salud',
  'Educación',
  'Retail',
  'Servicios profesionales',
]

export function Clients() {
  return (
    <section
      id="clientes"
      className="bg-white px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:px-12 lg:pb-24 lg:pt-24"
    >
      <div className="mx-auto max-w-[1440px]">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-inter text-[13px] font-medium uppercase tracking-[0.2em] text-[#C8A45A]">
            Nuestros clientes
          </p>
          <h2
            className="mt-3 font-fraunces font-medium leading-[1.12] tracking-[-0.02em] text-[#0F1A15]"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 3.2rem)' }}
          >
            Marcas que confían en <AnimatedUnderline>Vínculo</AnimatedUnderline>.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-inter text-[15px] leading-relaxed text-gray-600">
            Trabajamos con pymes de distintos rubros que buscan crecer con
            estrategia y ejecución profesional.
          </p>
        </Reveal>

        {/* Logo grid — placeholders until the real SVGs arrive */}
        <StaggerGroup className="mt-12 grid grid-cols-2 items-center gap-8 sm:mt-16 sm:grid-cols-3 lg:grid-cols-6">
          {CLIENTS.map((name, i) => (
            <StaggerItem key={name ?? `slot-${i}`} className="flex justify-center">
              <LogoPlaceholder name={name} />
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* Rubros tags */}
        <Reveal className="mt-12 flex flex-wrap justify-center gap-2">
          {RUBROS.map((rubro) => (
            <span
              key={rubro}
              className="rounded-full border border-[#EBE8DF] bg-[#F7F5F0] px-4 py-2 font-inter text-[13px] text-gray-700"
            >
              {rubro}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function LogoPlaceholder({ name }: { name: string | null }) {
  if (!name) {
    // Empty slot for a future client.
    return (
      <div className="flex h-12 w-full max-w-[160px] items-center justify-center rounded-md border border-dashed border-gray-200 bg-gray-50 sm:h-14" />
    )
  }
  return (
    <div className="flex h-12 w-full max-w-[160px] items-center justify-center rounded-md bg-gray-200 px-2 text-center opacity-70 transition duration-300 hover:opacity-100 sm:h-14">
      <span className="font-inter text-[11px] font-medium leading-tight text-gray-500">
        {name}
      </span>
    </div>
  )
}
