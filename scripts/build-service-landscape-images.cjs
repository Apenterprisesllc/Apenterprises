const fs = require("node:fs");
const path = require("node:path");
const sharp = require("sharp");

const OUTPUT_DIR = path.resolve("public/media/photos/landscape");
const SOURCES_DIR = path.resolve("public/media/photos/landscape/sources");
const MANIFEST_PATH = path.resolve("docs/service-image-attribution.json");

const IMAGE_SPECS = [
  {
    serviceId: "post-construction-cleaning",
    outputFile: "post-construction-cleaning-landscape.webp",
    localSource: path.join(SOURCES_DIR, "post-construction-cleaning.png"),
    sourceUrl:
      "https://images.pexels.com/photos/3616746/pexels-photo-3616746.jpeg?cs=srgb&dl=pexels-lamiko-3616746.jpg&fm=jpg",
    sourcePage: "https://www.pexels.com/photo/3616746/",
    author: "Lamiko",
  },
  {
    serviceId: "commercial-cleaning",
    outputFile: "commercial-cleaning-landscape.webp",
    localSource: path.join(SOURCES_DIR, "commercial-cleaning.png"),
    sourceUrl:
      "https://images.pexels.com/photos/6197116/pexels-photo-6197116.jpeg?cs=srgb&dl=pexels-tima-miroshnichenko-6197116.jpg&fm=jpg",
    sourcePage: "https://www.pexels.com/photo/6197116/",
    author: "Tima Miroshnichenko",
  },
  {
    serviceId: "after-hours-office-cleaning",
    outputFile: "after-hours-office-cleaning-landscape.webp",
    localSource: path.join(SOURCES_DIR, "after-hours-office-cleaning.png"),
    sourceUrl:
      "https://images.pexels.com/photos/6197122/pexels-photo-6197122.jpeg?cs=srgb&dl=pexels-tima-miroshnichenko-6197122.jpg&fm=jpg",
    sourcePage: "https://www.pexels.com/photo/6197122/",
    author: "Tima Miroshnichenko",
  },
  {
    serviceId: "epoxy-floor-services",
    outputFile: "epoxy-floor-services-landscape.webp",
    sourceUrl:
      "https://images.pexels.com/photos/48889/cleaning-washing-cleanup-the-ilo-48889.jpeg?cs=srgb&dl=pexels-pixabay-48889.jpg&fm=jpg",
    sourcePage: "https://www.pexels.com/photo/48889/",
    author: "Pixabay",
  },
  {
    serviceId: "marble-polishing",
    outputFile: "marble-polishing-landscape.webp",
    localSource: path.join(SOURCES_DIR, "marble-polishing.png"),
    sourceUrl:
      "https://images.pexels.com/photos/4705853/pexels-photo-4705853.jpeg?cs=srgb&dl=pexels-karola-g-4705853.jpg&fm=jpg",
    sourcePage: "https://www.pexels.com/photo/4705853/",
    author: "Karola G",
  },
  {
    serviceId: "residential-cleaning",
    outputFile: "residential-cleaning-landscape.webp",
    sourceUrl:
      "https://images.pexels.com/photos/9462143/pexels-photo-9462143.jpeg?cs=srgb&dl=pexels-liliana-drew-9462143.jpg&fm=jpg",
    sourcePage: "https://www.pexels.com/photo/9462143/",
    author: "Liliana Drew",
  },
  {
    serviceId: "deep-cleaning",
    outputFile: "deep-cleaning-landscape.webp",
    sourceUrl:
      "https://images.pexels.com/photos/9462307/pexels-photo-9462307.jpeg?cs=srgb&dl=pexels-liliana-drew-9462307.jpg&fm=jpg",
    sourcePage: "https://www.pexels.com/photo/9462307/",
    author: "Liliana Drew",
  },
  {
    serviceId: "disinfecting-services",
    outputFile: "disinfecting-services-landscape.webp",
    sourceUrl:
      "https://images.pexels.com/photos/4099481/pexels-photo-4099481.jpeg?cs=srgb&dl=pexels-matilda-wormwood-4099481.jpg&fm=jpg",
    sourcePage: "https://www.pexels.com/photo/4099481/",
    author: "Matilda Wormwood",
  },
  {
    serviceId: "events-cleaning",
    outputFile: "events-cleaning-landscape.webp",
    sourceUrl:
      "https://images.pexels.com/photos/33520761/pexels-photo-33520761.jpeg?cs=srgb&dl=pexels-triemli-33520761.jpg&fm=jpg",
    sourcePage: "https://www.pexels.com/photo/33520761/",
    author: "Triemli",
  },
  {
    serviceId: "housekeeping",
    outputFile: "housekeeping-landscape.webp",
    sourceUrl:
      "https://images.pexels.com/photos/9462745/pexels-photo-9462745.jpeg?cs=srgb&dl=pexels-liliana-drew-9462745.jpg&fm=jpg",
    sourcePage: "https://www.pexels.com/photo/9462745/",
    author: "Liliana Drew",
  },
  {
    serviceId: "real-estate-cleaning",
    outputFile: "real-estate-cleaning-landscape.webp",
    sourceUrl:
      "https://images.pexels.com/photos/4832514/pexels-photo-4832514.jpeg?cs=srgb&dl=pexels-curtis-adams-1694007-4832514.jpg&fm=jpg",
    sourcePage: "https://www.pexels.com/photo/4832514/",
    author: "Curtis Adams",
  },
  {
    serviceId: "after-hours-restaurant-cleaning",
    outputFile: "after-hours-restaurant-cleaning-landscape.webp",
    sourceUrl:
      "https://images.pexels.com/photos/6197108/pexels-photo-6197108.jpeg?cs=srgb&dl=pexels-tima-miroshnichenko-6197108.jpg&fm=jpg",
    sourcePage: "https://www.pexels.com/photo/6197108/",
    author: "Tima Miroshnichenko",
  },
];

