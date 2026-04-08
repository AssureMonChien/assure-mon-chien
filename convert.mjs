import sharp from 'sharp'
import { readdirSync, unlinkSync } from 'fs'

const dir = 'public/images/races'

for (const f of readdirSync(dir)) {
  if (!/\.(jpg|jpeg|png)$/i.test(f)) continue
  const src = `${dir}/${f}`
  const dest = `${dir}/${f.replace(/\.[^.]+$/, '.webp')}`
  await sharp(src).webp({ quality: 85 }).toFile(dest)
  unlinkSync(src)
  console.log(`OK ${f} → ${dest}`)
}
