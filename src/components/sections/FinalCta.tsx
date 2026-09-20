import { motion } from 'framer-motion'
import {
  Megaphone,
  Globe,
  ShoppingBag,
  Palette,
  MessageCircle,
  HelpCircle,
  Building2,
  HeartPulse,
  GraduationCap,
  ShoppingCart,
  Briefcase,
  Utensils,
  Sparkles,
  ThumbsUp,
  AlertCircle,
  XCircle,
  Check,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'
import { Reveal, AnimatedUnderline } from '../ui/motion'
import { useDiagnosticForm, IMPROVE_IDS } from '../../context/DiagnosticFormContext'
import { WHATSAPP_URL } from '../../lib/constants'

interface Option {
  id: string
  label: string
  icon: LucideIcon
}

const IMPROVE_OPTIONS: Option[] = [
  { id: IMPROVE_IDS.publicidad, label: 'Publicidad digital (Meta, Google)', icon: Megaphone },
  { id: IMPROVE_IDS.web, label: 'Sitio web o landing', icon: Globe },
  { id: IMPROVE_IDS.mercadolibre, label: 'Tienda Mercado Libre', icon: ShoppingBag },
  { id: IMPROVE_IDS.contenido, label: 'Contenido y redes', icon: Palette },
  { id: IMPROVE_IDS.whatsapp, label: 'WhatsApp y automatizaciones', icon: MessageCircle },
  { id: IMPROVE_IDS.nose, label: 'Todavía no lo tengo claro', icon: HelpCircle },
]

const RUBRO_OPTIONS: Option[] = [
  { id: 'construccion', label: 'Construcción / Industria', icon: Building2 },
  { id: 'salud', label: 'Salud / Bienestar', icon: HeartPulse },
  { id: 'educacion', label: 'Educación', icon: GraduationCap },
  { id: 'retail', label: 'Retail / E-commerce', icon: ShoppingCart },
  { id: 'servicios', label: 'Servicios profesionales', icon: Briefcase },
  { id: 'gastronomia', label: 'Gastronomía / Turismo', icon: Utensils },
  { id: 'otro', label: 'Otro', icon: Sparkles },
]

const INVIERTE_OPTIONS: Option[] = [
  { id: 'si-conforme', label: 'Sí, con buenos resultados', icon: ThumbsUp },
  { id: 'si-no-conforme', label: 'Sí, pero no estoy conforme', icon: AlertCircle },
  { id: 'no', label: 'No, todavía no', icon: XCircle },
  { id: 'no-se', label: 'No sé cómo evaluarlo', icon: HelpCircle },
]

export function FinalCta() {
  return (
    <section
      id="contacto"
      className="relative overflow-hidden bg-[#0C3A30] px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:px-12 lg:pb-28 lg:pt-28"
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-start gap-10 lg:grid-cols-[45%_55%] lg:gap-16">
        {/* LEFT */}
        <Reveal>
          <p className="font-inter text-[13px] font-medium uppercase tracking-[0.2em] text-[#C8A45A]">
            Solicitá tu diagnóstico
          </p>
          <h2
            className="mt-3 font-fraunces font-medium leading-[1.1] text-[#F7F5F0]"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.6rem)' }}
          >
            Hagamos <AnimatedUnderline>crecer</AnimatedUnderline>
            <br />
            tu negocio.
          </h2>
          <p className="mt-6 max-w-md font-inter text-[15px] leading-relaxed text-[#F7F5F0]/70 sm:text-[17px]">
            Contanos un poco sobre vos y te devolvemos un diagnóstico
            personalizado en menos de 48 horas.
          </p>
          <ul className="mt-8 flex flex-wrap gap-4 text-sm text-[#F7F5F0]/60">
            {['Respuesta en 24hs', 'Sin compromiso', '100% gratis'].map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <Check size={14} className="text-[#C8A45A]" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* RIGHT — form card */}
        <div className="rounded-2xl bg-[#F7F5F0] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.15)] sm:p-8">
          <FormCard />
        </div>
      </div>
    </section>
  )
}

