import { Reveal, StaggerGroup, StaggerItem, AnimatedUnderline } from '../ui/motion'

interface Step {
  number: string
  title: string
  desc: string
  active?: boolean
}

const STEPS: Step[] = [
  { number: '1', title: 'Diagnóstico', desc: 'Conocemos tu negocio a fondo' },
  { number: '2', title: 'Diseño', desc: 'Creamos la solución ideal' },
  { number: '3', title: 'Feedback', desc: 'Iteramos con vos' },
  { number: '4', title: 'Ejecución', desc: 'Lanzamos al mercado' },
  { number: '5', title: 'Mejora', desc: 'Optimización continua', active: true },
]

export function OurMethod() {
  return (
    <section
      id="metodo"
      className="bg-white px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:px-12 lg:pb-28 lg:pt-28"
    >
      <div className="mx-auto max-w-[1440px]">
        {/* Centered header */}
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-inter text-[13px] font-medium uppercase tracking-[0.2em] text-[#C8A45A]">
            Nuestro método
          </p>
          <h2
            className="mt-3 font-fraunces font-medium leading-[1.12] tracking-[-0.02em] text-[#0F1A15]"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 3.2rem)' }}
          >
            Un proceso <AnimatedUnderline>claro</AnimatedUnderline>,
            <br />
            de principio a fin.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-inter text-[15px] leading-relaxed text-gray-600">
            Trabajamos con un método probado que te da visibilidad en cada etapa.
          </p>
        </Reveal>

        {/* Timeline */}
        <div className="relative mt-16 sm:mt-20">
          {/* Horizontal connecting line — desktop */}
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-[#C8A45A] to-transparent sm:top-8 lg:block" />
          {/* Vertical connecting line — mobile / tablet */}
          <div className="absolute bottom-10 left-1/2 top-8 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#C8A45A] to-transparent lg:hidden" />

          <StaggerGroup className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-6">
            {STEPS.map((step) => (
              <StaggerItem
                key={step.number}
                className="relative z-10 flex flex-1 flex-col items-center text-center"
              >
                <span
                  className={`grid h-14 w-14 place-items-center rounded-full border-2 border-[#153B2E] sm:h-16 sm:w-16 ${
                    step.active ? 'bg-[#153B2E]' : 'bg-white'
                  }`}
                >
                  <span
                    className={`font-fraunces text-[22px] font-medium sm:text-[24px] ${
                      step.active ? 'text-[#C8A45A]' : 'text-[#153B2E]'
                    }`}
                  >
                    {step.number}
                  </span>
                </span>
                <h3 className="mb-1 mt-5 font-fraunces text-[18px] font-medium text-[#0F1A15] sm:text-[20px]">
                  {step.title}
                </h3>
                <p className="max-w-[180px] font-inter text-[13px] leading-relaxed text-gray-600 sm:text-[14px]">
                  {step.desc}
                </p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  )
}
