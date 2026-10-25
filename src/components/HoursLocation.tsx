import { motion } from 'framer-motion'
import { Clock, MapPin, Navigation, Phone } from 'lucide-react'
import { business, formatTime, hours, whatsappLink } from '../data/business'
import { useOpenStatus } from '../hooks/useOpenStatus'
import Logo from './Logo'
import { StatusPill } from './Navbar'
import { Button, Reveal, SectionHeading, WhatsAppIcon } from './ui'

const WEEK = [1, 2, 3, 4, 5, 6, 0]

export default function HoursLocation() {
  const { today } = useOpenStatus()

  return (
    <section id="visit" className="section-y relative bg-ink-soft">
      <div className="container-x">
        <SectionHeading eyebrow="Visit us" title="Come get" accent="your kota" intro="Order ahead on WhatsApp and collect hot, or pull up and order at the window." />

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">
          <Reveal>
            <div className="flex h-full flex-col rounded-[2rem] bg-ink p-6 ring-1 ring-white/10 sm:p-9">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="headline flex items-center gap-3 text-3xl text-cream">
                  <Clock className="h-7 w-7 text-royal" /> Opening hours
                </h3>
                <StatusPill />
              </div>

              <ul className="mt-6 space-y-1.5">
                {WEEK.map((d) => {
                  const isToday = d === today
                  return (
                    <li
                      key={d}
                      className={`relative flex items-center justify-between rounded-xl px-4 py-3 text-sm sm:text-base ${
                        isToday ? 'font-bold text-ink' : 'text-cream/75'
                      }`}
                    >
                      {isToday && <motion.span layoutId="today-row" className="absolute inset-0 rounded-xl bg-royal" />}
                      <span className="relative flex items-center gap-2">
                        {hours[d].day}
                        {isToday && <span className="rounded-full bg-ink px-2 py-0.5 text-[0.6rem] uppercase tracking-wider text-royal">Today</span>}
                      </span>
                      <span className="relative tabular-nums">
                        {formatTime(hours[d].open)} – {formatTime(hours[d].close)}
                      </span>
                    </li>
                  )
                })}
              </ul>

              <div className="mt-8 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-2">
                <div className="flex gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-royal" />
                  <p className="text-sm leading-relaxed text-cream/75">
                    <span className="block font-bold text-cream">{business.address.street}</span>
                    {business.address.area}, {business.address.city} {business.address.postalCode}
                  </p>
                </div>
                <div className="flex gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-royal" />
                  <p className="text-sm leading-relaxed text-cream/75">
                    <a href={`tel:${business.phones.primary.intl}`} className="block font-bold text-cream hover:text-royal">
                      {business.phones.primary.display}
                    </a>
                    <a href={`tel:${business.phones.secondary.intl}`} className="hover:text-royal">
                      {business.phones.secondary.display}
                    </a>
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <Button href={business.directionsUrl} external>
                  <Navigation className="h-4 w-4" /> Get directions
                </Button>
                <Button href={whatsappLink('Hi Royal Kitchen! Are you open right now?')} external variant="ghost">
                  <WhatsAppIcon /> WhatsApp us
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative h-[22rem] overflow-hidden rounded-[2rem] ring-1 ring-white/10 sm:h-[28rem] lg:h-full lg:min-h-[32rem]">
              <iframe
                title="Royal Kitchen on Google Maps"
                src={business.embedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0 [filter:grayscale(1)_invert(0.92)_contrast(0.9)_brightness(0.95)]"
              />
              <div className="pointer-events-none absolute inset-0 bg-royal/10 mix-blend-multiply" />

              <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }} className="flex flex-col items-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-royal text-ink shadow-[0_10px_40px_rgba(255,198,41,0.6)] ring-4 ring-ink">
                    <Logo className="h-11 w-11" />
                  </span>
                  <span className="-mt-1 h-4 w-4 rotate-45 bg-royal" />
                </motion.div>
              </div>
              <span className="pointer-events-none absolute left-1/2 top-1/2 h-4 w-10 -translate-x-1/2 rounded-[50%] bg-ink/40 blur-sm" />

              <a
                href={business.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 rounded-2xl bg-ink/90 p-4 text-cream ring-1 ring-white/10 backdrop-blur transition hover:ring-royal sm:left-auto sm:max-w-xs"
              >
                <span>
                  <span className="block font-bold">Royal Kitchen</span>
                  <span className="text-xs text-cream/60">Open in Google Maps</span>
                </span>
                <Navigation className="h-5 w-5 text-royal" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
