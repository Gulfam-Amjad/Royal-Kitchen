import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { menu } from '../data/menu'
import { useCart } from '../hooks/useCart'
import Img, { type ImageName } from './Img'
import { Reveal, SectionHeading, ease } from './ui'

const TAB_IMAGE: Record<string, { name: ImageName; caption: string }> = {
  kotas: { name: 'kota', caption: 'The Royal, R40' },
  chips: { name: 'loaded-chips', caption: 'Chips, loaded the Royal way' },
  specials: { name: 'burger', caption: 'Dagwood, from R40' },
}

export default function FullMenu() {
  const [active, setActive] = useState(menu[0].id)
  const { add } = useCart()
  const category = menu.find((c) => c.id === active)!
  const image = TAB_IMAGE[active]

  return (
    <section id="menu" className="section-y relative overflow-hidden bg-ink">
      <div className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-royal/10 blur-[120px]" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="The menu"
          title="Big flavour,"
          accent="small prices"
          intro="Straight off our menu board. Tap any item to add it to your order, then send it to us on WhatsApp."
        />

        <Reveal className="mb-10 flex justify-center">
          <div className="inline-flex gap-1 rounded-full bg-white/5 p-1.5 ring-1 ring-white/10" role="tablist" aria-label="Menu categories">
            {menu.map((c) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={active === c.id}
                onClick={() => setActive(c.id)}
                className={`relative min-h-11 rounded-full px-5 text-sm font-bold uppercase tracking-wider transition-colors sm:px-8 ${
                  active === c.id ? 'text-ink' : 'text-cream/70 hover:text-cream'
                }`}
              >
                {active === c.id && (
                  <motion.span layoutId="menu-tab" className="absolute inset-0 rounded-full bg-royal" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                )}
                <span className="relative">{c.label}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <Reveal className="relative hidden lg:block lg:sticky lg:top-28">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] ring-1 ring-white/10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={image.name}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.15 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, ease }}
                >
                  <Img name={image.name} alt={image.caption} sizes="40vw" />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
              <div className="absolute inset-x-6 bottom-6">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-royal">Pictured</p>
                <p className="headline mt-1 text-3xl text-cream">{image.caption}</p>
              </div>
            </div>
            <div className="stripes absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-[2rem] opacity-60" />
          </Reveal>

          <div className="rounded-[2rem] bg-ink-soft p-5 ring-1 ring-white/10 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.ul
                key={category.id}
                initial="hidden"
                animate="show"
                exit="exit"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.06 } },
                  exit: { opacity: 0, transition: { duration: 0.15 } },
                }}
                className="divide-y divide-white/10"
              >
                {category.items.map((item) => (
                  <motion.li
                    key={item.id}
                    variants={{ hidden: { opacity: 0, x: 30 }, show: { opacity: 1, x: 0, transition: { duration: 0.5, ease } } }}
                    className="group flex items-start gap-4 py-5 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-3">
                        <h3 className="headline min-w-0 text-2xl text-cream transition-colors group-hover:text-royal sm:text-[1.7rem]">{item.name}</h3>
                        {item.badge && (
                          <span className="hidden shrink-0 rounded-full bg-sauce/15 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-sauce ring-1 ring-sauce/30 sm:inline">
                            {item.badge}
                          </span>
                        )}
                        <span className="dotted-leader text-cream" />
                        <span className="headline shrink-0 text-2xl text-royal sm:text-[1.7rem]">
                          {item.fromPrice && <span className="mr-1 font-sans text-[0.65rem] font-semibold tracking-widest text-cream/50">FROM</span>}R{item.price}
                        </span>
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-cream/60">{item.description}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => add({ name: item.name, price: item.price })}
                      className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/5 text-cream ring-1 ring-white/15 transition-all duration-300 hover:rotate-90 hover:bg-royal hover:text-ink active:scale-90"
                      aria-label={`Add ${item.name} to order`}
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </motion.li>
                ))}
              </motion.ul>
            </AnimatePresence>
            <p className="mt-8 rounded-2xl bg-royal/10 p-4 text-center text-sm text-cream/75 ring-1 ring-royal/25">
              All kotas come with fresh bread and hot chips. Ask about sauces and extras when you order.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
