import { motion } from 'framer-motion'
import { HeroShader } from './HeroShader'
import { Navbar } from './Navbar'
import { IsoV3D } from './IsoV3D'
import { HoverRollButton } from './ui/HoverRollButton'
import { staggerContainer, fadeUpItem } from './ui/motion'

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-[#F7F5F0]">
      <HeroShader />

      {/* Navigation lives inside the hero so it floats over the shader */}
      <Navbar />

      {/* Interactive 3D "V" — absolutely placed so it never reflows the content.
          Mobile: centered in the blank space above the headline.
          Desktop: off to the right side. */}
      <IsoV3D className="absolute left-1/2 top-[15%] z-20 h-40 w-40 -translate-x-1/2 sm:h-52 sm:w-52 lg:left-auto lg:right-[7%] lg:top-1/2 lg:h-64 lg:w-64 lg:-translate-y-1/2 lg:translate-x-0" />

      {/* Hero content pinned to the bottom of the viewport */}
      <div className="relative z-20 flex flex-1 flex-col">
        <div className="flex-1" />
        <motion.div
          className="mx-auto w-full max-w-[1440px] px-5 pb-14 sm:px-8 sm:pb-16 lg:px-12 lg:pb-20"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={fadeUpItem}
            className="mb-5 font-inter text-[13px] tracking-wide text-gray-900 sm:mb-8 sm:text-[14px]"
          >
            Vínculo — Growth Marketing
          </motion.p>

          <motion.h1
            variants={fadeUpItem}
            className="font-fraunces font-medium leading-[1.08] tracking-[-0.03em] text-[#0F1A15]"
            style={{ fontSize: 'clamp(1.75rem, 7vw, 4.2rem)' }}
          >
            <span
              className="block sm:contents"
              style={{ fontSize: 'inherit' }}
            >
              Tu socio para escalar<span className="sm:hidden"> </span>
              <br className="hidden sm:block" />
              el negocio que ya funciona.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUpItem}
            className="mt-5 max-w-xl font-inter text-[15px] leading-relaxed text-gray-700 sm:mt-6 sm:text-[17px]"
          >
            Ya estás vendiendo. Profesionalizamos tu presencia digital, te
            devolvemos tiempo y escalamos lo que funciona — con estrategia y
            ejecución medible.
          </motion.p>

          <motion.div
            variants={fadeUpItem}
            className="mt-8 flex flex-col gap-4 sm:mt-12 sm:flex-row sm:items-center sm:gap-5"
          >
            <HoverRollButton
              text="Solicitar diagnóstico gratis"
              href="#contacto"
              className="self-start bg-[#C8A45A] py-2 pl-5 text-[#0F1A15] hover:bg-[#B8942F] sm:pl-6"
              textClassName="text-[13px] sm:text-[14px]"
              circleClassName="w-7 h-7 sm:w-8 sm:h-8 bg-[#F7F5F0]"
              arrowClassName="w-4 h-4 text-[#0F1A15]"
            />

            <PartnerBadge />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function PartnerBadge() {
  return (
    <div className="inline-flex items-center gap-2.5 self-start rounded-[4px] bg-white px-3 py-2 shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-shadow duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        className="h-5 w-5 fill-current text-[#0C3A30] sm:h-6 sm:w-6"
        aria-hidden="true"
      >
        <path d="m19.6 66.5 19.7-11 .3-1-.3-.5h-1l-3.3-.2-11.2-.3L14 53l-9.5-.5-2.4-.5L0 49l.2-1.5 2-1.3 2.9.2 6.3.5 9.5.6 6.9.4L38 49.1h1.6l.2-.7-.5-.4-.4-.4L29 41l-10.6-7-5.6-4.1-3-2-1.5-2-.6-4.2 2.7-3 3.7.3.9.2 3.7 2.9 8 6.1L37 36l1.5 1.2.6-.4.1-.3-.7-1.1L33 25l-6-10.4-2.7-4.3-.7-2.6c-.3-1-.4-2-.4-3l3-4.2L28 0l4.2.6L33.8 2l2.6 6 4.1 9.3L47 29.9l2 3.8 1 3.4.3 1h.7v-.5l.5-7.2 1-8.7 1-11.2.3-3.2 1.6-3.8 3-2L61 2.6l2 2.9-.3 1.8-1.1 7.7L59 27.1l-1.5 8.2h.9l1-1.1 4.1-5.4 6.9-8.6 3-3.5L77 13l2.3-1.8h4.3l3.1 4.7-1.4 4.9-4.4 5.6-3.7 4.7-5.3 7.1-3.2 5.7.3.4h.7l12-2.6 6.4-1.1 7.6-1.3 3.5 1.6.4 1.6-1.4 3.4-8.2 2-9.6 2-14.3 3.3-.2.1.2.3 6.4.6 2.8.2h6.8l12.6 1 3.3 2 1.9 2.7-.3 2-5.1 2.6-6.8-1.6-16-3.8-5.4-1.3h-.8v.4l4.6 4.5 8.3 7.5L89 80.1l.5 2.4-1.3 2-1.4-.2-9.2-7-3.6-3-8-6.8h-.5v.7l1.8 2.7 9.8 14.7.5 4.5-.7 1.4-2.6 1-2.7-.6-5.8-8-6-9-4.7-8.2-.5.4-2.9 30.2-1.3 1.5-3 1.2-2.5-2-1.4-3 1.4-6.2 1.6-8 1.3-6.4 1.2-7.9.7-2.6v-.2H49L43 72l-9 12.3-7.2 7.6-1.7.7-3-1.5.3-2.8L24 86l10-12.8 6-7.9 4-4.6-.1-.5h-.3L17.2 77.4l-4.7.6-2-2 .2-3 1-1 8-5.5Z" />
      </svg>
      <span className="font-inter text-[13px] font-medium text-[#0F1A15] sm:text-[14px]">
        Meta Business Partner
      </span>
      <span className="rounded bg-[#0C3A30] px-1.5 py-0.5 text-[10px] text-white sm:px-2 sm:text-[11px]">
        Certificado
      </span>
    </div>
  )
}
