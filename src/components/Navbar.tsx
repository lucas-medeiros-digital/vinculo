import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Clock, Menu, X, ArrowUpRight } from 'lucide-react'
import { HoverRollButton } from './ui/HoverRollButton'
import { useMontevideoTime } from '../hooks/useMontevideoTime'
import { NAV_LINKS, openCalendly } from '../lib/constants'

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const time = useMontevideoTime()

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-[1440px] p-2 sm:p-3">
        <nav className="flex items-center justify-between rounded-full bg-white p-[5px] pl-[5px] shadow-[0_6px_24px_rgba(6,29,24,0.12)]">
          {/* LEFT: logo + nav links */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center pl-2" aria-label="Vínculo — inicio">
              <img
                src="/logos/vinculo-horizontal-green.png"
                alt="Vínculo — Growth Marketing"
                className="h-9 w-auto sm:h-8"
              />
            </Link>
            <div className="hidden items-center gap-6 md:flex">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-[14px] text-gray-900 transition-colors duration-300 hover:text-gray-500"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT: clock + CTA (desktop) */}
          <div className="hidden items-center gap-5 md:flex">
            <span className="flex items-center gap-1.5 text-[13px] text-gray-600">
              <Clock size={14} />
              {time} en Montevideo
            </span>
            <HoverRollButton
              text="Agendá una reunión"
              onClick={openCalendly}
              className="bg-[#0C3A30] py-2 pl-5 pr-2 text-white hover:bg-[#0A2E26]"
              textClassName="text-[13px]"
              circleClassName="w-6 h-6 bg-[#F7F5F0]"
              arrowClassName="w-3.5 h-3.5 text-[#0C3A30]"
            />
          </div>

          {/* MOBILE toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0C3A30] text-white md:hidden"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </div>

      <MobileMenu open={menuOpen} time={time} onClose={() => setMenuOpen(false)} />
    </header>
  )
}

interface MobileMenuProps {
  open: boolean
  time: string
  onClose: () => void
}

function MobileMenu({ open, time, onClose }: MobileMenuProps) {
  // Lock body scroll while open.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  const EASE = [0.32, 0.72, 0, 1] as const

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] md:hidden">
          {/* Backdrop */}
          <motion.div
            onClick={onClose}
            className="absolute inset-0 bg-[#061d18]/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Top-right panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            className="absolute right-3 top-3 w-[min(20rem,calc(100vw-1.5rem))] overflow-hidden rounded-2xl bg-[#F7F5F0] shadow-[0_24px_60px_rgba(6,29,24,0.4)]"
            style={{ transformOrigin: 'top right' }}
            initial={{ opacity: 0, scale: 0.9, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -12 }}
            transition={{ duration: 0.28, ease: EASE }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
              <span className="flex items-center gap-1.5 font-jakarta text-[13px] text-gray-500">
                <Clock size={14} />
                {time} en Montevideo
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar menú"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0C3A30] text-white"
              >
                <X size={16} />
              </button>
            </div>

            {/* Links */}
            <nav className="flex flex-col px-2 py-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={onClose}
                  className="group flex items-center justify-between rounded-xl px-3 py-3 transition-colors hover:bg-white"
                >
                  <span className="font-fraunces text-[22px] font-medium text-[#0F1A15]">
                    {link.label}
                  </span>
                  <ArrowUpRight
                    size={20}
                    className="text-[#C8A45A] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="px-4 pb-4 pt-1">
              <button
                type="button"
                onClick={() => {
                  onClose()
                  openCalendly()
                }}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0C3A30] px-6 py-3.5 font-jakarta text-[15px] font-semibold text-white transition-colors hover:bg-[#0A2E26]"
              >
                Agendá una reunión
                <ArrowUpRight size={18} className="text-[#C8A45A]" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