function FormCard() {
  const { step, setStep, data, toggleImprove, setField, submitting, submitted, submit } =
    useDiagnosticForm()

  if (submitted) return <SuccessScreen />

  const canContinue =
    step === 1
      ? data.improve.length > 0
      : step === 2
        ? data.rubro !== ''
        : step === 3
          ? data.invierte !== ''
          : true

  const step4Valid =
    data.nombre.trim() !== '' && data.whatsapp.trim() !== '' && data.email.trim() !== ''

  return (
    <>
      {/* Progress */}
      <div className="mb-6 flex items-center gap-2">
        <span className="whitespace-nowrap font-inter text-[12px] tracking-wide text-gray-500">
          Paso {step} de 4
        </span>
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-[#EBE8DF]">
          <div
            className="h-full rounded-full bg-[#0C3A30] transition-all duration-500"
            style={{ width: `${step * 25}%` }}
          />
        </div>
      </div>

      <motion.div
        key={step}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {step === 1 && (
          <Step
            title="¿Qué querés mejorar?"
            subtitle="Podés elegir varias opciones."
          >
            <div className="grid grid-cols-1 gap-2">
              {IMPROVE_OPTIONS.map((opt) => (
                <OptionButton
                  key={opt.id}
                  option={opt}
                  selected={data.improve.includes(opt.id)}
                  onClick={() => toggleImprove(opt.id)}
                />
              ))}
            </div>
          </Step>
        )}

        {step === 2 && (
          <Step title="¿En qué rubro estás?">
            <div className="grid grid-cols-1 gap-2">
              {RUBRO_OPTIONS.map((opt) => (
                <OptionButton
                  key={opt.id}
                  option={opt}
                  selected={data.rubro === opt.id}
                  onClick={() => setField('rubro', opt.id)}
                />
              ))}
            </div>
          </Step>
        )}

        {step === 3 && (
          <Step title="¿Ya invertís en publicidad digital?">
            <div className="grid grid-cols-1 gap-2">
              {INVIERTE_OPTIONS.map((opt) => (
                <OptionButton
                  key={opt.id}
                  option={opt}
                  selected={data.invierte === opt.id}
                  onClick={() => setField('invierte', opt.id)}
                />
              ))}
            </div>
          </Step>
        )}

        {step === 4 && (
          <Step title="Dejanos tus datos">
            <div className="flex flex-col gap-4">
              <Field label="Nombre y apellido" required>
                <input
                  type="text"
                  value={data.nombre}
                  onChange={(e) => setField('nombre', e.target.value)}
                  className={inputClasses}
                />
              </Field>
              <Field label="Empresa">
                <input
                  type="text"
                  value={data.empresa}
                  onChange={(e) => setField('empresa', e.target.value)}
                  className={inputClasses}
                />
              </Field>
              <Field label="WhatsApp" required>
                <div className="flex overflow-hidden rounded-xl border border-[#EBE8DF] bg-white transition focus-within:border-[#0C3A30] focus-within:ring-2 focus-within:ring-[#0C3A30]/10">
                  <span className="flex items-center gap-1 border-r border-[#EBE8DF] bg-[#F7F5F0] px-3 font-inter text-[14px] text-gray-700">
                    🇺🇾 {data.countryCode}
                  </span>
                  <input
                    type="tel"
                    value={data.whatsapp}
                    onChange={(e) => setField('whatsapp', e.target.value)}
                    className="w-full bg-white px-4 py-3 font-inter text-[14px] focus:outline-none"
                  />
                </div>
              </Field>
              <Field label="Email" required>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => setField('email', e.target.value)}
                  className={inputClasses}
                />
              </Field>
              <Field label="¿Algo más que quieras contarnos?">
                <textarea
                  rows={3}
                  value={data.mensaje}
                  onChange={(e) => setField('mensaje', e.target.value)}
                  className={`${inputClasses} resize-none`}
                />
              </Field>
            </div>
          </Step>
        )}
      </motion.div>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between gap-3">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="font-inter text-sm text-gray-600 transition-colors hover:text-gray-900"
          >
            ← Atrás
          </button>
        ) : (
          <span />
        )}

        {step < 4 ? (
          <button
            type="button"
            disabled={!canContinue}
            onClick={() => setStep(step + 1)}
            className="rounded-full bg-[#0C3A30] px-6 py-3 font-inter text-sm font-medium text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
          >
            Siguiente →
          </button>
        ) : (
          <button
            type="button"
            disabled={!step4Valid || submitting}
            onClick={submit}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#C8A45A] px-6 py-3 font-inter text-sm font-medium text-[#0F1A15] transition-colors hover:bg-[#B8942F] disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
          >
            {submitting ? 'Enviando…' : 'Enviar solicitud'}
            <ArrowRight size={16} />
          </button>
        )}
      </div>

      {step === 4 && (
        <p className="mt-4 text-center font-inter text-[12px] text-gray-500">
          Respondemos en menos de 24 horas · Sin compromiso · 100% gratis
        </p>
      )}
    </>
  )
}

