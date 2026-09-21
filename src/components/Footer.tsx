import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Linkedin, Instagram, MessageCircle } from 'lucide-react'
import { WHATSAPP_URL, openCalendly } from '../lib/constants'

const NAV = [
  { label: 'Inicio', to: '/' },
  { label: 'Servicios', to: '/servicios' },
  { label: 'Nosotros', to: '/quienes-somos' },
  { label: 'Clientes', to: '/#clientes' },
  { label: 'Contacto', to: '/contacto' },
]

const SOLUCIONES = [
  'Publicidad digital',
  'Web y landing pages',
  'Tiendas Mercado Libre',
  'Contenido y creatividades',
  'WhatsApp y automatizaciones',
]

export function Footer() {
  return (
    <footer className="bg-[#072620] px-5 pb-8 pt-14 text-[#F7F5F0] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Brand */}
          <div>
            <img
              src="/logos/vinculo-horizontal-cream.png"
              alt="Vínculo — Growth Marketing"
              className="h-8 w-auto"
            />
            <p className="mt-4 font-jakarta text-[13px] text-[#F7F5F0]/60">
              Growth Marketing · Montevideo, Uruguay
            </p>
            <button
              type="button"
              onClick={openCalendly}
              className="mt-5 rounded-full bg-[#C8A45A] px-5 py-2.5 font-jakarta text-[13px] font-semibold text-[#0F1A15] transition-colors hover:bg-[#B8942F]"
            >
              Agendá una reunión →
            </button>
          </div>

          {/* Navegación */}
          <FooterCol title="Navegación">
            {NAV.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="font-jakarta text-[14px] text-[#F7F5F0]/80 transition-colors hover:text-[#F7F5F0]"
              >
                {item.label}
              </Link>
            ))}
          </FooterCol>

          {/* Soluciones */}
          <FooterCol title="Soluciones">
            {SOLUCIONES.map((item) => (
              <Link
                key={item}
                to="/servicios"
                className="font-jakarta text-[14px] text-[#F7F5F0]/80 transition-colors hover:text-[#F7F5F0]"
              >
                {item}
              </Link>
            ))}
          </FooterCol>

          {/* Contacto */}
          <FooterCol title="Contacto">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-jakarta text-[14px] text-[#F7F5F0]/80 transition-colors hover:text-[#F7F5F0]"
            >
              <MessageCircle size={16} className="text-[#C8A45A]" /> WhatsApp
            </a>
            <a
              href="mailto:lucas@vinculo.uy"
              className="flex items-center gap-2 font-jakarta text-[14px] text-[#F7F5F0]/80 transition-colors hover:text-[#F7F5F0]"
            >
              <Mail size={16} className="text-[#C8A45A]" /> lucas@vinculo.uy
            </a>
            <a
              href="mailto:matias@vinculo.uy"
              className="flex items-center gap-2 font-jakarta text-[14px] text-[#F7F5F0]/80 transition-colors hover:text-[#F7F5F0]"
            >
              <Mail size={16} className="text-[#C8A45A]" /> matias@vinculo.uy
            </a>
            <a
              href="https://www.linkedin.com/company/vinculo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-jakarta text-[14px] text-[#F7F5F0]/80 transition-colors hover:text-[#F7F5F0]"
            >
              <Linkedin size={16} className="text-[#C8A45A]" /> linkedin.com/company/vinculo
            </a>
            <a
              href="https://www.instagram.com/vinculo.uy"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-jakarta text-[14px] text-[#F7F5F0]/80 transition-colors hover:text-[#F7F5F0]"
            >
              <Instagram size={16} className="text-[#C8A45A]" /> @vinculo.uy
            </a>
          </FooterCol>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-[#F7F5F0]/10 pt-6 sm:flex-row">
          <p className="font-jakarta text-[12px] text-[#F7F5F0]/50">
            © {new Date().getFullYear()} Vínculo · Todos los derechos reservados
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/company/vinculo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-[#F7F5F0]/60 transition-colors hover:text-[#C8A45A]"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://www.instagram.com/vinculo.uy"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-[#F7F5F0]/60 transition-colors hover:text-[#C8A45A]"
            >
              <Instagram size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="mb-4 font-jakarta text-[12px] uppercase tracking-[0.2em] text-[#C8A45A]">
        {title}
      </h3>
      <div className="flex flex-col gap-2.5">{children}</div>
    </div>
  )
}
