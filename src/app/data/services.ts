export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  image: string;
  icon: string;
}

export const services: Service[] = [
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
    image: "https://images.unsplash.com/photo-1758273238415-01ec03d9ef27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpZGVudGlhbCUyMGhvbWUlMjBjbGVhbmluZyUyMHNlcnZpY2V8ZW58MXx8fHwxNzczMTY2NzI2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    icon: "Home",
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
    image: "https://images.unsplash.com/photo-1581374820583-317d45555a82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwb2ZmaWNlJTIwY2xlYW5pbmclMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzczMDc3MzIyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    icon: "Building2",
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
    image: "https://images.unsplash.com/photo-1747659629851-a92bd71149f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXNpbmZlY3RpbmclMjBjbGVhbmluZyUyMHNwcmF5JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3MzE2NjczMHww&ixlib=rb-4.1.0&q=80&w=1080",
    icon: "ShieldCheck",
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
    image: "https://images.unsplash.com/photo-1768508951405-10e83c4a2872?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldmVudCUyMGhhbGwlMjBiYW5xdWV0JTIwY2xlYW5pbmclMjBzZXR1cHxlbnwxfHx8fDE3NzMxNjY3MzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    icon: "CalendarCheck",
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
    image: "https://images.unsplash.com/photo-1743410975074-4be327c0ae63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGhvdXNla2VlcGluZyUyMGx1eHVyeSUyMHJvb218ZW58MXx8fHwxNzczMTY2NzI3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    icon: "Hotel",
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
    image: "https://images.unsplash.com/photo-1771862860842-226dbd625fd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwaG9tZSUyMHN0YWdpbmclMjBjbGVhbiUyMGludGVyaW9yfGVufDF8fHx8MTc3MzE2NjczMXww&ixlib=rb-4.1.0&q=80&w=1080",
    icon: "KeyRound",
  },
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
    image: "https://images.unsplash.com/photo-1765160602655-59d646d1146b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBzaXRlJTIwY2xlYW51cCUyMHdvcmtlcnN8ZW58MXx8fHwxNzczMTY2NzMxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    icon: "HardHat",
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
    image: "https://images.unsplash.com/photo-1669101602108-fa5ba89507ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWVwJTIwY2xlYW5pbmclMjBzY3J1YmJpbmclMjBmbG9vciUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzMxNjY3MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    icon: "Sparkles",
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
    image: "https://images.unsplash.com/photo-1627098241506-344dea0aa27b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBjbGVhbmluZyUyMG5pZ2h0JTIwamFuaXRvciUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzMxNjY3MzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    icon: "Moon",
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
    image: "https://images.unsplash.com/photo-1765966871032-7fe67d208761?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwa2l0Y2hlbiUyMGNsZWFuaW5nJTIwbmlnaHR8ZW58MXx8fHwxNzczMTY2NzMyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    icon: "UtensilsCrossed",
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
    image: "https://images.unsplash.com/photo-1771531072574-af6ed6b954c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlcG94eSUyMGZsb29yJTIwc2hpbnklMjBpbmR1c3RyaWFsJTIwbW9kZXJufGVufDF8fHx8MTc3MzE2NjczNXww&ixlib=rb-4.1.0&q=80&w=1080",
    icon: "Layers",
  },
];