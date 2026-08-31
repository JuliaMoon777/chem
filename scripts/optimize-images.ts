import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function optimizeImagesInDir(dirPath: string) {
  if (!fs.existsSync(dirPath)) return;
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      continue;
    }

    const ext = path.extname(file).toLowerCase();
    const baseName = path.basename(file, ext);

    if (ext === '.jpg' || ext === '.jpeg') {
      const inputBuffer = fs.readFileSync(fullPath);
      const metadata = await sharp(inputBuffer).metadata();

      console.log(`Optimizing ${file} (${(stat.size / 1024).toFixed(1)} KB, ${metadata.width}x${metadata.height})...`);

      // 1. Optimized WebP version
      const webpPath = path.join(dirPath, `${baseName}.webp`);
      await sharp(inputBuffer)
        .webp({ quality: 84, effort: 6 })
        .toFile(webpPath);

      const webpStat = fs.statSync(webpPath);
      console.log(`  -> Created WebP: ${(webpStat.size / 1024).toFixed(1)} KB`);

      // 2. High-efficiency progressive JPEG version (overwrite large source with optimized version)
      const optimizedJpgBuffer = await sharp(inputBuffer)
        .jpeg({ quality: 84, progressive: true, mozjpeg: true })
        .toBuffer();

      fs.writeFileSync(fullPath, optimizedJpgBuffer);
      const newJpgStat = fs.statSync(fullPath);
      console.log(`  -> Optimized JPG: ${(newJpgStat.size / 1024).toFixed(1)} KB (Saved: ${((1 - newJpgStat.size / stat.size) * 100).toFixed(1)}%)`);

      // 3. Special responsive sizes for Hero Aerial & Plant Topdown images
      if (file.includes('chemorozruch_aerial_plant') || file.includes('chemorozruch_plant_topdown')) {
        // Desktop 1600w
        const desktopWebp = path.join(dirPath, `${baseName}-1600w.webp`);
        await sharp(inputBuffer)
          .resize({ width: 1600, withoutEnlargement: true })
          .webp({ quality: 84, effort: 6 })
          .toFile(desktopWebp);

        const desktopJpg = path.join(dirPath, `${baseName}-1600w.jpg`);
        await sharp(inputBuffer)
          .resize({ width: 1600, withoutEnlargement: true })
          .jpeg({ quality: 84, progressive: true, mozjpeg: true })
          .toFile(desktopJpg);

        // Mobile 800w
        const mobileWebp = path.join(dirPath, `${baseName}-800w.webp`);
        await sharp(inputBuffer)
          .resize({ width: 800, withoutEnlargement: true })
          .webp({ quality: 82, effort: 6 })
          .toFile(mobileWebp);

        const mobileJpg = path.join(dirPath, `${baseName}-800w.jpg`);
        await sharp(inputBuffer)
          .resize({ width: 800, withoutEnlargement: true })
          .jpeg({ quality: 82, progressive: true, mozjpeg: true })
          .toFile(mobileJpg);

        console.log(`  -> Generated responsive variants: 1600w (${(fs.statSync(desktopWebp).size / 1024).toFixed(1)} KB), 800w (${(fs.statSync(mobileWebp).size / 1024).toFixed(1)} KB)`);
      }
    }
  }
}

async function main() {
  console.log('--- OPTIMIZING SRC ASSETS IMAGES ---');
  await optimizeImagesInDir(path.resolve(process.cwd(), 'src/assets/images'));

  console.log('\n--- OPTIMIZING PUBLIC IMAGES ---');
  await optimizeImagesInDir(path.resolve(process.cwd(), 'public/images'));

  console.log('\nImage optimization finished successfully.');
}

main().catch(err => {
  console.error('Image optimization error:', err);
  process.exit(1);
});
