import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Loader2 } from 'lucide-react'
import { WhatsAppIcon } from '../FloatingWhatsApp'
import { WEB3FORMS_ACCESS_KEY, WHATSAPP_NUMBER } from '../../lib/constants'
import { trackContact, trackLead } from '../../lib/track'
import { sendForm } from '../../lib/sendForm'
import { STAGES, useStage, type LevelKey } from './stage'

/* Options are buttons (chips). "haciendo" uses the brand-map keys so the hero
   choice can pre-select what the visitor already has. */

const RUBROS = [
  'Artesanías',
  'Indumentaria',
  'Joyería y accesorios',
  'Decoración y hogar',
  'Cosmética natural',
  'Gastronomía',
  'Servicios',
  'Otro',
]

const HACIENDO: { key: LevelKey | 'nada'; label: string }[] = [
  { key: 'redes', label: 'Redes sociales' },
  { key: 'contenido', label: 'Contenido propio' },
  { key: 'web', label: 'Web o tienda online' },
  { key: 'ads', label: 'Anuncios' },
  { key: 'whatsapp', label: 'WhatsApp automatizado' },
  { key: 'nada', label: 'Nada todavía' },
]

const QUIERE = [
  'Vender más online',
  'Crecer en redes',
  'Fotos y videos profesionales',
  'Empezar con anuncios',
  'Tener mi web o tienda',
  'Automatizar WhatsApp',
]

interface Data {
  nombre: string
  empresa: string
  rubro: string
  rubroOtro: string
  haciendo: string[]
  quiere: string[]
  telefono: string
  email: string
  mensaje: string
}

type Errors = Partial<Record<keyof Data, string>>
type Status = 'idle' | 'sending' | 'sent' | 'error'

const EMPTY: Data = {
  nombre: '',
  empresa: '',
  rubro: '',
  rubroOtro: '',
  haciendo: [],
  quiere: [],
  telefono: '',
  email: '',
  mensaje: '',
}

function validate(d: Data): Errors {
  const e: Errors = {}
  if (!d.nombre.trim()) e.nombre = 'Escribí tu nombre.'
  if (!d.empresa.trim()) e.empresa = 'Escribí el nombre de tu marca o empresa.'
  if (!d.rubro) e.rubro = 'Elegí tu rubro.'
  else if (d.rubro === 'Otro' && !d.rubroOtro.trim()) e.rubro = 'Contanos cuál es tu rubro.'
  if (d.haciendo.length === 0) e.haciendo = 'Elegí al menos una opción (o "Nada todavía").'
  if (d.quiere.length === 0) e.quiere = 'Elegí al menos una opción.'
  if (d.telefono.replace(/\D/g, '').length < 8) e.telefono = 'Escribí un teléfono con al menos 8 números.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email.trim())) e.email = 'Escribí un mail válido, por ejemplo nombre@gmail.com.'
  return e
}

const labelFor = (k: string) => HACIENDO.find((h) => h.key === k)?.label ?? k

function rubroText(d: Data) {
  return d.rubro === 'Otro' ? d.rubroOtro.trim() : d.rubro
}

function whatsappText(d: Data) {
  const lines = [
    '¡Hola! Los vi en la feria y quiero el diagnóstico gratis.',
    '',
    `Nombre: ${d.nombre.trim()}`,
    `Marca: ${d.empresa.trim()}`,
    `Rubro: ${rubroText(d)}`,
    `Hoy tengo: ${d.haciendo.map(labelFor).join(', ')}`,
    `Me gustaría: ${d.quiere.join(', ')}`,
    `Teléfono: ${d.telefono.trim()}`,
    `Mail: ${d.email.trim()}`,
  ]
  if (d.mensaje.trim()) lines.push('', d.mensaje.trim())
  return lines.join('\n')
}

