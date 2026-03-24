import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent, type RefObject } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Maximize2, Pause, Play, Volume2, VolumeX, X } from "lucide-react";
import type { Service } from "../data/services";
import { getPreferredVideoSources } from "../media/videoDelivery";

interface ServiceVideoExperienceProps {
  service: Service;
  autoStart?: boolean;
}

export function ServiceVideoExperience({ service, autoStart = false }: ServiceVideoExperienceProps) {
  const [videoStarted, setVideoStarted] = useState(autoStart);
  const [videoPlaying, setVideoPlaying] = useState(autoStart);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoTime, setVideoTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [videoMuted, setVideoMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [videoOpen, setVideoOpen] = useState(false);
  const [modalPlaying, setModalPlaying] = useState(false);
  const [modalProgress, setModalProgress] = useState(0);
  const [modalTime, setModalTime] = useState(0);
  const [modalDuration, setModalDuration] = useState(0);
  const [modalMuted, setModalMuted] = useState(false);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const sources = useMemo(() => getPreferredVideoSources(service), [service]);

  useEffect(() => {
    if (!autoStart || !videoRef.current) return;

    const timerId = window.setTimeout(() => {
      void videoRef.current?.play();
    }, 50);

    return () => window.clearTimeout(timerId);
  }, [autoStart]);

  const fmt = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remaining = Math.floor(seconds % 60);
    return `${minutes}:${remaining.toString().padStart(2, "0")}`;
  };

  const seek = (event: MouseEvent<HTMLDivElement>, ref: RefObject<HTMLVideoElement | null>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const percentage = (event.clientX - rect.left) / rect.width;
    if (ref.current) ref.current.currentTime = percentage * (ref.current.duration || 0);
  };

  const toggle = (ref: RefObject<HTMLVideoElement | null>) => {
    if (!ref.current) return;
    if (ref.current.paused) {
      void ref.current.play();
    } else {
      ref.current.pause();
    }
  };

  const closeVideo = useCallback(() => {
    const currentTime = modalVideoRef.current?.currentTime || 0;
    if (modalVideoRef.current) modalVideoRef.current.pause();
    if (videoRef.current) videoRef.current.currentTime = currentTime;
    setVideoOpen(false);
    setModalPlaying(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && videoOpen) closeVideo();
    };

    if (videoOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [videoOpen, closeVideo]);

  return (
    <>
      <div className="bg-[#0A0A0A] rounded-2xl overflow-hidden border border-white/5 shadow-xl">
        <div className="px-4 pt-4 pb-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#C4973E]/15 flex items-center justify-center">
              <Play className="w-3 h-3 text-[#C4973E]" />
            </div>
            <p className="text-white/80 text-[13px]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
              See Our Work
            </p>
          </div>
          <span className="text-white/20 text-[10px] uppercase tracking-widest" style={{ fontFamily: "Inter, sans-serif" }}>
            Video
          </span>
        </div>
        <div className="px-2.5 pb-2.5">
          <div className="relative rounded-xl overflow-hidden bg-black" style={{ aspectRatio: "9 / 16" }}>
            {!videoStarted ? (
              <button
                onClick={() => {
                  setVideoStarted(true);
                  setVideoPlaying(true);
                  setTimeout(() => {
                    void videoRef.current?.play();
                  }, 50);
                }}
                className="block w-full h-full relative group cursor-pointer"
              >
                <img src={service.poster} alt={`${service.title} preview`} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/70 via-[#0A0A0A]/20 to-[#0A0A0A]/30 group-hover:from-[#0A0A0A]/50 group-hover:via-transparent group-hover:to-[#0A0A0A]/10 transition-all duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-white transition-all duration-300">
                    <Play className="w-6 h-6 text-[#0A0A0A] ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white/90 text-[12px] font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
                    Tap to play
                  </p>
                </div>
              </button>
            ) : (
              <div className="absolute inset-0 group/video">
                <video
                  ref={videoRef}
                  playsInline
                  preload="none"
                  poster={service.poster}
                  className="absolute inset-0 w-full h-full object-contain cursor-pointer"
                  onClick={() => toggle(videoRef)}
                  onPlay={() => setVideoPlaying(true)}
                  onPause={() => setVideoPlaying(false)}
                  onEnded={() => setVideoPlaying(false)}
                  onTimeUpdate={() => {
                    if (!videoRef.current) return;
                    setVideoTime(videoRef.current.currentTime);
                    setVideoDuration(videoRef.current.duration || 0);
                    setVideoProgress(
                      videoRef.current.duration ? (videoRef.current.currentTime / videoRef.current.duration) * 100 : 0,
                    );
                  }}
                >
                  {sources.map((source) => (
                    <source key={`${source.src}-${source.quality}`} src={source.src} type={source.type} />
                  ))}
                </video>

                {!videoPlaying && (
                  <button onClick={() => toggle(videoRef)} className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-xl">
                      <Play className="w-5 h-5 text-[#0A0A0A] ml-0.5" />
                    </div>
                  </button>
                )}

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-10 pb-2.5 px-3 opacity-0 group-hover/video:opacity-100 transition-opacity duration-300">
                  <div className="w-full h-1 bg-white/15 rounded-full mb-2.5 cursor-pointer group/bar" onClick={(event) => seek(event, videoRef)}>
                    <div className="h-full bg-[#C4973E] rounded-full relative transition-all" style={{ width: `${videoProgress}%` }}>
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-md scale-0 group-hover/bar:scale-100 transition-transform" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button onClick={() => toggle(videoRef)} className="text-white/80 hover:text-white transition-colors cursor-pointer">
                        {videoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      </button>
                      <span className="text-white/40 text-[10px] tabular-nums" style={{ fontFamily: "Inter, sans-serif" }}>
                        {fmt(videoTime)} / {fmt(videoDuration)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          const muted = !videoMuted;
                          setVideoMuted(muted);
                          if (videoRef.current) videoRef.current.muted = muted;
                        }}
                        className="text-white/40 hover:text-white transition-colors cursor-pointer"
                      >
                        {videoMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        onClick={() => {
                          const currentTime = videoRef.current?.currentTime || 0;
                          if (videoRef.current) videoRef.current.pause();
                          setVideoOpen(true);
                          setTimeout(() => {
                            if (modalVideoRef.current) {
                              modalVideoRef.current.currentTime = currentTime;
                              void modalVideoRef.current.play();
                            }
                          }, 100);
                        }}
                        className="text-white/40 hover:text-[#C4973E] transition-colors cursor-pointer"
                        title="Expand"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {videoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 z-[9999] flex items-center justify-center"
            style={{ width: "100vw", height: "100vh" }}
            onClick={closeVideo}
          >
            <div className="absolute top-0 left-0 w-full h-full bg-black" />
            <div className="absolute top-0 left-0 w-full h-full bg-black/60 backdrop-blur-xl" />

            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#C4973E]/4 blur-[150px]" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-5 py-4 md:px-8 md:py-5 bg-gradient-to-b from-black/60 to-transparent"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#C4973E]/15 border border-[#C4973E]/20 flex items-center justify-center">
                  <Play className="w-4 h-4 text-[#C4973E]" />
                </div>
                <div>
                  <p className="text-white text-[14px] leading-tight" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
                    {service.title}
                  </p>
                  <p className="text-white/25 text-[11px]" style={{ fontFamily: "Inter, sans-serif" }}>
                    AP Enterprises
                  </p>
                </div>
              </div>
              <button
                onClick={closeVideo}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center transition-all duration-200 cursor-pointer"
              >
                <X className="w-5 h-5 text-white/70" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col items-center justify-center max-h-[85vh] group/modal"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/[0.06]">
                <video
                  ref={modalVideoRef}
                  playsInline
                  preload="none"
                  poster={service.poster}
                  className="block max-h-[85vh] w-auto cursor-pointer"
                  onClick={() => toggle(modalVideoRef)}
                  onPlay={() => setModalPlaying(true)}
                  onPause={() => setModalPlaying(false)}
                  onEnded={() => setModalPlaying(false)}
                  onTimeUpdate={() => {
                    if (!modalVideoRef.current) return;
                    setModalTime(modalVideoRef.current.currentTime);
                    setModalDuration(modalVideoRef.current.duration || 0);
                    setModalProgress(
                      modalVideoRef.current.duration ? (modalVideoRef.current.currentTime / modalVideoRef.current.duration) * 100 : 0,
                    );
                  }}
                >
                  {sources.map((source) => (
                    <source key={`${source.src}-modal-${source.quality}`} src={source.src} type={source.type} />
                  ))}
                </video>

                {!modalPlaying && (
                  <button onClick={() => toggle(modalVideoRef)} className="absolute inset-0 flex items-center justify-center bg-black/20 transition-all cursor-pointer">
                    <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                      <Play className="w-7 h-7 text-[#0A0A0A] ml-0.5" />
                    </div>
                  </button>
                )}

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-14 pb-4 px-4 md:px-5 opacity-0 group-hover/modal:opacity-100 transition-opacity duration-300">
                  <div className="w-full h-1.5 bg-white/15 rounded-full mb-3 cursor-pointer group/bar" onClick={(event) => seek(event, modalVideoRef)}>
                    <div className="h-full bg-[#C4973E] rounded-full relative transition-all" style={{ width: `${modalProgress}%` }}>
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-lg scale-0 group-hover/bar:scale-100 transition-transform" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button onClick={() => toggle(modalVideoRef)} className="text-white/90 hover:text-white transition-colors cursor-pointer">
                        {modalPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                      </button>
                      <span className="text-white/40 text-[12px] tabular-nums" style={{ fontFamily: "Inter, sans-serif" }}>
                        {fmt(modalTime)} / {fmt(modalDuration)}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        const muted = !modalMuted;
                        setModalMuted(muted);
                        if (modalVideoRef.current) modalVideoRef.current.muted = muted;
                      }}
                      className="text-white/40 hover:text-white transition-colors cursor-pointer"
                    >
                      {modalMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
