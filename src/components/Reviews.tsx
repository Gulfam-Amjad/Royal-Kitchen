import { motion } from 'framer-motion'
import { ExternalLink, Quote, Star } from 'lucide-react'
import { business } from '../data/business'
import { reviews } from '../data/reviews'
import { Button, Reveal, SectionHeading, ease } from './ui'

function Stars({ n, className = 'h-5 w-5' }: { n: number; className?: string }) {
  return (
    <span className="flex gap-0.5" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`${className} ${i < Math.round(n) ? 'fill-royal text-royal' : 'text-cream/20'}`} />
      ))}
    </span>
  )
}

function GoogleG({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  )
}

export default function Reviews() {
  return (
    <section id="reviews" className="section-y relative overflow-hidden bg-ink">
      <span className="headline pointer-events-none absolute left-1/2 top-16 -translate-x-1/2 whitespace-nowrap text-[18vw] leading-none text-white/[0.025] select-none">
        TOP TIER
      </span>
      <div className="container-x relative">
        <SectionHeading eyebrow="Reviews" title="Don't take" accent="our word for it" intro="Here's what Madiba Park says about us on Google." />

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
          <Reveal>
            <div className="flex h-full flex-col justify-between rounded-[2rem] bg-royal p-8 text-ink sm:p-10">
              <div>
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
                    <GoogleG />
                  </span>
                  <p className="text-sm font-bold uppercase tracking-[0.2em]">Google Reviews</p>
                </div>
                <p className="headline mt-8 text-[6rem] leading-none sm:text-[8rem]">{business.rating}</p>
                <div className="mt-2 flex items-center gap-3">
                  <span className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-6 w-6 fill-ink text-ink" />
                    ))}
                  </span>
                  <span className="text-sm font-semibold">from {business.reviewCount} reviews</span>
                </div>
                <p className="mt-6 max-w-sm text-base font-medium text-ink/75">
                  Rated by real customers on Google Maps. Tried us already? We'd love to hear from you.
                </p>
              </div>
              <div className="mt-8">
                <Button href={business.mapsUrl} external variant="ink">
                  Review us on Google <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-6">
            {reviews.map((r, i) => (
              <motion.figure
                key={r.name}
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: i * 0.12, ease }}
                className="relative flex flex-col justify-between overflow-hidden rounded-[2rem] bg-ink-soft p-7 ring-1 ring-white/10 sm:p-9"
              >
                <Quote className="absolute -right-2 -top-2 h-28 w-28 rotate-180 text-royal/10" />
                <div className="relative">
                  <Stars n={r.rating} />
                  <blockquote className={`mt-5 font-semibold text-cream ${r.text.length < 20 ? 'headline text-6xl sm:text-7xl' : 'text-xl leading-snug sm:text-2xl'}`}>
                    “{r.text}”
                  </blockquote>
                </div>
                <figcaption className="relative mt-7 flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-royal font-bold text-ink">{r.initials}</span>
                  <span>
                    <span className="block font-bold text-cream">{r.name}</span>
                    <span className="flex items-center gap-1.5 text-xs text-cream/50">
                      <GoogleG className="h-3.5 w-3.5" /> {r.meta}
                    </span>
                  </span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