const waUrl = (d: Data) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappText(d))}`

/* ------------------------------------------------------------------ */

export function FeriaForm() {
  const { stage } = useStage()
  const [data, setData] = useState<Data>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [touchedHaciendo, setTouchedHaciendo] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  // Pre-select what they already have from the hero choice, until they edit it.
  useEffect(() => {
    if (!stage || touchedHaciendo) return
    const has = STAGES[stage].has
    setData((d) => ({ ...d, haciendo: has.length ? [...has] : ['nada'] }))
  }, [stage, touchedHaciendo])

  const set = <K extends keyof Data>(k: K, v: Data[K]) => {
    setData((d) => ({ ...d, [k]: v }))
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }))
  }

  const toggleHaciendo = (k: string) => {
    setTouchedHaciendo(true)
    const cur = data.haciendo
    let next: string[]
    if (k === 'nada') next = cur.includes('nada') ? [] : ['nada']
    else {
      const without = cur.filter((x) => x !== 'nada')
      next = without.includes(k) ? without.filter((x) => x !== k) : [...without, k]
    }
    set('haciendo', next)
  }

  const toggleQuiere = (v: string) =>
    set('quiere', data.quiere.includes(v) ? data.quiere.filter((x) => x !== v) : [...data.quiere, v])

  /** Validates; on failure shows errors and moves focus to the first one. */
  const check = () => {
    const e = validate(data)
    setErrors(e)
    const first = Object.keys(e)[0]
    if (first) {
      const el = formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"]`)
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      el?.querySelector<HTMLElement>('input, button, textarea')?.focus({ preventScroll: true })
      return false
    }
    return true
  }

  const onWhatsApp = () => {
    if (!check()) return
    trackContact()
    window.open(waUrl(data), '_blank', 'noopener,noreferrer')
  }

  /** Emails the form to Lucas via Web3Forms; without a key, falls back to WhatsApp. */
  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault()
    if (!WEB3FORMS_ACCESS_KEY) {
      onWhatsApp()
      return
    }
    if (!check()) return
    setStatus('sending')
    const ok = await sendForm(
      `Feria: diagnóstico para ${data.empresa.trim()}`,
      {
        Nombre: data.nombre.trim(),
        Marca: data.empresa.trim(),
        Rubro: rubroText(data),
        'Hoy tiene': data.haciendo.map(labelFor).join(', '),
        'Le gustaría': data.quiere.join(', '),
        Teléfono: data.telefono.trim(),
        Mail: data.email.trim(),
        Mensaje: data.mensaje.trim() || '(sin mensaje)',
        'Eligió en el hero': stage ? STAGES[stage].label : '(no eligió)',
      },
      data.email.trim(),
    )
    if (ok) trackLead()
    setStatus(ok ? 'sent' : 'error')
  }

  return (
    <section id="formulario" className="bg-[#F7F5F0] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
      <div className="mx-auto max-w-3xl">
        <h2
          className="font-fraunces font-medium leading-[1.05] tracking-[-0.02em] text-[#0C3A30]"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)' }}
        >
          Contanos de tu marca.
        </h2>
        <p className="mt-3 max-w-[46ch] font-jakarta text-[16px] leading-relaxed text-[#0F1A15]/70">
          Con esto preparamos tu diagnóstico gratis y te escribimos.
        </p>

        <AnimatePresence mode="wait" initial={false}>
          {status === 'sent' ? (
            <motion.div
              key="sent"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-10 rounded-2xl bg-[#0C3A30] p-7 text-[#F7F5F0] sm:p-9"
              role="status"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#C8A45A] text-[#072620]">
                <Check className="h-6 w-6" />
              </span>
              <p className="mt-5 font-fraunces text-[1.7rem] font-medium leading-tight">
                Listo, {data.nombre.trim().split(' ')[0]}. Recibimos tus datos.
              </p>
              <p className="mt-2 font-jakarta text-[16px] text-[#F7F5F0]/75">
                Te escribimos para coordinar tu diagnóstico. Si querés adelantarte,
                mandanos un WhatsApp.
              </p>
              <a
                href={waUrl(data)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-6 py-3.5 font-jakarta text-[15px] font-semibold text-[#072620]"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Seguir por WhatsApp
              </a>
            </motion.div>
          ) : (
            <motion.div key="form" exit={{ opacity: 0 }}>
            <form
              ref={formRef}
              name="feria"
              onSubmit={onSubmit}
              noValidate
              className="mt-10 flex flex-col gap-8"
            >

              <div className="grid gap-5 sm:grid-cols-2">
                <TextField
                  field="nombre"
                  label="Tu nombre"
                  autoComplete="name"
                  value={data.nombre}
                  onChange={(v) => set('nombre', v)}
                  error={errors.nombre}
                />
                <TextField
                  field="empresa"
                  label="Nombre de tu marca o empresa"
                  autoComplete="organization"
                  value={data.empresa}
                  onChange={(v) => set('empresa', v)}
                  error={errors.empresa}
                />
              </div>

              <ChipGroup field="rubro" legend="Rubro" error={errors.rubro}>
                {RUBROS.map((r) => (
                  <Chip key={r} selected={data.rubro === r} onClick={() => set('rubro', r)} radio>
                    {r}
                  </Chip>
                ))}
                {data.rubro === 'Otro' && (
                  <input
                    type="text"
                    value={data.rubroOtro}
                    onChange={(e) => set('rubroOtro', e.target.value)}
                    placeholder="¿Cuál?"
                    aria-label="Tu rubro"
                    className="h-11 min-w-[12rem] flex-1 rounded-full border-2 border-[#E3DED2] bg-white px-4 font-jakarta text-[15px] outline-none focus:border-[#0C3A30]"
                  />
                )}
              </ChipGroup>

              <ChipGroup field="haciendo" legend="¿Qué tenés hoy?" hint="Podés elegir varias." error={errors.haciendo}>
                {HACIENDO.map((h) => (
                  <Chip key={h.key} selected={data.haciendo.includes(h.key)} onClick={() => toggleHaciendo(h.key)}>
                    {h.label}
                  </Chip>
                ))}
              </ChipGroup>

              <ChipGroup field="quiere" legend="¿Qué te gustaría lograr?" hint="Podés elegir varias." error={errors.quiere}>
                {QUIERE.map((q) => (
                  <Chip key={q} selected={data.quiere.includes(q)} onClick={() => toggleQuiere(q)}>
                    {q}
                  </Chip>
                ))}
              </ChipGroup>

              <div className="grid gap-5 sm:grid-cols-2">
                <TextField
                  field="telefono"
                  label="Teléfono"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="099 123 456"
                  value={data.telefono}
                  onChange={(v) => set('telefono', v)}
                  error={errors.telefono}
                />
                <TextField
                  field="email"
                  label="Mail"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={data.email}
                  onChange={(v) => set('email', v)}
                  error={errors.email}
                />
              </div>

              <div data-field="mensaje">
                <label htmlFor="feria-mensaje" className="font-jakarta text-[15px] font-semibold text-[#0F1A15]">
                  Mensaje <span className="font-normal text-[#0F1A15]/50">(opcional)</span>
                </label>
                <textarea
                  id="feria-mensaje"
                  rows={3}
                  value={data.mensaje}
                  onChange={(e) => set('mensaje', e.target.value)}
                  placeholder="Algo que quieras contarnos de tu marca."
                  className="mt-2 w-full resize-y rounded-2xl border-2 border-[#E3DED2] bg-white px-4 py-3 font-jakarta text-[16px] outline-none transition-colors focus:border-[#0C3A30]"
                />
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0C3A30] px-8 py-4 font-jakarta text-[16px] font-semibold text-[#F7F5F0] transition-transform duration-300 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C8A45A] disabled:opacity-70"
                >
                  {status === 'sending' && <Loader2 className="h-5 w-5 animate-spin" />}
                  {!WEB3FORMS_ACCESS_KEY && <WhatsAppIcon className="h-5 w-5" />}
                  {status === 'sending'
                    ? 'Enviando…'
                    : WEB3FORMS_ACCESS_KEY
                      ? 'Pedir mi diagnóstico'
                      : 'Pedir mi diagnóstico por WhatsApp'}
                </button>
                {/* Second channel only when the main button emails (key set). */}
                {WEB3FORMS_ACCESS_KEY && (
                  <button
                    type="button"
                    onClick={onWhatsApp}
                    className="inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-[#25D366] px-6 py-3.5 font-jakarta text-[15px] font-semibold text-[#0C3A30] transition-colors hover:bg-[#25D366]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0C3A30]"
                  >
                    <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
                    Enviar por WhatsApp
                  </button>
                )}
              </div>

              {status === 'error' && (
                <div role="alert" className="rounded-2xl border-2 border-[#C8A45A] bg-white p-5 font-jakarta text-[15px] text-[#0F1A15]">
                  No se pudo enviar el formulario. Mandanos los mismos datos por WhatsApp:
                  <a
                    href={waUrl(data)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 flex w-fit items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 font-semibold text-[#072620]"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    Enviar por WhatsApp
                  </a>
                </div>
              )}
            </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */

function TextField({
  field,
  label,
  value,
  onChange,
  error,
  type = 'text',
  inputMode,
  autoComplete,
  placeholder,
}: {
  field: keyof Data
  label: string
  value: string
  onChange: (v: string) => void
  error?: string
  type?: string
  inputMode?: 'tel' | 'email' | 'text'
  autoComplete?: string
  placeholder?: string
}) {
  const id = `feria-${field}`
  return (
    <div data-field={field}>
      <label htmlFor={id} className="font-jakarta text-[15px] font-semibold text-[#0F1A15]">
        {label}
      </label>
      <input
        id={id}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        className={`mt-2 h-12 w-full rounded-full border-2 bg-white px-5 font-jakarta text-[16px] outline-none transition-colors focus:border-[#0C3A30] ${
          error ? 'border-[#B4532A]' : 'border-[#E3DED2]'
        }`}
      />
      {error && (
        <p id={`${id}-err`} className="mt-1.5 pl-2 font-jakarta text-[13px] text-[#B4532A]">
          {error}
        </p>
      )}
    </div>
  )
}

function ChipGroup({
  field,
  legend,
  hint,
  error,
  children,
}: {
  field: keyof Data
  legend: string
  hint?: string
  error?: string
  children: ReactNode
}) {
  return (
    <fieldset data-field={field}>
      <legend className="font-jakarta text-[15px] font-semibold text-[#0F1A15]">
        {legend}
        {hint && <span className="ml-2 font-normal text-[#0F1A15]/50">{hint}</span>}
      </legend>
      <div className="mt-3 flex flex-wrap gap-2">{children}</div>
      {error && <p className="mt-2 pl-2 font-jakarta text-[13px] text-[#B4532A]">{error}</p>}
    </fieldset>
  )
}

function Chip({
  selected,
  onClick,
  radio = false,
  children,
}: {
  selected: boolean
  onClick: () => void
  radio?: boolean
  children: ReactNode
}) {
  return (
    <button
      type="button"
      role={radio ? 'radio' : 'checkbox'}
      aria-checked={selected}
      onClick={onClick}
      className={`inline-flex h-11 items-center gap-1.5 rounded-full border-2 px-4 font-jakarta text-[15px] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0C3A30] ${
        selected
          ? 'border-[#0C3A30] bg-[#0C3A30] text-[#F7F5F0]'
          : 'border-[#E3DED2] bg-white text-[#0F1A15] hover:border-[#C8A45A]'
      }`}
    >
      {selected && <Check className="h-4 w-4 text-[#C8A45A]" />}
      {children}
    </button>
  )
}
