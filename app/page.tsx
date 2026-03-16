import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import AboutPrana from '@/components/AboutPrana'
import AboutFather from '@/components/AboutFather'
import Litter from '@/components/Litter'
import AdoptionInfo from '@/components/AdoptionInfo'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <AboutPrana />
      <AboutFather />
      <Litter />
      <AdoptionInfo />
    </main>
  )
}
