import { Compass, Layers, TrendingUp, type LucideIcon } from 'lucide-react'
import { PillBadge } from '../ui/PillBadge'
import { HoverRollButton } from '../ui/HoverRollButton'
import {
  Reveal,
  StaggerGroup,
  StaggerItem,
  AnimatedUnderline,
  CARD_HOVER,
  cardHoverClasses,
} from '../ui/motion'

const PARAGRAPH =
  'Somos la agencia que se sienta con vos a entender tu negocio antes de proponer una sola acción. Diseñamos estrategias digitales integrales, pensadas para el momento de tu empresa.'

interface Pillar {
  icon: LucideIcon
  title: string
  body: string
}

const PILLARS: Pillar[] = [
  {
    icon: Compass,
    title: 'Estrategia primero',
    body: 'Antes de invertir un peso, entendemos tu negocio, tus clientes y tu competencia.',
  },
  {
    icon: Layers,
    title: 'Ejecución integral',
    body: 'Pauta, contenido, web y automatizaciones bajo una misma dirección estratégica.',
  },
  {
    icon: TrendingUp,
    title: 'Resultados medibles',
    body: 'Reportes claros, métricas que importan y decisiones basadas en datos, no en intuición.',
  },
]

export function WhatIsVinculo() {
  return (
    <section className="overflow-hidden bg-white pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-24 lg:pt-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Centered header */}
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <PillBadge label="Quiénes somos" />
          </div>
          <h2
            className="mt-6 font-fraunces font-medium leading-[1.12] tracking-[-0.02em] text-[#0F1A15]"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 3.2rem)' }}
          >
            Más que una agencia.{' '}
            <span className="whitespace-nowrap">
              Un <AnimatedUnderline>socio digital</AnimatedUnderline>.
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl font-inter text-[15px] leading-[1.6] text-gray-600 sm:text-[16px]">
            {PARAGRAPH}
          </p>
        </Reveal>

        {/* 3-column pillars */}
        <StaggerGroup className="mt-12 grid grid-cols-1 gap-8 sm:mt-16 lg:grid-cols-3">
          {PILLARS.map((pillar) => (
            <PillarCard key={pillar.title} {...pillar} />
          ))}
        </StaggerGroup>

        {/* Centered button below the grid */}
        <Reveal className="mt-10 flex justify-center sm:mt-12">
          <HoverRollButton
            text="Conocé nuestro método"
            href="#metodo"
            className="bg-[#C8A45A] py-2.5 pl-5 text-[#0F1A15] hover:bg-[#B8942F]"
            textClassName="text-[13px] sm:text-[14px]"
            circleClassName="w-8 h-8 bg-[#F7F5F0]"
            arrowClassName="w-4 h-4 text-[#0F1A15]"
          />
        </Reveal>
      </div>
    </section>
  )
}

function PillarCard({ icon: Icon, title, body }: Pillar) {
  return (
    <StaggerItem
      whileHover={CARD_HOVER}
      className={`group flex h-full flex-col items-center rounded-xl border border-[#EBE8DF] bg-[#F7F5F0] p-8 text-center sm:rounded-2xl ${cardHoverClasses}`}
    >
      <span className="grid h-11 w-11 place-items-center rounded-full bg-[#153B2E] transition-all duration-300 group-hover:rotate-6 group-hover:bg-[#C8A45A]">
        <Icon size={20} className="text-[#F7F5F0] transition-colors duration-300 group-hover:text-[#153B2E]" />
      </span>
      <h3 className="mb-2 mt-4 font-fraunces text-[20px] font-medium leading-tight text-[#0F1A15] sm:text-[22px]">
        {title}
      </h3>
      <p className="font-inter text-[14px] leading-relaxed text-gray-600 sm:text-[15px]">
        {body}
      </p>
    </StaggerItem>
  )
}
