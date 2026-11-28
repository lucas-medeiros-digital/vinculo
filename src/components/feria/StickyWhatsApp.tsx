import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { WhatsAppIcon } from '../FloatingWhatsApp'
import { feriaWhatsAppUrl, useStage } from './stage'

/**
 * Bottom bar on small screens once the hero CTA has scrolled away, hidden again
 * when the offer section (which has its own button) is on screen.
 */
export function StickyWhatsApp() {
  const [show, setShow] = useState(false)
  const { stage } = useStage()

  useEffect(() => {
    const onScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.8
      // Hide over the offer and the form: both have their own buttons.
      const ownCta = ['diagnostico', 'formulario'].some((id) => {
        const r = document.getElementById(id)?.getBoundingClientRect()
        return !!r && r.top < window.innerHeight && r.bottom > 0
      })
      setShow(pastHero && !ownCta)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-x-0 bottom-0 z-40 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden"
        >
          <a
            href={feriaWhatsAppUrl(stage)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 rounded-full bg-[#25D366] py-3.5 font-jakarta text-[15px] font-semibold text-[#072620] shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Diagnóstico gratis por WhatsApp
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
