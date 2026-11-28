import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowDown,
  Check,
  Globe,
  Instagram,
  Megaphone,
  Store,
  TrendingUp,
  Users,
} from 'lucide-react'
import { WhatsAppIcon } from '../FloatingWhatsApp'
import { STAGES, feriaWhatsAppUrl, useStage, type Stage } from './stage'

const EASE = [0.25, 0.1, 0.25, 1] as const

/**
 * Market-stall awning: alternating green/cream stripes with a scalloped hem.
 * Drawn as one SVG so it scales cleanly at any width.
 */
function Awning() {
  const stripes = 12
  const w = 100 / stripes
  return (
    <svg
      viewBox="0 0 100 14"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="block h-14 w-full sm:h-20"
    >
      {Array.from({ length: stripes }).map((_, i) => {
        const x = i * w
        const fill = i % 2 === 0 ? '#0C3A30' : '#F7F5F0'
        return (
          <g key={i}>
            <rect x={x} y={0} width={w} height={9} fill={fill} />
            {/* scallop under each stripe */}
            <path d={`M${x} 9 a${w / 2} 5 0 0 0 ${w} 0 Z`} fill={fill} />
          </g>
        )
      })}
      {/* thin gold seam between canopy and hem */}
      <rect x={0} y={8.6} width={100} height={0.5} fill="#C8A45A" />
    </svg>
  )
}

const OPTIONS: { stage: Stage; Icon: typeof Store }[] = [
  { stage: 'none', Icon: Store },
  { stage: 'instagram', Icon: Instagram },
  { stage: 'noads', Icon: Users },
  { stage: 'ads', Icon: Megaphone },
  { stage: 'webnoads', Icon: Globe },
  { stage: 'full', Icon: TrendingUp },
]

export function FeriaHero() {
  const reduce = useReducedMotion()
  const { stage, setStage } = useStage()

  return (
    <section id="top" className="relative overflow-hidden bg-[#F7F5F0]">
      {/* The page-load moment: the awning unrolls downward. */}
      <motion.div
        initial={reduce ? false : { scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.9, ease: EASE }}
        style={{ originY: 0 }}
        className="relative z-10 drop-shadow-[0_6px_10px_rgba(7,38,32,0.18)]"
      >
        <Awning />
      </motion.div>

      <div className="mx-auto flex min-h-[calc(100svh-3.5rem)] max-w-6xl flex-col justify-between px-5 pb-10 pt-8 sm:min-h-[calc(100svh-5rem)] sm:px-8 sm:pt-12 lg:px-12">
        <img
          src="/logos/vinculo-horizontal-green.png"
          alt="Vínculo"
          className="h-8 w-auto self-start sm:h-10"
        />

        <div className="py-8 sm:py-10">
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
            className="max-w-[13ch] font-fraunces font-medium leading-[0.98] tracking-[-0.03em] text-[#0C3A30]"
            style={{ fontSize: 'clamp(2.6rem, 8.5vw, 6rem)' }}
          >
            ¿En qué punto está tu marca hoy?
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-5 max-w-[40ch] font-jakarta text-[17px] leading-relaxed text-[#0F1A15]/75 sm:text-lg"
          >
            Elegí la opción que más se parece a tu puesto y te mostramos qué te
            sumaría más en 2027.
          </motion.p>

          {/* Stage picker */}
          <motion.div
            role="radiogroup"
            aria-label="¿En qué punto está tu marca?"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.05, ease: EASE }}
            className="mt-7 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {OPTIONS.map(({ stage: s, Icon }) => {
              const selected = stage === s
              return (
                <button
                  key={s}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setStage(s)}
                  className={`flex items-center gap-3.5 rounded-2xl border-2 px-4 py-3 text-left transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0C3A30] sm:px-5 sm:py-4 ${
                    selected
                      ? 'border-[#0C3A30] bg-[#0C3A30] text-[#F7F5F0]'
                      : 'border-[#EBE8DF] bg-white text-[#0F1A15] hover:border-[#C8A45A]'
                  }`}
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                      selected ? 'bg-[#C8A45A] text-[#072620]' : 'bg-[#F7F5F0] text-[#0C3A30]'
                    }`}
                  >
                    {selected ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                  </span>
                  <span>
                    <span className="block font-jakarta text-[15px] font-semibold leading-snug sm:text-[16px]">
                      {STAGES[s].label}
                    </span>
                    {/* On phones the detail only shows for the chosen option. */}
                    <span
                      className={`mt-0.5 font-jakarta text-[13px] leading-snug sm:block sm:text-[14px] ${
                        selected ? 'block text-[#F7F5F0]/70' : 'hidden text-[#0F1A15]/60'
                      }`}
                    >
                      {STAGES[s].detail}
                    </span>
                  </span>
                </button>
              )
            })}
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2, ease: EASE }}
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6"
        >
          <a
            href={feriaWhatsAppUrl(stage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-[#25D366] px-7 py-4 font-jakarta text-[16px] font-semibold text-[#072620] shadow-[0_10px_28px_rgba(37,211,102,0.35)] transition-transform duration-300 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0C3A30]"
          >
            <WhatsAppIcon className="h-6 w-6" />
            Pedí tu diagnóstico gratis
          </a>
          {stage ? (
            <a
              href="#mapa"
              className="inline-flex items-center justify-center gap-2 font-jakarta text-[15px] font-semibold text-[#0C3A30] underline decoration-[#C8A45A] decoration-2 underline-offset-4"
            >
              Ver qué me sumaría
              <ArrowDown className="h-4 w-4" />
            </a>
          ) : (
            <p className="max-w-[32ch] font-jakarta text-[14px] leading-snug text-[#0F1A15]/70">
              Por venir de la feria, revisamos tu marca gratis.
            </p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
