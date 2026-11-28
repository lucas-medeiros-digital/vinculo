import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

/**
 * The "new year" turn: a giant 2026 whose last digit rolls to 7 as you scroll,
 * then the 2027 message fades in. Pinned for ~2 screens of scroll.
 */
export function YearTurn() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  // Digit roll: 0 → 0.45 of progress moves the 6/7 strip up one line.
  const rollY = useTransform(scrollYProgress, [0.1, 0.45], ['0%', '-50%'])
  const yearColor = useTransform(scrollYProgress, [0.3, 0.45], ['#F7F5F0', '#C8A45A'])
  const msgOpacity = useTransform(scrollYProgress, [0.45, 0.65], [0, 1])
  const msgY = useTransform(scrollYProgress, [0.45, 0.65], [30, 0])

  if (reduce) {
    return (
      <section className="bg-[#072620] px-5 py-24 text-center sm:px-8">
        <p className="font-fraunces font-medium leading-none tracking-[-0.04em] text-[#C8A45A]" style={{ fontSize: 'clamp(5rem, 24vw, 16rem)' }}>
          2027
        </p>
        <YearMessage />
      </section>
    )
  }

  return (
    <section ref={ref} className="relative h-[220vh] bg-[#072620]">
      <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden px-5 text-center sm:px-8">
        <motion.p
          aria-label="2027"
          className="flex font-fraunces font-medium leading-none tracking-[-0.04em]"
          style={{ fontSize: 'clamp(6rem, 30vw, 16rem)', color: yearColor }}
        >
          <span aria-hidden="true">202</span>
          {/* Clip window one digit tall; inside it the 6 and 7 are stacked. */}
          <span aria-hidden="true" className="relative inline-block h-[1em] overflow-hidden">
            <motion.span className="flex flex-col" style={{ y: rollY }}>
              <span className="h-[1em]">6</span>
              <span className="h-[1em]">7</span>
            </motion.span>
          </span>
        </motion.p>

        <motion.div style={{ opacity: msgOpacity, y: msgY }}>
          <YearMessage />
        </motion.div>
      </div>
    </section>
  )
}

function YearMessage() {
  return (
    <div className="mx-auto mt-8 max-w-[30ch]">
      <h2
        className="font-fraunces font-medium leading-[1.1] tracking-[-0.02em] text-[#F7F5F0]"
        style={{ fontSize: 'clamp(1.6rem, 5vw, 2.8rem)' }}
      >
        Arrancá el 2027 con estrategia.
      </h2>
      <p className="mt-4 font-jakarta text-[17px] leading-relaxed text-[#F7F5F0]/70">
        Y con un socio que te ayude a crecer, no solo a postear.
      </p>
    </div>
  )
}
