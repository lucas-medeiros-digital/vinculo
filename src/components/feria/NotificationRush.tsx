import { useRef, useState, type ComponentType } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'framer-motion'
import { Heart, ShoppingBag, UserPlus } from 'lucide-react'
import { WhatsAppIcon } from '../FloatingWhatsApp'

type App = 'whatsapp' | 'instagram' | 'tienda'

interface Notif {
  app: App
  title: string
  text: string
  /** What this notification adds to the counters beside the phone. */
  add: { mensajes?: number; seguidores?: number; ventas?: number }
}

/** An illustrative day of a brand that's up and running (example brand). */
// Mostly messages and followers; sales are the occasional payoff.
const NOTIFS: Notif[] = [
  { app: 'whatsapp', title: 'Sofía', text: '¡Hola! ¿Hacen envíos a Salto?', add: { mensajes: 2 } },
  { app: 'instagram', title: 'Instagram', text: 'lu.mart y 8 personas más comenzaron a seguirte.', add: { seguidores: 9 } },
  { app: 'whatsapp', title: 'Martín (3 mensajes)', text: '¿Tenés el bowl en color arena?', add: { mensajes: 3 } },
  { app: 'instagram', title: 'Instagram', text: 'A 236 personas les gustó tu reel.', add: { seguidores: 18 } },
  { app: 'whatsapp', title: 'Valentina', text: 'Quiero 3 para regalar en Navidad 🎄', add: { mensajes: 2 } },
  { app: 'tienda', title: 'Tu tienda', text: 'Nueva venta: Taza verde x2, $ 1.780', add: { ventas: 1 } },
  { app: 'whatsapp', title: 'Andrés', text: '¿Puedo pasar a retirar mañana?', add: { mensajes: 1 } },
  { app: 'instagram', title: 'Instagram', text: 'camiartesana y 23 personas más comenzaron a seguirte.', add: { seguidores: 24 } },
  { app: 'whatsapp', title: 'Lucía (2 mensajes)', text: '¿Hacen pedidos personalizados?', add: { mensajes: 2 } },
  { app: 'whatsapp', title: 'Grupo Regalos Empresa', text: 'Necesitamos 20 tazas para fin de año.', add: { mensajes: 4 } },
  { app: 'instagram', title: 'Instagram', text: 'Tu anuncio llegó a 4.800 personas de tu zona.', add: { seguidores: 31 } },
  { app: 'whatsapp', title: 'Pedro', text: 'Vi tu reel, ¿cuánto sale el set?', add: { mensajes: 2 } },
  { app: 'tienda', title: 'Tu tienda', text: 'Nueva venta: Set de platos, $ 3.200', add: { ventas: 1 } },
  { app: 'instagram', title: 'Instagram', text: 'Te mencionaron en 5 historias.', add: { seguidores: 15 } },
  { app: 'whatsapp', title: 'Carla', text: '¡Me encantó! ¿Abren el domingo?', add: { mensajes: 2 } },
]

const VISIBLE = 5

function AppIcon({ app }: { app: App }) {
  if (app === 'whatsapp')
    return (
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#25D366] text-white">
        <WhatsAppIcon className="h-[18px] w-[18px]" />
      </span>
    )
  if (app === 'instagram')
    return (
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#F9CE34] via-[#EE2A7B] to-[#6228D7] text-white">
        <UserPlus className="h-4 w-4" />
      </span>
    )
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#C8A45A] text-[#072620]">
      <ShoppingBag className="h-4 w-4" />
    </span>
  )
}

/**
 * Near the end: "this is what it feels like when your brand gets going".
 * A phone lock screen fills with WhatsApp messages, new followers and store
 * sales as you scroll, while counters beside it tick up.
 */
