import { FORM_TO_EMAIL, WEB3FORMS_ACCESS_KEY } from './constants'

/**
 * One way to deliver every form on the site (home diagnosis, /contacto, /feria).
 * With WEB3FORMS_ACCESS_KEY set, submissions are emailed straight to the inbox
 * the key was created for. Without it, each form keeps its fallback.
 */

export type FormFields = Record<string, string>

/** Emails the form through Web3Forms. Resolves false when there is no key or it fails. */
export async function sendForm(subject: string, fields: FormFields, replyTo?: string) {
  if (!WEB3FORMS_ACCESS_KEY) return false
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject,
        from_name: 'Web de Vínculo',
        ...(replyTo ? { replyto: replyTo } : {}),
        botcheck: '',
        ...fields,
      }),
    })
    const json = (await res.json().catch(() => ({}))) as { success?: boolean }
    return res.ok && !!json.success
  } catch {
    return false
  }
}

/** Opens the visitor's mail app with the form already written (fallback). */
export function openMailto(subject: string, fields: FormFields) {
  const body = Object.entries(fields)
    .map(([k, v]) => `${k}: ${v || '-'}`)
    .join('\n')
  const a = document.createElement('a')
  a.href = `mailto:${FORM_TO_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  a.click()
}

/** Web3Forms when configured; otherwise, or if it fails, the visitor's mail app. */
export async function deliverForm(subject: string, fields: FormFields, replyTo?: string) {
  if (await sendForm(subject, fields, replyTo)) return
  openMailto(subject, fields)
}
