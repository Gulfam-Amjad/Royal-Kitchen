import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Menu, Phone, ShoppingBag, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { business } from '../data/business'
import { useCart } from '../hooks/useCart'
import { useOpenStatus } from '../hooks/useOpenStatus'
import Logo, { Wordmark } from './Logo'
import { ease } from './ui'

export const NAV_LINKS = [
  { href: '#menu', label: 'Menu' },
  { href: '#build', label: 'Build a Kota' },
  { href: '#specials', label: 'Specials' },
  { href: '#story', label: 'Our Story' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#visit', label: 'Visit' },
]

export function StatusPill({ className = '' }: { className?: string }) {
  const { isOpen, closingSoon, label } = useOpenStatus()
  const dot = isOpen ? (closingSoon ? 'bg-royal' : 'bg-emerald-400') : 'bg-sauce'
  return (
    <span className={`inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-xs font-semibold text-cream/90 ring-1 ring-white/10 ${className}`}>
      <span className="relative flex h-2 w-2">
        {isOpen && <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${dot}`} />}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${dot}`} />
      </span>
      {label}
    </span>
  )
}

export default function Navbar() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { count, setOpen } = useCart()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 40)
    setHidden(y > 600 && y > prev && !menuOpen)
  })

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden ? '-110%' : '0%' }}
        transition={{ duration: 0.4, ease }}
      >
        <div
          className={`transition-all duration-500 ${
            scrolled ? 'bg-ink/80 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl' : 'bg-transparent'
          }`}
        >
          <nav className={`container-x flex items-center justify-between gap-4 transition-all duration-500 ${scrolled ? 'py-3' : 'py-5'}`}>
            <a href="#top" className="flex items-center gap-3 text-royal" aria-label="Royal Kitchen home">
              <Logo className="h-11 w-11 md:h-12 md:w-12" />
              <span className="hidden sm:block">
                <Wordmark className="text-lg text-cream" />
              </span>
            </a>

            <ul className="hidden items-center gap-1 xl:flex">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="group relative rounded-full px-4 py-2 text-sm font-semibold text-cream/80 transition-colors hover:text-royal"
                  >
                    {l.label}
                    <span className="absolute inset-x-4 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-royal transition-transform duration-300 group-hover:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2 md:gap-3">
              <AnimatePresence>
                {scrolled && (
                  <motion.span
                    className="hidden 2xl:inline-flex"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                  >
                    <StatusPill />
                  </motion.span>
                )}
              </AnimatePresence>
              <button
                type="button"
                onClick={() => setOpen(true)}
                data-cart-target
                className="relative flex h-11 w-11 items-center justify-center rounded-full bg-royal text-ink transition-transform hover:scale-105"
                aria-label={`Open your order (${count} items)`}
              >
                <ShoppingBag className="h-5 w-5" />
                <AnimatePresence>
                  {count > 0 && (
                    <motion.span
                      key={count}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-sauce px-1 text-[0.7rem] font-bold text-white ring-2 ring-ink"
                    >
                      {count}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
              <a
                href={`tel:${business.phones.primary.intl}`}
                className="hidden h-11 items-center gap-2 rounded-full px-5 text-sm font-bold text-cream ring-2 ring-cream/20 transition hover:text-royal hover:ring-royal md:inline-flex"
              >
                <Phone className="h-4 w-4" /> {business.phones.primary.display}
              </a>
              <button
                type="button"
                onClick={() => setMenuOpen((o) => !o)}
                className="flex h-11 w-11 items-center justify-center rounded-full text-cream ring-2 ring-cream/20 xl:hidden"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-royal text-ink xl:hidden"
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.6, ease }}
          >
            <div className="container-x flex flex-1 flex-col justify-center pt-24 pb-10">
              <ul className="space-y-1">
                {NAV_LINKS.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease }}
                  >
                    <a
                      href={l.href}
                      onClick={() => setMenuOpen(false)}
                      className="headline block py-1.5 text-[clamp(2.4rem,11vw,4.5rem)] transition-colors hover:text-sauce"
                    >
                      {l.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                className="mt-10 space-y-3 border-t-2 border-ink/15 pt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <p className="text-sm font-semibold uppercase tracking-widest text-ink/60">Call or WhatsApp</p>
                <a href={`tel:${business.phones.primary.intl}`} className="block text-2xl font-bold">
                  {business.phones.primary.display}
                </a>
                <p className="text-ink/70">
                  {business.address.street}, {business.address.area}, {business.address.city}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
