import sharp from 'sharp';
import { readdir, unlink, stat } from 'fs/promises';
import { join, extname, basename } from 'path';

const DIRS = [
  'public/images/white',
  'public/images/black',
  'public/images/blue',
  'public/images/assets',
  'public/images/details',
];

const WEBP_QUALITY = 82;   // quality for bike shots (lossless-like with alpha)
const ASSET_QUALITY = 88;  // slightly higher for detail crops

let saved = 0;
let total = 0;

async function convertDir(dir, quality) {
  let files;
  try { files = await readdir(dir); } catch { return; }

  for (const file of files) {
    const ext = extname(file).toLowerCase();
    if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue;

    const src  = join(dir, file);
    const dest = join(dir, basename(file, ext) + '.webp');

    const srcStat = await stat(src);
    const srcSize = srcStat.size;

    try {
      await sharp(src)
        .webp({ quality, alphaQuality: 90, effort: 6 })
        .toFile(dest);

      const destStat = await stat(dest);
      const destSize = destStat.size;
      const pct = Math.round((1 - destSize / srcSize) * 100);

      console.log(`  ✓  ${file.padEnd(36)} ${kb(srcSize)} → ${kb(destSize)}  (-${pct}%)`);

      saved += srcSize - destSize;
      total += srcSize;

      // Remove original after successful conversion
      await unlink(src);
    } catch (err) {
      console.error(`  ✗  ${file}: ${err.message}`);
    }
  }
}

function kb(bytes) {
  return (bytes / 1024).toFixed(0).padStart(5) + ' KB';
}

console.log('\n🔧 Optimising images → WebP\n');
for (const dir of DIRS) {
  const quality = dir.includes('assets') || dir.includes('details')
    ? ASSET_QUALITY
    : WEBP_QUALITY;
  console.log(`📁 ${dir}`);
  await convertDir(dir, quality);
}

console.log(`\n✅  Done — saved ${(saved / 1024 / 1024).toFixed(1)} MB`);
console.log(`   Total before: ${(total / 1024 / 1024).toFixed(1)} MB`);
console.log(`   Total after : ~${((total - saved) / 1024 / 1024).toFixed(1)} MB\n`);
