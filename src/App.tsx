import Lenis from 'lenis'
import { lazy, Suspense, useEffect, useState } from 'react'
import Bestsellers from './components/Bestsellers'
import CartDrawer from './components/CartDrawer'
import { BackToTop, Cursor, FlyToCart, ScrollProgress } from './components/Extras'
import FloatingActions from './components/FloatingActions'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Preloader from './components/Preloader'
import Ticker from './components/Ticker'

const KotaBuilder = lazy(() => import('./components/KotaBuilder'))
const FullMenu = lazy(() => import('./components/FullMenu'))
const WeeklySpecials = lazy(() => import('./components/WeeklySpecials'))
const OurStory = lazy(() => import('./components/OurStory'))
const Gallery = lazy(() => import('./components/Gallery'))
const Reviews = lazy(() => import('./components/Reviews'))
const HoursLocation = lazy(() => import('./components/HoursLocation'))
const OrderCTA = lazy(() => import('./components/OrderCTA'))

export default function App() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: 1.1, anchors: { offset: -80 } })
    let raf = 0
    const loop = (t: number) => {
      lenis.raf(t)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <Navbar />
      <main>
        <Hero ready={ready} />
        <Ticker />
        <Bestsellers />
        <Suspense fallback={<div className="min-h-screen bg-ink" />}>
          <KotaBuilder />
          <FullMenu />
          <WeeklySpecials />
          <OurStory />
          <Gallery />
          <Reviews />
          <HoursLocation />
          <OrderCTA />
        </Suspense>
      </main>
      <Footer />
      <FloatingActions />
      <CartDrawer />
      <ScrollProgress />
      <BackToTop />
      <FlyToCart />
      <Cursor />
    </>
  )
}
