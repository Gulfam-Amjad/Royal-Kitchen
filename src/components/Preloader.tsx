import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Logo from './Logo'
import { ease } from './ui'

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const t = window.setTimeout(() => setVisible(false), reduced ? 200 : 1900)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-royal text-ink"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          transition={{ duration: 0.9, ease }}
        >
          <Logo animated className="h-32 w-32 md:h-40 md:w-40" />
          <motion.p
            className="font-crest mt-6 text-2xl font-bold tracking-[0.12em] md:text-3xl"
            initial={{ opacity: 0, y: 12, letterSpacing: '0.4em' }}
            animate={{ opacity: 1, y: 0, letterSpacing: '0.12em' }}
            transition={{ delay: 0.9, duration: 0.8, ease }}
          >
            ROYAL KITCHEN
          </motion.p>
          <motion.div
            className="mt-6 h-1 w-40 origin-left rounded-full bg-ink"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
