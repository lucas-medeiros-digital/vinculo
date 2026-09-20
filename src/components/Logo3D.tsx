import { useRef, type PointerEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const ISO = '/logos/vinculo-isotipo-gold.png'

/**
 * Services header mark: an extruded 3D "V" (built from stacked layers) that
 * tilts toward the cursor. Interactive parallax + a subtle idle float.
 */
export function TiltLogo({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [18, -18]), { stiffness: 150, damping: 15 })
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-24, 24]), { stiffness: 150, damping: 15 })

  const onMove = (e: PointerEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }
  const reset = () => {
    px.set(0)
    py.set(0)
  }

  const layers = Array.from({ length: 12 })

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={`relative select-none ${className}`}
      style={{ perspective: 900 }}
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: 'preserve-3d', rotateX, rotateY }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {layers.map((_, i) => (
          <img
            key={i}
            src={ISO}
            alt=""
            aria-hidden="true"
            draggable={false}
            className="absolute inset-0 h-full w-full object-contain"
            style={{
              transform: `translateZ(${-i * 3}px)`,
              filter: `brightness(${Math.max(0.35, 1 - i * 0.08)}) saturate(${1 - i * 0.03})`,
            }}
          />
        ))}
        {/* front face (crisp) */}
        <img
          src={ISO}
          alt="Isotipo Vínculo"
          draggable={false}
          className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
        />
      </motion.div>
    </div>
  )
}

/**
 * Contact header mark: a 3D "coin" that spins continuously around Y, and whose
 * tilt follows the cursor. Two gold faces so it reads on every rotation.
 */
export function SpinLogo({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const py = useMotionValue(0)
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [22, -22]), { stiffness: 120, damping: 14 })

  const onMove = (e: PointerEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    py.set((e.clientY - r.top) / r.height - 0.5)
  }
  const reset = () => py.set(0)

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={`relative select-none ${className}`}
      style={{ perspective: 900 }}
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: 'preserve-3d', rotateX }}
      >
        <motion.div
          className="relative h-full w-full"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          whileHover={{ scale: 1.06 }}
        >
          {/* front */}
          <img
            src={ISO}
            alt="Isotipo Vínculo"
            draggable={false}
            className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_12px_34px_rgba(0,0,0,0.4)]"
            style={{ backfaceVisibility: 'hidden' }}
          />
          {/* back (mirrored plane, same art) */}
          <img
            src={ISO}
            alt=""
            aria-hidden="true"
            draggable={false}
            className="absolute inset-0 h-full w-full object-contain"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}
