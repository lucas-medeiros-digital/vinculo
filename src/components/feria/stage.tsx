import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { WHATSAPP_NUMBER } from '../../lib/constants'

/**
 * "Where is your brand today?" — chosen in the hero, then used to personalize
 * the staircase, the phone story and the WhatsApp message on /feria.
 */
export type Stage = 'none' | 'instagram' | 'noads' | 'ads' | 'webnoads' | 'full'

/**
 * The pieces of a brand's digital system. They combine in any order (no ladder).
 * Keys match PhoneStory steps.
 */
export const LEVELS = [
  { key: 'redes', short: 'Redes', name: 'Presencia en redes' },
  { key: 'contenido', short: 'Contenido', name: 'Contenido que vende' },
  { key: 'web', short: 'Web', name: 'Web propia' },
  { key: 'ads', short: 'Anuncios', name: 'Anuncios en Meta y Google' },
  { key: 'whatsapp', short: 'WhatsApp', name: 'WhatsApp automatizado' },
] as const

export type LevelKey = (typeof LEVELS)[number]['key']

interface StageInfo {
  label: string
  detail: string
  /** Pieces this visitor already has (any combination). */
  has: LevelKey[]
  /** Pieces that would most likely add the most; the first one glows on the map. */
  next: LevelKey[]
  /** Appended to the WhatsApp message so we know where they are. */
  message: string
}

/** Order here is the order of the options in the hero. */
export const STAGES: Record<Stage, StageInfo> = {
  none: {
    label: 'Todavía no estoy en redes',
    detail: 'Vendo en el puesto y de boca en boca.',
    has: [],
    next: ['redes', 'contenido'],
    message: 'Todavía no estoy en redes.',
  },
  instagram: {
    label: 'Tengo Instagram, pero no me vende',
    detail: 'Publico, pero no se traduce en ventas.',
    has: ['redes'],
    next: ['contenido', 'ads'],
    message: 'Tengo Instagram pero no me está vendiendo. Mi cuenta es @',
  },
  noads: {
    label: 'Tengo redes, pero no hago anuncios',
    detail: 'Solo me ven los que ya me siguen.',
    has: ['redes', 'contenido'],
    next: ['ads', 'web'],
    message: 'Tengo redes pero no estoy haciendo anuncios. Mi cuenta es @',
  },
  ads: {
    label: 'Hago anuncios, pero quiero más resultados',
    detail: 'Invierto en publicidad y no rinde lo que espero.',
    has: ['redes', 'contenido', 'ads'],
    next: ['web', 'whatsapp'],
    message: 'Ya hago anuncios pero quiero más resultados. Mi cuenta es @',
  },
  webnoads: {
    label: 'Tengo web, pero no hago publicidad',
    detail: 'Mi tienda existe, pero la visita poca gente.',
    has: ['redes', 'web'],
    next: ['ads', 'contenido'],
    message: 'Tengo web pero no estoy haciendo publicidad. Mi web es: ',
  },
  full: {
    label: 'Tengo web, hago publicidad y quiero crecer',
    detail: 'Ya vendo online y quiero escalar.',
    has: ['redes', 'contenido', 'web', 'ads'],
    next: ['whatsapp', 'ads'],
    message: 'Tengo web, hago publicidad y quiero crecer. Mi web es: ',
  },
}

const BASE_MESSAGE = '¡Hola! Los vi en la feria y quiero el diagnóstico gratis de mi marca.'

export function feriaWhatsAppUrl(stage: Stage | null) {
  const text = stage ? `${BASE_MESSAGE} ${STAGES[stage].message}` : BASE_MESSAGE
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}

interface Ctx {
  stage: Stage | null
  setStage: (s: Stage) => void
}

const StageContext = createContext<Ctx>({ stage: null, setStage: () => {} })

const STORAGE_KEY = 'vinculo-feria-stage'

export function StageProvider({ children }: { children: ReactNode }) {
  const [stage, setStage] = useState<Stage | null>(() => {
    const saved = typeof window !== 'undefined' ? window.sessionStorage.getItem(STORAGE_KEY) : null
    return saved && saved in STAGES ? (saved as Stage) : null
  })

  useEffect(() => {
    if (stage) window.sessionStorage.setItem(STORAGE_KEY, stage)
  }, [stage])

  return <StageContext.Provider value={{ stage, setStage }}>{children}</StageContext.Provider>
}

export function useStage() {
  return useContext(StageContext)
}
