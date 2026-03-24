import { type ElementType } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import {
  Home as HomeIcon, Building2, ShieldCheck, CalendarCheck,
  Hotel, KeyRound, HardHat, Sparkles, Moon, UtensilsCrossed, Layers, Gem,
  ArrowRight, Phone,
} from "lucide-react";
import { services } from "../data/services";
import { AnimatedSection, StaggerContainer, StaggerItem } from "../components/AnimatedSection";
import { mediaUrl } from "../data/mediaManifest";

const iconMap: Record<string, ElementType> = {
  Home: HomeIcon, Building2, ShieldCheck, CalendarCheck, Hotel,
  KeyRound, HardHat, Sparkles, Moon, UtensilsCrossed, Layers, Gem,
};

export function Services() {
  const heroImage = mediaUrl("/media/photos/hero.webp");

  return (
    <div className="relative bg-white">
      {/* Hero */}
      <section className="relative py-24 md:py-36 bg-[#0A0A0A] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-8"
            style={{ opacity: 0.08, backgroundImage: `url(${heroImage})` }}
          />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-[#C4973E]/8 blur-[80px]" />
          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-transparent via-[#C4973E] to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-[12px] mb-8"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <Link to="/" className="text-white/35 hover:text-[#C4973E] transition-colors">Home</Link>
            <span className="text-white/20">/</span>
            <span className="text-[#C4973E]">Services</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C4973E]/30 bg-[#C4973E]/10 mb-5">
              <Sparkles className="w-3 h-3 text-[#C4973E]" />
              <span className="text-[#C4973E] text-[11px] uppercase tracking-widest" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}>Premium Cleaning</span>
            </div>
            <h1 className="text-white mb-4" style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>
              Our Services
            </h1>
            <p className="text-white/45 max-w-xl text-[15px] leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
              Twelve specialized services covering every cleaning need, from residential homes to commercial facilities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 bg-[#F4F7FA]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.07}>
            {services.map((service) => {
              const Icon = iconMap[service.icon];
              return (
                <StaggerItem key={service.id}>
                  <Link
                    to={`/services/${service.id}`}
                    className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#C4973E]/25 hover:shadow-2xl hover:shadow-[#C4973E]/8 transition-all duration-400 block"
                  >
                    <motion.div whileHover={{ scale: 1.015 }} transition={{ duration: 0.3 }}>
                      {/* Image */}
                      <div className="relative h-52 overflow-hidden">
                        <img
                          loading="lazy"
                          src={service.thumbnail}
                          alt={service.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/85 via-[#0A0A0A]/25 to-transparent" />
                        {/* Icon badge */}
                        <div className="absolute top-4 right-4">
                          <div className="w-9 h-9 rounded-xl bg-[#C4973E] flex items-center justify-center shadow-lg shadow-[#C4973E]/40">
                            {Icon && <Icon className="w-4 h-4 text-white" />}
                          </div>
                        </div>
                        {/* Title in image */}
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-white" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1rem" }}>
                            {service.title}
                          </h3>
                        </div>
                      </div>

                      {/* Body */}
                      <div className="p-5">
                        <p className="text-[#0A0A0A]/55 text-[13px] leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                          {service.shortDescription}
                        </p>
                        <div className="flex items-center gap-1 mt-4 text-[#C4973E] text-[12px] opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300">
                          <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}>View Details</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-[#0A0A0A] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full bg-[#C4973E]/8 blur-[60px]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <AnimatedSection>
            <h2 className="text-white mb-4" style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>
              Need a Custom Cleaning Solution?
            </h2>
            <p className="text-white/45 mb-8 text-[15px]" style={{ fontFamily: "Inter, sans-serif" }}>
              Every space is unique. Let us build a tailored plan that fits your exact needs and budget.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/quote"
                className="group flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#C4973E] to-[#A67C2E] hover:from-[#D4A843] hover:to-[#B8892F] text-white rounded-xl transition-all duration-300 shadow-lg shadow-[#C4973E]/30 hover:-translate-y-0.5"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
              >
                Request a Free Quote
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="tel:+15613851564"
                className="flex items-center gap-2 px-7 py-3.5 bg-white/8 hover:bg-white/14 text-white border border-white/15 rounded-xl transition-all duration-300"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
              >
                <Phone className="w-4 h-4 text-[#C4973E]" />
                (561) 385-1564
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
