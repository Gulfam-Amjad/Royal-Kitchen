import { MapPin, Phone } from 'lucide-react'
import { business, formatTime, hours, whatsappLink } from '../data/business'
import Logo, { Wordmark } from './Logo'
import { NAV_LINKS } from './Navbar'
import { WhatsAppIcon } from './ui'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative overflow-hidden bg-ink pt-20 pb-28 md:pb-12">
      <span className="headline pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[22vw] leading-none text-white/[0.03] select-none">
        ROYAL KITCHEN
      </span>
      <div className="container-x relative grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <a href="#top" className="flex items-center gap-3 text-royal">
            <Logo className="h-14 w-14" />
            <Wordmark className="text-xl text-cream" />
          </a>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/60">
            Madiba Park's home of loaded kotas, golden chips and proper home-style specials. Made fresh, served hot, priced right.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href={whatsappLink('Hi Royal Kitchen!')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-cream ring-1 ring-white/10 transition hover:bg-[#25D366] hover:text-white"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon />
            </a>
            <a
              href={`tel:${business.phones.primary.intl}`}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-cream ring-1 ring-white/10 transition hover:bg-royal hover:text-ink"
              aria-label="Call"
            >
              <Phone className="h-5 w-5" />
            </a>
            <a
              href={business.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-cream ring-1 ring-white/10 transition hover:bg-sauce hover:text-white"
              aria-label="Google Maps"
            >
              <MapPin className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-royal">Explore</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-cream/70 transition hover:text-royal">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-royal">Hours</h3>
          <ul className="mt-5 space-y-2 text-sm text-cream/70">
            {[1, 2, 3, 4, 5, 6, 0].map((d) => (
              <li key={d} className="flex justify-between gap-4">
                <span>{hours[d].short}</span>
                <span>
                  {formatTime(hours[d].open)} – {formatTime(hours[d].close)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-royal">Find us</h3>
          <address className="mt-5 space-y-3 text-sm not-italic text-cream/70">
            <p>
              {business.address.street}
              <br />
              {business.address.area}, {business.address.city}
              <br />
              {business.address.postalCode}, {business.address.country}
            </p>
            <p>
              <a href={`tel:${business.phones.primary.intl}`} className="hover:text-royal">
                {business.phones.primary.display}
              </a>
              <br />
              <a href={`tel:${business.phones.secondary.intl}`} className="hover:text-royal">
                {business.phones.secondary.display}
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="container-x relative mt-16 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-cream/40 md:flex-row">
        <p>© {year} Royal Kitchen. All rights reserved.</p>
        <p>World of Flavours · Madiba Park, Polokwane</p>
      </div>
    </footer>
  )
}
