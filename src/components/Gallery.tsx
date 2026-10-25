import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import manifest from '../data/images.json'
import Img, { type ImageName } from './Img'
import { SectionHeading, ease } from './ui'

const PHOTOS: { name: ImageName; alt: string; label: string }[] = [
  { name: 'kota', alt: 'Loaded kota with a grilled cheese crown', label: 'The Royal Kota' },
  { name: 'loaded-chips', alt: 'Chips loaded with russians and sauces', label: 'Loaded Russian Chips' },
  { name: 'trailer', alt: 'The Royal Kitchen trailer kitchen', label: 'Our Kitchen' },
  { name: 'burger', alt: 'Double patty toasted dagwood with cheese', label: 'Double Dagwood' },
  { name: 'pap-mogodu', alt: 'Pap with chakalaka and mogodu', label: 'Pap, Chakalaka & Mogodu' },
  { name: 'sandwiches', alt: 'Toasted sandwiches and chips', label: 'Toasties & Chips' },
]

const lightboxWidth = (name: ImageName) => {
  const widths = manifest[name].widths
  return widths.find((w) => w >= 900) ?? widths[widths.length - 1]
}

export default function Gallery() {
  const [index, setIndex] = useState<number | null>(null)
  const close = useCallback(() => setIndex(null), [])
  const step = useCallback((d: number) => setIndex((i) => (i === null ? i : (i + d + PHOTOS.length) % PHOTOS.length)), [])

  useEffect(() => {
    if (index === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    document.documentElement.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
    }
  }, [index, close, step])

  return (
    <section id="gallery" className="section-y relative bg-ink-soft">
      <div className="container-x">
        <SectionHeading eyebrow="Gallery" title="Straight from" accent="the kitchen" intro="No filters needed. This is what lands in your hands." />

        <div className="columns-2 gap-3 sm:gap-5 lg:columns-3">
          {PHOTOS.map((p, i) => (
            <motion.button
              key={p.name}
              type="button"
              onClick={() => setIndex(i)}
              initial={{ opacity: 0, y: 50, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.1, ease }}
              className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-2xl ring-1 ring-white/10 sm:mb-5 sm:rounded-3xl"
              aria-label={`Open photo: ${p.label}`}
            >
              <div className="transition-transform duration-700 ease-out group-hover:scale-110">
                <Img name={p.name} alt={p.alt} natural sizes="(min-width: 1024px) 33vw, 50vw" />
              </div>
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/85 via-transparent to-transparent p-3 opacity-100 transition-opacity duration-500 sm:p-5 lg:opacity-0 lg:group-hover:opacity-100">
                <span className="flex w-full items-center justify-between gap-2 text-left">
                  <span className="headline text-lg text-cream sm:text-2xl">{p.label}</span>
                  <Expand className="hidden h-5 w-5 shrink-0 text-royal sm:block" />
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {index !== null && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                className="relative w-full max-w-4xl"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35, ease }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) step(1)
                  else if (info.offset.x > 80) step(-1)
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={`/images/${PHOTOS[index].name}-${lightboxWidth(PHOTOS[index].name)}.webp`}
                  alt={PHOTOS[index].alt}
                  className="mx-auto max-h-[78svh] w-auto rounded-2xl object-contain shadow-2xl"
                  draggable={false}
                />
                <p className="headline mt-4 text-center text-2xl text-cream">
                  {PHOTOS[index].label} <span className="text-royal">{index + 1}/{PHOTOS.length}</span>
                </p>
              </motion.div>
            </AnimatePresence>

            <button type="button" onClick={close} className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-cream hover:bg-royal hover:text-ink" aria-label="Close">
              <X className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                step(-1)
              }}
              className="absolute left-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-cream hover:bg-royal hover:text-ink sm:flex"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                step(1)
              }}
              className="absolute right-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-cream hover:bg-royal hover:text-ink sm:flex"
              aria-label="Next photo"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
