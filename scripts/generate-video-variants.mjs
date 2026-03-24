import { existsSync, readdirSync } from "node:fs";
import { resolve, extname, basename } from "node:path";
import { execSync } from "node:child_process";
import ffmpegPath from "ffmpeg-static";

const VIDEOS_DIR = resolve("public/media/videos");

if (!existsSync(VIDEOS_DIR)) {
  console.error("Video directory not found:", VIDEOS_DIR);
  process.exit(1);
}

const sourceFiles = readdirSync(VIDEOS_DIR)
  .filter((file) => extname(file).toLowerCase() === ".mp4")
  .filter((file) => !file.endsWith("-720.mp4"));

if (!sourceFiles.length) {
  console.log("No MP4 source files found for variant generation.");
  process.exit(0);
}

for (const file of sourceFiles) {
  const inputPath = resolve(VIDEOS_DIR, file);
  const outputPath = resolve(VIDEOS_DIR, `${basename(file, ".mp4")}-720.mp4`);

  const command =
    `"${ffmpegPath}" -i "${inputPath}" ` +
    `-vf "scale=-2:720" -c:v libx264 -crf 26 -preset medium ` +
    `-c:a aac -b:a 128k -movflags +faststart -y "${outputPath}"`;

  console.log(`Generating 720p variant for: ${file}`);
  execSync(command, { stdio: "ignore", timeout: 600000 });
}

console.log("Video variants generated.");

