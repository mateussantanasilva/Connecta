import { Header } from '@/components/sections/header'
import { Footer } from '@/components/sections/footer'
import { Hero } from '@/components/home/hero'
import { About } from '@/components/home/about'
import { Choose } from '@/components/home/choose'
import { GetStarted } from '@/components/home/get-started'
import { Resources } from '@/components/home/resources'
import { LatestCampaigns } from '@/components/home/latest-campaigns'

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
