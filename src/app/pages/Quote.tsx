import { useState, useEffect, type CSSProperties } from "react";
import { useSearchParams, Link } from "react-router";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import {
  CheckCircle2, Phone, Mail, Send, Sparkles, ArrowRight, Leaf, Users, Clock, Award,
} from "lucide-react";
import { services } from "../data/services";
import { AnimatedSection } from "../components/AnimatedSection";
import { reportQuoteSubmit } from "../performance/rum";

interface QuoteFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  propertyType: string;
  squareFootage: string;
  frequency: string;
  preferredDate: string;
  message: string;
}

const selectStyle: CSSProperties = {
  appearance: "none",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%230A0A0A' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 1rem center",
};

const whyPoints = [
  { icon: Leaf, text: "Eco-friendly, non-toxic products" },
  { icon: Users, text: "Vetted, professional team" },
  { icon: Clock, text: "Flexible scheduling available" },
  { icon: Award, text: "100% satisfaction guaranteed" },
];

export function Quote() {
  const [searchParams] = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const preSelectedService = searchParams.get("service") || "";

  const {
    register, handleSubmit, formState: { errors, isSubmitting }, setValue,
  } = useForm<QuoteFormData>({ defaultValues: { service: preSelectedService } });

  useEffect(() => {
    if (preSelectedService) setValue("service", preSelectedService);
  }, [preSelectedService, setValue]);

  const onSubmit = async (data: QuoteFormData) => {
    const submitStart = performance.now();

    try {
      const res = await fetch("/api/send-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send");
      setSubmitted(true);
      reportQuoteSubmit("success", performance.now() - submitStart);
    } catch {
      reportQuoteSubmit("error", performance.now() - submitStart);
      toast.error("Something went wrong. Please try again or call us directly at (561) 385-1564.");
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-[#0A0A0A] placeholder-gray-400/70 focus:outline-none focus:border-[#C4973E] focus:ring-2 focus:ring-[#C4973E]/15 transition-all duration-200 text-[14px]";

  return (
    <div className="relative bg-[#F4F7FA]">
      {/* Hero */}
      <section className="relative py-24 md:py-36 bg-[#0A0A0A] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-[#C4973E]/8 blur-[80px]" />
          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-transparent via-[#C4973E] to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-[12px] mb-8"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <Link to="/" className="text-white/35 hover:text-[#C4973E] transition-colors">Home</Link>
            <span className="text-white/20">/</span>
            <span className="text-[#C4973E]">Request a Quote</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C4973E]/30 bg-[#C4973E]/10 mb-5">
              <Sparkles className="w-3 h-3 text-[#C4973E]" />
              <span className="text-[#C4973E] text-[11px] uppercase tracking-widest" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}>Free, No Obligation</span>
            </div>
            <h1 className="text-white mb-4" style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>
              Request a Free Quote
            </h1>
            <p className="text-white/45 max-w-xl text-[15px] leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
              Fill out the form and we'll respond within 24 hours with a custom proposal.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form + Sidebar */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-lg mx-auto text-center py-16"
              >
                <div className="w-20 h-20 rounded-full bg-[#C4973E]/15 border border-[#C4973E]/30 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-9 h-9 text-[#C4973E]" />
                </div>
                <h2 className="text-[#0A0A0A] mb-3" style={{ fontFamily: "Poppins, sans-serif", fontSize: "1.8rem", fontWeight: 700 }}>
                  Request Received!
                </h2>
                <p className="text-[#0A0A0A]/55 mb-8 leading-relaxed text-[15px]" style={{ fontFamily: "Inter, sans-serif" }}>
                  Thank you for reaching out. We'll review your details and send a personalized proposal within 24 hours.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
                  <a href="tel:+15613851564" className="flex items-center justify-center gap-2 px-6 py-3 bg-[#0A0A0A] text-white rounded-xl text-[14px]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
                    <Phone className="w-4 h-4 text-[#C4973E]" /> (561) 385-1564
                  </a>
                  <a href="mailto:apenterprisesllc.web@gmail.com" className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#C4973E] to-[#A67C2E] text-white rounded-xl text-[14px]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
                    <Mail className="w-4 h-4" /> Email Us
                  </a>
                </div>
                <Link to="/" className="text-[#C4973E] text-[13px] flex items-center justify-center gap-1" style={{ fontFamily: "Inter, sans-serif" }}>
                  Return to Home <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-10"
              >
                {/* Form */}
                <div className="lg:col-span-2">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                    {/* Personal Info */}
                    <AnimatedSection>
                      <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-8 h-8 rounded-lg bg-[#0A0A0A] flex items-center justify-center">
                            <span className="text-[#C4973E] text-[12px]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}>01</span>
                          </div>
                          <h3 className="text-[#0A0A0A]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1rem" }}>Personal Information</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[#0A0A0A]/70 text-[13px] mb-1.5" style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}>
                              First Name <span className="text-red-400">*</span>
                            </label>
                            <input {...register("firstName", { required: "Required" })} placeholder="John" className={inputClass} />
                            {errors.firstName && <p className="text-red-400 text-[12px] mt-1">{errors.firstName.message}</p>}
                          </div>
                          <div>
                            <label className="block text-[#0A0A0A]/70 text-[13px] mb-1.5" style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}>
                              Last Name <span className="text-red-400">*</span>
                            </label>
                            <input {...register("lastName", { required: "Required" })} placeholder="Smith" className={inputClass} />
                            {errors.lastName && <p className="text-red-400 text-[12px] mt-1">{errors.lastName.message}</p>}
                          </div>
                          <div>
                            <label className="block text-[#0A0A0A]/70 text-[13px] mb-1.5" style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}>
                              Email Address <span className="text-red-400">*</span>
                            </label>
                            <input
                              {...register("email", {
                                required: "Required",
                                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" },
                              })}
                              type="email" placeholder="john@example.com" className={inputClass}
                            />
                            {errors.email && <p className="text-red-400 text-[12px] mt-1">{errors.email.message}</p>}
                          </div>
                          <div>
                            <label className="block text-[#0A0A0A]/70 text-[13px] mb-1.5" style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}>
                              Phone Number <span className="text-red-400">*</span>
                            </label>
                            <input {...register("phone", { required: "Required" })} type="tel" placeholder="(561) 000-0000" className={inputClass} />
                            {errors.phone && <p className="text-red-400 text-[12px] mt-1">{errors.phone.message}</p>}
                          </div>
                        </div>
                      </div>
                    </AnimatedSection>

                    {/* Service Details */}
                    <AnimatedSection delay={0.1}>
                      <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-8 h-8 rounded-lg bg-[#0A0A0A] flex items-center justify-center">
                            <span className="text-[#C4973E] text-[12px]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}>02</span>
                          </div>
                          <h3 className="text-[#0A0A0A]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1rem" }}>Service Details</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="sm:col-span-2">
                            <label className="block text-[#0A0A0A]/70 text-[13px] mb-1.5" style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}>
                              Service Type <span className="text-red-400">*</span>
                            </label>
                            <select {...register("service", { required: "Please select a service" })} className={inputClass} style={selectStyle}>
                              <option value="">Select a service...</option>
                              {services.map((s) => (
                                <option key={s.id} value={s.title}>{s.title}</option>
                              ))}
                              <option value="Other">Other / Custom Request</option>
                            </select>
                            {errors.service && <p className="text-red-400 text-[12px] mt-1">{errors.service.message}</p>}
                          </div>
                          <div>
                            <label className="block text-[#0A0A0A]/70 text-[13px] mb-1.5" style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}>Property Type</label>
                            <select {...register("propertyType")} className={inputClass} style={selectStyle}>
                              <option value="">Select property type...</option>
                              <option value="Residential Home">Residential Home</option>
                              <option value="Apartment/Condo">Apartment / Condo</option>
                              <option value="Office">Office</option>
                              <option value="Restaurant">Restaurant</option>
                              <option value="Hotel/Resort">Hotel / Resort</option>
                              <option value="Airbnb">Airbnb Property</option>
                              <option value="Construction Site">Construction Site</option>
                              <option value="Event Venue">Event Venue</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[#0A0A0A]/70 text-[13px] mb-1.5" style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}>Approx. Size (sq ft)</label>
                            <select {...register("squareFootage")} className={inputClass} style={selectStyle}>
                              <option value="">Select size...</option>
                              <option value="Under 1,000">Under 1,000</option>
                              <option value="1,000–2,500">1,000 – 2,500</option>
                              <option value="2,500–5,000">2,500 – 5,000</option>
                              <option value="5,000–10,000">5,000 – 10,000</option>
                              <option value="10,000+">10,000+</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[#0A0A0A]/70 text-[13px] mb-1.5" style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}>Cleaning Frequency</label>
                            <select {...register("frequency")} className={inputClass} style={selectStyle}>
                              <option value="">Select frequency...</option>
                              <option value="One-time">One-time</option>
                              <option value="Weekly">Weekly</option>
                              <option value="Bi-weekly">Bi-weekly</option>
                              <option value="Monthly">Monthly</option>
                              <option value="Custom">Custom schedule</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[#0A0A0A]/70 text-[13px] mb-1.5" style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}>Preferred Start Date</label>
                            <input {...register("preferredDate")} type="date" className={inputClass} />
                          </div>
                        </div>
                      </div>
                    </AnimatedSection>

                    {/* Message */}
                    <AnimatedSection delay={0.2}>
                      <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-8 h-8 rounded-lg bg-[#0A0A0A] flex items-center justify-center">
                            <span className="text-[#C4973E] text-[12px]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}>03</span>
                          </div>
                          <h3 className="text-[#0A0A0A]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1rem" }}>Additional Notes</h3>
                        </div>
                        <textarea
                          {...register("message")}
                          rows={5}
                          placeholder="Tell us about your space, any special requirements, or questions you have..."
                          className={`${inputClass} resize-none`}
                        />
                      </div>
                    </AnimatedSection>

                    {/* Submit */}
                    <AnimatedSection delay={0.25}>
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ y: -2, scale: 1.005 }}
                        whileTap={{ scale: 0.995 }}
                        className="w-full py-4 bg-gradient-to-r from-[#C4973E] to-[#A67C2E] disabled:opacity-70 text-white rounded-xl flex items-center justify-center gap-3 shadow-xl shadow-[#C4973E]/30 hover:shadow-[#C4973E]/50 transition-all duration-300"
                        style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "1rem" }}
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                              </svg>
                            </motion.div>
                            Sending your request...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            Submit Quote Request
                          </>
                        )}
                      </motion.button>
                      <p className="text-center text-[#0A0A0A]/30 text-[12px] mt-3" style={{ fontFamily: "Inter, sans-serif" }}>
                        We'll respond within 24 hours. No spam, ever.
                      </p>
                    </AnimatedSection>
                  </form>
                </div>

                {/* Sidebar */}
                <div className="flex flex-col gap-5">
                  {/* Contact card */}
                  <AnimatedSection direction="right">
                    <div className="bg-[#0A0A0A] rounded-2xl p-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-[#C4973E]/10 blur-3xl pointer-events-none" />
                      <div className="relative z-10">
                        <p className="text-white mb-5" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1rem" }}>Get in Touch</p>
                        <div className="flex flex-col gap-4">
                          <a href="tel:+15613851564" className="flex items-center gap-3 group">
                            <div className="w-9 h-9 rounded-xl bg-[#C4973E]/15 border border-[#C4973E]/20 flex items-center justify-center shrink-0">
                              <Phone className="w-4 h-4 text-[#C4973E]" />
                            </div>
                            <div>
                              <p className="text-[10px] text-white/30 uppercase tracking-wide" style={{ fontFamily: "Inter, sans-serif" }}>Call us</p>
                              <p className="text-white/75 text-[13px] group-hover:text-[#C4973E] transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>(561) 385-1564</p>
                            </div>
                          </a>
                          <a href="mailto:apenterprisesllc.web@gmail.com" className="flex items-center gap-3 group">
                            <div className="w-9 h-9 rounded-xl bg-[#C4973E]/15 border border-[#C4973E]/20 flex items-center justify-center shrink-0">
                              <Mail className="w-4 h-4 text-[#C4973E]" />
                            </div>
                            <div>
                              <p className="text-[10px] text-white/30 uppercase tracking-wide" style={{ fontFamily: "Inter, sans-serif" }}>Email us</p>
                              <p className="text-white/75 text-[13px] group-hover:text-[#C4973E] transition-colors break-all" style={{ fontFamily: "Inter, sans-serif" }}>apenterprisesllc.web@gmail.com</p>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>

                  {/* Why us */}
                  <AnimatedSection direction="right" delay={0.1}>
                    <div className="bg-white rounded-2xl p-6 border border-gray-100">
                      <p className="text-[#0A0A0A] mb-5" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1rem" }}>Why Choose Us?</p>
                      <div className="flex flex-col gap-3.5">
                        {whyPoints.map((item) => (
                          <div key={item.text} className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-lg bg-[#C4973E]/10 flex items-center justify-center shrink-0">
                              <item.icon className="w-3.5 h-3.5 text-[#C4973E]" />
                            </div>
                            <span className="text-[#0A0A0A]/65 text-[13px]" style={{ fontFamily: "Inter, sans-serif" }}>{item.text}</span>
                          </div>
                        ))}
                        <div className="flex items-center gap-3 mt-1">
                          <CheckCircle2 className="w-4 h-4 text-[#C4973E] shrink-0" />
                          <span className="text-[#0A0A0A]/65 text-[13px]" style={{ fontFamily: "Inter, sans-serif" }}>Free, no-obligation quote</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-4 h-4 text-[#C4973E] shrink-0" />
                          <span className="text-[#0A0A0A]/65 text-[13px]" style={{ fontFamily: "Inter, sans-serif" }}>Response within 24 hours</span>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>

                  {/* Services */}
                  <AnimatedSection direction="right" delay={0.2}>
                    <div className="bg-white rounded-2xl p-6 border border-gray-100">
                      <p className="text-[#0A0A0A] mb-4" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1rem" }}>Our Services</p>
                      <div className="flex flex-col gap-1.5">
                        {services.map((s) => (
                          <Link
                            key={s.id}
                            to={`/services/${s.id}`}
                            className="flex items-center gap-2 text-[#0A0A0A]/50 hover:text-[#C4973E] transition-colors text-[12px] py-0.5"
                            style={{ fontFamily: "Inter, sans-serif" }}
                          >
                            <span className="w-1 h-1 rounded-full bg-current shrink-0" />
                            {s.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </AnimatedSection>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
