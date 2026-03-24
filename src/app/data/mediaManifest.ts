const MEDIA_VERSION = "2026-03-23-1";

function appendVersion(path: string): string {
  const separator = path.includes("?") ? "&" : "?";
  return `${path}${separator}v=${MEDIA_VERSION}`;
}

export function mediaUrl(path: string): string {
  if (!path.startsWith("/")) return path;
  return appendVersion(path);
}

export function videoVariantBase(path: string): string {
  return path.replace(/\.mp4$/i, "");
}

