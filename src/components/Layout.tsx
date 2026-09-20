import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from './Footer'
import { FloatingWhatsApp } from './FloatingWhatsApp'

/** Scrolls to top on page change, or to the hash target when present. */
function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      // Wait a frame so the target section is mounted.
      const id = window.setTimeout(() => {
        const el = document.querySelector(hash)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        else window.scrollTo(0, 0)
      }, 50)
      return () => window.clearTimeout(id)
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

export function Layout() {
  return (
    <>
      <ScrollManager />
      <Outlet />
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
