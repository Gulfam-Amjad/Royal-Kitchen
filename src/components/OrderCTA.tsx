import { motion, useScroll, useTransform } from 'framer-motion'
import { Phone } from 'lucide-react'
import { useRef } from 'react'
import { business, whatsappLink } from '../data/business'
import { Button, Reveal, WhatsAppIcon } from './ui'

export default function OrderCTA() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], ['20%', '-10%'])
  const rotate = useTransform(scrollYProgress, [0, 1], [-20, 10])

  return (
    <section ref={ref} className="relative overflow-hidden bg-royal py-20 text-ink md:py-28">
      <div className="stripes absolute inset-x-0 top-0 h-4" />
      <div className="stripes absolute inset-x-0 bottom-0 h-4" />
      <motion.span
        style={{ x }}
        className="headline pointer-events-none absolute top-1/2 -translate-y-1/2 whitespace-nowrap text-[26vw] leading-none text-ink/[0.06] select-none"
      >
        HUNGRY? HUNGRY?
      </motion.span>

      <div className="container-x relative grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
        <div className="text-center lg:text-left">
          <Reveal>
            <h2 className="headline text-[clamp(3rem,9vw,6.5rem)]">
              Hungry? <br />
              <span className="text-stroke-ink">Order in</span> 30 sec.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-lg text-base font-medium text-ink/75 md:text-lg lg:mx-0">
              Send us your order on WhatsApp, we'll get it on the fire and let you know when it's ready to collect.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Button href={whatsappLink("Hi Royal Kitchen! I'd like to place an order.")} external variant="ink" className="w-full sm:w-auto">
              <WhatsAppIcon /> Order on WhatsApp
            </Button>
            <Button href={`tel:${business.phones.primary.intl}`} variant="sauce" className="w-full sm:w-auto">
              <Phone className="h-4 w-4" /> Call {business.phones.primary.display}
            </Button>
          </Reveal>
        </div>

        <motion.div style={{ rotate }} className="relative mx-auto flex aspect-square w-full max-w-xs items-center sm:max-w-sm lg:max-w-md">
          <div className="absolute inset-[6%] rounded-full bg-ink" />
          <img
            src="/images/kota-cutout-600.webp"
            alt=""
            loading="lazy"
            className="relative w-full drop-shadow-[0_30px_30px_rgba(0,0,0,0.45)]"
          />
        </motion.div>
      </div>
    </section>
  )
}
