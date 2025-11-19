import Header from '@/components/Header'
import Hero from '@/components/Hero'
import ProblemSection from '@/components/ProblemSection'
import WhatWeDoSection from '@/components/WhatWeDoSection'
import PlatformSection from '@/components/PlatformSection'
import CaseStudiesSection from '@/components/CaseStudiesSection'
import IsThisForMeSection from '@/components/IsThisForMeSection'
import HowWeWorkSection from '@/components/HowWeWorkSection'
import QuickWinEstimator from '@/components/QuickWinEstimator'
import PricingSection from '@/components/PricingSection'
import BookCallSection from '@/components/BookCallSection'
import LeadMagnetSection from '@/components/LeadMagnetSection'
import FAQSection from '@/components/FAQSection'
import Footer from '@/components/Footer'
import MobileStickyCTA from '@/components/MobileStickyCTA'
import ExitIntentModal from '@/components/ExitIntentModal'
import EventTracker from '@/components/EventTracker'

export default function Home() {
  return (
    <main>
      <EventTracker />
      <Header />
      <Hero />
      <ProblemSection />
      <WhatWeDoSection />
      <PlatformSection />
      <CaseStudiesSection />
      <IsThisForMeSection />
      <HowWeWorkSection />
      <QuickWinEstimator />
      <PricingSection />
      <BookCallSection />
      <LeadMagnetSection />
      <FAQSection />
      <Footer />
      <MobileStickyCTA />
      <ExitIntentModal />
    </main>
  )
}
