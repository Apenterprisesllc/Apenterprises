import type { Service, ServiceVideoSource } from "../data/services";

interface NetworkInformationLike {
  saveData?: boolean;
  effectiveType?: string;
}

type NavigatorWithConnection = Navigator & { connection?: NetworkInformationLike };

function getNetworkHints(): { saveData: boolean; effectiveType: string } {
  const nav = navigator as NavigatorWithConnection;
  const connection = nav.connection;

  return {
    saveData: Boolean(connection?.saveData),
    effectiveType: connection?.effectiveType ?? "",
  };
}

function scoreSource(
  source: ServiceVideoSource,
  maxViewportWidth: number,
  saveData: boolean,
  effectiveType: string,
): number {
  let score = source.quality;

  if (maxViewportWidth <= 768) {
    score = source.quality <= 720 ? score + 1000 : score - 200;
  }

  if (saveData || effectiveType.includes("2g") || effectiveType.includes("3g")) {
    score = source.quality <= 720 ? score + 1500 : score - 500;
  }

  return score;
}

function fallbackSources(service: Service): ServiceVideoSource[] {
  if (!service.video) return [];

  return [{ src: service.video, type: "video/mp4", quality: 1080 }];
}

export function getPreferredVideoSources(service: Service): ServiceVideoSource[] {
  const candidates = service.videoSources?.length ? service.videoSources : fallbackSources(service);
  if (!candidates.length) return [];

  if (typeof window === "undefined") return candidates;

  const viewportWidth = window.innerWidth;
  const { saveData, effectiveType } = getNetworkHints();

  return [...candidates].sort((a, b) => {
    const scoreA = scoreSource(a, viewportWidth, saveData, effectiveType);
    const scoreB = scoreSource(b, viewportWidth, saveData, effectiveType);
    return scoreB - scoreA;
  });
}

