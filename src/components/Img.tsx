import { useState } from 'react'
import manifest from '../data/images.json'

export type ImageName = keyof typeof manifest

type Props = {
  name: ImageName
  alt: string
  className?: string
  sizes?: string
  priority?: boolean
  /** Keep the photo's natural aspect ratio instead of filling the parent. */
  natural?: boolean
}

/** Responsive WebP image with a blurred placeholder that fades out once loaded. */
export default function Img({ name, alt, className = '', sizes = '(min-width: 1024px) 33vw, 100vw', priority, natural }: Props) {
  const meta = manifest[name]
  const [loaded, setLoaded] = useState(false)
  const largest = meta.widths[meta.widths.length - 1]
  const srcSet = meta.widths.map((w) => `/images/${name}-${w}.webp ${w}w`).join(', ')

  return (
    <div
      className={`relative overflow-hidden ${natural ? '' : 'h-full w-full'} ${className}`}
      style={{
        aspectRatio: natural ? String(meta.ratio) : undefined,
        backgroundImage: `url(${meta.blur})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <img
        src={`/images/${name}-${largest}.webp`}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  )
}
