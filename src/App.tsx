import { MotionConfig } from 'framer-motion'
import { Routes, Route } from 'react-router-dom'
import { DiagnosticFormProvider } from './context/DiagnosticFormContext'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { ServicesPage } from './pages/ServicesPage'
import { ContactPage } from './pages/ContactPage'

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <DiagnosticFormProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/servicios" element={<ServicesPage />} />
            <Route path="/contacto" element={<ContactPage />} />
          </Route>
        </Routes>
      </DiagnosticFormProvider>
    </MotionConfig>
  )
}

export default App
