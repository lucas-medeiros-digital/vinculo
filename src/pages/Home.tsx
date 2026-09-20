import { Hero } from '../components/Hero'
import { ProblemsCarousel } from '../components/sections/ProblemsCarousel'
import { WhatIsVinculo } from '../components/sections/WhatIsVinculo'
import { WhyChooseUs } from '../components/sections/WhyChooseUs'
import { PopularServices } from '../components/sections/PopularServices'
import { OurSolutions } from '../components/sections/OurSolutions'
import { Clients } from '../components/sections/Clients'
import { FinalCta } from '../components/sections/FinalCta'

export function Home() {
  return (
    <>
      <Hero />
      <ProblemsCarousel />
      <WhatIsVinculo />
      <WhyChooseUs />
      <PopularServices />
      <OurSolutions />
      <Clients />
      <FinalCta />
    </>
  )
}
