import { motion, useMotionValue, useSpring, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode, MouseEvent } from 'react'

export const ease = [0.22, 1, 0.36, 1] as const

export function Reveal({
  children,
  delay = 0,
  y = 40,
  className,
  ...rest
}: { children: ReactNode; delay?: number; y?: number; className?: string } & HTMLMotionProps<'div'>) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  accent,
  intro,
  align = 'center',
  tone = 'dark',
}: {
  eyebrow: string
  title: string
  accent?: string
  intro?: string
  align?: 'center' | 'left'
  tone?: 'dark' | 'light'
}) {
  const centered = align === 'center'
  const onLight = tone === 'light'
  return (
    <div className={`mb-12 md:mb-16 ${centered ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'}`}>
      <Reveal y={20}>
        <span
          className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] ${
            onLight ? 'bg-ink text-royal' : 'bg-royal/10 text-royal ring-1 ring-royal/30'
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-sauce" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className={`headline mt-5 text-[clamp(2.6rem,7vw,5.2rem)] ${onLight ? 'text-ink' : 'text-cream'}`}>
          {title} {accent && <span className={onLight ? 'text-sauce' : 'text-royal'}>{accent}</span>}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.16}>
          <p className={`mt-5 text-base leading-relaxed md:text-lg ${onLight ? 'text-ink/75' : 'text-cream/70'}`}>{intro}</p>
        </Reveal>
      )}
    </div>
  )
}

type ButtonProps = {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'royal' | 'ink' | 'ghost' | 'sauce'
  className?: string
  external?: boolean
  ariaLabel?: string
}

const variants = {
  royal: 'bg-royal text-ink hover:bg-cream shadow-[0_10px_40px_-10px_rgba(255,198,41,0.7)]',
  ink: 'bg-ink text-royal hover:bg-ink-soft',
  sauce: 'bg-sauce text-white hover:bg-[#ff3b2c] shadow-[0_10px_40px_-12px_rgba(230,48,34,0.8)]',
  ghost: 'bg-transparent text-cream ring-2 ring-cream/25 hover:ring-royal hover:text-royal',
}

/** Pill button with a subtle magnetic pull towards the cursor on desktop. */
export function Button({ children, href, onClick, variant = 'royal', className = '', external, ariaLabel }: ButtonProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 300, damping: 18 })
  const sy = useSpring(y, { stiffness: 300, damping: 18 })

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.25)
    y.set((e.clientY - r.top - r.height / 2) * 0.35)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  const cls = `inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wider transition-colors duration-300 md:px-7 md:text-[0.95rem] ${variants[variant]} ${className}`
  const common = { style: { x: sx, y: sy }, onMouseMove: onMove, onMouseLeave: reset, whileTap: { scale: 0.95 }, className: cls, 'aria-label': ariaLabel }

  if (href) {
    return (
      <motion.a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...common}>
        {children}
      </motion.a>
    )
  }
  return (
    <motion.button type="button" onClick={onClick} {...common}>
      {children}
    </motion.button>
  )
}

export function WhatsAppIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.71.23 1.36.2 1.88.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.43 9.43 0 0 1-4.8-1.32l-.35-.2-3.57.93.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.24-9.44 9.45-9.44 2.52 0 4.89.99 6.67 2.77a9.38 9.38 0 0 1 2.76 6.68c0 5.2-4.24 9.44-9.44 9.44zm8.04-17.48A11.32 11.32 0 0 0 12.05.7C5.8.7.7 5.79.7 12.05c0 2 .52 3.95 1.52 5.67L.6 23.6l6.02-1.58a11.3 11.3 0 0 0 5.42 1.38h.01c6.26 0 11.35-5.09 11.35-11.35 0-3.03-1.18-5.88-3.32-8.03z" />
    </svg>
  )
}
