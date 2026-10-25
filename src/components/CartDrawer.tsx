import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useCart } from '../hooks/useCart'
import { WhatsAppIcon, ease } from './ui'

export default function CartDrawer() {
  const { items, total, count, open, setOpen, inc, dec, remove, clear, orderLink } = useCart()
  const [name, setName] = useState('')
  const [note, setNote] = useState('')
  const hidden = window.matchMedia('(min-width: 640px)').matches ? { x: '100%', y: 0 } : { y: '100%', x: 0 }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    document.documentElement.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
    }
  }, [open, setOpen])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[90] bg-ink/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Your order"
            className="fixed inset-x-0 bottom-0 z-[95] flex max-h-[92svh] flex-col rounded-t-[2rem] bg-ink-soft text-cream shadow-2xl ring-1 ring-white/10 sm:inset-y-0 sm:left-auto sm:right-0 sm:max-h-none sm:w-[26rem] sm:rounded-none sm:rounded-l-[2rem]"
            initial={hidden}
            animate={{ y: 0, x: 0 }}
            exit={hidden}
            transition={{ duration: 0.5, ease }}
            data-lenis-prevent
          >
            <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-white/20 sm:hidden" />
            <header className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div>
                <h2 className="headline text-3xl">Your order</h2>
                <p className="text-xs text-cream/50">
                  {count} item{count === 1 ? '' : 's'} · Collect at 161 Madiba Street
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 hover:bg-royal hover:text-ink"
                aria-label="Close order"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 py-16 text-center">
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-royal/10 text-royal">
                  <ShoppingBag className="h-9 w-9" />
                </span>
                <p className="headline mt-6 text-3xl">Nothing here yet</p>
                <p className="mt-2 text-sm text-cream/60">Add a kota or two from the menu and send your order straight to our WhatsApp.</p>
                <a
                  href="#menu"
                  onClick={() => setOpen(false)}
                  className="mt-6 inline-flex min-h-12 items-center rounded-full bg-royal px-6 text-sm font-extrabold uppercase tracking-wider text-ink"
                >
                  Browse the menu
                </a>
              </div>
            ) : (
              <>
                <ul className="flex-1 space-y-3 overflow-y-auto px-6 py-5">
                  <AnimatePresence initial={false}>
                    {items.map((i) => (
                      <motion.li
                        key={i.key}
                        layout
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40, height: 0, marginTop: 0 }}
                        className="flex items-center gap-3 rounded-2xl bg-ink p-3 ring-1 ring-white/10"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-bold">{i.name}</p>
                          {i.detail && <p className="truncate text-xs text-cream/50">{i.detail}</p>}
                          <p className="mt-0.5 text-sm font-bold text-royal">R{i.price * i.qty}</p>
                        </div>
                        <div className="flex items-center gap-1 rounded-full bg-white/5 p-1">
                          <button type="button" onClick={() => dec(i.key)} className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/10" aria-label={`Less ${i.name}`}>
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-6 text-center text-sm font-bold tabular-nums">{i.qty}</span>
                          <button type="button" onClick={() => inc(i.key)} className="flex h-9 w-9 items-center justify-center rounded-full bg-royal text-ink" aria-label={`More ${i.name}`}>
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <button type="button" onClick={() => remove(i.key)} className="flex h-9 w-9 items-center justify-center rounded-full text-cream/40 hover:text-sauce" aria-label={`Remove ${i.name}`}>
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>

                <div className="space-y-3 border-t border-white/10 px-6 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="min-h-12 rounded-xl bg-ink px-4 text-base text-cream ring-1 ring-white/10 outline-none placeholder:text-cream/35 focus:ring-royal sm:text-sm"
                      aria-label="Your name"
                    />
                    <input
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Note (e.g. no atchar)"
                      className="min-h-12 rounded-xl bg-ink px-4 text-base text-cream ring-1 ring-white/10 outline-none placeholder:text-cream/35 focus:ring-royal sm:text-sm"
                      aria-label="Order note"
                    />
                  </div>
                  <div className="flex items-end justify-between">
                    <button type="button" onClick={clear} className="text-xs font-semibold text-cream/50 underline-offset-4 hover:text-sauce hover:underline">
                      Clear order
                    </button>
                    <p className="text-right">
                      <span className="block text-xs uppercase tracking-widest text-cream/50">Total</span>
                      <motion.span key={total} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className="headline inline-block text-4xl text-royal">
                        R{total}
                      </motion.span>
                    </p>
                  </div>
                  <a
                    href={orderLink(name.trim(), note.trim())}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[#25D366] text-base font-extrabold uppercase tracking-wider text-white shadow-[0_10px_40px_-10px_rgba(37,211,102,0.7)] transition hover:brightness-110 active:scale-[0.98]"
                  >
                    <WhatsAppIcon className="h-6 w-6" /> Send order on WhatsApp
                  </a>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
