// Crops, colour-corrects and sharpens the raw photos, then exports responsive WebP files
// plus a manifest (sizes + blur placeholders) consumed by src/components/Img.tsx.
import sharp from 'sharp'
import { mkdir, writeFile, copyFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { homedir } from 'node:os'

const root = join(import.meta.dirname, '..')
const raw = join(import.meta.dirname, 'raw')
const out = join(root, 'public', 'images')
const generated = join(homedir(), '.cursor', 'projects', 'c-Users-Gulfam-Desktop-demos-royal-kitchin', 'assets')
await mkdir(out, { recursive: true })

for (const name of ['mogodu', 'ngatha']) {
  const src = join(generated, `${name}.jpg`)
  if (existsSync(src)) await copyFile(src, join(raw, `${name}.jpg`))
}

const WIDTHS = [480, 960, 1600]

/** crop: [left, top, width, height] as fractions of the (rotated) source. */
const jobs = [
  { name: 'kota', src: 'kota.jpg', crop: [0.1, 0.13, 0.78, 0.78], tone: { brightness: 1.06, saturation: 1.22, contrast: 1.1 } },
  { name: 'loaded-chips', src: 'photo5.jpg', crop: [0.04, 0.02, 0.94, 0.94], tone: { brightness: 1.04, saturation: 1.15, contrast: 1.08 } },
  { name: 'burger', src: 'photo9.jpg', crop: [0, 0.04, 1, 0.92], tone: { brightness: 1.16, saturation: 1.12, contrast: 1.06 } },
  { name: 'sandwiches', src: 'sandwiches.jpg', crop: [0, 0.06, 1, 0.9], tone: { brightness: 1.05, saturation: 1.2, contrast: 1.1 } },
  { name: 'pap-mogodu', src: 'photo4.jpg', crop: [0.18, 0, 0.82, 1], tone: { brightness: 1.02, saturation: 1.25, contrast: 1.14 } },
  { name: 'trailer', src: 'trailer.jpg', crop: [0, 0, 1, 0.78], tone: { brightness: 1.04, saturation: 1.12, contrast: 1.08 } },
  { name: 'mogodu', src: 'mogodu.jpg', crop: [0, 0, 1, 1], tone: { brightness: 1.03, saturation: 1.08, contrast: 1.04 } },
  { name: 'ngatha', src: 'ngatha.jpg', crop: [0, 0, 1, 1], tone: { brightness: 1.03, saturation: 1.08, contrast: 1.04 } },
]

const manifest = {}

const toned = (img, { brightness, saturation, contrast }) =>
  img
    .modulate({ brightness, saturation })
    .linear(contrast, -(128 * contrast - 128))
    .sharpen({ sigma: 0.9, m1: 0.6, m2: 2.2 })

for (const job of jobs) {
  const base = sharp(join(raw, job.src)).rotate()
  const { width: W, height: H } = await sharp(await base.clone().toBuffer()).metadata()
  const [l, t, w, h] = job.crop
  const region = { left: Math.round(l * W), top: Math.round(t * H), width: Math.round(w * W), height: Math.round(h * H) }
  const cropped = await toned(base.clone().extract(region), job.tone).toBuffer()

  const widths = WIDTHS.filter((x) => x <= region.width)
  if (!widths.length || widths.at(-1) < region.width) widths.push(Math.min(region.width, 1600))
  const unique = [...new Set(widths)]

  for (const width of unique) {
    await sharp(cropped).resize({ width }).webp({ quality: 80, effort: 5 }).toFile(join(out, `${job.name}-${width}.webp`))
  }
  const blur = await sharp(cropped).resize({ width: 20 }).webp({ quality: 40 }).toBuffer()
  manifest[job.name] = {
    widths: unique,
    ratio: +(region.width / region.height).toFixed(4),
    blur: `data:image/webp;base64,${blur.toString('base64')}`,
  }
  console.log(`ok ${job.name} -> ${unique.join(', ')}`)
}

// Hero cut-out: trim transparent edges, warm it up, export at two sizes.
const cut = await toned(sharp(join(raw, 'kota-cutout.png')).trim(), { brightness: 1.06, saturation: 1.25, contrast: 1.08 }).png().toBuffer()
await sharp(cut).resize({ width: 1000 }).webp({ quality: 76, alphaQuality: 80, effort: 6 }).toFile(join(out, 'kota-cutout.webp'))
await sharp(cut).resize({ width: 600 }).webp({ quality: 76, alphaQuality: 80, effort: 6 }).toFile(join(out, 'kota-cutout-600.webp'))
console.log('ok kota-cutout')

// Social share image.
const og = sharp({ create: { width: 1200, height: 630, channels: 4, background: '#0B0B0B' } })
const ogSvg = Buffer.from(`
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <circle cx="860" cy="330" r="300" fill="#FFC629"/>
  <text x="70" y="250" font-family="Impact, Anton, sans-serif" font-size="110" fill="#FFC629">ROYAL</text>
  <text x="70" y="360" font-family="Impact, Anton, sans-serif" font-size="110" fill="#FFF8E7">KITCHEN</text>
  <text x="74" y="430" font-family="Georgia, serif" font-size="34" fill="#FFF8E7" opacity="0.8">World of Flavours · Madiba Park</text>
  <rect x="70" y="480" width="300" height="64" rx="32" fill="#E63022"/>
  <text x="102" y="523" font-family="Arial, sans-serif" font-weight="700" font-size="28" fill="#fff">Kotas from R20</text>
</svg>`)
const ogKota = await sharp(cut).resize({ width: 580 }).toBuffer()
await og
  .composite([{ input: ogSvg }, { input: ogKota, left: 590, top: 170 }])
  .jpeg({ quality: 85 })
  .toFile(join(out, 'og.jpg'))
console.log('ok og.jpg')

await writeFile(join(root, 'src', 'data', 'images.json'), JSON.stringify(manifest, null, 2))
console.log('manifest written')
