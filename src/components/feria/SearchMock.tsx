import { useRef, useState } from 'react'
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'framer-motion'
import { Search } from 'lucide-react'

const QUERY = 'regalos artesanales montevideo'

const BENEFITS = [
  ['Te encuentran cuando ya quieren comprar.', 'Quien busca en Google está decidido. Tu anuncio aparece en ese momento.'],
  ['Tu vidriera abierta las 24 horas.', 'Catálogo, precios y envíos siempre a mano, sin tener que responder lo mismo diez veces.'],
  ['Un lugar que es tuyo.', 'Si cambia el algoritmo o se cae una red, tu web y tus clientes siguen ahí.'],
]

/**
 * A search box that types itself as you scroll, then results drop in with
 * "your brand" first. Explains why a web + Google Ads matters.
 */
export function SearchMock() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [chars, setChars] = useState(reduce ? QUERY.length : 0)
  // 0 = typing, 1 = results shown, 2 = benefits shown
  const [phase, setPhase] = useState(reduce ? 2 : 0)

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const n = Math.round(Math.min(1, Math.max(0, (p - 0.05) / 0.3)) * QUERY.length)
    setChars(n)
    setPhase(p >= 0.55 ? 2 : p >= 0.4 ? 1 : 0)
  })

  const content = (
    <div className="mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-[1.1fr_1fr] md:gap-16">
      {/* Browser mock */}
      <div className="rounded-2xl border border-[#EBE8DF] bg-white p-4 shadow-[0_24px_60px_rgba(12,58,48,0.12)] sm:p-6">
        <div className="flex items-center gap-3 rounded-full border border-[#EBE8DF] px-4 py-3">
          <Search className="h-4 w-4 shrink-0 text-black/40" />
          <span className="font-jakarta text-[15px] text-[#0F1A15]">
            {QUERY.slice(0, chars)}
            {!reduce && chars < QUERY.length && (
              <span className="ml-px inline-block h-4 w-px translate-y-0.5 animate-pulse bg-[#0F1A15]" />
            )}
          </span>
        </div>

        <motion.div
          initial={false}
          animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.45 }}
          className="mt-5 flex flex-col gap-4 font-jakarta"
        >
          <div className="rounded-xl bg-[#C8A45A]/10 p-3 ring-1 ring-[#C8A45A]/40">
            <p className="text-[12px] text-black/55">
              <b className="font-semibold text-black/80">Patrocinado</b> tumarca.uy
            </p>
            <p className="mt-0.5 text-[17px] font-medium text-[#1a0dab]">Tu marca: regalos hechos a mano</p>
            <p className="text-[13px] text-black/60">Envíos a todo Uruguay. Mirá el catálogo y pedí por WhatsApp.</p>
          </div>
          {['Otra tienda', 'Un marketplace'].map((t) => (
            <div key={t} className="px-3 opacity-40">
              <div className="h-2.5 w-24 rounded bg-black/15" />
              <p className="mt-1.5 text-[15px] text-[#1a0dab]">{t}</p>
              <div className="mt-1 h-2 w-4/5 rounded bg-black/10" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Copy */}
      <div>
        <h2
          className="font-fraunces font-medium leading-[1.05] tracking-[-0.02em] text-[#0C3A30]"
          style={{ fontSize: 'clamp(1.9rem, 4.6vw, 3.4rem)' }}
        >
          Cuando te buscan, ¿aparecés vos?
        </h2>
        <motion.ul
          initial={false}
          animate={{ opacity: phase >= 2 ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8 flex flex-col gap-6"
        >
          {BENEFITS.map(([t, d]) => (
            <li key={t} className="border-l-2 border-[#C8A45A] pl-4">
              <p className="font-jakarta text-[17px] font-semibold text-[#0F1A15]">{t}</p>
              <p className="mt-1 hidden max-w-[42ch] font-jakarta text-[15px] leading-relaxed text-[#0F1A15]/65 sm:block">{d}</p>
            </li>
          ))}
        </motion.ul>
      </div>
    </div>
  )

  if (reduce) {
    return <section className="bg-[#F7F5F0] px-5 py-24 sm:px-8 lg:px-12">{content}</section>
  }

  return (
    <section ref={ref} className="relative h-[180vh] bg-[#F7F5F0]">
      <div className="sticky top-0 flex min-h-[100svh] items-center px-5 py-10 sm:px-8 lg:px-12">
        {content}
      </div>
    </section>
  )
}
