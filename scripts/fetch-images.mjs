// Downloads the original Royal Kitchen photos from the Google Maps listing at full resolution.
import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const BASE = 'https://lh3.googleusercontent.com/gps-cs-s/'
const photos = {
  kota: 'ANWiy9Q7fEVRsOTVGLekuUBPT25b26oakvtU0DsohK7PHcTEtAP-NQ35WBTxQzZhs73Dc__XlIyHJiitViiUw4Ju2NLxdYizm1BsC9NkBAwV3_9fKyM_7nOkJwWK5OEk2OWQ9YQcJ5cU',
  sandwiches: 'ANWiy9Sw2zph8KXIhGkYj5kWzvYPk04GhQAVcaHX6oAqSXSBYB1tILU_0jGenHBXiN2OdxXjQxpw9ZJeau48trNf2BVL89GKs7wbuyUlkdNQf0pzyR2vlKcSDZWcK_2KUj8Lyc9_IdLa',
  trailer: 'ANWiy9SxQ9rj7Gh00Mv2WeUmrMYGy-pCL8uO-rM4Kxi5CLEN9ClJmpDxU2gx5NP0eitIV0PFiiaxl3_IH1gX7u-qL6vz0zfP1uhV4nvdjJIweflFuuZiNh21Lyd2e3ASwtMWTLEtTtf5lcuBG4AY',
  photo4: 'ANWiy9S46Ke6LEvg7DgYssEnGvTsWmrg2HBosJ-ApfCgYnDr6VOp1uS3wuD6cQLMJR6FANybafVkCONkZMLNb8RzES0iapluGHLfyHUy5Tgy_TBYFU-HP84jXa1NXpCNRXyKR0DG5nav2Q',
  photo5: 'ANWiy9QSvPcs9uDzPL40AtSCtvaEeMQFQ3vD87p6EYVqoVBDz2u0bkhBytPu_I2sNfh2z9IQxUoh383vH4cYY4r0Bguu5Jsmpto0SSbq4Hkb0su_8Z7SZPmitxYZ4dM8wm9ptCvZ3Jlq8A',
  photo6: 'ANWiy9QZmx1EYCuEAhqpLrqqjSGY1HH9cwJqZIwwvuoVCYEZltRVmA5e4DNyrRSMS4PmbUy0YGpFmvR6_2GvGC4SD3JXXJNBtTLqN71zcl3lNmFG3hRVBIjjmTiO5kT39E4mcd53KFw',
  menuboard: 'ANWiy9R1CjlpO1Eer0wuDflwiOJ0r8XW3tUEkc8OPaWf8XJtqHu8zbkrQpOEa5Ui3lYKJimpP-quc_3H_leYqu48vAsCLJ9njugbFj6YSnF9ovN6MAaJ8oXnKBigbj6mHnxE1UAmKVOPBImyVMk_',
  photo8: 'ANWiy9QWaEv4HOEBYjF1OTm0qZzvdy9Iqcnq2fKXLe_Nb_Pkbdp4mjMmlZPj-guMDhDMSrvhuG8nArMxS1mRX2OmLpnJhZdbPto7gu3Qh7zEfbLIqV8rBuq2RauKjW7iFjJobiyeF-tiK14Uogzf',
  photo9: 'ANWiy9SSykde1ySKY_pa9UVZBGPoDgp9HPaIOSLCfH5iNapbBYcJxoNTLteoNfQo2KWsZIdSjFrExR-iaSXmJ_hth0nHw6m6zbXBpsjvyUKone5trAK9rFw8TsQMsYaxuQmJDTe3VAA7',
}

const outDir = join(import.meta.dirname, 'raw')
await mkdir(outDir, { recursive: true })

for (const [name, id] of Object.entries(photos)) {
  const res = await fetch(`${BASE}${id}=s0`)
  if (!res.ok) {
    console.error(`x ${name}: HTTP ${res.status}`)
    continue
  }
  const buf = Buffer.from(await res.arrayBuffer())
  await writeFile(join(outDir, `${name}.jpg`), buf)
  console.log(`ok ${name} (${Math.round(buf.length / 1024)} KB)`)
}
