import { useRef, useState, type ReactNode } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'framer-motion'
import {
  Bookmark,
  Check,
  CheckCheck,
  Heart,
  MapPin,
  MessageCircle,
  Play,
  Search,
  Send,
  ShoppingBag,
} from 'lucide-react'
import { STAGES, useStage, type LevelKey } from './stage'

const EASE = [0.25, 0.1, 0.25, 1] as const

interface Step {
  key: LevelKey
  name: string
  title: string
  points: string[]
  screen: ReactNode
}

/* ------------------------------------------------------------------ */
/* Phone screens: an example brand ("Barro Lindo", handmade ceramics). */
/* ------------------------------------------------------------------ */

const CLAY = ['#B9744F', '#D9B48F', '#7E8F6A', '#E7D3BC', '#9C5B3B', '#C99A74', '#5E6B4E', '#EADBC8', '#A86A48']

function Mug({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" className={className}>
      <ellipse cx="56" cy="100" rx="38" ry="6" fill="rgba(0,0,0,0.18)" />
      <path d="M92 44c14 0 18 22 0 28" fill="none" stroke="#3F6F5C" strokeWidth="8" strokeLinecap="round" />
      <path d="M22 30h68v52c0 12-10 20-22 20H44c-12 0-22-8-22-20z" fill="#3F6F5C" />
      <ellipse cx="56" cy="30" rx="34" ry="7" fill="#2F5446" />
      <path d="M22 48h68" stroke="#F1E6D6" strokeWidth="3" strokeDasharray="2 5" />
    </svg>
  )
}

function ReelScreen() {
  return (
    <div className="relative h-full bg-gradient-to-b from-[#E9D7BF] to-[#C99A74]">
      <Mug className="absolute left-1/2 top-[30%] w-[58%] -translate-x-1/2" />
      <div className="absolute left-3 top-9 rounded-full bg-black/30 px-2.5 py-1 text-[10px] font-semibold text-white">
        Reels
      </div>
      <Play className="absolute left-1/2 top-[18%] h-8 w-8 -translate-x-1/2 fill-white/80 text-white/80" />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 pt-10 text-white">
        <p className="text-[11px] font-semibold">barrolindo.uy</p>
        <p className="mt-0.5 text-[10px] leading-snug opacity-90">Así nace una taza: del torno a tu mesa</p>
      </div>
      <div className="absolute bottom-16 right-2.5 flex flex-col items-center gap-3 text-white">
        <Heart className="h-5 w-5" />
        <MessageCircle className="h-5 w-5" />
        <Send className="h-5 w-5" />
      </div>
    </div>
  )
}

function ProfileScreen() {
  return (
    <div className="h-full bg-white px-3 pt-9 text-[#0F1A15]">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#B9744F] text-[13px] font-bold text-white ring-2 ring-[#C8A45A] ring-offset-2">
          BL
        </div>
        <div className="flex flex-1 justify-around text-center text-[10px]">
          <div><b className="block text-[12px]">86</b>posts</div>
          <div><b className="block text-[12px]">3.140</b>seguidores</div>
        </div>
      </div>
      <p className="mt-2 text-[11px] font-semibold">Barro Lindo · Cerámica</p>
      <p className="text-[10px] leading-snug text-black/60">Hecho a mano en Montevideo. Envíos a todo el país.</p>
      <div className="mt-2 grid grid-cols-2 gap-1.5 text-[10px] font-semibold">
        <span className="rounded-md bg-[#0C3A30] py-1.5 text-center text-white">Ver tienda</span>
        <span className="rounded-md bg-black/5 py-1.5 text-center">WhatsApp</span>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-0.5">
        {CLAY.map((c, i) => (
          <div key={i} className="aspect-square" style={{ background: c }} />
        ))}
      </div>
    </div>
  )
}

function AdScreen() {
  return (
    <div className="h-full bg-white text-[#0F1A15]">
      <div className="flex items-center gap-2 px-3 pb-2.5 pt-9">
        <div className="h-7 w-7 rounded-full bg-[#B9744F]" />
        <div className="leading-tight">
          <p className="text-[11px] font-semibold">barrolindo.uy</p>
          <p className="text-[9px] text-black/50">Publicidad</p>
        </div>
      </div>
      <div className="relative aspect-square bg-gradient-to-br from-[#E7D3BC] to-[#B9744F]">
        <Mug className="absolute left-1/2 top-1/2 w-[55%] -translate-x-1/2 -translate-y-1/2" />
      </div>
      <div className="flex items-center justify-between bg-[#0C3A30] px-3 py-2 text-[11px] font-semibold text-white">
        Comprar ahora
        <ShoppingBag className="h-3.5 w-3.5" />
      </div>
      <div className="flex gap-3 px-3 py-2">
        <Heart className="h-4 w-4" />
        <MessageCircle className="h-4 w-4" />
        <Send className="h-4 w-4" />
        <Bookmark className="ml-auto h-4 w-4" />
      </div>
      <div className="mx-3 inline-flex items-center gap-1 rounded-full bg-[#C8A45A]/20 px-2 py-1 text-[9px] font-semibold text-[#6B5524]">
        <MapPin className="h-3 w-3" /> Montevideo y Canelones
      </div>
    </div>
  )
}