export function NotificationRush() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [count, setCount] = useState(reduce ? NOTIFS.length : 0)

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const n = Math.min(NOTIFS.length, Math.max(0, Math.floor(((p - 0.05) / 0.85) * NOTIFS.length) + 1))
    setCount(p < 0.05 ? 0 : n)
  })

  const shown = NOTIFS.slice(0, count)
  const totals = shown.reduce(
    (t, n) => ({
      mensajes: t.mensajes + (n.add.mensajes ?? 0),
      seguidores: t.seguidores + (n.add.seguidores ?? 0),
      ventas: t.ventas + (n.add.ventas ?? 0),
    }),
    { mensajes: 0, seguidores: 0, ventas: 0 },
  )
  // Newest first, only the top few fit on the lock screen.
  const stack = shown.map((n, i) => ({ ...n, id: i })).reverse().slice(0, VISIBLE)

  const text = (
    <div>
      <h2
        className="max-w-[16ch] font-fraunces font-medium leading-[1.05] tracking-[-0.02em] text-[#0C3A30]"
        style={{ fontSize: 'clamp(2rem, 5vw, 3.6rem)' }}
      >
        Cuando tu marca arranca, se nota.
      </h2>
      <p className="mt-3 hidden max-w-[40ch] font-jakarta text-[16px] leading-relaxed text-[#0F1A15]/70 sm:block sm:text-[17px]">
        Mensajes, seguidores y ventas que llegan mientras vos atendés el puesto.
      </p>

      <dl className="mt-4 grid max-w-md grid-cols-3 gap-2 sm:mt-8 sm:gap-3">
        <Counter label="Mensajes" value={totals.mensajes} Icon={WhatsAppIcon} />
        <Counter label="Seguidores" value={totals.seguidores} Icon={Heart} />
        <Counter label="Ventas" value={totals.ventas} Icon={ShoppingBag} />
      </dl>
      <p className="mt-3 font-jakarta text-[12px] text-[#0F1A15]/45">Ejemplo ilustrativo de una marca en marcha.</p>
    </div>
  )

  const phone = (
    <div className="relative mx-auto aspect-[9/18.5] h-full max-h-[600px] rounded-[2.4rem] bg-[#0F1A15] p-2.5 shadow-[0_30px_60px_rgba(7,38,32,0.35)]">
      <div className="absolute left-1/2 top-3.5 z-20 h-4 w-16 -translate-x-1/2 rounded-full bg-[#0F1A15]" />
      <div className="relative h-full overflow-hidden rounded-[1.9rem] bg-[radial-gradient(120%_80%_at_50%_0%,#1E5A49_0%,#0C3A30_45%,#072620_100%)]">
        {/* lock screen clock */}
        <div className="pt-9 text-center text-[#F7F5F0]">
          <p className="font-jakarta text-[11px] opacity-75">sábado 13 de diciembre</p>
          <p className="font-jakarta text-[clamp(2rem,9vw,3.4rem)] font-semibold leading-none tracking-tight">10:24</p>
        </div>

        {/* notifications */}
        {/* Clipped above the "more" pill so a long stack never overlaps it. */}
        <div className="absolute inset-x-2.5 bottom-12 top-[30%] flex flex-col gap-2 overflow-hidden">

          <AnimatePresence initial={false}>
            {stack.map((n) => (
              <motion.div
                key={n.id}
                layout
                initial={{ opacity: 0, y: -24, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                className="flex items-start gap-2.5 rounded-2xl bg-white/85 p-2.5 shadow-[0_6px_18px_rgba(0,0,0,0.18)] backdrop-blur"
              >
                <AppIcon app={n.app} />
                <div className="min-w-0 flex-1 font-jakarta">
                  <p className="flex items-center justify-between text-[11px] font-semibold text-[#0F1A15]">
                    <span className="truncate">{n.title}</span>
                    <span className="ml-2 shrink-0 font-normal text-[#0F1A15]/45">ahora</span>
                  </p>
                  <p className="line-clamp-2 text-[11px] leading-snug text-[#0F1A15]/80">{n.text}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* "more" pill once the stack overflows */}
        {count > VISIBLE && (
          <div className="absolute inset-x-0 bottom-4 flex justify-center">
            <span className="rounded-full bg-white/20 px-3 py-1 font-jakarta text-[11px] font-semibold text-[#F7F5F0] backdrop-blur">
              y siguen llegando…
            </span>
          </div>
        )}
      </div>
    </div>
  )

  if (reduce) {
    return (
      <section className="bg-[#F7F5F0] px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          {text}
          <div className="h-[560px]">{phone}</div>
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} className="relative h-[360vh] bg-[#F7F5F0]">
      <div className="sticky top-0 flex h-[100svh] items-center px-5 pb-20 pt-6 sm:px-8 md:pb-6 lg:px-12">
        <div className="mx-auto grid h-full w-full max-w-6xl grid-rows-[auto_1fr] items-center gap-5 md:grid-cols-2 md:grid-rows-1 md:gap-12">
          {text}
          <div className="h-full max-h-[56svh] min-h-0 md:h-[82svh] md:max-h-[600px]">{phone}</div>
        </div>
      </div>
    </section>
  )
}

function Counter({
  label,
  value,
  Icon,
}: {
  label: string
  value: number
  Icon: ComponentType<{ className?: string }>
}) {
  return (
    <div className="rounded-2xl border border-[#E3DED2] bg-white px-3 py-2.5 sm:px-4 sm:py-3">
      <dt className="flex items-center gap-1.5 font-jakarta text-[12px] text-[#0F1A15]/60 sm:text-[13px]">
        <Icon className="h-3.5 w-3.5 text-[#C8A45A]" />
        {label}
      </dt>
      <dd className="mt-0.5 font-fraunces text-[1.6rem] font-medium leading-none text-[#0C3A30] sm:text-[2rem]">
        <motion.span key={value} initial={{ opacity: 0.4, y: -6 }} animate={{ opacity: 1, y: 0 }} className="inline-block">
          +{value}
        </motion.span>
      </dd>
    </div>
  )
}
