const WORDS = ['Kota', 'Chips', 'Dagwood', 'Mogodu Thursdays', 'Ngatha Fridays', 'Sephatlo', 'World of Flavours']

function Row({ reverse = false, tone }: { reverse?: boolean; tone: 'royal' | 'ink' }) {
  const items = [...WORDS, ...WORDS]
  const bg = tone === 'royal' ? 'bg-royal text-ink' : 'bg-ink text-royal'
  return (
    <div className={`flex overflow-hidden py-3 md:py-4 ${bg}`}>
      <div className={`flex shrink-0 animate-marquee items-center ${reverse ? '[animation-direction:reverse]' : ''}`}>
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
            {items.map((w, i) => (
              <span key={`${dup}-${i}`} className="headline flex items-center gap-6 px-6 text-2xl md:text-4xl">
                {w}
                <svg viewBox="0 0 24 24" className="h-5 w-5 md:h-6 md:w-6" fill="currentColor" aria-hidden="true">
                  <path d="M12 0l3 9h9l-7.5 5.5L19.5 24 12 18l-7.5 6 3-9.5L0 9h9z" />
                </svg>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Ticker() {
  return (
    <div id="menu-strip" className="relative z-10 -my-6 overflow-hidden py-6">
      <div className="-rotate-2 scale-105 shadow-2xl">
        <Row tone="royal" />
      </div>
      <div className="-mt-3 rotate-1 scale-105 opacity-95">
        <Row tone="ink" reverse />
      </div>
    </div>
  )
}
