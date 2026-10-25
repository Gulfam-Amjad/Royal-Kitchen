import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import { ArrowDown, Star, UtensilsCrossed } from 'lucide-react'
import { useRef } from 'react'
import { business, whatsappLink } from '../data/business'
import { Steam } from './Extras'
import { StatusPill } from './Navbar'
import { Button, WhatsAppIcon, ease } from './ui'

const TAGS = [
  { label: 'Russian', color: '#E63022', pos: 'left-[2%] top-[18%]', delay: 0 },
  { label: 'Melted Cheese', color: '#FFC629', pos: 'right-[0%] top-[8%]', delay: 0.8 },
  { label: 'Fried Egg', color: '#FFF8E7', pos: 'right-[4%] bottom-[20%]', delay: 1.6 },
  { label: 'Atchar', color: '#F2A93B', pos: 'left-[6%] bottom-[12%]', delay: 2.4 },
]

const word: Variants = {
  hidden: { y: '110%' },
  show: (i: number) => ({ y: '0%', transition: { delay: 0.1 + i * 0.09, duration: 0.9, ease } }),
}

function Sunburst() {
  const rays = Array.from({ length: 24 })
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden="true">
      {rays.map((_, i) => (
        <path key={i} d="M200 200 L196 0 L204 0 Z" fill="#FFC629" opacity={i % 2 ? 0.08 : 0.16} transform={`rotate(${i * 15} 200 200)`} />
      ))}
    </svg>
  )
}

function PriceStamp() {
  return (
    <div className="relative h-28 w-28 md:h-36 md:w-36">
      <svg viewBox="0 0 120 120" className="animate-spin-slow absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <path id="stamp-circle" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" />
        </defs>
        <circle cx="60" cy="60" r="58" fill="#E63022" />
        <text fontSize="11.5" fontWeight="800" letterSpacing="2.6" fill="#FFF8E7" fontFamily="Poppins, sans-serif">
          <textPath href="#stamp-circle">FRESH • HOT • LOADED • DAILY •</textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <span className="text-[0.6rem] font-bold uppercase tracking-widest md:text-xs">From</span>
        <span className="headline text-3xl md:text-4xl">R20</span>
      </div>
    </div>
  )
}