function WebScreen() {
  return (
    <div className="h-full bg-[#F7F5F0] text-[#0F1A15]">
      <div className="flex items-center gap-1.5 bg-white px-3 pb-2 pt-9 text-[10px] text-black/60">
        <Search className="h-3 w-3" /> taza de cerámica artesanal
      </div>
      <div className="m-2 rounded-lg bg-white p-2.5 shadow-sm">
        <p className="text-[9px] text-black/50">Patrocinado · barrolindo.uy</p>
        <p className="text-[12px] font-semibold text-[#1a0dab]">Tazas hechas a mano | Barro Lindo</p>
        <p className="text-[9px] leading-snug text-black/60">Envíos a todo Uruguay. Pagá como quieras.</p>
      </div>
      <div className="mx-2 mt-1 grid grid-cols-2 gap-1.5">
        {[
          ['Taza verde', '$ 890', '#3F6F5C'],
          ['Bowl arena', '$ 1.150', '#D9B48F'],
          ['Plato barro', '$ 980', '#9C5B3B'],
          ['Jarra', '$ 1.490', '#7E8F6A'],
        ].map(([n, p, c]) => (
          <div key={n} className="rounded-lg bg-white p-1.5">
            <div className="aspect-square rounded-md" style={{ background: c }} />
            <p className="mt-1 text-[10px] font-semibold">{n}</p>
            <p className="text-[10px] text-black/60">{p}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function ChatScreen() {
  return (
    <div className="flex h-full flex-col bg-[#EDE6DA] text-[11px] text-[#0F1A15]">
      <div className="flex items-center gap-2 bg-[#0C3A30] px-3 pb-2.5 pt-9 text-white">
        <div className="h-7 w-7 rounded-full bg-[#B9744F]" />
        <div className="leading-tight">
          <p className="font-semibold">Barro Lindo</p>
          <p className="text-[9px] opacity-70">en línea</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <Bubble side="in">Hola! ¿Tenés la taza verde? 😍</Bubble>
        <Bubble side="out">¡Hola! Sí, hay stock 🙌 Te paso el catálogo con precios y envíos.</Bubble>
        <div className="ml-auto w-[78%] overflow-hidden rounded-lg bg-white">
          <div className="h-14 bg-gradient-to-br from-[#E7D3BC] to-[#3F6F5C]" />
          <p className="px-2 py-1.5 text-[10px] font-semibold">Catálogo Barro Lindo</p>
        </div>
        <Bubble side="in">¡Genial! Quiero 2 🙏</Bubble>
      </div>
    </div>
  )
}

function Bubble({ side, children }: { side: 'in' | 'out'; children: ReactNode }) {
  const out = side === 'out'
  return (
    <div
      className={`max-w-[80%] rounded-lg px-2.5 py-1.5 leading-snug shadow-sm ${
        out ? 'ml-auto bg-[#D9F7C8]' : 'bg-white'
      }`}
    >
      {children}
      {out && <CheckCheck className="ml-1 inline h-3 w-3 text-[#34B7F1]" />}
    </div>
  )
}

// One step per piece of the brand map (LEVELS in ./stage).
const STEPS: Step[] = [
  {
    key: 'redes',
    name: 'Presencia en redes',
    title: 'Un Instagram que da ganas de comprar.',
    points: ['Perfil y bio claros', 'Grilla ordenada', 'Respuestas a tiempo'],
    screen: <ProfileScreen />,
  },
  {
    key: 'contenido',
    name: 'Contenido que vende',
    title: 'Fotos y videos a la altura de lo que hacés.',
    points: ['Reels de tu proceso', 'Fotos de producto', 'Ideas para cada semana'],
    screen: <ReelScreen />,
  },
  {
    key: 'web',
    name: 'Web propia',
    title: 'Tu tienda abierta las 24 horas.',
    points: ['Catálogo y precios', 'Pagos y envíos', 'No dependés del algoritmo'],
    screen: <WebScreen />,
  },
  {
    key: 'ads',
    name: 'Anuncios en Meta y Google',
    title: 'Anuncios que llegan a quien te está buscando.',
    points: ['Desde presupuestos chicos', 'Público por zona e intereses', 'Medís qué vende'],
    screen: <AdScreen />,
  },
  {
    key: 'whatsapp',
    name: 'WhatsApp automatizado',
    title: 'Consultas respondidas al instante.',
    points: ['Catálogo por WhatsApp', 'Respuestas automáticas', 'Ninguna venta se enfría'],
    screen: <ChatScreen />,
  },
]

/* ------------------------------------------------------------------ */

function Phone({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto aspect-[9/18.5] h-full max-h-[620px] rounded-[2.4rem] bg-[#0F1A15] p-2.5 shadow-[0_30px_60px_rgba(0,0,0,0.35)]">
      <div className="absolute left-1/2 top-3.5 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-[#0F1A15]" />
      {/* Screens add their own top padding to clear the notch. */}
      <div className="relative h-full overflow-hidden rounded-[1.9rem] bg-white">{children}</div>
    </div>
  )
}

function StepText({ step }: { step: Step }) {
  const { stage } = useStage()
  const isNext = !!stage && STAGES[stage].next.includes(step.key)
  return (
    <div>
      <p className="flex flex-wrap items-center gap-2 font-jakarta text-[14px] font-semibold text-[#C8A45A]">
        {step.name}
        {isNext && (
          <span className="rounded-full bg-[#C8A45A] px-2.5 py-0.5 text-[12px] text-[#072620]">
            Te sumaría
          </span>
        )}
      </p>
      <h3
        className="mt-2 font-fraunces font-medium leading-[1.08] tracking-[-0.02em] text-[#F7F5F0]"
        style={{ fontSize: 'clamp(1.5rem, 3.6vw, 3rem)' }}
      >
        {step.title}
      </h3>
      <ul className="mt-4 flex flex-wrap gap-2">
        {step.points.map((p) => (
          <li
            key={p}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#F7F5F0]/15 px-3 py-1.5 font-jakarta text-[13px] text-[#F7F5F0]/85"
          >
            <Check className="h-3.5 w-3.5 text-[#C8A45A]" />
            {p}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function PhoneStory() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const i = Math.min(STEPS.length - 1, Math.max(0, Math.floor(p * STEPS.length)))
    setActive((prev) => (prev === i ? prev : i))
  })

  const intro = (
    <h2
      className="font-fraunces font-medium leading-[1.05] tracking-[-0.02em] text-[#F7F5F0]"
      style={{ fontSize: 'clamp(1.9rem, 5vw, 3.6rem)' }}
    >
      Lo que hacemos en cada pieza.
    </h2>
  )

  // Reduced motion: a plain list, every phone visible.
  if (reduce) {
    return (
      <section className="bg-[#0C3A30] px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-5xl">
          {intro}
          <div className="mt-16 flex flex-col gap-20">
            {STEPS.map((s) => (
              <div key={s.key} className="grid items-center gap-8 md:grid-cols-2">
                <StepText step={s} />
                <div className="h-[520px]">
                  <Phone>{s.screen}</Phone>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  const step = STEPS[active]

  return (
    <section className="bg-[#0C3A30]">
      <div className="mx-auto max-w-6xl px-5 pt-24 sm:px-8 lg:px-12">{intro}</div>

      <div ref={ref} className="relative" style={{ height: `${STEPS.length * 90}vh` }}>
        <div className="sticky top-0 mx-auto grid h-[100svh] max-w-6xl grid-rows-[1fr_auto] items-center gap-5 px-5 pb-24 pt-6 sm:px-8 md:grid-cols-[1fr_auto] md:grid-rows-1 md:gap-16 md:py-6 lg:px-12">
          {/* Text (below the phone on mobile, left on desktop) */}
          <div className="order-2 min-h-[12.5rem] md:order-1 md:min-h-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={step.key}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <StepText step={step} />
              </motion.div>
            </AnimatePresence>

            {/* Progress: one bar per step */}
            <div className="mt-6 flex gap-1.5" aria-hidden="true">
              {STEPS.map((s, i) => (
                <span
                  key={s.key}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === active ? 'w-10 bg-[#C8A45A]' : 'w-4 bg-[#F7F5F0]/20'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Phone */}
          <div className="order-1 h-full max-h-[50svh] min-h-0 md:order-2 md:max-h-[620px] md:h-[80svh]">
            <Phone>
              <AnimatePresence initial={false}>
                <motion.div
                  key={step.key}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  {step.screen}
                </motion.div>
              </AnimatePresence>
            </Phone>
          </div>
        </div>
      </div>
    </section>
  )
}
