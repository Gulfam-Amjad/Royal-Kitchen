import { motion, type Variants } from 'framer-motion'

type Props = {
  className?: string
  animated?: boolean
  title?: string
}

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { delay: i * 0.15, duration: 0.9, ease: 'easeInOut' }, opacity: { delay: i * 0.15, duration: 0.01 } },
  }),
}

const pop: Variants = {
  hidden: { scale: 0, opacity: 0 },
  show: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: { delay: 0.6 + i * 0.12, type: 'spring', stiffness: 260, damping: 16 },
  }),
}

const KNIFE = 'M66 58c-6 2-5 12-1 23l27 84c2 6 7 6 7 0L81 96c-2-14-4-38-15-38z'

/** Royal Kitchen tuxedo crest: ring of cutlery, knife lapels, bow tie and buttons. */
export default function Logo({ className, animated = false, title = 'Royal Kitchen' }: Props) {
  const v = animated ? { initial: 'hidden', animate: 'show' } : {}
  return (
    <motion.svg viewBox="0 0 200 200" className={className} role="img" aria-label={title} fill="currentColor" {...v}>
      <motion.path
        d="M54.1 39.5A80 80 0 0 0 66.2 177.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        variants={draw}
        custom={0}
      />
      <motion.path
        d="M133.8 177.5A80 80 0 0 0 145.9 39.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        variants={draw}
        custom={1}
      />

      <motion.g variants={pop} custom={0} style={{ transformOrigin: '54px 40px' }}>
        <g transform="translate(54.1 39.5) rotate(55)">
          <path d="M0 2V-20" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
          <path d="M-8-20Q0-16 8-20V-27H-8Z" />
          <path d="M-6.5-26V-40M-2.2-26V-40M2.2-26V-40M6.5-26V-40" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
        </g>
      </motion.g>

      <motion.g variants={pop} custom={1} style={{ transformOrigin: '146px 40px' }}>
        <g transform="translate(145.9 39.5) rotate(-55)">
          <path d="M0 2V-16" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
          <ellipse cx="0" cy="-27" rx="9" ry="12.5" />
        </g>
      </motion.g>

      <motion.path d={KNIFE} variants={pop} custom={2} style={{ transformOrigin: '80px 110px' }} />
      <motion.path d={KNIFE} transform="matrix(-1 0 0 1 200 0)" variants={pop} custom={2} style={{ transformOrigin: '120px 110px' }} />

      <motion.g variants={pop} custom={3} style={{ transformOrigin: '100px 72px' }}>
        <path d="M100 72 82 62.5q-3.5 9.5 0 19z" />
        <path d="M100 72l18-9.5q3.5 9.5 0 19z" />
        <rect x="95.5" y="67.5" width="9" height="9" rx="2.5" />
      </motion.g>

      <motion.circle cx="100" cy="100" r="3.6" variants={pop} custom={4} />
      <motion.circle cx="100" cy="122" r="3.6" variants={pop} custom={5} />
    </motion.svg>
  )
}

export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`flex flex-col leading-none ${className}`}>
      <span className="font-crest text-[1.05em] font-bold tracking-[0.08em]">ROYAL KITCHEN</span>
      <span className="mt-1 text-[0.5em] font-semibold uppercase tracking-[0.42em] opacity-70">World of Flavours</span>
    </span>
  )
}
