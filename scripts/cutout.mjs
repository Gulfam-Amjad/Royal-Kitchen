// Removes the background from the hero kota photo so it can float over the hero artwork.
import { removeBackground } from '@imgly/background-removal-node'
import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const raw = join(import.meta.dirname, 'raw')
const input = new Blob([await readFile(join(raw, 'kota.jpg'))], { type: 'image/jpeg' })
const blob = await removeBackground(input, { model: 'medium', output: { format: 'image/png' } })
await writeFile(join(raw, 'kota-cutout.png'), Buffer.from(await blob.arrayBuffer()))
console.log('ok kota-cutout.png')
