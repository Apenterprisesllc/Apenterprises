import { Link } from "react-router";
import { Phone, Mail, MapPin } from "lucide-react";
import { services } from "../data/services";
import logoImg from "@/assets/ff09f92f07bd4aa3a72ff5dad81cbf4cb16ea8e0.png";

export function Footer() {
  const col1 = services.slice(0, 6);
  const col2 = services.slice(6);

  return (
    <footer style={{ background: "#080808" }} className="text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/8">
          {/* Brand */}
          <div>
            <img 
              src={logoImg} 
              alt="AP Enterprises" 
              className="h-16 w-auto mb-5"
            />
            <p className="text-white/40 text-[13px] leading-relaxed mb-6" style={{ fontFamily: "Inter, sans-serif" }}>
              Premium cleaning services for residential, commercial, and specialized environments across South Florida.
            </p>
            <div className="flex flex-col gap-3">
              <a href="tel:+15613851564" className="flex items-center gap-2.5 text-white/50 hover:text-[#C4973E] transition-colors text-[13px] group">
                <Phone className="w-3.5 h-3.5 text-[#C4973E] shrink-0" />
                (561) 385-1564
              </a>
              <a href="mailto:apenterprisesllc.web@gmail.com" className="flex items-center gap-2.5 text-white/50 hover:text-[#C4973E] transition-colors text-[13px]">
                <Mail className="w-3.5 h-3.5 text-[#C4973E] shrink-0" />
                apenterprisesllc.web@gmail.com
              </a>
              <div className="flex items-center gap-2.5 text-white/40 text-[13px]">
                <MapPin className="w-3.5 h-3.5 text-[#C4973E] shrink-0" />
                South Florida Area
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-white/50 text-[11px] uppercase tracking-widest mb-5" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>Navigation</p>
            <div className="flex flex-col gap-2.5">
              {[
                { label: "Home", to: "/" },
                { label: "All Services", to: "/services" },
                { label: "Get a Free Quote", to: "/quote" },
              ].map((l) => (
                <Link key={l.to} to={l.to} className="text-white/45 hover:text-[#C4973E] transition-colors text-[13px]" style={{ fontFamily: "Inter, sans-serif" }}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Services col 1 */}
          <div>
            <p className="text-white/50 text-[11px] uppercase tracking-widest mb-5" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>Services</p>
            <div className="flex flex-col gap-2.5">
              {col1.map((s) => (
                <Link key={s.id} to={`/services/${s.id}`} className="text-white/45 hover:text-[#C4973E] transition-colors text-[13px]" style={{ fontFamily: "Inter, sans-serif" }}>
                  {s.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Services col 2 */}
          <div>
            <p className="text-white/50 text-[11px] uppercase tracking-widest mb-5 opacity-0 select-none" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>_</p>
            <div className="flex flex-col gap-2.5">
              {col2.map((s) => (
                <Link key={s.id} to={`/services/${s.id}`} className="text-white/45 hover:text-[#C4973E] transition-colors text-[13px]" style={{ fontFamily: "Inter, sans-serif" }}>
                  {s.title}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-[12px]" style={{ fontFamily: "Inter, sans-serif" }}>
            © {new Date().getFullYear()} AP Enterprises LLC. All rights reserved.
          </p>
          <p className="text-white/20 text-[12px]" style={{ fontFamily: "Inter, sans-serif" }}>
            South Florida's Premium Cleaning Company
          </p>
        </div>
      </div>
    </footer>
  );
}