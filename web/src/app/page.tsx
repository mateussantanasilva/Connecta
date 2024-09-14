import { Header } from '@/components/sections/header'
import { Footer } from '@/components/sections/footer'
import { Hero } from '@/components/sections/home/hero'
import { About } from '@/components/sections/home/about'
import { Choose } from '@/components/sections/home/choose'
import { GetStarted } from '@/components/sections/home/get-started'
import { Resources } from '@/components/sections/home/resources'
import { LatestCampaigns } from '@/components/sections/home/latest-campaigns'

export default function Home() {
  return (
    <>
      <div className="bg-gradient-to-t from-green-600/0 to-green-600/20">
        <Header />

        <Hero />
      </div>

      <main>
        <About />

        <Choose />

        <GetStarted />

        <Resources />

        <LatestCampaigns />
      </main>

      <Footer />
    </>
  )
}
