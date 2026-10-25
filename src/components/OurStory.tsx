import { animate, motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Flame, HandPlatter, Wallet } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import Img from './Img'
import { Reveal, SectionHeading } from './ui'

function Counter({ to, decimals = 0, prefix = '', suffix = '' }: { to: number; decimals?: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, { duration: 1.8, ease: [0.22, 1, 0.36, 1], onUpdate: setValue })
    return () => controls.stop()
  }, [inView, to])

  return (
    <span ref={ref}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  )
}

const VALUES = [
  { icon: Flame, title: 'Made to order', text: 'Chips fried fresh, kotas built hot when you order. Never sitting under a lamp.' },
  { icon: Wallet, title: 'Priced for the people', text: 'A full, loaded meal from R20. Big flavour should not cost big money.' },
  { icon: HandPlatter, title: 'Proper service', text: 'Fast, friendly and consistent. That is why the neighbourhood keeps coming back.' },
]

const STATS = [
  { to: 4.8, decimals: 1, suffix: '★', label: 'Google rating' },
  { to: 7, suffix: '', label: 'Days a week' },
  { to: 20, prefix: 'R', label: 'Kotas from' },
  { to: 12, suffix: 'h', label: 'Open daily, up to' },
]

export default function OurStory() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const smallY = useTransform(scrollYProgress, [0, 1], ['30%', '-30%'])

  return (
    <section id="story" ref={ref} className="section-y relative overflow-hidden bg-ink">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] ring-1 ring-white/10">
              <motion.div style={{ y: imgY }} className="absolute inset-[-10%]">
                <Img name="trailer" alt="The Royal Kitchen trailer kitchen in Madiba Park at golden hour" sizes="(min-width: 1024px) 45vw, 90vw" />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
              <div className="absolute inset-x-6 bottom-6">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-royal">Where it all happens</p>
                <p className="headline mt-1 text-3xl text-cream sm:text-4xl">161 Madiba Street</p>
              </div>
            </div>
          </Reveal>

          <motion.div
            style={{ y: smallY }}
            className="absolute -right-3 top-8 w-[42%] overflow-hidden rounded-3xl shadow-2xl ring-4 ring-ink sm:-right-8"
          >
            <div className="aspect-square">
              <Img name="sandwiches" alt="Toasted sandwiches with chips" sizes="20vw" />
            </div>
          </motion.div>

          <Reveal delay={0.3} className="absolute -bottom-6 -left-3 sm:-left-8">
            <div className="rotate-[-6deg] rounded-2xl bg-royal px-5 py-4 text-ink shadow-2xl">
              <p className="font-crest text-sm font-bold tracking-[0.15em]">EST. MADIBA PARK</p>
              <p className="headline text-2xl">World of Flavours</p>
            </div>
          </Reveal>
        </div>

        <div>
          <SectionHeading
            align="left"
            eyebrow="Our story"
            title="From our kitchen"
            accent="to your hands"
            intro="Royal Kitchen started with one simple idea: serve Madiba Park food that tastes like home, at prices that feel like home too. From our little kitchen on Madiba Street we turn out loaded kotas, golden chips and proper Thursday and Friday plates, every single day."
          />

          <div className="space-y-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="flex gap-4 rounded-2xl bg-white/[0.03] p-4 ring-1 ring-white/10 transition hover:bg-white/[0.06] hover:ring-royal/30">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-royal text-ink">
                    <v.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-cream">{v.title}</h3>
                    <p className="mt-0.5 text-sm leading-relaxed text-cream/60">{v.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div className="container-x mt-20 lg:mt-28">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[2rem] bg-white/10 ring-1 ring-white/10 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-ink px-4 py-8 text-center sm:py-10">
              <p className="headline text-5xl text-royal sm:text-6xl">
                <Counter to={s.to} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-cream/60">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
