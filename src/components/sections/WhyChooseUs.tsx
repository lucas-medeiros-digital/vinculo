import { PillBadge } from '../ui/PillBadge'
import {
  Reveal,
  StaggerGroup,
  StaggerItem,
  AnimatedUnderline,
  CARD_HOVER,
} from '../ui/motion'

interface Differentiator {
  number: string
  title: string
  body: string
}

const BLOCKS: Differentiator[] = [
  {
    number: '01',
    title: 'Resultados primero',
    body: 'Nos enfocamos en generar ventas reales y crecimiento medible, no en métricas de vanidad.',
  },
  {
    number: '02',
    title: 'Soluciones a medida',
    body: 'Cada estrategia se diseña para tu negocio, tu rubro y tu momento. Nada de recetas genéricas.',
  },
  {
    number: '03',
    title: 'Ejecución rápida',
    body: 'Del diagnóstico a la primera campaña activa en semanas, no en meses.',
  },
  {
    number: '04',
    title: 'Enfoque en crecimiento',
    body: 'Optimizamos constantemente para escalar lo que funciona y descartar lo que no.',
  },
]

export function WhyChooseUs() {
  return (
    <section className="bg-[#F7F5F0] px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:px-12 lg:pb-24 lg:pt-24">
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <PillBadge label="Nuestro diferencial" className="mb-6 sm:mb-8" />
          <h2
            className="mb-12 font-fraunces font-medium leading-[1.12] tracking-[-0.02em] text-[#0F1A15] sm:mb-16"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 3.2rem)' }}
          >
            Por qué <AnimatedUnderline>elegirnos</AnimatedUnderline>.
          </h2>
        </Reveal>

        <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {BLOCKS.map((block) => (
            <StaggerItem
              key={block.number}
              whileHover={CARD_HOVER}
              className="group rounded-xl border border-[#EBE8DF] bg-white p-6 transition-[border-color,box-shadow] duration-300 hover:border-[#153B2E] hover:shadow-[0_10px_34px_rgba(21,59,46,0.12)] sm:rounded-2xl sm:p-7"
            >
              <span className="mb-4 block font-fraunces text-[48px] font-medium leading-none text-[#C8A45A] transition-colors duration-300 group-hover:text-[#153B2E] sm:text-[56px]">
                {block.number}
              </span>
              <h3 className="mb-2 font-fraunces text-[18px] font-medium text-[#0F1A15] sm:text-[20px]">
                {block.title}
              </h3>
              <p className="font-inter text-[14px] leading-relaxed text-gray-600 sm:text-[15px]">
                {block.body}
              </p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
