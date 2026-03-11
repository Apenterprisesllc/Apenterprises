import { useRef } from "react";
import { Link } from "react-router";
import { motion, useScroll, useTransform } from "motion/react";
import {
  Home as HomeIcon,
  Building2,
  ShieldCheck,
  CalendarCheck,
  Hotel,
  KeyRound,
  HardHat,
  Sparkles,
  Moon,
  UtensilsCrossed,
  Layers,
  Gem,
  Leaf,
  Users,
  Clock,
  Award,
  Phone,
  Mail,
  ArrowRight,
  ChevronRight,
  Star,
} from "lucide-react";
import { services } from "../data/services";
import { AnimatedSection, StaggerContainer, StaggerItem } from "../components/AnimatedSection";

const iconMap: Record<string, React.ElementType> = {
  Home: HomeIcon, Building2, ShieldCheck, CalendarCheck, Hotel,
  KeyRound, HardHat, Sparkles, Moon, UtensilsCrossed, Layers, Gem,
};

const industries = [
  { label: "Homes", icon: HomeIcon },
  { label: "Offices", icon: Building2 },
  { label: "Restaurants", icon: UtensilsCrossed },
  { label: "Hotels & Resorts", icon: Hotel },
  { label: "Airbnb Properties", icon: KeyRound },
  { label: "Real Estate", icon: HomeIcon },
  { label: "Construction", icon: HardHat },
  { label: "Events", icon: CalendarCheck },
];

const processSteps = [
  { num: "01", title: "Consultation", desc: "We listen to your needs and assess your space with no obligation." },
  { num: "02", title: "Custom Plan", desc: "A tailored cleaning proposal that fits your schedule and budget." },
  { num: "03", title: "Expert Execution", desc: "Our certified team delivers flawless results using premium products." },
  { num: "04", title: "Quality Check", desc: "Final walkthrough to ensure every detail meets our high standards." },
];

const whyFeatures = [
  { icon: Leaf, title: "Eco-Friendly Products", desc: "Safe, non-toxic solutions that are good for your family and the planet." },
  { icon: Users, title: "Vetted Professionals", desc: "Background-checked, trained experts who treat your space with respect." },
  { icon: Clock, title: "Flexible Scheduling", desc: "Morning, evening or weekends - we work around your life." },
  { icon: Award, title: "Premium Standards", desc: "We don't leave until every corner meets our quality benchmark." },
];

