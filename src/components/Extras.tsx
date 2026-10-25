import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useCart } from '../hooks/useCart'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })
  return <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[75] h-1 origin-left bg-gradient-to-r from-royal via-royal-deep to-sauce" />
}

export function BackToTop() {
  const { scrollYProgress } = useScroll()
  const [show, setShow] = useState(false)
  const dash = useTransform(scrollYProgress, [0, 1], [0, 1])
  useEffect(() => scrollYProgress.on('change', (v) => setShow(v > 0.15)), [scrollYProgress])

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="fixed bottom-6 left-6 z-[60] hidden h-14 w-14 items-center justify-center rounded-full bg-ink/90 text-royal ring-1 ring-white/10 backdrop-blur md:flex"
          aria-label="Back to top"
        >
          <svg viewBox="0 0 56 56" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
            <motion.circle cx="28" cy="28" r="25" fill="none" stroke="#FFC629" strokeWidth="3" strokeLinecap="round" style={{ pathLength: dash }} />
          </svg>
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

/** Desktop-only cursor: a yellow dot with a trailing ring that grows over interactive elements. */
export function Cursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 350, damping: 28, mass: 0.5 })
  const ry = useSpring(y, { stiffness: 350, damping: 28, mass: 0.5 })
  const [hover, setHover] = useState(false)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return
    setEnabled(true)
    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const t = e.target as HTMLElement
      setHover(!!t.closest('a, button, [role="tab"], [role="radio"]'))
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [x, y])

  if (!enabled) return null
  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[200] h-2 w-2 rounded-full bg-royal mix-blend-difference"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[199] rounded-full border-2 border-royal"
        style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%' }}
        animate={{ width: hover ? 56 : 32, height: hover ? 56 : 32, opacity: hover ? 0.9 : 0.5, backgroundColor: hover ? 'rgba(255,198,41,0.15)' : 'rgba(255,198,41,0)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      />
    </>
  )
}

type Flyer = { id: number; from: { x: number; y: number }; to: { x: number; y: number } }

/** Little "kota coin" that flies from where you tapped "add" into the cart button. */
export function FlyToCart() {
  const { count } = useCart()
  const last = useRef({ x: 0, y: 0 })
  const prevCount = useRef(count)
  const [flyers, setFlyers] = useState<Flyer[]>([])

  useEffect(() => {
    const down = (e: PointerEvent) => (last.current = { x: e.clientX, y: e.clientY })
    window.addEventListener('pointerdown', down, true)
    return () => window.removeEventListener('pointerdown', down, true)
  }, [])

  useEffect(() => {
    const added = count > prevCount.current
    prevCount.current = count
    if (!added || !last.current.x) return
    if (document.querySelector('[aria-label="Your order"]')) return
    const target = [...document.querySelectorAll<HTMLElement>('[data-cart-target]')]
      .map((el) => el.getBoundingClientRect())
      .find((r) => r.width > 0 && r.top >= 0 && r.bottom <= window.innerHeight)
    const to = target ? { x: target.left + target.width / 2, y: target.top + target.height / 2 } : { x: window.innerWidth - 40, y: 40 }
    const id = Date.now()
    setFlyers((f) => [...f, { id, from: last.current, to }])
    window.setTimeout(() => setFlyers((f) => f.filter((fl) => fl.id !== id)), 900)
  }, [count])

  return (
    <div className="pointer-events-none fixed inset-0 z-[150]" aria-hidden="true">
      {flyers.map((f) => (
        <motion.span
          key={f.id}
          className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-royal text-sm font-black text-ink shadow-[0_0_30px_rgba(255,198,41,0.9)]"
          initial={{ x: f.from.x - 16, y: f.from.y - 16, scale: 1 }}
          animate={{
            x: [f.from.x - 16, (f.from.x + f.to.x) / 2 - 16, f.to.x - 16],
            y: [f.from.y - 16, Math.min(f.from.y, f.to.y) - 140, f.to.y - 16],
            scale: [1, 1.3, 0.3],
          }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          +1
        </motion.span>
      ))}
    </div>
  )
}

/** Rising steam wisps for hot food. */
export function Steam({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 100" className={className} aria-hidden="true" fill="none">
      {[20, 55, 90].map((cx, i) => (
        <motion.path
          key={cx}
          d={`M${cx} 95 C ${cx - 14} 75, ${cx + 14} 60, ${cx} 40 S ${cx - 10} 15, ${cx} 0`}
          stroke="rgba(255,248,231,0.55)"
          strokeWidth="5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0, y: 10 }}
          animate={{ pathLength: [0, 1, 1], opacity: [0, 0.8, 0], y: [10, -10, -25] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.8, ease: 'easeOut' }}
          style={{ filter: 'blur(3px)' }}
        />
      ))}
    </svg>
  )
}
