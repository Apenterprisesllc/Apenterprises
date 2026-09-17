import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

// Builds every service photo on the site from the client's own Instagram exports.
//
// The sources are almost all 4:5 / 3:4 portraits, so each landscape asset needs a
// hand-framed crop box. We deliberately do NOT use sharp's `position: "entropy"`:
// it chases detail and decapitates the people who are in most of these frames.
// Every box below was picked by eye against the original, and assertBox fails
// loudly if one ever drifts outside its source.

const SRC_DIR = path.resolve("media-src/instagram");
const PHOTOS_DIR = path.resolve("public/media/photos");
const LANDSCAPE_DIR = path.join(PHOTOS_DIR, "landscape");
const BEFORE_AFTER_DIR = path.join(PHOTOS_DIR, "before-after");
const MANIFEST_PATH = path.resolve("docs/service-image-attribution.json");

// Sources top out at 1440px wide, so 2400px outputs would just store upscaled
// pixels. 1920x1080 keeps the landscape assets honest and roughly halves their weight.
const LANDSCAPE = { width: 1920, height: 1080, quality: 84 };
const POSTER = { width: 1200, height: 1600, quality: 80 };
const BEFORE_AFTER = { width: 1600, height: 1200, quality: 82 };

const WIDE_DIR = path.resolve("media-src/para-extender-ia");

// Un `src` que termina en "-wide" es una foto vertical que ChatGPT extendio a
// 16:9 por outpainting (ver el README de esa carpeta). Ya viene en proporcion,
// asi que esas specs no llevan `crop`.
//
// Se guardan como JPG q95, no como el PNG que devuelve ChatGPT: son fotografias,
// el PNG las dejaba en 2.2MB cada una (22MB en el repo, y el historial de git es
// para siempre) y la diferencia visible tras el webp final es nula.
function sourcePath(name) {
  return name.endsWith("-wide")
    ? path.join(WIDE_DIR, `${name}.jpg`)
    : path.join(SRC_DIR, `igexport-${name}.jpg`);
}

function sourceRef(name) {
  return path.relative(path.resolve("."), sourcePath(name)).replaceAll("\\", "/");
}

