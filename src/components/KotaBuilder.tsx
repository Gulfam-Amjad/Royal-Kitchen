import { AnimatePresence, motion } from 'framer-motion'
import { Check, Minus, Plus, ShoppingBag } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { KOTA_INGREDIENTS, KOTA_TIERS, type IngredientId } from '../data/menu'
import { useCart } from '../hooks/useCart'
import { Reveal, SectionHeading, ease } from './ui'

/** Stylised layer artwork for each ingredient (bottom to top inside the loaf). */
const LAYER_ART: Record<IngredientId | 'chips', { h: number; node: ReactNode }> = {
  chips: {
    h: 34,
    node: (
      <div className="relative h-full w-full">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="absolute bottom-0 h-[115%] w-[7%] rounded-sm bg-gradient-to-b from-[#FFE08A] to-[#E9A92C] shadow-sm"
            style={{ left: `${3 + i * 6.8}%`, transform: `rotate(${(i % 2 ? 1 : -1) * (8 + (i % 4) * 6)}deg)` }}
          />
        ))}
      </div>
    ),
  },
  atchar: {
    h: 16,
    node: (
      <div className="relative h-full w-full rounded-full bg-gradient-to-r from-[#E8961E] via-[#F6B13D] to-[#D9821A]">
        {Array.from({ length: 16 }).map((_, i) => (
          <span key={i} className="absolute h-1.5 w-1.5 rounded-full bg-[#7FA33A]" style={{ left: `${5 + i * 6}%`, top: `${i % 2 ? 25 : 55}%` }} />
        ))}
      </div>
    ),
  },
  polony: {
    h: 18,
    node: (
      <div className="flex h-full w-full items-center justify-around px-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className="h-full w-[19%] rounded-[50%] bg-gradient-to-b from-[#F7A1A1] to-[#E07C7C] ring-2 ring-[#C25555]/50" />
        ))}
      </div>
    ),
  },
  vienna: {
    h: 16,
    node: (
      <div className="flex h-full w-full items-center justify-between gap-1 px-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <span key={i} className="h-full flex-1 rounded-full bg-gradient-to-b from-[#E2725B] to-[#B5452F]" />
        ))}
      </div>
    ),
  },
  cheese: {
    h: 14,
    node: (
      <div className="relative h-full w-full">
        <div className="h-full w-full rounded-md bg-gradient-to-b from-[#FFE066] to-[#FFC629]" />
        {[12, 34, 58, 80].map((l) => (
          <span key={l} className="absolute top-[85%] h-4 w-3 rounded-b-full bg-[#FFC629]" style={{ left: `${l}%` }} />
        ))}
      </div>
    ),
  },
  russian: {
    h: 22,
    node: (
      <div className="flex h-full w-full items-center gap-1.5 px-1">
        <span className="h-full flex-1 rounded-full bg-gradient-to-b from-[#C9372C] to-[#7D1A14] shadow-inner" />
        <span className="h-full flex-1 rounded-full bg-gradient-to-b from-[#C9372C] to-[#7D1A14] shadow-inner" />
      </div>
    ),
  },
  egg: {
    h: 18,
    node: (
      <div className="relative flex h-full w-full items-center justify-center rounded-[50%] bg-[#FFF8E7] shadow">
        <span className="h-[85%] w-[22%] rounded-full bg-gradient-to-br from-[#FFD23F] to-[#F5A700]" />
      </div>
    ),
  },
  patty: {
    h: 22,
    node: <div className="h-full w-full rounded-xl bg-gradient-to-b from-[#7A4422] via-[#5C3317] to-[#3B1F0D] shadow-inner" />,
  },
}

const BASE: IngredientId[] = ['atchar', 'polony', 'vienna']
const LAYER_SCALE = typeof window !== 'undefined' && window.matchMedia('(min-width: 640px)').matches ? 1.55 : 1.2
const layerHeight = (l: IngredientId | 'chips') => Math.round(LAYER_ART[l].h * LAYER_SCALE)

