import { mediaUrl, videoVariantBase } from "./mediaManifest";

export interface ServiceVideoSource {
  src: string;
  type: "video/mp4";
  quality: 720 | 1080;
}

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  image: string;
  thumbnail: string;
  heroImage: string;
  poster: string;
  icon: string;
  video?: string;
  videoSources?: ServiceVideoSource[];
}

function photo(fileName: string): string {
  return mediaUrl(`/media/photos/${fileName}`);
}

function landscape(fileName: string): string {
  return mediaUrl(`/media/photos/landscape/${fileName}`);
}

function video(fileName: string): string {
  return mediaUrl(`/media/videos/${fileName}`);
}

function defaultVideoSources(fileName: string): ServiceVideoSource[] {
  const original = video(fileName);
  const basePath = videoVariantBase(`/media/videos/${fileName}`);
  const lowQuality = mediaUrl(`${basePath}-720.mp4`);

  return [
    { src: lowQuality, type: "video/mp4", quality: 720 },
    { src: original, type: "video/mp4", quality: 1080 },
  ];
}

export const services: Service[] = [
  {
    id: "post-construction-cleaning",
    title: "Post-Construction Cleaning",
    shortDescription:
      "Removing debris, deep cleaning and sanitizing newly constructed spaces.",
    fullDescription:
      "After the builders leave, we take over. Our post-construction cleaning service removes all debris, dust, and residues left from construction or renovation work. We perform a thorough deep clean and sanitization of the newly constructed or renovated space, making it move-in ready and safe.",
    features: [
      "Debris and waste removal",
      "Construction dust elimination",
      "Window and glass cleaning",
      "Floor polishing and finishing",
      "Paint overspray removal",
      "Final deep clean and sanitization",
    ],
    image: photo("post-construction-cleaning.webp"),
    thumbnail: landscape("post-construction-cleaning-landscape.webp"),
    heroImage: landscape("post-construction-cleaning-landscape.webp"),
    poster: photo("post-construction-cleaning.webp"),
    icon: "HardHat",
    video: video("post-construction-cleaning.mp4"),
    videoSources: defaultVideoSources("post-construction-cleaning.mp4"),
  },
  {
    id: "commercial-cleaning",
    title: "Commercial Cleaning",
    shortDescription:
      "We understand the importance of having a professionally cleaned environment in your business. Let's create a plan that fits your needs and budget.",
    fullDescription:
      "A clean workplace boosts productivity and creates a lasting impression on clients and employees alike. Our commercial cleaning team works efficiently to maintain pristine office environments, tailored to your business hours and specific requirements. We develop a custom cleaning plan that aligns with your operational needs and budget.",
    features: [
      "Office buildings and workspaces",
      "Customized cleaning schedules",
      "Floor care and maintenance",
      "Restroom sanitation",
      "Break room and kitchen cleaning",
      "Window and surface cleaning",
    ],
    image: photo("commercial-cleaning.webp"),
    thumbnail: landscape("commercial-cleaning-landscape.webp"),
    heroImage: landscape("commercial-cleaning-landscape.webp"),
    poster: photo("commercial-cleaning.webp"),
    icon: "Building2",
    video: video("commercial-cleaning.mp4"),
    videoSources: defaultVideoSources("commercial-cleaning.mp4"),
  },
  {
    id: "after-hours-office-cleaning",
    title: "After Hours Office Cleaning",
    shortDescription:
      "Professional cleaning services outside business hours to avoid interruptions.",
    fullDescription:
      "Keep your business running smoothly without the disruption of daytime cleaning. Our after-hours office cleaning service ensures your workspace is spotless and ready for the next business day. We work around your schedule, providing reliable, consistent cleaning that never interferes with your operations.",
    features: [
      "Evening and weekend availability",
      "Zero disruption to operations",
      "Desk and workstation sanitization",
      "Common area and restroom cleaning",
      "Trash removal and recycling",
      "Reliable recurring scheduling",
    ],
    image: photo("after-hours-office-cleaning.webp"),
    thumbnail: landscape("after-hours-office-cleaning-landscape.webp"),
    heroImage: landscape("after-hours-office-cleaning-landscape.webp"),
    poster: photo("after-hours-office-cleaning.webp"),
    icon: "Moon",
    video: video("after-hours-office-cleaning.mp4"),
    videoSources: defaultVideoSources("after-hours-office-cleaning.mp4"),
  },
  {
    id: "epoxy-floor-services",
    title: "Epoxy Floor Services",
    shortDescription:
      "Professional epoxy floor installation and finishing for durable and modern surfaces.",
    fullDescription:
      "Transform your floors with our professional epoxy coating services. Epoxy floors are durable, easy to clean, and give any space a sleek, modern look. Whether for a garage, warehouse, showroom, or commercial kitchen, our skilled team delivers flawless application with long-lasting results.",
    features: [
      "Garage and warehouse floors",
      "Commercial showroom finishing",
      "Custom color and pattern options",
      "High-durability coating",
      "Slip-resistant finishes available",
      "Quick cure and minimal downtime",
    ],
    image: photo("epoxy-floor-services.webp"),
    thumbnail: landscape("epoxy-floor-services-landscape.webp"),
    heroImage: landscape("epoxy-floor-services-landscape.webp"),
    poster: photo("epoxy-floor-services.webp"),
    icon: "Layers",
    video: video("epoxy-floor-services.mp4"),
    videoSources: defaultVideoSources("epoxy-floor-services.mp4"),
  },
  {
    id: "marble-polishing",
    title: "Marble Polishing",
    shortDescription:
      "Professional marble polishing, restoration and maintenance to bring back the natural shine of your stone surfaces.",
    fullDescription:
      "Restore the elegance of your marble surfaces with our professional polishing and restoration services. Over time, marble loses its luster due to foot traffic, spills, and everyday wear. Our skilled technicians use diamond abrasive technology and specialized compounds to remove scratches, stains, and etching, bringing your marble back to its original brilliance. We serve residential and commercial properties throughout South Florida.",
    features: [
      "Diamond abrasive polishing",
      "Scratch and stain removal",
      "Marble floor restoration",
      "Countertop and vanity polishing",
      "Sealing and protective coating",
      "Ongoing maintenance programs",
    ],
    image: photo("marble-polishing.webp"),
    thumbnail: landscape("marble-polishing-landscape.webp"),
    heroImage: landscape("marble-polishing-landscape.webp"),
    poster: photo("marble-polishing.webp"),
    icon: "Gem",
  },
  {
    id: "residential-cleaning",
    title: "Residential Cleaning",
    shortDescription:
      "Enjoy peace of mind with customized residential cleaning services with safe and environmentally friendly products.",
    fullDescription:
      "Our residential cleaning service is tailored to meet the unique needs of your home. We use safe, eco-friendly products that are tough on dirt but gentle on your family and pets. Whether you need a one-time deep clean or regular maintenance, our professional team delivers consistent, high-quality results every visit.",
    features: [
      "Customized cleaning plans",
      "Eco-friendly, non-toxic products",
      "Trained and background-checked staff",
      "Flexible scheduling options",
      "Kitchen and bathroom deep clean",
      "Dusting, vacuuming, and mopping",
    ],
    image: photo("residential-cleaning.webp"),
    thumbnail: landscape("residential-cleaning-landscape.webp"),
    heroImage: landscape("residential-cleaning-landscape.webp"),
    poster: photo("residential-cleaning.webp"),
    icon: "Home",
    video: video("residential-cleaning.mp4"),
    videoSources: defaultVideoSources("residential-cleaning.mp4"),
  },
  {
    id: "deep-cleaning",
    title: "Deep Cleaning",
    shortDescription:
      "Comprehensive deep cleaning services for residential and commercial properties.",
    fullDescription:
      "When a standard clean isn't enough, our deep cleaning service goes beyond the surface. We target every nook and cranny, from behind appliances to grout lines, delivering a thorough, comprehensive clean that restores your space to a pristine condition. Perfect for seasonal cleaning or preparing a property for sale or move-in.",
    features: [
      "Behind-appliance cleaning",
      "Grout and tile scrubbing",
      "Interior oven and fridge cleaning",
      "Baseboard and vent cleaning",
      "Ceiling fan and light fixture dusting",
      "Full bathroom and kitchen restoration",
    ],
    image: photo("deep-cleaning.webp"),
    thumbnail: landscape("deep-cleaning-landscape.webp"),
    heroImage: landscape("deep-cleaning-landscape.webp"),
    poster: photo("deep-cleaning.webp"),
    icon: "Sparkles",
    video: video("deep-cleaning.mp4"),
    videoSources: defaultVideoSources("deep-cleaning.mp4"),
  },
  {
    id: "disinfecting-services",
    title: "Disinfecting Services",
    shortDescription:
      "We use hospital-grade disinfectants to help prevent the spread of infectious diseases.",
    fullDescription:
      "Protect your space and the people in it with our professional disinfecting services. We utilize hospital-grade EPA-approved disinfectants applied with advanced electrostatic sprayers and fogging technology to ensure complete surface coverage. Ideal for businesses, schools, and homes looking to maintain the highest hygiene standards.",
    features: [
      "Hospital-grade EPA-approved disinfectants",
      "Electrostatic spraying technology",
      "Complete surface and air treatment",
      "COVID-19 and pathogen prevention",
      "Certificate of service provided",
      "Safe for children and pets after dry",
    ],
    image: photo("disinfecting-services.webp"),
    thumbnail: landscape("disinfecting-services-landscape.webp"),
    heroImage: landscape("disinfecting-services-landscape.webp"),
    poster: photo("disinfecting-services.webp"),
    icon: "ShieldCheck",
    video: video("disinfecting-services.mp4"),
    videoSources: defaultVideoSources("disinfecting-services.mp4"),
  },
  {
    id: "events-cleaning",
    title: "Events Cleaning",
    shortDescription:
      "Pre/post event cleaning, seats and upholstery, kitchens, concessions, trash and recycling management.",
    fullDescription:
      "Make every event shine with our comprehensive event cleaning services. From pre-event setup cleaning to post-event restoration, we handle every detail so you can focus on your guests. Our team manages seating, upholstery, kitchens, concessions, and full trash and recycling operations.",
    features: [
      "Pre-event preparation cleaning",
      "Post-event full restoration",
      "Seats and upholstery cleaning",
      "Kitchen and concession sanitation",
      "Trash and recycling management",
      "Rapid-response cleaning crews",
    ],
    image: photo("events-cleaning.webp"),
    thumbnail: landscape("events-cleaning-landscape.webp"),
    heroImage: landscape("events-cleaning-landscape.webp"),
    poster: photo("events-cleaning.webp"),
    icon: "CalendarCheck",
    video: video("events-cleaning.mp4"),
    videoSources: defaultVideoSources("events-cleaning.mp4"),
  },
  {
    id: "housekeeping",
    title: "Housekeeping",
    shortDescription:
      "Professional housekeeping services for hotels, resorts and Airbnb properties.",
    fullDescription:
      "Elevate your guests' experience with our professional housekeeping services. We specialize in hotels, resorts, and Airbnb properties, delivering the consistent, hotel-quality standard your guests expect. Our team handles everything from linen changes to bathroom deep cleans, ensuring every room is pristine for each new arrival.",
    features: [
      "Hotel and resort housekeeping",
      "Airbnb turnover service",
      "Linen and towel changes",
      "Bathroom and kitchen sanitation",
      "Amenity restocking",
      "Flexible scheduling for check-ins",
    ],
    image: photo("housekeeping.webp"),
    thumbnail: landscape("housekeeping-landscape.webp"),
    heroImage: landscape("housekeeping-landscape.webp"),
    poster: photo("housekeeping.webp"),
    icon: "Hotel",
    video: video("housekeeping.mp4"),
    videoSources: defaultVideoSources("housekeeping.mp4"),
  },
  {
    id: "real-estate-cleaning",
    title: "Real Estate Cleaning",
    shortDescription: "Get your home perfectly cleaned and ready for showings.",
    fullDescription:
      "First impressions matter in real estate. Our specialized real estate cleaning service ensures every property looks its absolute best for showings, open houses, and photography shoots. We help maximize your listing's appeal with thorough, detail-oriented cleaning that highlights the property's best features.",
    features: [
      "Pre-listing deep cleaning",
      "Move-in and move-out cleaning",
      "Open house preparation",
      "Real estate photography cleaning",
      "Kitchen and bath detailing",
      "Window and surface polishing",
    ],
    image: photo("real-estate-cleaning.webp"),
    thumbnail: landscape("real-estate-cleaning-landscape.webp"),
    heroImage: landscape("real-estate-cleaning-landscape.webp"),
    poster: photo("real-estate-cleaning.webp"),
    icon: "KeyRound",
    video: video("real-estate-cleaning.mp4"),
    videoSources: defaultVideoSources("real-estate-cleaning.mp4"),
  },
  {
    id: "after-hours-restaurant-cleaning",
    title: "After Hours Restaurant Cleaning",
    shortDescription:
      "Specialized restaurant cleaning during non-operational hours.",
    fullDescription:
      "Restaurants demand the highest standards of cleanliness for health, safety, and customer satisfaction. Our specialized after-hours restaurant cleaning service covers everything from kitchen grease traps to dining room floors, ensuring your establishment is health-code compliant and ready to impress from the moment doors open.",
    features: [
      "Kitchen hood and grease trap cleaning",
      "Commercial equipment degreasing",
      "Dining room and bar cleaning",
      "Health code compliance assurance",
      "Floor scrubbing and sanitization",
      "Waste management and recycling",
    ],
    image: photo("after-hours-restaurant-cleaning.webp"),
    thumbnail: landscape("after-hours-restaurant-cleaning-landscape.webp"),
    heroImage: landscape("after-hours-restaurant-cleaning-landscape.webp"),
    poster: photo("after-hours-restaurant-cleaning.webp"),
    icon: "UtensilsCrossed",
  },
];
