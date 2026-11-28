import { useEffect } from 'react'
import { FeriaHero } from '../components/feria/FeriaHero'
import { YearTurn } from '../components/feria/YearTurn'
import { BrandMap } from '../components/feria/BrandMap'
import { FeriaForm } from '../components/feria/FeriaForm'
import { NotificationRush } from '../components/feria/NotificationRush'
import { PhoneStory } from '../components/feria/PhoneStory'
import { SearchMock } from '../components/feria/SearchMock'
import { FeriaWork } from '../components/feria/FeriaWork'
import { FeriaOffer } from '../components/feria/FeriaOffer'
import { StickyWhatsApp } from '../components/feria/StickyWhatsApp'
import { StageProvider } from '../components/feria/stage'
import { CONTACT_EMAILS } from '../lib/constants'

/**
 * /feria — landing for stands met at a month-long artisan fair (opened from a QR).
 * Visitors pick where their brand is today; the brand map, phone story, form and
 * WhatsApp message adapt to that. The form emails Lucas via Web3Forms (once
 * WEB3FORMS_ACCESS_KEY is set) or goes to WhatsApp. Standalone: no site navbar.
 */
export function FeriaPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
    const prev = document.title
    document.title = 'Vínculo | Arrancá el 2027 con tu marca conectada'
    return () => {
      document.title = prev
    }
  }, [])

  return (
    <StageProvider>
      <main className="bg-[#F7F5F0]">
        <FeriaHero />
        <YearTurn />
        <BrandMap />
        <PhoneStory />
        <SearchMock />
        <FeriaWork />
        <NotificationRush />
        <FeriaOffer />
        <FeriaForm />

        <footer className="bg-[#072620] px-5 pb-28 pt-4 sm:px-8 md:pb-10 lg:px-12">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 border-t border-[#F7F5F0]/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <img src="/logos/vinculo-horizontal-cream.png" alt="Vínculo" className="h-7 w-auto self-start" />
            <div className="flex flex-col gap-1 font-jakarta text-[14px] text-[#F7F5F0]/60 sm:flex-row sm:gap-6">
              <a href={`mailto:${CONTACT_EMAILS[0]}`} className="hover:text-[#F7F5F0]">{CONTACT_EMAILS[0]}</a>
              <a href="/" className="hover:text-[#F7F5F0]">Conocé más en vinculo.uy</a>
            </div>
          </div>
        </footer>

        <StickyWhatsApp />
      </main>
    </StageProvider>
  )
}