export default function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const kotaY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const kotaRotate = useTransform(scrollYProgress, [0, 1], [-4, 8])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const state = ready ? 'show' : 'hidden'
  const lines = [
    { text: 'The Kings', cls: 'text-cream' },
    { text: 'of Kota', cls: 'text-royal' },
  ]

  return (
    <section id="top" ref={ref} className="grain relative isolate overflow-hidden bg-ink pt-28 pb-16 md:pt-36 lg:min-h-[100svh] lg:pb-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-40 -top-40 h-[42rem] w-[42rem] rounded-full bg-royal/20 blur-[140px]" />
        <div className="absolute -bottom-40 -left-40 h-[30rem] w-[30rem] rounded-full bg-sauce/15 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(#FFC629 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />
      </div>

      <div className="container-x grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-6">
        <motion.div style={{ y: textY, opacity: fade }} className="relative z-10 text-center lg:text-left">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease }}>
            <StatusPill />
          </motion.div>

          <h1 className="headline mt-6 text-[clamp(3.6rem,13vw,8.5rem)] lg:text-[clamp(5rem,7.6vw,8.5rem)]">
            {lines.map((l, i) => (
              <span key={l.text} className="block overflow-hidden pb-1">
                <motion.span className={`block ${l.cls}`} variants={word} custom={i} initial="hidden" animate={state}>
                  {l.text}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-cream/75 md:text-lg lg:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8, ease }}
          >
            Loaded kotas, golden chips, stacked dagwoods and proper home-style specials. Made fresh every day at{' '}
            <span className="font-semibold text-cream">{business.address.street}, Madiba Park.</span>
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.55, duration: 0.8, ease }}
          >
            <Button href={whatsappLink("Hi Royal Kitchen! I'd like to place an order.")} external className="w-full sm:w-auto">
              <WhatsAppIcon /> Order on WhatsApp
            </Button>
            <Button href="#menu" variant="ghost" className="w-full sm:w-auto">
              <UtensilsCrossed className="h-4 w-4" /> See the menu
            </Button>
          </motion.div>

          <motion.dl
            className="mx-auto mt-10 grid max-w-md grid-cols-3 divide-x divide-white/10 rounded-2xl bg-white/[0.04] py-4 ring-1 ring-white/10 backdrop-blur lg:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.8, ease }}
          >
            <div className="px-3 text-center">
              <dt className="sr-only">Google rating</dt>
              <dd className="flex items-center justify-center gap-1 text-2xl font-extrabold text-royal">
                {business.rating} <Star className="h-5 w-5 fill-royal" />
              </dd>
              <dd className="text-[0.7rem] font-medium uppercase tracking-wider text-cream/60">Google rating</dd>
            </div>
            <div className="px-3 text-center">
              <dt className="sr-only">Starting price</dt>
              <dd className="text-2xl font-extrabold text-cream">R20</dd>
              <dd className="text-[0.7rem] font-medium uppercase tracking-wider text-cream/60">Kotas from</dd>
            </div>
            <div className="px-3 text-center">
              <dt className="sr-only">Open days</dt>
              <dd className="text-2xl font-extrabold text-cream">7/7</dd>
              <dd className="text-[0.7rem] font-medium uppercase tracking-wider text-cream/60">Days a week</dd>
            </div>
          </motion.dl>
        </motion.div>

        <div className="relative mx-auto aspect-square w-full max-w-[34rem] lg:max-w-none">
          <motion.div
            className="absolute inset-[-12%] animate-spin-slow"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={ready ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, ease }}
          >
            <Sunburst />
          </motion.div>
          <motion.div
            className="absolute inset-[9%] rounded-full bg-royal shadow-[0_0_120px_20px_rgba(255,198,41,0.35)]"
            initial={{ scale: 0 }}
            animate={ready ? { scale: 1 } : {}}
            transition={{ duration: 1, ease, delay: 0.1 }}
          />
          <motion.div
            className="absolute inset-[15%] rounded-full border-2 border-dashed border-ink/25"
            initial={{ scale: 0 }}
            animate={ready ? { scale: 1 } : {}}
            transition={{ duration: 1, ease, delay: 0.2 }}
          />
          <span className="headline pointer-events-none absolute inset-x-0 top-[16%] text-center text-[clamp(3rem,11vw,7rem)] text-ink/10 select-none">
            ROYAL
          </span>

          <motion.div style={{ y: kotaY, rotate: kotaRotate }} className="absolute inset-x-[-4%] top-[24%]">
            <motion.div
              initial={{ opacity: 0, y: 120, scale: 0.7, rotate: -18 }}
              animate={ready ? { opacity: 1, y: 0, scale: 1, rotate: 0 } : {}}
              transition={{ delay: 0.35, type: 'spring', stiffness: 70, damping: 14 }}
            >
              <div className="animate-float relative">
                <Steam className="absolute -top-[28%] left-1/2 h-[40%] w-[40%] -translate-x-1/2" />
                <img
                  src="/images/kota-cutout.webp"
                  srcSet="/images/kota-cutout-600.webp 600w, /images/kota-cutout.webp 1000w"
                  sizes="(min-width: 1024px) 50vw, 95vw"
                  alt="Royal Kitchen's signature kota loaded with chips, russian, polony and a grilled cheese crown"
                  className="w-full drop-shadow-[0_40px_40px_rgba(0,0,0,0.55)]"
                  fetchPriority="high"
                />
              </div>
            </motion.div>
          </motion.div>

          {TAGS.map((t, i) => (
            <motion.div
              key={t.label}
              className={`absolute ${t.pos} z-10`}
              initial={{ opacity: 0, scale: 0 }}
              animate={ready ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.9 + i * 0.12, type: 'spring', stiffness: 220, damping: 14 }}
            >
              <div className="animate-float" style={{ animationDelay: `${t.delay}s` }}>
                <span className="flex items-center gap-1.5 rounded-full bg-ink/90 px-3 py-1.5 text-xs font-bold text-cream shadow-xl ring-1 ring-royal/40 backdrop-blur md:px-4 md:py-2 md:text-sm">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: t.color }} aria-hidden="true" /> {t.label}
                </span>
              </div>
            </motion.div>
          ))}

          <motion.div
            className="absolute -bottom-2 left-1/2 z-10 -translate-x-1/2 sm:left-auto sm:right-[2%] sm:translate-x-0 lg:-bottom-6"
            initial={{ opacity: 0, scale: 0, rotate: -90 }}
            animate={ready ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ delay: 1.2, type: 'spring', stiffness: 160, damping: 12 }}
          >
            <PriceStamp />
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#menu-strip"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-cream/50 lg:flex"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 1.6 }}
        aria-label="Scroll down"
      >
        Scroll
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </motion.a>
    </section>
  )
}