const inputClasses =
  'w-full rounded-xl border border-[#EBE8DF] bg-white px-4 py-3 font-inter text-[14px] transition focus:border-[#0C3A30] focus:outline-none focus:ring-2 focus:ring-[#0C3A30]/10'

function Step({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: ReactNodeLike
}) {
  return (
    <div>
      <h3 className="mb-1 font-fraunces text-[20px] font-medium text-[#0F1A15] sm:text-[22px]">
        {title}
      </h3>
      {subtitle ? (
        <p className="mb-5 font-inter text-[13px] text-gray-500">{subtitle}</p>
      ) : (
        <div className="mb-5" />
      )}
      {children}
    </div>
  )
}

function OptionButton({
  option,
  selected,
  onClick,
}: {
  option: Option
  selected: boolean
  onClick: () => void
}) {
  const Icon = option.icon
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition duration-200 ${
        selected
          ? 'border-[#0C3A30] bg-[#0C3A30] text-white'
          : 'border-[#EBE8DF] bg-white hover:border-[#0C3A30]'
      }`}
    >
      <Icon size={18} className={selected ? 'text-[#C8A45A]' : 'text-[#0C3A30]'} />
      <span className="flex-1 font-inter text-[14px] font-medium">{option.label}</span>
      {selected && <Check size={16} className="text-[#C8A45A]" />}
    </button>
  )
}

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: ReactNodeLike
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-inter text-[13px] font-medium text-gray-700">
        {label}
        {required && <span className="text-[#C8A45A]">*</span>}
      </span>
      {children}
    </label>
  )
}

function SuccessScreen() {
  return (
    <div className="py-4">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#0C3A30]">
        <Check size={32} className="text-[#C8A45A]" />
      </div>
      <h3 className="mb-3 text-center font-fraunces text-[24px] font-medium text-[#0F1A15] sm:text-[28px]">
        ¡Solicitud recibida!
      </h3>
      <p className="mx-auto max-w-md text-center font-inter text-[15px] leading-relaxed text-gray-700">
        Ya estamos revisando tu presencia digital. Te contactamos en las
        próximas 24 horas por WhatsApp con los primeros hallazgos y una propuesta
        para agendar la reunión de devolución.
      </p>
      <div className="mt-6 text-center">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-inter font-medium text-[#0C3A30] hover:underline"
        >
          ¿No querés esperar? Escribinos ahora por WhatsApp →
        </a>
      </div>
    </div>
  )
}

// Local alias so we don't need a React import just for the type.
type ReactNodeLike = import('react').ReactNode
