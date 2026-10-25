import { motion } from 'framer-motion'
import { CalendarDays, Plus } from 'lucide-react'
import { weeklySpecials } from '../data/menu'
import { useCart } from '../hooks/useCart'
import { useOpenStatus } from '../hooks/useOpenStatus'
import Img, { type ImageName } from './Img'
import { SectionHeading, ease } from './ui'

const daysUntil = (from: number, to: number) => (to - from + 7) % 7

export default function WeeklySpecials() {
  const { today } = useOpenStatus()
  const { add } = useCart()

  return (
    <section id="specials" className="section-y grain relative overflow-hidden bg-ink-soft">
      <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-sauce/15 blur-[120px]" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Weekly specials"
          title="Mama's cooking,"
          accent="every week"
          intro="Proper home-style plates that sell out fast. Mark your calendar."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {weeklySpecials.map((s, i) => {
            const wait = daysUntil(today, s.day)
            const isToday = wait === 0
            return (
              <motion.article
                key={s.id}
                initial={{ opacity: 0, y: 60, rotate: i ? 2 : -2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, delay: i * 0.12, ease }}
                className={`group relative overflow-hidden rounded-[2rem] bg-ink ring-1 transition-shadow duration-500 ${
                  isToday ? 'ring-2 ring-royal shadow-[0_0_80px_-20px_rgba(255,198,41,0.6)]' : 'ring-white/10'
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/11]">
                  <div className="h-full w-full transition-transform duration-[1.2s] ease-out group-hover:scale-110">
                    <Img name={s.image as ImageName} alt={`${s.name} served with pap`} sizes="(min-width: 768px) 50vw, 100vw" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />

                  <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/85 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-royal ring-1 ring-royal/30 backdrop-blur">
                      <CalendarDays className="h-3.5 w-3.5" /> {s.dayLabel}s only
                    </span>
                    {isToday && (
                      <motion.span
                        animate={{ scale: [1, 1.08, 1] }}
                        transition={{ repeat: Infinity, duration: 1.6 }}
                        className="rounded-full bg-sauce px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider text-white"
                      >
                        On today
                      </motion.span>
                    )}
                  </div>

                  <span className="headline text-stroke pointer-events-none absolute -right-2 bottom-24 text-[5.5rem] leading-none opacity-40 sm:text-[7rem]">
                    {s.dayLabel.slice(0, 3)}
                  </span>
                </div>

                <div className="relative -mt-20 p-6 sm:p-8">
                  <div className="flex items-end justify-between gap-4">
                    <h3 className="headline text-5xl text-cream sm:text-6xl">{s.name}</h3>
                    <p className="text-right leading-none">
                      <span className="block text-[0.65rem] font-semibold uppercase tracking-widest text-cream/50">from</span>
                      <span className="headline text-4xl text-royal sm:text-5xl">R{s.price}</span>
                    </p>
                  </div>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/65 sm:text-base">{s.description}</p>
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-cream/70">
                      {isToday ? "It's on the stove right now." : `Back in ${wait} day${wait > 1 ? 's' : ''}`}
                    </span>
                    <button
                      type="button"
                      onClick={() => add({ name: s.name, price: s.price, detail: s.dayLabel })}
                      className="inline-flex min-h-12 items-center gap-2 rounded-full bg-royal px-5 text-sm font-extrabold uppercase tracking-wider text-ink transition hover:bg-cream active:scale-95"
                    >
                      <Plus className="h-4 w-4" /> {isToday ? 'Order now' : 'Pre-order'}
                    </button>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
