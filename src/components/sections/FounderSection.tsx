import { Check } from 'lucide-react'
import { Reveal } from '../ui/motion'

/** "Quién está detrás" — founder/director trust block before the final CTA. */
export function FounderSection() {
  return (
    <section className="bg-[#0C3A30] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-[1000px]">
        <Reveal className="grid grid-cols-1 items-center gap-10 md:grid-cols-[280px_1fr]">
          <img
            src="/img/lucas.jpg"
            alt="Lucas Medeiros, Founder & Director de Vínculo"
            className="mx-auto w-full max-w-[240px] rounded-2xl border border-white/15 object-cover grayscale md:mx-0 md:max-w-none"
            style={{ aspectRatio: '1 / 1' }}
          />
          <div>
            <p className="font-jakarta text-[13px] font-medium uppercase tracking-[0.2em] text-[#C8A45A]">
              Quién está detrás
            </p>
            <h2
              className="mt-3 font-fraunces font-medium leading-[1.1] tracking-[-0.02em] text-[#F7F5F0]"
              style={{ fontSize: 'clamp(1.6rem, 4vw, 2.6rem)' }}
            >
              Lucas Medeiros
            </h2>
            <p className="mt-1 font-jakarta text-[14px] text-[#F7F5F0]/50">Founder &amp; Director</p>
            <p className="mt-5 max-w-xl font-jakarta text-[15px] leading-relaxed text-[#F7F5F0]/70">
              Más de 5 años ayudando a negocios en Uruguay a crecer. No vengo a venderte un
              servicio suelto: me gusta{' '}
              <strong className="font-semibold text-[#F7F5F0]">integrarme a tu negocio como un socio</strong>{' '}
              — entender cómo funciona y mejorar lo que importa:{' '}
              <strong className="font-semibold text-[#F7F5F0]">tus ventas, tus sistemas, tu día a día</strong>.
              Siempre con la misma regla: primero tu negocio.
            </p>
            <p className="mt-5 inline-flex items-center gap-2 font-jakarta text-[14px] font-semibold text-[#C8A45A]">
              <Check size={16} /> Client first, siempre
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