async function ensureDir(dirPath) {
  await fs.promises.mkdir(dirPath, { recursive: true });
}

async function loadImageBuffer(spec) {
  if (spec.localSource && fs.existsSync(spec.localSource)) {
    return {
      buffer: await fs.promises.readFile(spec.localSource),
      sourceType: "local",
      sourceReference: path.relative(path.resolve("."), spec.localSource).replaceAll("\\", "/"),
    };
  }

  const response = await fetch(spec.sourceUrl, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; AP-Enterprises-MediaBot/1.0)",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to download image (${response.status}) from ${spec.sourceUrl}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return {
    buffer: Buffer.from(arrayBuffer),
    sourceType: "remote",
    sourceReference: spec.sourceUrl,
  };
}

async function processImage(buffer, outputPath) {
  await sharp(buffer)
    .resize({
      width: 2400,
      height: 1350,
      fit: "cover",
      position: "entropy",
    })
    .webp({
      quality: 86,
      effort: 6,
    })
    .toFile(outputPath);
}

function buildManifestEntries(specs) {
  const generatedAt = new Date().toISOString();

  return specs.map((spec) => {
    const hasLocalSource = Boolean(spec.localSource && fs.existsSync(spec.localSource));

    return {
      serviceId: spec.serviceId,
      platform: hasLocalSource ? "Client Provided" : "Pexels",
      author: hasLocalSource ? "Client Asset" : spec.author,
      sourcePage: hasLocalSource ? null : spec.sourcePage,
      sourceDownloadUrl: hasLocalSource ? null : spec.sourceUrl,
      sourceFile: hasLocalSource
        ? path.relative(path.resolve("."), spec.localSource).replaceAll("\\", "/")
        : null,
      generatedAsset: `/media/photos/landscape/${spec.outputFile}`,
      generatedAt,
      processing: {
        width: 2400,
        height: 1350,
        format: "webp",
        fit: "cover",
        cropStrategy: "entropy",
      },
      licenseReference: hasLocalSource
        ? "Client-provided asset. License/usage rights managed by client."
        : "https://www.pexels.com/license/",
    };
  });
}

async function main() {
  await ensureDir(OUTPUT_DIR);
  await ensureDir(SOURCES_DIR);
  await ensureDir(path.dirname(MANIFEST_PATH));

  for (const spec of IMAGE_SPECS) {
    const outputPath = path.join(OUTPUT_DIR, spec.outputFile);
    const { buffer, sourceType } = await loadImageBuffer(spec);
    await processImage(buffer, outputPath);
    const { width, height } = await sharp(outputPath).metadata();
    const { size } = await fs.promises.stat(outputPath);
    console.log(
      `generated ${spec.outputFile} (${width}x${height}, ${(size / 1024).toFixed(1)}KB) [${sourceType}]`,
    );
  }

  const manifest = {
    description:
      "Service landscape image attribution and processing manifest for AP Enterprises.",
    generatedOn: new Date().toISOString(),
    entries: buildManifestEntries(IMAGE_SPECS),
  };

  await fs.promises.writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2), "utf8");
  console.log(`wrote attribution manifest: ${MANIFEST_PATH}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
