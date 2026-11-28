import { motion, useReducedMotion } from 'framer-motion'
import { WhatsAppIcon } from '../FloatingWhatsApp'
import { useReveal } from '../ui/motion'
import { feriaWhatsAppUrl, useStage } from './stage'

const STEPS = [
  'Nos escribís por WhatsApp con tu Instagram, tu web o lo que vendés.',
  'Revisamos cómo se ve tu marca y cómo estás vendiendo hoy.',
  'Te decimos qué pieza te sumaría más, con 3 mejoras concretas para el 2027.',
]

/** Hanging price tag with the free diagnosis offer. It swings in once on reveal. */
export function FeriaOffer() {
  const reduce = useReducedMotion()
  const { ref, shown } = useReveal(0.35)
  const { stage } = useStage()

  return (
    <section id="diagnostico" className="bg-[#072620] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <div className="mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-[auto_1fr]">
        {/* The tag */}
        <div ref={ref} className="flex justify-center">
          <motion.div
            style={{ originX: 0.5, originY: 0 }}
            initial={reduce ? false : { rotate: -14 }}
            animate={shown || reduce ? { rotate: [-14, 6, -3, 1, 0] } : undefined}
            transition={{ duration: 1.6, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            {/* string */}
            <span aria-hidden="true" className="h-16 w-px bg-[#C8A45A]" />
            <div
              className="relative w-64 bg-[#F7F5F0] px-7 pb-8 pt-12 text-center sm:w-72"
              style={{
                clipPath: 'polygon(50% 0, 100% 14%, 100% 100%, 0 100%, 0 14%)',
                borderRadius: '0 0 14px 14px',
              }}
            >
              <span aria-hidden="true" className="absolute left-1/2 top-5 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-[#072620]" />
              <p className="font-jakarta text-[14px] font-semibold text-[#0C3A30]">Diagnóstico de tu marca</p>
              <p className="mt-2 font-fraunces text-[3.4rem] font-medium leading-none tracking-[-0.03em] text-[#0C3A30]">
                $0
              </p>
              <p className="mt-3 font-jakarta text-[13px] leading-snug text-[#0F1A15]/65">
                Para quienes nos conocieron en la feria.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Copy + CTA */}
        <div>
          <h2
            className="max-w-[18ch] font-fraunces font-medium leading-[1.05] tracking-[-0.02em] text-[#F7F5F0]"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.8rem)' }}
          >
            Empezá el año sabiendo qué mejorar.
          </h2>

          <ol className="mt-8 flex flex-col gap-4">
            {STEPS.map((s, i) => (
              <li key={s} className="flex items-baseline gap-4 font-jakarta text-[16px] text-[#F7F5F0]/85">
                <span className="font-fraunces text-[22px] text-[#C8A45A]">{i + 1}</span>
                {s}
              </li>
            ))}
          </ol>

          <a
            href={feriaWhatsAppUrl(stage)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#25D366] px-7 py-4 font-jakarta text-[16px] font-semibold text-[#072620] transition-transform duration-300 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C8A45A]"
          >
            <WhatsAppIcon className="h-6 w-6" />
            Pedir mi diagnóstico gratis
          </a>
          <p className="mt-5 font-jakarta text-[15px] text-[#F7F5F0]/70">
            ¿Preferís dejarnos tus datos?{' '}
            <a
              href="#formulario"
              className="font-semibold text-[#F7F5F0] underline decoration-[#C8A45A] decoration-2 underline-offset-4"
            >
              Completá el formulario
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
