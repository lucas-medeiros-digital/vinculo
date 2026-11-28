import { useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'framer-motion'
import { Clapperboard, Globe, Megaphone, MessageCircle, Users } from 'lucide-react'
import { LEVELS, STAGES, useStage, type LevelKey } from './stage'

const EASE = [0.25, 0.1, 0.25, 1] as const

/** Node positions on a circle (percent of the square map). No order implied. */
const NODES: Record<LevelKey, { x: number; y: number; Icon: typeof Users }> = {
  redes: { x: 50, y: 14, Icon: Users },
  contenido: { x: 84.2, y: 38.9, Icon: Clapperboard },
  whatsapp: { x: 71.2, y: 79.1, Icon: MessageCircle },
  web: { x: 28.8, y: 79.1, Icon: Globe },
  ads: { x: 15.8, y: 38.9, Icon: Megaphone },
}

/** Real flows between pieces (drawn on the rim, besides the spokes to the center). */
const LINKS: [LevelKey, LevelKey][] = [
  ['contenido', 'redes'], // content feeds your social profiles
  ['ads', 'redes'], // ads run on social
  ['ads', 'web'], // ads bring people to your web
  ['web', 'whatsapp'], // the web hands buyers to WhatsApp
]

/**
 * "Your brand, connected": the brand in the center and the five pieces around
 * it. As you scroll, the pieces the visitor already has light up with their
 * connections, then the one that would add the most glows gold.
 */
export function BrandMap() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { stage } = useStage()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  // 0 = pieces shown, 1 = what you have lights up, 2 = suggestion glows
  const [phase, setPhase] = useState(reduce ? 2 : 0)
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    setPhase(p < 0.22 ? 0 : p < 0.55 ? 1 : 2)
  })

  const info = stage ? STAGES[stage] : null
  const suggest = info?.next[0] ?? null
  const suggestName = suggest ? LEVELS.find((l) => l.key === suggest)!.name : ''

  // Without a chosen stage the whole system lights up, to show how it connects.
  const isLit = (k: LevelKey) => phase >= 1 && (info ? info.has.includes(k) : true)
  const isSuggested = (k: LevelKey) => phase >= 2 && k === suggest

  const text = (
    <div>
      <h2
        className="font-fraunces font-medium leading-[1.05] tracking-[-0.02em] text-[#0C3A30]"
        style={{ fontSize: 'clamp(2rem, 5vw, 3.6rem)' }}
      >
        Tu marca, conectada.
      </h2>
      <p className="mt-4 max-w-[44ch] font-jakarta text-[16px] leading-relaxed text-[#0F1A15]/70 sm:text-[17px]">
        No hay un orden fijo. Cada pieza potencia a la otra: el contenido alimenta
        tus redes y los anuncios llevan gente a tu web y a tu WhatsApp.
      </p>

      <div className="mt-4 min-h-[3.2rem] font-jakarta text-[16px] leading-snug text-[#0F1A15] sm:text-[17px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={info ? `s-${stage}-${phase >= 2}` : 'none'}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {info ? (
              phase >= 2 ? (
                <>
                  Lo que más te sumaría ahora:{' '}
                  <b className="font-semibold text-[#8A6D2B]">{suggestName}</b>. El
                  diagnóstico gratis lo confirma.
                </>
              ) : (
                <>En verde, lo que ya tenés.</>
              )
            ) : (
              <>
                <a
                  href="#top"
                  className="font-semibold text-[#0C3A30] underline decoration-[#C8A45A] decoration-2 underline-offset-4"
                >
                  Elegí arriba en qué punto estás
                </a>{' '}
                y te marcamos qué pieza te sumaría más.
              </>
            )}
          </motion.p>
        </AnimatePresence>
      </div>

      {info && (
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 font-jakarta text-[13px] text-[#0F1A15]/65">
          <span className="inline-flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#0C3A30]" /> Lo que ya tenés
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#C8A45A]" /> Lo que más te sumaría
          </span>
        </div>
      )}
    </div>
  )

  const map = (
    <div className="relative mx-auto aspect-square w-[min(86vw,44svh)] md:w-[min(42vw,72svh)] md:max-w-[520px]">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {/* spokes */}
        {LEVELS.map(({ key }) => {
          const n = NODES[key]
          const lit = isLit(key)
          const sug = isSuggested(key)
          return (
            <g key={key}>
              <line x1={50} y1={50} x2={n.x} y2={n.y} stroke="#E3DED2" strokeWidth={0.6} />
              <motion.line
                x1={50}
                y1={50}
                x2={n.x}
                y2={n.y}
                stroke={sug ? '#C8A45A' : '#0C3A30'}
                strokeWidth={sug ? 0.9 : 0.8}
                strokeDasharray={sug ? '2 1.5' : undefined}
                initial={false}
                animate={{ pathLength: lit || sug ? 1 : 0, opacity: lit || sug ? 1 : 0 }}
                transition={{ duration: 0.7, ease: EASE }}
              />
            </g>
          )
        })}
        {/* rim links between pieces */}
        {LINKS.map(([a, b]) => {
          const A = NODES[a]
          const B = NODES[b]
          const lit = isLit(a) && isLit(b)
          return (
            <g key={`${a}-${b}`}>
              <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="#E3DED2" strokeWidth={0.4} strokeDasharray="1 1" />
              <motion.line
                x1={A.x}
                y1={A.y}
                x2={B.x}
                y2={B.y}
                stroke="#0C3A30"
                strokeWidth={0.5}
                initial={false}
                animate={{ pathLength: lit ? 1 : 0, opacity: lit ? 0.6 : 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
              />
            </g>
          )
        })}
      </svg>

      {/* center */}
      <div className="absolute left-1/2 top-1/2 flex h-[26%] w-[26%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#072620] text-center shadow-[0_14px_40px_rgba(7,38,32,0.3)]">
        <span className="font-fraunces text-[clamp(0.9rem,3.6vw,1.35rem)] font-medium leading-tight text-[#F7F5F0]">
          Tu marca
        </span>
      </div>

      {/* pieces */}
      {LEVELS.map(({ key, short }) => {
        const { x, y, Icon } = NODES[key]
        const lit = isLit(key)
        const sug = isSuggested(key)
        return (
          <div
            key={key}
            className="absolute flex w-[24%] -translate-x-1/2 -translate-y-1/2 flex-col items-center"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <div className="relative">
              {sug && !reduce && (
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-[#C8A45A]"
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: 1.6, opacity: 0 }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
                />
              )}
              <div
                className={`relative flex h-[clamp(2.9rem,12vw,4.2rem)] w-[clamp(2.9rem,12vw,4.2rem)] items-center justify-center rounded-full border-2 transition-colors duration-500 ${
                  sug
                    ? 'border-[#C8A45A] bg-[#C8A45A] text-[#072620]'
                    : lit
                      ? 'border-[#0C3A30] bg-[#0C3A30] text-[#F7F5F0]'
                      : 'border-[#E3DED2] bg-white text-[#0F1A15]/45'
                }`}
              >
                <Icon className="h-[45%] w-[45%]" />
              </div>
            </div>
            <span
              className={`mt-1.5 whitespace-nowrap font-jakarta text-[12px] sm:text-[14px] ${
                sug ? 'font-semibold text-[#8A6D2B]' : lit ? 'font-semibold text-[#0C3A30]' : 'text-[#0F1A15]/55'
              }`}
            >
              {short}
            </span>
          </div>
        )
      })}
    </div>
  )

  if (reduce) {
    return (
      <section id="mapa" ref={ref} className="bg-[#F7F5F0] px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          {text}
          {map}
        </div>
      </section>
    )
  }

  return (
    <section id="mapa" ref={ref} className="relative h-[240vh] bg-[#F7F5F0]">
      <div className="sticky top-0 flex h-[100svh] items-center px-5 pb-20 pt-6 sm:px-8 md:pb-6 lg:px-12">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-6 md:grid-cols-2 md:gap-12">
          {text}
          {map}
        </div>
      </div>
    </section>
  )
}
