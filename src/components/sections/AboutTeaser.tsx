import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { ToolsStrip } from '../ToolsStrip'
import { Reveal, AnimatedUnderline } from '../ui/motion'

export function AboutTeaser() {
  return (
    <section className="bg-[#F7F5F0] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-[1200px]">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-jakarta text-[13px] font-medium uppercase tracking-[0.2em] text-[#C8A45A]">
            Quiénes somos
          </p>
          <h2
            className="mt-3 font-fraunces font-medium leading-[1.12] tracking-[-0.02em] text-[#0F1A15]"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}
          >
            Un equipo obsesionado con tus{' '}
            <AnimatedUnderline>resultados</AnimatedUnderline>.
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-jakarta text-[15px] leading-relaxed text-gray-600">
            No vendemos acciones sueltas. Nos integramos a tu negocio como un socio
            estratégico para profesionalizar lo digital y escalar lo que ya
            funciona — con estrategia, tecnología y las mejores herramientas.
          </p>
          <Link
            to="/quienes-somos"
            className="group mt-7 inline-flex items-center gap-2 rounded-full border border-[#0C3A30] px-6 py-3 font-jakarta text-[14px] font-semibold text-[#0C3A30] transition-colors hover:bg-[#0C3A30] hover:text-white"
          >
            Conocé más sobre nosotros
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <ToolsStrip className="mt-14 sm:mt-16" />
      </div>
    </section>
  )
}
