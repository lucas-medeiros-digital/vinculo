import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Clock, Menu, X } from 'lucide-react'
import { HoverRollButton } from './ui/HoverRollButton'
import { useMontevideoTime } from '../hooks/useMontevideoTime'
import { NAV_LINKS, openCalendly } from '../lib/constants'

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const time = useMontevideoTime()

  return (
    <header className="relative z-20">
      <div className="mx-auto max-w-[1440px] p-2 sm:p-3">
        <nav className="flex items-center justify-between rounded-full bg-white p-[5px] pl-[5px]">
          {/* LEFT: logo + nav links */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center pl-2" aria-label="Vínculo — inicio">
              <img
                src="/logos/vinculo-horizontal-green.png"
                alt="Vínculo — Growth Marketing"
                className="h-7 w-auto sm:h-8"
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
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0C3A30] text-white md:hidden"
          >
            <Menu size={18} />
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
  return (
    <div
      className={`fixed inset-0 z-50 md:hidden ${open ? '' : 'pointer-events-none'}`}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/60 transition-opacity duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Bottom sheet */}
      <div
        className={`absolute inset-x-3 bottom-3 rounded-2xl bg-[#F7F5F0] p-6 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          open ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <span className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[13px] text-gray-600">
            <Clock size={14} />
            {time} en Montevideo
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar menú"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0C3A30] text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={onClose}
              className="font-fraunces text-[28px] font-medium leading-[32px] text-[#0F1A15]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="mt-6">
          <HoverRollButton
            text="Agendá una reunión"
            onClick={() => {
              onClose()
              openCalendly()
            }}
            className="w-full justify-between bg-[#0C3A30] py-3 pl-6 pr-2 text-white hover:bg-[#0A2E26]"
            textClassName="text-[15px]"
            circleClassName="w-8 h-8 bg-[#F7F5F0]"
            arrowClassName="w-4 h-4 text-[#0C3A30]"
          />
        </div>
      </div>
    </div>
  )
}
