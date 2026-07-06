import { useEffect, useState } from 'react'

/**
 * Live Montevideo time (UTC-3) formatted as HH:MM, updated every second.
 */
export function useMontevideoTime(): string {
  const [time, setTime] = useState(() => formatMontevideoTime())

  useEffect(() => {
    const id = setInterval(() => setTime(formatMontevideoTime()), 1000)
    return () => clearInterval(id)
  }, [])

  return time
}

function formatMontevideoTime(): string {
  return new Intl.DateTimeFormat('es-UY', {
    timeZone: 'America/Montevideo',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date())
}
