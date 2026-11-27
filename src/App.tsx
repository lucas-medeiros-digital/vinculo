import { useEffect } from 'react'
import { MotionConfig } from 'framer-motion'
import { Routes, Route } from 'react-router-dom'
import { DiagnosticFormProvider } from './context/DiagnosticFormContext'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { ServicesPage } from './pages/ServicesPage'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { GraciasPage } from './pages/GraciasPage'
import { initGlobalTracking } from './lib/track'

function App() {
  useEffect(() => {
    initGlobalTracking()
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <DiagnosticFormProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/servicios" element={<ServicesPage />} />
            <Route path="/quienes-somos" element={<AboutPage />} />
            <Route path="/contacto" element={<ContactPage />} />
            <Route path="/gracias" element={<GraciasPage />} />
          </Route>
        </Routes>
      </DiagnosticFormProvider>
    </MotionConfig>
  )
}

export default App
