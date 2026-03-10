import { useParams, Link } from "react-router";
import { motion } from "motion/react";
import {
  Home as HomeIcon, Building2, ShieldCheck, CalendarCheck,
  Hotel, KeyRound, HardHat, Sparkles, Moon, UtensilsCrossed, Layers, Gem,
  ArrowRight, CheckCircle2, Phone, Mail, ArrowLeft,
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

  return (
    <div className="relative bg-white">
      {/* Hero */}
      <section className="relative h-[50vh] md:h-[65vh] min-h-[420px] md:min-h-[480px] flex items-end overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
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