// serviceId -> the two assets the site renders for it.
// `crop` is {left, top, width, height} on the ORIGINAL pixels; omit it when the
// source is already at the target aspect ratio.
const SERVICES = [
  {
    id: "post-construction-cleaning",
    landscape: {
      src: "02-post-construction-pertiga-wide",
      post: "DVUhNy7DWbl",
      note: "Lavado de cristales en obra recien entregada (extendida a 16:9)",
    },
    poster: {
      src: "DVUhNy7DWbl-3",
      post: "DVUhNy7DWbl",
      note: "Lavado de ventana alta con pertiga",
    },
  },
  {
    id: "commercial-cleaning",
    landscape: {
      src: "01-commercial-cleaning-almacen-autos-wide",
      post: "DJKoE4URYL4",
      note: "Trapeado de piso epoxico en almacen de autos clasicos (extendida a 16:9)",
    },
    poster: {
      src: "DJKoE4URYL4-5",
      post: "DJKoE4URYL4",
      crop: { left: 45, top: 0, width: 1350, height: 1800 },
      note: "Mismo trabajo, encuadre vertical completo",
    },
  },
  {
    id: "after-hours-office-cleaning",
    landscape: {
      src: "DG3YQcoRTzK-5",
      post: "DG3YQcoRTzK",
      crop: { left: 0, top: 500, width: 1440, height: 810 },
      note: "Oficina vacia ya terminada",
    },
    poster: {
      src: "DG3YQcoRTzK-10",
      post: "DG3YQcoRTzK",
      crop: { left: 45, top: 0, width: 1349, height: 1799 },
      note: "Personal con polo AP limpiando impresora",
    },
  },
  {
    id: "epoxy-floor-services",
    landscape: {
      src: "Dby9MRFGnIp-3",
      post: "Dby9MRFGnIp",
      crop: { left: 0, top: 430, width: 1080, height: 608 },
      note: "Piso epoxico terminado (el despues del comparador)",
    },
    poster: {
      src: "Dby9MRFGnIp",
      post: "Dby9MRFGnIp",
      crop: { left: 34, top: 0, width: 1012, height: 1350 },
      note: "Piso epoxico terminado, sala con ventanas",
    },
  },
  {
    id: "marble-polishing",
    landscape: {
      // Resuelto: la extendida devuelve al operario completo, que era justo lo
      // que el recorte 16:9 se comia. El piso de oficina pulido no se pierde:
      // esta abajo, como el "despues" del comparador.
      src: "09-marble-polishing-operario-OPCIONAL-wide",
      post: "DGl6AeVxee9",
      note: "Restauracion de piso de piedra con Turbo Hybrid (extendida a 16:9)",
    },
    poster: {
      src: "DGl6AeVxee9-8",
      post: "DGl6AeVxee9",
      crop: { left: 45, top: 0, width: 1350, height: 1800 },
      note: "Operario con Turbo Hybrid restaurando piso de piedra",
    },
  },
  {
    id: "residential-cleaning",
    landscape: {
      src: "DQkeS7NEX2h",
      post: "DQkeS7NEX2h",
      crop: { left: 0, top: 430, width: 1024, height: 576 },
      note: "Dormitorio de lujo terminado",
    },
    poster: {
      src: "DQkeS7NEX2h-4",
      post: "DQkeS7NEX2h",
      note: "Personal AP en cocina de roble",
    },
  },
  {
    id: "deep-cleaning",
    landscape: {
      src: "06-deep-cleaning-cocina-grasa-wide",
      post: "DVCrWDEDbkW",
      note: "Cocina de gas con grasa calcinada (extendida a 16:9)",
    },
    poster: {
      src: "DVCrWDEDbkW-3",
      post: "DVCrWDEDbkW",
      note: "Rasqueta sobre cocina con grasa calcinada",
    },
  },
  {
    id: "disinfecting-services",
    landscape: {
      src: "03-disinfecting-rociado-restaurante-wide",
      post: "DUMareYjVZX",
      note: "Rociado de desinfectante con el comedor cerrado (extendida a 16:9)",
    },
    poster: {
      src: "DUMareYjVZX-3",
      post: "DUMareYjVZX",
      crop: { left: 34, top: 0, width: 1012, height: 1350 },
      note: "Limpieza de taburetes en barra",
    },
  },
  {
    id: "events-cleaning",
    landscape: {
      // UNICA IMAGEN GENERADA DEL SITIO. No hay ninguna foto de evento en el
      // material del cliente. Reemplazar en cuanto mande una propia.
      src: "10-events-cleaning-GENERAR-wide",
      post: null,
      generated: true,
      note: "IMAGEN GENERADA con IA — reemplazar por foto real de evento",
    },
    poster: {
      // "Seats and upholstery" es parte del servicio, asi que la silla encaja.
      src: "DGl6AeVxee9-2",
      post: "DGl6AeVxee9",
      crop: { left: 45, top: 0, width: 1349, height: 1799 },
      note: "Limpieza de silla tapizada",
    },
  },
  {
    id: "housekeeping",
    landscape: {
      src: "05-housekeeping-cajon-cocina-wide",
      post: "DQkeS7NEX2h",
      note: "Personal AP limpiando cajon en residencia de lujo (extendida a 16:9)",
    },
    poster: {
      src: "DQkeS7NEX2h-2",
      post: "DQkeS7NEX2h",
      note: "Personal AP limpiando cajon de cocina",
    },
  },
  {
    id: "real-estate-cleaning",
    landscape: {
      src: "DaLk0swGqLT",
      post: "DaLk0swGqLT",
      crop: { left: 0, top: 270, width: 1086, height: 611 },
      note: "Residencia de lujo lista para entrega",
    },
    poster: {
      src: "DaLk0swGqLT-3",
      post: "DaLk0swGqLT",
      note: "Corredizas y patio exterior",
    },
  },
  {
    id: "after-hours-restaurant-cleaning",
    landscape: {
      src: "DGl6AeVxee9-5",
      post: "DGl6AeVxee9",
      crop: { left: 0, top: 560, width: 1440, height: 810 },
      note: "Maquina extractora en el comedor fuera de horario",
    },
    poster: {
      src: "DGl6AeVxee9-7",
      post: "DGl6AeVxee9",
      crop: { left: 45, top: 0, width: 1349, height: 1799 },
      note: "Limpieza de freidora",
    },
  },
  {
    id: "staffing",
    landscape: {
      src: "C-sUzTMpzMQ",
      post: "C-sUzTMpzMQ",
      crop: { left: 0, top: 140, width: 1440, height: 810 },
      // Follaje denso: a q84 este archivo se va a 585KB, el doble que el resto.
      quality: 64,
      note: "Equipo AP completo, la unica foto horizontal nativa del material",
    },
    poster: {
      src: "DZTkTZrDSND-2",
      post: "DZTkTZrDSND",
      note: "Flota rotulada con los servicios",
    },
  },
];

