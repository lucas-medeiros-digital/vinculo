import {
  motion,
  useReducedMotion,
  type Variants,
  type TargetAndTransition,
} from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'

const EASE = [0.25, 0.1, 0.25, 1] as const

/** Item variant: fade-in + slide-up. Use on any motion.* child of a stagger group. */
export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

/** Container variant: reveals children in sequence (~100ms apart). */
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

/** Shared hover treatment for cards: scale via framer, stronger shadow via CSS. */
export const CARD_HOVER: TargetAndTransition = { scale: 1.02 }
export const cardHoverClasses =
  'transition-shadow duration-300 hover:shadow-[0_10px_34px_rgba(21,59,46,0.12)]'

/**
 * Reveal-on-enter detector. Uses IntersectionObserver, plus a polling safety net
 * that reveals the element if it is genuinely inside the viewport but the
 * observer hasn't fired (covers programmatic/anchor jumps like `#metodo`). Never
 * reveals content that is still off-screen.
 */
export function useReveal(amount = 0.2) {
  const ref = useRef<any>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (shown) return
    const el = ref.current as Element | null
    if (!el) return

    const reveal = () => setShown(true)

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) reveal()
      },
      { threshold: Math.min(amount, 0.5) },
    )
    io.observe(el)

    const poll = window.setInterval(() => {
      const r = el.getBoundingClientRect()
      if (r.top < window.innerHeight && r.bottom > 0) reveal()
    }, 400)

    return () => {
      io.disconnect()
      window.clearInterval(poll)
    }
  }, [amount, shown])

  return { ref, shown }
}

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  amount?: number
}

/** Single-element reveal: fade-in + slide-up when it enters the viewport. */
export function Reveal({ children, className, delay = 0, amount = 0.25 }: RevealProps) {
  const { ref, shown } = useReveal(amount)
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

interface StaggerGroupProps {
  children: ReactNode
  className?: string
  amount?: number
}

/** Wrapper that staggers the reveal of its motion.* children. */
export function StaggerGroup({ children, className, amount = 0.15 }: StaggerGroupProps) {
  const { ref, shown } = useReveal(amount)
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={staggerContainer}
      initial="hidden"
      animate={shown ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  )
}

interface StaggerItemProps {
  children: ReactNode
  className?: string
  whileHover?: TargetAndTransition
}

/** A single staggered item; pass `whileHover` for card lift. */
export function StaggerItem({ children, className, whileHover }: StaggerItemProps) {
  return (
    <motion.div className={className} variants={fadeUpItem} whileHover={whileHover}>
      {children}
    </motion.div>
  )
}

interface AnimatedUnderlineProps {
  children: ReactNode
  className?: string
  /** Thickness of the underline, relative to font size. */
  height?: string
}

/** Keyword with a gold underline that draws left-to-right when it enters view. */
export function AnimatedUnderline({
  children,
  className = '',
  height = '0.1em',
}: AnimatedUnderlineProps) {
  const reduce = useReducedMotion()
  const { ref, shown } = useReveal(0.6)
  const drawn = shown || !!reduce
  return (
    <span ref={ref} className={`relative inline-block ${className}`}>
      {children}
      <motion.span
        aria-hidden="true"
        className="absolute -bottom-[0.04em] left-0 w-full rounded-full bg-[#C8A45A]"
        style={{ height, originX: 0 }}
        initial={{ scaleX: reduce ? 1 : 0 }}
        animate={{ scaleX: drawn ? 1 : 0 }}
        transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
      />
    </span>
  )
}