export default function KotaBuilder() {
  const [tier, setTier] = useState(2)
  const { add } = useCart()

  const current = KOTA_TIERS[tier]
  const extras = KOTA_TIERS.slice(1, tier + 1).map((t) => t.adds!) as IngredientId[]
  const included = new Set<IngredientId>([...BASE, ...extras])
  const layers: (IngredientId | 'chips')[] = ['chips', ...BASE, ...extras]
  const stackHeight = layers.reduce((s, l) => s + layerHeight(l) - 6, 0)

  const ingredientsText = KOTA_INGREDIENTS.filter((i) => included.has(i.id)).map((i) => i.label.toLowerCase())

  return (
    <section id="build" className="section-y relative overflow-hidden bg-royal text-ink">
      <div className="stripes absolute inset-x-0 top-0 h-3 opacity-90" />
      <div className="stripes absolute inset-x-0 bottom-0 h-3 opacity-90" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: 'radial-gradient(#0B0B0B 1.5px, transparent 1.5px)', backgroundSize: '22px 22px' }}
      />

      <div className="container-x relative">
        <SectionHeading
          tone="light"
          eyebrow="Build your own"
          title="Stack your"
          accent="Kota"
          intro="Every kota starts with fresh bread, hot chips, atchar, polony and vienna. Pick your level and watch it stack up. Prices straight off our menu board."
        />

        <div className="grid items-center gap-4 sm:gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative mx-auto flex h-[22rem] w-full max-w-lg items-end justify-center sm:h-[32rem]">
              <div className="absolute bottom-2 h-8 w-[85%] rounded-[50%] bg-ink/20 blur-md" />

              <div className="relative mb-6 w-[88%]">
                <motion.div
                  className="absolute inset-x-[-3%] z-20 h-20 rounded-t-[3rem] rounded-b-lg bg-gradient-to-b from-[#F7D774] via-[#EAB54A] to-[#C98A2E] shadow-[inset_0_-6px_0_rgba(0,0,0,0.12)]"
                  animate={{ bottom: stackHeight + 62, rotate: tier >= 3 ? -6 : -3 }}
                  transition={{ type: 'spring', stiffness: 140, damping: 16 }}
                >
                  {Array.from({ length: 9 }).map((_, i) => (
                    <span
                      key={i}
                      className="absolute h-2.5 w-4 rounded-full bg-[#9E6420]/40"
                      style={{ left: `${10 + i * 9}%`, top: `${30 + (i % 3) * 14}%` }}
                    />
                  ))}
                </motion.div>

                <div className="relative z-10 flex flex-col-reverse px-[5%] pb-14">
                  <AnimatePresence initial={false}>
                    {layers.map((l, i) => (
                      <motion.div
                        key={l}
                        layout
                        initial={{ opacity: 0, y: -160, scale: 0.8, rotate: i % 2 ? 6 : -6 }}
                        animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, y: -120, scale: 0.8, transition: { duration: 0.3 } }}
                        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                        style={{ height: layerHeight(l), marginTop: -6, zIndex: i }}
                        className="relative"
                      >
                        {LAYER_ART[l].node}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <div className="absolute inset-x-0 bottom-0 z-[15] h-20 rounded-b-[2rem] rounded-t-md bg-gradient-to-b from-[#F0C463] via-[#DDA247] to-[#B9792A] shadow-[inset_0_6px_0_rgba(255,255,255,0.25)]" />
              </div>

              <AnimatePresence mode="popLayout">
                <motion.div
                  key={current.price}
                  initial={{ scale: 0, rotate: -40 }}
                  animate={{ scale: 1, rotate: 12 }}
                  exit={{ scale: 0, rotate: 40 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 14 }}
                  className="absolute right-0 top-2 z-30 flex h-24 w-24 flex-col items-center justify-center rounded-full bg-sauce text-white shadow-2xl sm:h-28 sm:w-28"
                >
                  <span className="text-[0.65rem] font-bold uppercase tracking-widest">Only</span>
                  <span className="headline text-4xl sm:text-5xl">R{current.price}</span>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-[2rem] bg-ink p-6 text-cream shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-royal">Choose your level</p>

              <div className="mt-4 grid grid-cols-5 gap-2" role="radiogroup" aria-label="Kota price level">
                {KOTA_TIERS.map((t, i) => (
                  <button
                    key={t.price}
                    type="button"
                    role="radio"
                    aria-checked={tier === i}
                    onClick={() => setTier(i)}
                    className={`relative min-h-14 rounded-2xl text-center transition-colors duration-300 ${
                      tier === i ? 'text-ink' : 'bg-white/5 text-cream/80 hover:bg-white/10'
                    }`}
                  >
                    {tier === i && (
                      <motion.span layoutId="tier-pill" className="absolute inset-0 rounded-2xl bg-royal" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
                    )}
                    <span className="headline relative text-xl sm:text-2xl">R{t.price}</span>
                  </button>
                ))}
              </div>

              <ul className="mt-7 grid grid-cols-2 gap-2.5">
                {KOTA_INGREDIENTS.map((ing) => {
                  const on = included.has(ing.id)
                  return (
                    <li
                      key={ing.id}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-300 ${
                        on ? 'bg-royal/10 text-cream ring-1 ring-royal/40' : 'bg-white/[0.03] text-cream/35'
                      }`}
                    >
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${on ? 'scale-100' : 'scale-75 opacity-40'}`}
                        style={{ backgroundColor: ing.color }}
                      >
                        {on && <Check className="h-3.5 w-3.5 text-ink" strokeWidth={3} />}
                      </span>
                      {ing.label}
                    </li>
                  )
                })}
                <li className="flex items-center gap-3 rounded-xl bg-royal/10 px-3 py-2.5 text-sm font-semibold text-cream ring-1 ring-royal/40">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F0C463]">
                    <Check className="h-3.5 w-3.5 text-ink" strokeWidth={3} />
                  </span>
                  Chips & bread
                </li>
              </ul>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex items-center justify-between gap-2 rounded-full bg-white/5 p-1.5 ring-1 ring-white/10">
                  <button
                    type="button"
                    onClick={() => setTier((t) => Math.max(0, t - 1))}
                    disabled={tier === 0}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 transition hover:bg-white/15 disabled:opacity-30"
                    aria-label="Remove a topping"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="min-w-24 text-center text-xs font-bold uppercase tracking-wider text-cream/70">
                    {included.size} fillings
                  </span>
                  <button
                    type="button"
                    onClick={() => setTier((t) => Math.min(KOTA_TIERS.length - 1, t + 1))}
                    disabled={tier === KOTA_TIERS.length - 1}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-royal text-ink transition hover:scale-105 disabled:opacity-30"
                    aria-label="Add a topping"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.96 }}
                  onClick={() => add({ name: `R${current.price} Kota`, price: current.price, detail: ingredientsText.join(', ') })}
                  className="inline-flex min-h-14 flex-1 items-center justify-center gap-2 rounded-full bg-sauce px-6 text-sm font-extrabold uppercase tracking-wider text-white shadow-[0_10px_40px_-12px_rgba(230,48,34,0.8)] transition hover:bg-[#ff3b2c]"
                >
                  <ShoppingBag className="h-5 w-5" /> Add R{current.price} kota
                </motion.button>
              </div>
              <motion.p
                key={tier}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease }}
                className="mt-4 text-center text-xs text-cream/50 sm:text-left"
              >
                {tier === KOTA_TIERS.length - 1 ? 'The full Royal treatment. Respect.' : `Add ${KOTA_INGREDIENTS.find((i) => i.id === KOTA_TIERS[tier + 1].adds)?.label.toLowerCase()} for just R${KOTA_TIERS[tier + 1].price - current.price} more.`}
              </motion.p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
