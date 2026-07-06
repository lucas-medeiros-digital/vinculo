import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { PillBadge } from '../ui/PillBadge'
import {
  Reveal,
  useReveal,
  staggerContainer,
  fadeUpItem,
  CARD_HOVER,
  cardHoverClasses,
} from '../ui/motion'

interface Problem {
  title: string
  body: string
}

const PROBLEMS: Problem[] = [
  {
    title: 'Me llegan mensajes, pero no se traducen en ventas.',
    body: 'Tenés movimiento en redes y WhatsApp, pero al final del mes los números no cierran.',
  },
  {
    title: 'Invierto en pauta y no sé qué está funcionando.',
    body: 'Ves plata saliendo cada mes y nadie te explica qué genera clientes y qué no.',
  },
  {
    title: 'Mi web no me trae clientes.',
    body: 'Está online hace años, pero no vende, no capta datos, no hace nada por vos.',
  },
  {
    title: 'Publico en redes pero no pasa nada.',
    body: 'Contenido constante, seguidores estancados y cero impacto en las ventas.',
  },
  {
    title: 'Cambié de agencia y sigo en el mismo lugar.',
    body: 'Reportes llenos de números, poca estrategia, cero contexto de tu negocio.',
  },
  {
    title: 'No tengo tiempo para pensar el marketing.',
    body: 'Entre operación, clientes y equipo, lo digital siempre queda para después.',
  },
]

export function ProblemsCarousel() {
  const { ref: trackRef, shown } = useReveal(0.15)

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current as HTMLDivElement | null
    if (!el) return
    const card = el.querySelector<HTMLElement>('[data-card]')
    const gap = 24
    const amount = card ? card.offsetWidth + gap : el.clientWidth * 0.85
    el.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }

  return (
    <section className="bg-[#F7F5F0] pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-24 lg:pt-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <PillBadge label="Problemas comunes" className="mb-6 sm:mb-8" />
          <h2
            className="mb-10 font-fraunces font-medium leading-[1.12] tracking-[-0.02em] text-[#0F1A15] sm:mb-14"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 3.2rem)' }}
          >
            ¿Te suena familiar?
          </h2>
        </Reveal>

        <motion.div
          ref={trackRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 sm:gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate={shown ? 'visible' : 'hidden'}
        >
          {PROBLEMS.map((problem) => (
            <motion.article
              key={problem.title}
              data-card
              variants={fadeUpItem}
              whileHover={CARD_HOVER}
              className={`w-[85%] shrink-0 snap-start rounded-xl border border-[#EBE8DF] bg-white p-6 shadow-[0_2px_16px_rgba(21,59,46,0.04)] sm:w-[380px] sm:rounded-2xl sm:p-8 lg:w-[420px] ${cardHoverClasses}`}
            >
              <span className="mb-3 block font-fraunces text-4xl italic leading-none text-[#C8A45A]">
                &ldquo;
              </span>
              <h3 className="mb-3 font-fraunces text-[18px] font-medium leading-[1.3] text-[#0F1A15] sm:text-[20px]">
                {problem.title}
              </h3>
              <p className="font-inter text-[14px] leading-relaxed text-gray-600 sm:text-[15px]">
                {problem.body}
              </p>
            </motion.article>
          ))}
        </motion.div>

        {/* Nav arrows — desktop only */}
        <div className="mt-6 hidden justify-end gap-2 lg:flex">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Anterior"
            className="grid h-10 w-10 place-items-center rounded-full border border-[#EBE8DF] bg-white text-[#0F1A15] transition-colors duration-300 hover:border-[#153B2E]"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Siguiente"
            className="grid h-10 w-10 place-items-center rounded-full border border-[#EBE8DF] bg-white text-[#0F1A15] transition-colors duration-300 hover:border-[#153B2E]"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}
