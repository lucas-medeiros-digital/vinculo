import { MotionConfig } from 'framer-motion'
import { DiagnosticFormProvider } from './context/DiagnosticFormContext'
import { Hero } from './components/Hero'
import { ProblemsCarousel } from './components/sections/ProblemsCarousel'
import { WhatIsVinculo } from './components/sections/WhatIsVinculo'
import { WhyChooseUs } from './components/sections/WhyChooseUs'
import { OurMethod } from './components/sections/OurMethod'
import { OurSolutions } from './components/sections/OurSolutions'
import { Clients } from './components/sections/Clients'
import { FinalCta } from './components/sections/FinalCta'
import { FloatingWhatsApp } from './components/FloatingWhatsApp'

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <DiagnosticFormProvider>
        <main>
          <Hero />
          <ProblemsCarousel />
          <WhatIsVinculo />
          <WhyChooseUs />
          <OurMethod />
          <OurSolutions />
          <Clients />
          <FinalCta />
        </main>
        <FloatingWhatsApp />
      </DiagnosticFormProvider>
    </MotionConfig>
  )
}

export default App
