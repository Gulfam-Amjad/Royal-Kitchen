import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Plus } from 'lucide-react'
import type { MouseEvent } from 'react'
import { bestsellers, type MenuItem } from '../data/menu'
import { useCart } from '../hooks/useCart'
import Img, { type ImageName } from './Img'
import { Reveal, SectionHeading, ease } from './ui'

function Card({ item, index }: { item: MenuItem; index: number }) {
  const { add } = useCart()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 })

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const reset = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, delay: index * 0.1, ease }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-ink-soft ring-1 ring-white/10 transition-shadow duration-500 hover:shadow-[0_30px_80px_-30px_rgba(255,198,41,0.45)] hover:ring-royal/40"
      >
        <div className="relative aspect-[4/3.4] overflow-hidden">
          <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-110">
            <Img name={item.image as ImageName} alt={item.name} sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink-soft via-transparent to-transparent" />
          {item.badge && (
            <span className="absolute left-4 top-4 rounded-full bg-royal px-3 py-1 text-[0.7rem] font-extrabold uppercase tracking-wider text-ink shadow-lg">
              {item.badge}
            </span>
          )}
          <span className="absolute right-4 top-4 rounded-2xl bg-ink/85 px-3 py-1.5 text-right leading-none text-royal ring-1 ring-royal/30 backdrop-blur">
            {item.fromPrice && <span className="block text-[0.6rem] font-semibold uppercase tracking-widest text-cream/60">from</span>}
            <span className="headline text-2xl">R{item.price}</span>
          </span>
        </div>
        <div className="flex flex-1 flex-col p-6" style={{ transform: 'translateZ(30px)' }}>
          <h3 className="headline text-3xl text-cream">{item.name}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-cream/65">{item.description}</p>
          <button
            type="button"
            onClick={() => add({ name: item.name, price: item.price })}
            className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white/5 px-5 text-sm font-bold uppercase tracking-wider text-cream ring-1 ring-white/15 transition-all duration-300 hover:bg-royal hover:text-ink hover:ring-royal active:scale-95"
          >
            <Plus className="h-4 w-4" /> Add to order
          </button>
        </div>
      </motion.div>
    </motion.article>
  )
}

export default function Bestsellers() {
  return (
    <section id="bestsellers" className="section-y relative bg-ink">
      <div className="container-x">
        <SectionHeading
          eyebrow="Crowd favourites"
          title="Madiba Park's"
          accent="Best Sellers"
          intro="Real food, straight from our kitchen. These are the ones the neighbourhood keeps coming back for."
        />
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {bestsellers.map((item, i) => (
            <Card key={item.id} item={item} index={i} />
          ))}
        </div>
        <Reveal className="mt-10 text-center text-sm text-cream/50">Photos of our actual food. No stock shots, no filters needed.</Reveal>
      </div>
    </section>
  )
}
