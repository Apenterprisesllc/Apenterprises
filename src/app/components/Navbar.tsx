import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { services } from "../data/services";
import logoImg from "figma:asset/ff09f92f07bd4aa3a72ff5dad81cbf4cb16ea8e0.png";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setServicesOpen(false);
  }, [location]);

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0B1929]/97 backdrop-blur-xl shadow-[0_4px_40px_rgba(0,0,0,0.35)] border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <img 
              src={logoImg} 
              alt="AP Enterprises" 
              className="h-10 sm:h-12 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg text-[13px] transition-all duration-200 ${
                isActive("/") && location.pathname === "/"
                  ? "text-[#0FBAC9] bg-[#0FBAC9]/10"
                  : "text-white/70 hover:text-white hover:bg-white/8"
              }`}
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className={`flex items-center gap-1 px-4 py-2 rounded-lg text-[13px] transition-all duration-200 ${
                  isActive("/services")
                    ? "text-[#0FBAC9] bg-[#0FBAC9]/10"
                    : "text-white/70 hover:text-white hover:bg-white/8"
                }`}
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Services
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full left-0 mt-2 w-72 bg-[#0D1F33] border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden"
                  >
                    <div className="p-2">
                      <Link
                        to="/services"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#0FBAC9] hover:bg-white/8 transition-colors mb-1 border-b border-white/8 pb-3 mb-2"
                        style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 500 }}
                      >
                        All Services →
                      </Link>
                      {services.map((s) => (
                        <Link
                          key={s.id}
                          to={`/services/${s.id}`}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl text-white/65 hover:text-white hover:bg-white/8 transition-colors text-[12px]"
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          {s.title}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/quote"
              className={`px-4 py-2 rounded-lg text-[13px] transition-all duration-200 ${
                isActive("/quote")
                  ? "text-[#0FBAC9] bg-[#0FBAC9]/10"
                  : "text-white/70 hover:text-white hover:bg-white/8"
              }`}
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Contact
            </Link>
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+15613851564"
              className="flex items-center gap-2 text-white/60 hover:text-white text-[13px] transition-colors"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <Phone className="w-3.5 h-3.5 text-[#0FBAC9]" />
              (561) 385-1564
            </a>
            <Link
              to="/quote"
              className="ml-1 px-5 py-2.5 bg-gradient-to-r from-[#0FBAC9] to-[#0CA3B1] hover:from-[#0EADB9] hover:to-[#0991A0] text-white text-[13px] rounded-xl transition-all duration-300 shadow-lg shadow-[#0FBAC9]/25 hover:shadow-[#0FBAC9]/40 hover:-translate-y-px"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
            >
              Free Quote
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white p-2"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:hidden overflow-hidden bg-[#0B1929]/98 backdrop-blur-xl border-t border-white/8"
          >
            <div className="px-6 py-5 flex flex-col gap-1">
              <Link to="/" className="px-3 py-2.5 text-white/80 text-sm rounded-lg hover:bg-white/8 hover:text-white transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>Home</Link>
              <Link to="/services" className="px-3 py-2.5 text-white/80 text-sm rounded-lg hover:bg-white/8 hover:text-white transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>All Services</Link>
              {services.map((s) => (
                <Link key={s.id} to={`/services/${s.id}`} className="px-3 py-2 pl-6 text-white/50 text-xs rounded-lg hover:bg-white/8 hover:text-white/80 transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>
                  {s.title}
                </Link>
              ))}
              <div className="h-px bg-white/10 my-2" />
              <a href="tel:+15613851564" className="flex items-center gap-2 px-3 py-2.5 text-white/70 text-sm">
                <Phone className="w-4 h-4 text-[#0FBAC9]" /> (561) 385-1564
              </a>
              <Link to="/quote" className="mt-1 px-4 py-3 bg-gradient-to-r from-[#0FBAC9] to-[#0CA3B1] text-white text-sm rounded-xl text-center" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
                Get a Free Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}