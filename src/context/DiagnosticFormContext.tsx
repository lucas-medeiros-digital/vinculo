import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

/** Stable ids for the Step 1 "¿Qué querés mejorar?" options. Shared between the
 * form (Section 8) and the solutions catalog (Section 6) so a service panel can
 * pre-select its matching option. */
export const IMPROVE_IDS = {
  publicidad: 'publicidad',
  web: 'web',
  mercadolibre: 'mercadolibre',
  contenido: 'contenido',
  whatsapp: 'whatsapp',
  nose: 'nose',
} as const

export type ImproveId = (typeof IMPROVE_IDS)[keyof typeof IMPROVE_IDS]

export interface DiagnosticFormData {
  improve: string[]
  rubro: string
  invierte: string
  nombre: string
  empresa: string
  countryCode: string
  whatsapp: string
  email: string
  mensaje: string
}

const EMPTY: DiagnosticFormData = {
  improve: [],
  rubro: '',
  invierte: '',
  nombre: '',
  empresa: '',
  countryCode: '+598',
  whatsapp: '',
  email: '',
  mensaje: '',
}

const STORAGE_KEY = 'vinculo_form_state'

interface DiagnosticFormContextValue {
  step: number
  setStep: (n: number) => void
  data: DiagnosticFormData
  toggleImprove: (id: string) => void
  setField: <K extends keyof DiagnosticFormData>(key: K, value: DiagnosticFormData[K]) => void
  selectServiceAndScroll: (id: string) => void
  submitting: boolean
  submitted: boolean
  submit: () => void
}

const DiagnosticFormContext = createContext<DiagnosticFormContextValue | null>(null)

export function DiagnosticFormProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [data, setData] = useState<DiagnosticFormData>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) return { ...EMPTY, ...(JSON.parse(raw) as Partial<DiagnosticFormData>) }
    } catch {
      /* ignore malformed storage */
    }
    return EMPTY
  })

  // Persist on every change (cleared on successful submit).
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch {
      /* ignore quota / private-mode errors */
    }
  }, [data])

  const toggleImprove = useCallback((id: string) => {
    setData((d) => ({
      ...d,
      improve: d.improve.includes(id)
        ? d.improve.filter((x) => x !== id)
        : [...d.improve, id],
    }))
  }, [])

  const setField = useCallback(
    <K extends keyof DiagnosticFormData>(key: K, value: DiagnosticFormData[K]) => {
      setData((d) => ({ ...d, [key]: value }))
    },
    [],
  )

  const selectServiceAndScroll = useCallback((id: string) => {
    setData((d) => ({
      ...d,
      improve: d.improve.includes(id) ? d.improve : [...d.improve, id],
    }))
    setStep(1)
    // Scroll after the state update has been committed.
    window.requestAnimationFrame(() => {
      document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [])

  const submit = useCallback(() => {
    setSubmitting(true)
    // Endpoint not wired yet — simulate a successful submission.
    // TODO(dev): POST `data` to /api/diagnostico (backend/webhook).
    window.setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
      try {
        localStorage.removeItem(STORAGE_KEY)
      } catch {
        /* ignore */
      }
    }, 900)
  }, [])

  return (
    <DiagnosticFormContext.Provider
      value={{
        step,
        setStep,
        data,
        toggleImprove,
        setField,
        selectServiceAndScroll,
        submitting,
        submitted,
        submit,
      }}
    >
      {children}
    </DiagnosticFormContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useDiagnosticForm() {
  const ctx = useContext(DiagnosticFormContext)
  if (!ctx) {
    throw new Error('useDiagnosticForm debe usarse dentro de <DiagnosticFormProvider>')
  }
  return ctx
}