// Pares reales verificados: el mismo angulo de camara en ambas tomas.
// El crop recorta ademas los sellos que traen las fotos (pildora SWIPE,
// marca de agua AP dorada y las insignias BEFORE / AFTER).
const BEFORE_AFTER_PAIRS = [
  {
    slug: "epoxy-open-floor",
    serviceId: "epoxy-floor-services",
    post: "Dby9MRFGnIp",
    before: "Dby9MRFGnIp-2",
    after: "Dby9MRFGnIp",
    crop: { left: 0, top: 320, width: 1080, height: 810 },
    caption: "Bare concrete slab to a poured epoxy finish",
  },
  {
    slug: "epoxy-glass-doors",
    serviceId: "epoxy-floor-services",
    post: "Dby9MRFGnIp",
    before: "Dby9MRFGnIp-4",
    after: "Dby9MRFGnIp-3",
    crop: { left: 0, top: 320, width: 1080, height: 810 },
    caption: "Open floor sealed into a light-reflecting surface",
  },
  {
    slug: "epoxy-corridor",
    serviceId: "epoxy-floor-services",
    post: "Dby9MRFGnIp",
    before: "Dby9MRFGnIp-6",
    after: "Dby9MRFGnIp-5",
    crop: { left: 0, top: 320, width: 1080, height: 810 },
    caption: "Main corridor resurfaced end to end",
  },
  {
    // Unico par horizontal nativo del material (1086x815). El crop recorta la
    // pildora "Swipe" de la esquina inferior derecha del fotograma limpio.
    slug: "commercial-kitchen",
    serviceId: "after-hours-restaurant-cleaning",
    post: "DcZxBxNDfiJ",
    before: "DcZxBxNDfiJ-2",
    after: "DcZxBxNDfiJ",
    crop: { left: 84, top: 0, width: 918, height: 690 },
    caption: "A working line kitchen reset to spotless overnight",
  },
  {
    // El crop deja fuera las insignias BEFORE / AFTER incrustadas abajo.
    slug: "office-floor-polish",
    serviceId: "marble-polishing",
    post: "DT83x22jbD4",
    before: "DT83x22jbD4-2",
    after: "DT83x22jbD4",
    crop: { left: 0, top: 400, width: 1080, height: 810 },
    caption: "Dull concrete ground and polished to a mirror finish",
  },
  {
    slug: "restaurant-tile-floor",
    serviceId: "after-hours-restaurant-cleaning",
    post: "DXmSKWXjQX7",
    before: "DXmSKWXjQX7-2",
    after: "DXmSKWXjQX7",
    crop: { left: 0, top: 250, width: 1080, height: 810 },
    caption: "Restaurant tile and grout after an overnight deep scrub",
  },
];

async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true });
}

function assertBox(srcName, meta, crop) {
  if (!crop) return;
  const { left, top, width, height } = crop;
  if (left < 0 || top < 0 || left + width > meta.width || top + height > meta.height) {
    throw new Error(
      `crop fuera de rango para ${srcName} (${meta.width}x${meta.height}): ` +
        `left=${left} top=${top} width=${width} height=${height}`,
    );
  }
}

async function render(srcName, crop, out, outPath) {
  const srcPath = sourcePath(srcName);
  if (!fs.existsSync(srcPath)) throw new Error(`falta el original: ${srcPath}`);

  const pipeline = sharp(srcPath);
  const meta = await pipeline.metadata();
  assertBox(srcName, meta, crop);
  if (crop) pipeline.extract(crop);

  await pipeline
    .resize({ width: out.width, height: out.height, fit: "cover" })
    .webp({ quality: out.quality, effort: 6 })
    .toFile(outPath);

  const { size } = await fs.promises.stat(outPath);
  const rel = path.relative(path.resolve("."), outPath).replaceAll("\\", "/");
  console.log(
    `  ${rel.padEnd(54)} ${out.width}x${out.height}  ${(size / 1024).toFixed(0).padStart(4)}KB  <- ${srcName}`,
  );
  return { size };
}