export function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div className="relative bg-white overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Parallax BG */}
        <motion.div
          style={{
            y: heroY,
            backgroundImage: "url(/media/photos/hero.webp)",
            willChange: "transform",
          }}
          className="absolute inset-0 bg-cover bg-center scale-110"
        />
        {/* Layered overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/95 via-[#0A0A0A]/80 to-[#0A0A0A]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />

        {/* Gold accent line */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-transparent via-[#C4973E] to-transparent" />

        {/* Floating orbs */}
        <motion.div
          animate={{ y: [0, -20, 0], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="hidden md:block absolute top-1/4 right-[15%] w-64 h-64 rounded-full bg-[#C4973E]/10 blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{ y: [0, 20, 0], opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="hidden md:block absolute bottom-1/4 right-[30%] w-96 h-96 rounded-full bg-[#C4973E]/8 blur-3xl pointer-events-none"
        />

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-32 w-full">
          <div className="max-w-2xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C4973E]/40 bg-[#C4973E]/10 mb-8"
            >
              <Star className="w-3 h-3 text-[#C4973E] fill-[#C4973E]" />
              <span className="text-[#C4973E] text-[11px] uppercase tracking-widest" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}>
                South Florida's Premium Cleaning Co.
              </span>
            </motion.div>

            {/* Headline */}
            <div className="overflow-hidden mb-3">
              <motion.h1
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-white"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "clamp(2.6rem, 5.5vw, 4.5rem)",
                  fontWeight: 700,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                }}
              >
                Professional
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-6">
              <motion.h1
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-[#C4973E]"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "clamp(2.6rem, 5.5vw, 4.5rem)",
                  fontWeight: 700,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                }}
              >
                Cleaning Services
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-2">
              <motion.h2
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                className="text-white/50"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                  fontWeight: 300,
                  letterSpacing: "-0.01em",
                }}
              >
                You Can Trust
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85 }}
              className="text-white/55 mb-10 max-w-lg"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "1.05rem", lineHeight: 1.8 }}
            >
              Customized, eco-friendly cleaning solutions for homes, offices, restaurants, hotels, and more. Delivered with precision and care.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1 }}
              className="flex flex-wrap gap-3 mb-12"
            >
              <Link
                to="/quote"
                className="group flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#C4973E] to-[#A67C2E] hover:from-[#D4A843] hover:to-[#B8892F] text-white rounded-xl transition-all duration-300 shadow-xl shadow-[#C4973E]/30 hover:shadow-[#C4973E]/50 hover:-translate-y-0.5"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "0.9rem" }}
              >
                Get a Free Quote
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="tel:+15613851564"
                className="flex items-center gap-2 px-7 py-3.5 bg-white/8 hover:bg-white/14 text-white border border-white/15 rounded-xl transition-all duration-300 backdrop-blur-sm"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "0.9rem" }}
              >
                <Phone className="w-4 h-4 text-[#C4973E]" />
                (561) 385-1564
              </a>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.2 }}
              className="flex flex-wrap items-center gap-5"
            >
              {[
                { val: "500+", label: "Happy clients" },
                { val: "12", label: "Services" },
                { val: "100%", label: "Satisfaction" },
              ].map((stat, i) => (
                <div key={i} className="flex items-baseline gap-1.5">
                  <span className="text-[#C4973E]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1.5rem" }}>{stat.val}</span>
                  <span className="text-white/35 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-white/30 to-white/0"
          />
          <span className="text-white/25 text-[10px] uppercase tracking-widest" style={{ fontFamily: "Inter, sans-serif" }}>Scroll</span>
        </motion.div>
      </section>

      {/* ── SERVICES STRIP ──────────────────────────── */}
      <section className="py-28 bg-[#F4F7FA]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <AnimatedSection className="mb-14 max-w-xl">
            <span className="text-[#C4973E] text-[11px] uppercase tracking-widest" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>What We Offer</span>
            <h2 className="text-[#0A0A0A] mt-2" style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>
              Comprehensive Cleaning Solutions
            </h2>
            <p className="text-[#0A0A0A]/50 mt-3 text-[15px] leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
              From your home to your business, we've got every environment covered.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.07}>
            {services.map((service) => {
              const Icon = iconMap[service.icon];
              return (
                <StaggerItem key={service.id}>
                  <Link
                    to={`/services/${service.id}`}
                    className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-[#C4973E]/10 border border-gray-100/80 hover:border-[#C4973E]/25 transition-all duration-400 hover:-translate-y-1.5 block"
                  >
                    {/* Image */}
                    <div className="relative h-44 overflow-hidden">
                      <img
                        loading="lazy"
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                        style={{ transform: "scale(1)" }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-[#0A0A0A]/20 to-transparent" />
                      <div className="absolute bottom-3.5 left-4">
                        <div className="w-9 h-9 rounded-xl bg-[#C4973E] flex items-center justify-center shadow-lg">
                          {Icon && <Icon className="w-4 h-4 text-white" />}
                        </div>
                      </div>
                    </div>
                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-[#0A0A0A] mb-2" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "0.95rem" }}>
                        {service.title}
                      </h3>
                      <p className="text-[#0A0A0A]/50 text-[13px] leading-relaxed line-clamp-2" style={{ fontFamily: "Inter, sans-serif" }}>
                        {service.shortDescription}
                      </p>
                      <div className="flex items-center gap-1 mt-3 text-[#C4973E] text-[12px] opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                        <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}>Learn more</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          <AnimatedSection className="mt-10 flex justify-center" delay={0.3}>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#0A0A0A] hover:bg-[#1A1A1A] text-white rounded-xl transition-all duration-300 hover:-translate-y-px shadow-lg shadow-[#0A0A0A]/30"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "0.9rem" }}
            >
              View All Services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ── WHY CHOOSE US ────────────────────────────── */}
      <section id="why-us" className="py-28 bg-[#0A0A0A] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#C4973E]/6 blur-[100px]" />
          <div className="absolute bottom-0 left-10 w-64 h-64 rounded-full bg-[#C4973E]/8 blur-3xl" />
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <AnimatedSection direction="left">
              <span className="text-[#C4973E] text-[11px] uppercase tracking-widest" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>Why AP Enterprises</span>
              <h2 className="text-white mt-3 mb-5" style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>
                The Premium Standard in Professional Cleaning
              </h2>
              <p className="text-white/45 text-[15px] leading-relaxed mb-10" style={{ fontFamily: "Inter, sans-serif" }}>
                We don't just clean. We create environments that inspire confidence and peace of mind. Every visit is delivered with our five-star standard, no exceptions.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {whyFeatures.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="flex gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#C4973E]/15 border border-[#C4973E]/20 flex items-center justify-center shrink-0">
                      <item.icon className="w-4.5 h-4.5 text-[#C4973E]" style={{ width: "18px", height: "18px" }} />
                    </div>
                    <div>
                      <h4 className="text-white text-[14px] mb-1" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>{item.title}</h4>
                      <p className="text-white/40 text-[13px] leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-10"
              >
                <Link
                  to="/quote"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#C4973E] to-[#A67C2E] text-white rounded-xl text-[14px] shadow-lg shadow-[#C4973E]/30 hover:-translate-y-0.5 hover:shadow-[#C4973E]/50 transition-all duration-300"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                >
                  Get Your Free Quote
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </AnimatedSection>

            {/* Stats */}
            <AnimatedSection direction="right">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "500+", label: "Happy Clients", sub: "and counting" },
                  { value: "12", label: "Services Offered", sub: "all environments" },
                  { value: "100%", label: "Satisfaction Rate", sub: "guaranteed" },
                  { value: "5★", label: "Average Rating", sub: "from our clients" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, duration: 0.5 }}
                    className="bg-white/5 border border-white/8 rounded-2xl p-7 hover:bg-white/8 transition-colors"
                  >
                    <p className="text-[#C4973E] mb-1" style={{ fontFamily: "Poppins, sans-serif", fontSize: "2.4rem", fontWeight: 700, lineHeight: 1 }}>
                      {stat.value}
                    </p>
                    <p className="text-white/80 text-[14px] mt-2" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>{stat.label}</p>
                    <p className="text-white/30 text-[12px] mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>{stat.sub}</p>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ──────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <AnimatedSection className="text-center mb-14">
            <span className="text-[#C4973E] text-[11px] uppercase tracking-widest" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>Industries We Serve</span>
            <h2 className="text-[#0A0A0A] mt-2" style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>
              Every Sector, Every Space
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-4 gap-4" staggerDelay={0.06}>
            {industries.map((item) => (
              <StaggerItem key={item.label}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="bg-[#F4F7FA] rounded-2xl p-6 flex flex-col items-center gap-3 cursor-default border border-transparent hover:border-[#C4973E]/20 hover:bg-white hover:shadow-lg hover:shadow-[#C4973E]/8 transition-colors duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#0A0A0A] flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-[#C4973E]" />
                  </div>
                  <p className="text-[#0A0A0A] text-[13px] text-center" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>{item.label}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── PROCESS ─────────────────────────────────── */}
      <section className="py-24 bg-[#F4F7FA]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <AnimatedSection className="text-center mb-16">
            <span className="text-[#C4973E] text-[11px] uppercase tracking-widest" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>How It Works</span>
            <h2 className="text-[#0A0A0A] mt-2" style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>
              Simple 4-Step Process
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.13, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative"
              >
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(50%+36px)] right-0 h-px bg-gradient-to-r from-[#C4973E]/30 to-transparent" />
                )}
                <div className="bg-white rounded-2xl p-7 border border-gray-100 hover:border-[#C4973E]/20 hover:shadow-xl hover:shadow-[#C4973E]/8 transition-all duration-300 h-full">
                  <div className="w-14 h-14 rounded-2xl bg-[#0A0A0A] flex items-center justify-center mb-5 shadow-lg">
                    <span className="text-[#C4973E]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1.1rem" }}>{step.num}</span>
                  </div>
                  <h3 className="text-[#0A0A0A] mb-2" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1rem" }}>
                    {step.title}
                  </h3>
                  <p className="text-[#0A0A0A]/50 text-[13px] leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────── */}
      <section id="contact" className="py-28 bg-[#0A0A0A] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[url('/media/photos/hero.webp')] bg-cover bg-center opacity-5" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[#C4973E]/8 blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C4973E]/30 bg-[#C4973E]/10 mb-8">
              <Sparkles className="w-3.5 h-3.5 text-[#C4973E]" />
              <span className="text-[#C4973E] text-[11px] uppercase tracking-widest" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}>Free Consultation</span>
            </div>
            <h2
              className="text-white mb-5"
              style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, letterSpacing: "-0.02em" }}
            >
              Ready for a <span className="text-[#C4973E]">Spotless Space?</span>
            </h2>
            <p className="text-white/45 mb-10 text-[15px] leading-relaxed max-w-xl mx-auto" style={{ fontFamily: "Inter, sans-serif" }}>
              Get a free, no-obligation quote today. We'll create a custom cleaning plan tailored to your space, schedule, and budget.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <Link
                to="/quote"
                className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#C4973E] to-[#A67C2E] hover:from-[#D4A843] hover:to-[#B8892F] text-white rounded-xl transition-all duration-300 shadow-2xl shadow-[#C4973E]/30 hover:-translate-y-0.5 hover:shadow-[#C4973E]/50"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
              >
                Request a Free Quote
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="tel:+15613851564"
                className="flex items-center gap-2 px-8 py-4 bg-white/8 hover:bg-white/14 text-white border border-white/15 rounded-xl transition-all duration-300 backdrop-blur-sm"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
              >
                <Phone className="w-4 h-4 text-[#C4973E]" />
                (561) 385-1564
              </a>
            </div>

            {/* Single contact row */}
            <div className="flex justify-center">
              <a
                href="mailto:andres@apentllc.com"
                className="flex items-center gap-2 text-white/35 hover:text-[#C4973E] transition-colors text-[13px]"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <Mail className="w-4 h-4" />
                andres@apentllc.com
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}