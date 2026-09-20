import { Reveal, StaggerGroup, StaggerItem, AnimatedUnderline, CARD_HOVER } from '../ui/motion'

interface Client {
  name: string
  src: string
}

const CLIENTS: Client[] = [
  { name: 'Pirez Aluminio', src: '/logos/clients/pirez.png' },
  { name: 'Clínica Vítola', src: '/logos/clients/vitola.png' },
  { name: 'Semillero de Innovación', src: '/logos/clients/semillero.png' },
  { name: 'RedOne — Redes Deportivas', src: '/logos/clients/redone.png' },
  { name: 'Merladett Construcciones', src: '/logos/clients/merladett.png' },
  { name: 'Expande Business & Trade', src: '/logos/clients/expande.png' },
  { name: 'Windoor Aluminios', src: '/logos/clients/windoor.png' },
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
          <p className="font-jakarta text-[13px] font-medium uppercase tracking-[0.2em] text-[#C8A45A]">
            Nuestros clientes
          </p>
          <h2
            className="mt-3 font-fraunces font-medium leading-[1.12] tracking-[-0.02em] text-[#0F1A15]"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 3.2rem)' }}
          >
            Marcas que confían en <AnimatedUnderline>Vínculo</AnimatedUnderline>.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-jakarta text-[15px] leading-relaxed text-gray-600">
            Trabajamos con negocios de distintos rubros que ya funcionan y
            buscan escalar con estrategia y ejecución profesional.
          </p>
        </Reveal>

        {/* Logo wall */}
        <StaggerGroup className="mx-auto mt-12 flex max-w-5xl flex-wrap justify-center gap-4 sm:mt-16 sm:gap-5">
          {CLIENTS.map((client) => (
            <StaggerItem
              key={client.name}
              whileHover={CARD_HOVER}
              className="flex h-24 w-[calc(50%-0.5rem)] items-center justify-center rounded-xl border border-[#EBE8DF] bg-white p-5 transition-colors duration-300 hover:border-[#C8A45A]/50 sm:h-28 sm:w-44 lg:w-48"
            >
              <img
                src={client.src}
                alt={client.name}
                className="max-h-11 w-auto object-contain opacity-80 transition-opacity duration-300 hover:opacity-100 sm:max-h-12"
              />
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* Rubros tags */}
        <Reveal className="mt-12 flex flex-wrap justify-center gap-2">
          {RUBROS.map((rubro) => (
            <span
              key={rubro}
              className="rounded-full border border-[#EBE8DF] bg-[#F7F5F0] px-4 py-2 font-jakarta text-[13px] text-gray-700"
            >
              {rubro}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