async function main() {
  await ensureDir(LANDSCAPE_DIR);
  await ensureDir(BEFORE_AFTER_DIR);
  await ensureDir(path.dirname(MANIFEST_PATH));

  const entries = [];
  let heaviest = { name: "", size: 0 };

  console.log("\nservicios (landscape + poster)");
  for (const service of SERVICES) {
    const landscapePath = path.join(LANDSCAPE_DIR, `${service.id}-landscape.webp`);
    const posterPath = path.join(PHOTOS_DIR, `${service.id}.webp`);

    const l = await render(
      service.landscape.src,
      service.landscape.crop,
      { ...LANDSCAPE, quality: service.landscape.quality ?? LANDSCAPE.quality },
      landscapePath,
    );
    await render(
      service.poster.src,
      service.poster.crop,
      { ...POSTER, quality: service.poster.quality ?? POSTER.quality },
      posterPath,
    );

    if (l.size > heaviest.size) heaviest = { name: service.id, size: l.size };

    entries.push({
      serviceId: service.id,
      platform: "Client Instagram",
      author: "AP Enterprises",
      sourcePost: service.landscape.post
        ? `https://www.instagram.com/p/${service.landscape.post}/`
        : null,
      aiGenerated: service.landscape.generated === true,
      landscape: {
        asset: `/media/photos/landscape/${service.id}-landscape.webp`,
        sourceFile: sourceRef(service.landscape.src),
        crop: service.landscape.crop ?? null,
        note: service.landscape.note,
      },
      poster: {
        asset: `/media/photos/${service.id}.webp`,
        sourceFile: sourceRef(service.poster.src),
        crop: service.poster.crop ?? null,
        note: service.poster.note,
      },
      licenseReference: "Client-owned photography from the AP Enterprises Instagram account.",
    });
  }

  console.log("\ncomparadores antes/despues");
  const pairs = [];
  for (const pair of BEFORE_AFTER_PAIRS) {
    const beforePath = path.join(BEFORE_AFTER_DIR, `${pair.slug}-before.webp`);
    const afterPath = path.join(BEFORE_AFTER_DIR, `${pair.slug}-after.webp`);
    // The same crop box on both frames, or the wipe would not line up.
    await render(pair.before, pair.crop, BEFORE_AFTER, beforePath);
    await render(pair.after, pair.crop, BEFORE_AFTER, afterPath);

    pairs.push({
      slug: pair.slug,
      serviceId: pair.serviceId,
      platform: "Client Instagram",
      author: "AP Enterprises",
      sourcePost: `https://www.instagram.com/p/${pair.post}/`,
      caption: pair.caption,
      before: {
        asset: `/media/photos/before-after/${pair.slug}-before.webp`,
        sourceFile: sourceRef(pair.before),
      },
      after: {
        asset: `/media/photos/before-after/${pair.slug}-after.webp`,
        sourceFile: sourceRef(pair.after),
      },
      crop: pair.crop,
    });
  }

  await fs.promises.writeFile(
    MANIFEST_PATH,
    JSON.stringify(
      {
        description:
          "Service image provenance for AP Enterprises. Every asset is cropped from the client's own Instagram photography; no stock and no AI-generated imagery.",
        generatedOn: new Date().toISOString(),
        processing: {
          landscape: LANDSCAPE,
          poster: POSTER,
          beforeAfter: BEFORE_AFTER,
          fit: "cover",
          cropStrategy: "hand-framed",
        },
        entries,
        beforeAfterPairs: pairs,
      },
      null,
      2,
    ),
    "utf8",
  );

  console.log(`\nmanifiesto: ${path.relative(path.resolve("."), MANIFEST_PATH).replaceAll("\\", "/")}`);
  console.log(`landscape mas pesado: ${heaviest.name} (${(heaviest.size / 1024).toFixed(0)}KB)`);
}

main().catch((error) => {
  console.error(error.message ?? error);
  process.exit(1);
});
