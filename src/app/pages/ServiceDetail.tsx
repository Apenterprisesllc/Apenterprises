import { useParams, Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect, useCallback } from "react";
import {
  Home as HomeIcon, Building2, ShieldCheck, CalendarCheck,
  Hotel, KeyRound, HardHat, Sparkles, Moon, UtensilsCrossed, Layers, Gem,
  ArrowRight, CheckCircle2, Phone, Mail, ArrowLeft, Play, Pause, X, Maximize2, Volume2, VolumeX,
} from "lucide-react";
import { services } from "../data/services";
import { AnimatedSection, StaggerContainer, StaggerItem } from "../components/AnimatedSection";

const iconMap: Record<string, React.ElementType> = {
  Home: HomeIcon, Building2, ShieldCheck, CalendarCheck, Hotel,
  KeyRound, HardHat, Sparkles, Moon, UtensilsCrossed, Layers, Gem,
};

export function ServiceDetail() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = services.find((s) => s.id === serviceId);
  const currentIndex = services.findIndex((s) => s.id === serviceId);

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 bg-[#F4F7FA]">
        <h1 className="text-[#0A0A0A] mb-4" style={{ fontFamily: "Poppins, sans-serif", fontSize: "2rem", fontWeight: 700 }}>Service Not Found</h1>
        <Link to="/services" className="px-6 py-3 bg-[#C4973E] text-white rounded-xl" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
          View All Services
        </Link>
      </div>
    );
  }

  const Icon = iconMap[service.icon];
  const related = services.filter((_, i) => i !== currentIndex).slice(0, 3);
  const [videoStarted, setVideoStarted] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
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

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>, ref: React.RefObject<HTMLVideoElement | null>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    if (ref.current) ref.current.currentTime = pct * (ref.current.duration || 0);
  };

  const toggle = (ref: React.RefObject<HTMLVideoElement | null>) => {
    if (!ref.current) return;
    if (ref.current.paused) ref.current.play();
    else ref.current.pause();
  };

  const closeVideo = useCallback(() => {
    const t = modalVideoRef.current?.currentTime || 0;
    if (modalVideoRef.current) modalVideoRef.current.pause();
    if (videoRef.current) videoRef.current.currentTime = t;
    setVideoOpen(false);
    setModalPlaying(false);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && videoOpen) closeVideo();
    };
    if (videoOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKey);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [videoOpen, closeVideo]);

  return (
    <div className="relative bg-white">
      {/* Hero */}
      <section className="relative h-[50vh] md:h-[65vh] min-h-[420px] md:min-h-[480px] flex items-end overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          loading="lazy"
          src={service.image}
          alt={service.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/55 to-[#0A0A0A]/15" />
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-transparent via-[#C4973E] to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-14 w-full">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2 text-[12px] mb-6"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <Link to="/" className="text-white/35 hover:text-[#C4973E] transition-colors">Home</Link>
            <span className="text-white/20">/</span>
            <Link to="/services" className="text-white/35 hover:text-[#C4973E] transition-colors">Services</Link>
            <span className="text-white/20">/</span>
            <span className="text-[#C4973E]">{service.title}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex items-end gap-5"
          >
            <div>
              <div className="flex items-center gap-4 mb-3">
                <div className="w-13 h-13 rounded-2xl bg-[#C4973E] flex items-center justify-center shadow-xl shadow-[#C4973E]/40" style={{ width: "52px", height: "52px" }}>
                  {Icon && <Icon className="w-6 h-6 text-white" />}
                </div>
              </div>
              <h1 className="text-white" style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(2rem, 4.5vw, 3.5rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>
                {service.title}
              </h1>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main */}
            <div className="lg:col-span-2">
              <AnimatedSection>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 text-[#C4973E] text-[13px] mb-10 hover:-translate-x-1 transition-transform"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  <ArrowLeft className="w-4 h-4" />
                  All Services
                </Link>

                <h2 className="text-[#0A0A0A] mb-5" style={{ fontFamily: "Poppins, sans-serif", fontSize: "1.6rem", fontWeight: 700, letterSpacing: "-0.015em" }}>
                  About This Service
                </h2>
                <p className="text-[#0A0A0A]/60 leading-relaxed mb-12 text-[15px]" style={{ fontFamily: "Inter, sans-serif" }}>
                  {service.fullDescription}
                </p>
              </AnimatedSection>

              {/* Features */}
              <AnimatedSection delay={0.1}>
                <h3 className="text-[#0A0A0A] mb-5" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1.1rem" }}>
                  What's Included
                </h3>
              </AnimatedSection>
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-14" staggerDelay={0.07}>
                {service.features.map((feature) => (
                  <StaggerItem key={feature}>
                    <div className="flex items-center gap-3 p-4 bg-[#F4F7FA] rounded-xl border border-transparent hover:border-[#C4973E]/20 transition-colors">
                      <CheckCircle2 className="w-4.5 h-4.5 text-[#C4973E] shrink-0" style={{ width: "18px", height: "18px" }} />
                      <span className="text-[#0A0A0A]/75 text-[13px]" style={{ fontFamily: "Inter, sans-serif" }}>
                        {feature}
                      </span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              {/* CTA Card */}
              <AnimatedSection delay={0.2}>
                <div className="relative bg-[#0A0A0A] rounded-2xl p-8 overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#C4973E]/10 blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-[#C4973E]/8 blur-2xl" />
                  </div>
                  <div className="relative z-10">
                    <p className="text-[#C4973E] text-[11px] uppercase tracking-widest mb-2" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}>Free Consultation</p>
                    <h3 className="text-white mb-3" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1.3rem" }}>
                      Ready to Get Started?
                    </h3>
                    <p className="text-white/45 text-[13px] mb-6 max-w-lg" style={{ fontFamily: "Inter, sans-serif" }}>
                      Request a free quote and we'll create a custom {service.title.toLowerCase()} plan tailored to your specific needs.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        to={`/quote?service=${encodeURIComponent(service.title)}`}
                        className="group flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#C4973E] to-[#A67C2E] text-white rounded-xl text-[14px] hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-[#C4973E]/30"
                        style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                      >
                        Get a Free Quote
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                      <a
                        href="tel:+15613851564"
                        className="flex items-center gap-2 px-6 py-2.5 bg-white/8 hover:bg-white/14 text-white border border-white/15 rounded-xl text-[14px] transition-all duration-300"
                        style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
                      >
                        <Phone className="w-3.5 h-3.5 text-[#C4973E]" />
                        (561) 385-1564
                      </a>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Contact */}
              <AnimatedSection direction="right">
                <div className="bg-[#F4F7FA] rounded-2xl p-6 border border-gray-100 sticky top-28">
                  <p className="text-[#0A0A0A] mb-5" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1rem" }}>Contact Us</p>
                  <div className="flex flex-col gap-4 mb-5">
                    <a href="tel:+15613851564" className="flex items-center gap-3 group">
                      <div className="w-9 h-9 rounded-xl bg-[#0A0A0A] flex items-center justify-center shrink-0">
                        <Phone className="w-4 h-4 text-[#C4973E]" />
                      </div>
                      <div>
                        <p className="text-[10px] text-[#0A0A0A]/35 uppercase tracking-wide" style={{ fontFamily: "Inter, sans-serif" }}>Phone</p>
                        <p className="text-[#0A0A0A]/80 text-[13px] group-hover:text-[#C4973E] transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>(561) 385-1564</p>
                      </div>
                    </a>
                    <a href="mailto:andres@apentllc.com" className="flex items-center gap-3 group">
                      <div className="w-9 h-9 rounded-xl bg-[#0A0A0A] flex items-center justify-center shrink-0">
                        <Mail className="w-4 h-4 text-[#C4973E]" />
                      </div>
                      <div>
                        <p className="text-[10px] text-[#0A0A0A]/35 uppercase tracking-wide" style={{ fontFamily: "Inter, sans-serif" }}>Email</p>
                        <p className="text-[#0A0A0A]/80 text-[13px] group-hover:text-[#C4973E] transition-colors break-all" style={{ fontFamily: "Inter, sans-serif" }}>andres@apentllc.com</p>
                      </div>
                    </a>
                  </div>
                  <Link
                    to={`/quote?service=${encodeURIComponent(service.title)}`}
                    className="w-full block text-center px-5 py-3 bg-gradient-to-r from-[#C4973E] to-[#A67C2E] text-white rounded-xl text-[14px] hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-[#C4973E]/25"
                    style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                  >
                    Request Free Quote
                  </Link>
                </div>
              </AnimatedSection>

              {/* Video */}
              {service.video && (
                <AnimatedSection direction="right" delay={0.08}>
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
                      <span className="text-white/20 text-[10px] uppercase tracking-widest" style={{ fontFamily: "Inter, sans-serif" }}>Video</span>
                    </div>
                    <div className="px-2.5 pb-2.5">
                      <div className="relative rounded-xl overflow-hidden bg-black" style={{ aspectRatio: "9 / 16" }}>
                        {!videoStarted ? (
                          <button
                            onClick={() => {
                              setVideoStarted(true);
                              setVideoPlaying(true);
                              setTimeout(() => videoRef.current?.play(), 50);
                            }}
                            className="block w-full h-full relative group cursor-pointer"
                          >
                            <img src={service.image} alt={`${service.title} preview`} className="absolute inset-0 w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/70 via-[#0A0A0A]/20 to-[#0A0A0A]/30 group-hover:from-[#0A0A0A]/50 group-hover:via-transparent group-hover:to-[#0A0A0A]/10 transition-all duration-500" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-white transition-all duration-300">
                                <Play className="w-6 h-6 text-[#0A0A0A] ml-0.5" />
                              </div>
                            </div>
                            <div className="absolute bottom-4 left-4 right-4">
                              <p className="text-white/90 text-[12px] font-medium" style={{ fontFamily: "Inter, sans-serif" }}>Tap to play</p>
                            </div>
                          </button>
                        ) : (
                          <div className="absolute inset-0 group/video">
                            <video
                              ref={videoRef}
                              playsInline
                              preload="none"
                              poster={service.image}
                              className="absolute inset-0 w-full h-full object-contain"
                              onClick={() => toggle(videoRef)}
                              onPlay={() => setVideoPlaying(true)}
                              onPause={() => setVideoPlaying(false)}
                              onEnded={() => setVideoPlaying(false)}
                              onTimeUpdate={() => {
                                if (!videoRef.current) return;
                                setVideoTime(videoRef.current.currentTime);
                                setVideoDuration(videoRef.current.duration || 0);
                                setVideoProgress(videoRef.current.duration ? (videoRef.current.currentTime / videoRef.current.duration) * 100 : 0);
                              }}
                            >
                              <source src={service.video} type="video/mp4" />
                            </video>

                            {/* Play/Pause center overlay */}
                            {!videoPlaying && (
                              <button onClick={() => toggle(videoRef)} className="absolute inset-0 flex items-center justify-center bg-black/20">
                                <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-xl">
                                  <Play className="w-5 h-5 text-[#0A0A0A] ml-0.5" />
                                </div>
                              </button>
                            )}

                            {/* Custom controls */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-10 pb-2.5 px-3 opacity-0 group-hover/video:opacity-100 transition-opacity duration-300">
                              {/* Progress bar */}
                              <div className="w-full h-1 bg-white/15 rounded-full mb-2.5 cursor-pointer group/bar" onClick={(e) => seek(e, videoRef)}>
                                <div className="h-full bg-[#C4973E] rounded-full relative transition-all" style={{ width: `${videoProgress}%` }}>
                                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-md scale-0 group-hover/bar:scale-100 transition-transform" />
                                </div>
                              </div>
                              {/* Buttons row */}
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <button onClick={() => toggle(videoRef)} className="text-white/80 hover:text-white transition-colors">
                                    {videoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                                  </button>
                                  <span className="text-white/40 text-[10px] tabular-nums" style={{ fontFamily: "Inter, sans-serif" }}>
                                    {fmt(videoTime)} / {fmt(videoDuration)}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => { const m = !videoMuted; setVideoMuted(m); if (videoRef.current) videoRef.current.muted = m; }}
                                    className="text-white/40 hover:text-white transition-colors"
                                  >
                                    {videoMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                                  </button>
                                  <button
                                    onClick={() => {
                                      const t = videoRef.current?.currentTime || 0;
                                      if (videoRef.current) videoRef.current.pause();
                                      setVideoOpen(true);
                                      setTimeout(() => { if (modalVideoRef.current) { modalVideoRef.current.currentTime = t; modalVideoRef.current.play(); } }, 100);
                                    }}
                                    className="text-white/40 hover:text-[#C4973E] transition-colors"
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
                </AnimatedSection>
              )}

              {/* Video Lightbox Modal */}
              <AnimatePresence>
                {videoOpen && service.video && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed top-0 left-0 z-[9999] flex items-center justify-center"
                    style={{ width: "100vw", height: "100vh" }}
                    onClick={closeVideo}
                  >
                    {/* Backdrop - solid black layer */}
                    <div className="absolute top-0 left-0 w-full h-full bg-black" />
                    {/* Blur overlay */}
                    <div className="absolute top-0 left-0 w-full h-full bg-black/60 backdrop-blur-xl" />

                    {/* Ambient glow */}
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#C4973E]/4 blur-[150px]" />
                    </div>

                    {/* Top bar */}
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
                        className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center transition-all duration-200"
                      >
                        <X className="w-5 h-5 text-white/70" />
                      </button>
                    </motion.div>

                    {/* Video + custom controls */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="relative flex flex-col items-center justify-center max-h-[85vh] group/modal"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="relative rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/[0.06]">
                        <video
                          ref={modalVideoRef}
                          playsInline
                          preload="none"
                          poster={service.image}
                          className="block max-h-[85vh] w-auto"
                          onClick={() => toggle(modalVideoRef)}
                          onPlay={() => setModalPlaying(true)}
                          onPause={() => setModalPlaying(false)}
                          onEnded={() => setModalPlaying(false)}
                          onTimeUpdate={() => {
                            if (!modalVideoRef.current) return;
                            setModalTime(modalVideoRef.current.currentTime);
                            setModalDuration(modalVideoRef.current.duration || 0);
                            setModalProgress(modalVideoRef.current.duration ? (modalVideoRef.current.currentTime / modalVideoRef.current.duration) * 100 : 0);
                          }}
                        >
                          <source src={service.video} type="video/mp4" />
                        </video>

                        {/* Center play button when paused */}
                        {!modalPlaying && (
                          <button onClick={() => toggle(modalVideoRef)} className="absolute inset-0 flex items-center justify-center bg-black/20 transition-all">
                            <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                              <Play className="w-7 h-7 text-[#0A0A0A] ml-0.5" />
                            </div>
                          </button>
                        )}

                        {/* Bottom controls */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-14 pb-4 px-4 md:px-5 opacity-0 group-hover/modal:opacity-100 transition-opacity duration-300">
                          {/* Progress bar */}
                          <div className="w-full h-1.5 bg-white/15 rounded-full mb-3 cursor-pointer group/bar" onClick={(e) => seek(e, modalVideoRef)}>
                            <div className="h-full bg-[#C4973E] rounded-full relative transition-all" style={{ width: `${modalProgress}%` }}>
                              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-lg scale-0 group-hover/bar:scale-100 transition-transform" />
                            </div>
                          </div>
                          {/* Buttons row */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <button onClick={() => toggle(modalVideoRef)} className="text-white/90 hover:text-white transition-colors">
                                {modalPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                              </button>
                              <span className="text-white/40 text-[12px] tabular-nums" style={{ fontFamily: "Inter, sans-serif" }}>
                                {fmt(modalTime)} / {fmt(modalDuration)}
                              </span>
                            </div>
                            <button
                              onClick={() => { const m = !modalMuted; setModalMuted(m); if (modalVideoRef.current) modalVideoRef.current.muted = m; }}
                              className="text-white/40 hover:text-white transition-colors"
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

              {/* Related services */}
              <AnimatedSection direction="right" delay={0.15}>
                <div className="bg-white border border-gray-100 rounded-2xl p-6">
                  <p className="text-[#0A0A0A] mb-4" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1rem" }}>Other Services</p>
                  <div className="flex flex-col gap-2">
                    {related.map((s) => {
                      const RelIcon = iconMap[s.icon];
                      return (
                        <Link
                          key={s.id}
                          to={`/services/${s.id}`}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F4F7FA] transition-colors group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-[#0A0A0A] flex items-center justify-center shrink-0 group-hover:bg-[#C4973E] transition-colors">
                            {RelIcon && <RelIcon className="w-3.5 h-3.5 text-[#C4973E] group-hover:text-white transition-colors" />}
                          </div>
                          <span className="text-[#0A0A0A]/65 text-[13px] group-hover:text-[#0A0A0A] transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>{s.title}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#0A0A0A]/20 ml-auto group-hover:text-[#C4973E] transition-colors" />
                        </Link>
                      );
                    })}
                    <Link
                      to="/services"
                      className="flex items-center justify-center gap-1.5 text-[#C4973E] text-[12px] mt-2 py-2"
                      style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
                    >
                      View All Services
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}