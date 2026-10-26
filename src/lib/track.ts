// Lightweight conversion tracking for Meta Pixel + GA4.
// Both are loaded in index.html; calls are guarded so they no-op if absent.

type TrackingWindow = Window & {
  fbq?: (...args: unknown[]) => void
  gtag?: (...args: unknown[]) => void
}

export function track(fbEvent: string, gaEvent: string, params?: Record<string, unknown>) {
  const w = window as TrackingWindow
  try {
    w.fbq?.('track', fbEvent, params)
  } catch {
    /* pixel not loaded */
  }
  try {
    w.gtag?.('event', gaEvent, params)
  } catch {
    /* GA not loaded */
  }
}

/** A lead / form submission. */
export const trackLead = () => track('Lead', 'generate_lead')
/** A WhatsApp click. */
export const trackContact = () => track('Contact', 'whatsapp_click')
/** A booked meeting (Calendly). */
export const trackSchedule = () => track('Schedule', 'reunion_agendada')

/**
 * Global listeners: fire Contact on any WhatsApp link click, and Schedule when
 * a Calendly booking completes. Safe to call once on app mount.
 */
export function initGlobalTracking() {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement | null
    if (target?.closest?.('a[href*="wa.me"]')) trackContact()
  })
  window.addEventListener('message', (e: MessageEvent) => {
    if (e?.data?.event === 'calendly.event_scheduled') trackSchedule()
  })
}
