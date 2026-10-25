import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { CheckCircle2, Navigation, Phone, ShoppingBag } from 'lucide-react'
import { useState } from 'react'
import { business, whatsappLink } from '../data/business'
import { useCart } from '../hooks/useCart'
import { WhatsAppIcon, ease } from './ui'

export default function FloatingActions() {
  const { count, total, setOpen, toast } = useCart()
  const { scrollY } = useScroll()
  const [show, setShow] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => setShow(y > 500))

  return (
    <>
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.35, ease }}
            className="fixed inset-x-4 bottom-24 z-[70] mx-auto flex max-w-sm items-center gap-3 rounded-2xl bg-cream px-4 py-3 text-ink shadow-2xl md:bottom-28"
            role="status"
          >
            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
            <span className="flex-1 text-sm font-semibold">{toast}</span>
            <button type="button" onClick={() => setOpen(true)} className="text-sm font-extrabold text-sauce">
              View
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop and tablet floating buttons */}
      <div className="fixed bottom-6 right-6 z-[60] hidden flex-col items-end gap-3 md:flex">
        <AnimatePresence>
          {count > 0 && (
            <motion.button
              type="button"
              onClick={() => setOpen(true)}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              className="flex min-h-14 items-center gap-3 rounded-full bg-royal pl-5 pr-2 text-ink shadow-[0_15px_40px_-10px_rgba(255,198,41,0.7)] transition hover:scale-105"
            >
              <span className="text-sm font-extrabold uppercase tracking-wider">View order · R{total}</span>
              <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-ink text-royal">
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-sauce px-1 text-[0.7rem] font-bold text-white">{count}</span>
              </span>
            </motion.button>
          )}
        </AnimatePresence>
        <motion.a
          href={whatsappLink("Hi Royal Kitchen! I'd like to place an order.")}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          data-cart-target
          className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_15px_40px_-10px_rgba(37,211,102,0.8)]"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
          <WhatsAppIcon className="relative h-8 w-8" />
          <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-cream px-4 py-2 text-sm font-bold text-ink opacity-0 shadow-xl transition group-hover:opacity-100">
            Order on WhatsApp
          </span>
        </motion.a>
      </div>

      {/* Mobile bottom action bar */}
      <AnimatePresence>
        {show && (
          <motion.nav
            initial={{ y: '120%' }}
            animate={{ y: 0 }}
            exit={{ y: '120%' }}
            transition={{ duration: 0.45, ease }}
            className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-[60] md:hidden"
            aria-label="Quick actions"
          >
            <div className="grid grid-cols-4 gap-1 rounded-[1.4rem] bg-ink/90 p-1.5 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8)] ring-1 ring-white/10 backdrop-blur-xl">
              <a href={`tel:${business.phones.primary.intl}`} className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl text-[0.68rem] font-bold text-cream/80 active:bg-white/10">
                <Phone className="h-5 w-5" /> Call
              </a>
              <a
                href={whatsappLink("Hi Royal Kitchen! I'd like to place an order.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl text-[0.68rem] font-bold text-[#25D366] active:bg-white/10"
              >
                <WhatsAppIcon className="h-5 w-5" /> WhatsApp
              </a>
              <button
                type="button"
                onClick={() => setOpen(true)}
                data-cart-target
                className="relative flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl bg-royal text-[0.68rem] font-extrabold text-ink active:scale-95"
              >
                <ShoppingBag className="h-5 w-5" />
                {count > 0 ? `R${total}` : 'Order'}
                {count > 0 && (
                  <span className="absolute right-3 top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-sauce px-1 text-[0.65rem] font-bold text-white">{count}</span>
                )}
              </button>
              <a
                href={business.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl text-[0.68rem] font-bold text-cream/80 active:bg-white/10"
              >
                <Navigation className="h-5 w-5" /> Directions
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
