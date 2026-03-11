import sharp from "sharp";
import { execSync } from "child_process";
import { existsSync, mkdirSync, statSync } from "fs";
import { join, resolve } from "path";
import ffmpegPath from "ffmpeg-static";

const PHOTOS_SRC = resolve(
  "C:/Users/josel/Downloads/AP ENTERPRISES-20260311T162655Z-3-001/AP ENTERPRISES"
);
const VIDEOS_SRC = resolve(
  "C:/Users/josel/Downloads/Servicios-20260311T163502Z-3-001/Servicios"
);

const PHOTOS_OUT = resolve("public/media/photos");
const VIDEOS_OUT = resolve("public/media/videos");

// Ensure output directories exist
[PHOTOS_OUT, VIDEOS_OUT].forEach((dir) => {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
});

// ── Photo mappings ──────────────────────────────────────────
const photoMap = [
  { src: "DSC00339.JPG", out: "post-construction-cleaning.webp" },
  { src: "DSC00007.JPG", out: "commercial-cleaning.webp" },
  { src: "DSC09955.JPG", out: "after-hours-office-cleaning.webp" },
  { src: "DSC00121.JPG", out: "epoxy-floor-services.webp" },
  { src: "DSC00166.JPG", out: "marble-polishing.webp" },
  { src: "DSC00316.JPG", out: "residential-cleaning.webp" },
  { src: "DSC00373.JPG", out: "deep-cleaning.webp" },
  { src: "DSC00100.JPG", out: "disinfecting-services.webp" },
  { src: "DSC00081.JPG", out: "events-cleaning.webp" },
  { src: "DSC00302.JPG", out: "housekeeping.webp" },
  { src: "DSC01930.JPG", out: "real-estate-cleaning.webp" },
  { src: "DSC00119.JPG", out: "after-hours-restaurant-cleaning.webp" },
  { src: "IMG_7597.jpg", out: "hero.webp" },
];

// ── Video mappings ──────────────────────────────────────────
const videoMap = [
  { src: "PostConstruction Nov05.mp4", out: "post-construction-cleaning.mp4" },
  { src: "Commercial Cleaning 17Jun.mp4", out: "commercial-cleaning.mp4" },
  { src: "Epoxy Ene16.mp4", out: "epoxy-floor-services.mp4" },
  { src: "Residential Cleaning 09Jul.mp4", out: "residential-cleaning.mp4" },
  { src: "Airbnbs Cleaning.mp4", out: "housekeeping.mp4" },
  { src: "Services 23Oct.mp4", out: "deep-cleaning.mp4" },
  {
    src: "Copia de Entrevista PostConstruction Feb26.mp4",
    out: "after-hours-office-cleaning.mp4",
  },
  { src: "West Palm Beach.mp4", out: "real-estate-cleaning.mp4" },
  { src: "Staffing 25Mar.mp4", out: "events-cleaning.mp4" },
  {
    src: "Personalized Transportation 15Ago.mp4",
    out: "disinfecting-services.mp4",
  },
];

// ── Process photos ──────────────────────────────────────────
console.log("\n=== Processing Photos ===\n");

// Some source files may use .JPG or .jpg — try both
function findPhoto(name) {
  const exact = join(PHOTOS_SRC, name);
  if (existsSync(exact)) return exact;
  // Try alternate case
  const alt = join(PHOTOS_SRC, name.toLowerCase());
  if (existsSync(alt)) return alt;
  const alt2 = join(PHOTOS_SRC, name.toUpperCase());
  if (existsSync(alt2)) return alt2;
  // Try .jpg <-> .JPG swap
  if (name.endsWith(".JPG")) {
    const swapped = join(PHOTOS_SRC, name.replace(".JPG", ".jpg"));
    if (existsSync(swapped)) return swapped;
  }
  if (name.endsWith(".jpg")) {
    const swapped = join(PHOTOS_SRC, name.replace(".jpg", ".JPG"));
    if (existsSync(swapped)) return swapped;
  }
  return null;
}

for (const { src, out } of photoMap) {
  const srcPath = findPhoto(src);
  const outPath = join(PHOTOS_OUT, out);

  if (!srcPath) {
    console.log(`  SKIP: ${src} not found`);
    continue;
  }

  try {
    await sharp(srcPath)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(outPath);

    const fileSize = existsSync(outPath) ? statSync(outPath).size : 0;
    console.log(`  OK: ${src} -> ${out} (${(fileSize / 1024).toFixed(0)}KB)`);
  } catch (err) {
    console.error(`  ERR: ${src} - ${err.message}`);
  }
}

// ── Process videos ──────────────────────────────────────────
console.log("\n=== Processing Videos ===\n");
console.log(`Using ffmpeg: ${ffmpegPath}\n`);

for (const { src, out } of videoMap) {
  const srcPath = join(VIDEOS_SRC, src);
  const outPath = join(VIDEOS_OUT, out);

  if (!existsSync(srcPath)) {
    console.log(`  SKIP: ${src} not found`);
    continue;
  }

  try {
    const cmd = `"${ffmpegPath}" -i "${srcPath}" -vf "scale=-2:1080" -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 192k -movflags +faststart -y "${outPath}"`;
    console.log(`  Processing: ${src} ...`);
    execSync(cmd, { stdio: "pipe", timeout: 600000 });
    const stat = statSync(outPath);
    console.log(
      `  OK: ${src} -> ${out} (${(stat.size / (1024 * 1024)).toFixed(1)}MB)`
    );
  } catch (err) {
    console.error(`  ERR: ${src} - ${err.message}`);
  }
}

console.log("\n=== Done ===\n");
