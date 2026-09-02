export const BUSINESS = {
  name: "MP Automotive Repair",
  phone: "(501) 599-6910",
  phoneHref: "tel:+15015996910",
  address: "8890 Landers Rd, North Little Rock, AR 72117",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=8890+Landers+Rd,+North+Little+Rock,+AR+72117",
};

export const SERVICES = [
  {
    id: "brakes",
    name: "Brakes & Rotors",
    category: "Safety",
    description:
      "Precision pad replacement, rotor resurfacing, caliper servicing, and ABS diagnostics.",
    icon: "Disc",
  },
  {
    id: "tires",
    name: "Tires & Alignment",
    category: "Maintenance",
    description:
      "Computerized wheel balancing, laser alignment, rotation, and tread depth analysis.",
    icon: "CircleDot",
  },
  {
    id: "suspension",
    name: "Suspension, Shocks & Struts",
    category: "Handling",
    description:
      "Complete shock, strut assembly, bushing, and sway bar link replacement for smooth control.",
    icon: "Activity",
  },
  {
    id: "steering",
    name: "Tie Rods & Steering",
    category: "Handling",
    description:
      "Inner/outer tie rod replacement, power steering flush, rack & pinion diagnostics.",
    icon: "Compass",
  },
  {
    id: "engine",
    name: "Engine Repair & Diagnostics",
    category: "Powertrain",
    description:
      "Advanced diagnostic scans, cylinder head work, lifter & camshaft replacement, oil leaks.",
    icon: "Cpu",
  },
  {
    id: "transmission",
    name: "Transmission Service",
    category: "Powertrain",
    description:
      "Fluid flush, clutch servicing, rebuilds, and solenoid replacement — automatic & manual.",
    icon: "Cog",
  },
  {
    id: "ac_heating",
    name: "Air Conditioning & HVAC",
    category: "Climate & Electrical",
    description:
      "Refrigerant leak checks, compressor replacement, condenser cleaning, cabin filter swaps.",
    icon: "Wind",
  },
  {
    id: "battery_electric",
    name: "Battery & Electrical",
    category: "Climate & Electrical",
    description:
      "High-load battery testing, alternator replacement, starter repair, wiring fault isolation.",
    icon: "Zap",
  },
  {
    id: "warranty_work",
    name: "Warranty Work",
    category: "Specialty",
    description:
      "Direct processing for aftermarket and extended warranties with official documentation.",
    icon: "ShieldCheck",
  },
  {
    id: "filters_fluids",
    name: "Air & Cabin Filter Swaps",
    category: "Maintenance",
    description:
      "High-efficiency cabin filters and engine intake filter replacements for peak performance.",
    icon: "Filter",
  },
];

export const CATEGORIES = [
  "All",
  ...Array.from(new Set(SERVICES.map((s) => s.category))),
];

export const CHAPTERS = [
  {
    num: "01",
    title: "Precision Diagnostics",
    text: "We don't guess. Every repair starts with a full diagnostic scan and a photo-documented inspection — you see exactly what we see before we touch a bolt.",
  },
  {
    num: "02",
    title: "Transparent Pricing",
    text: "You approve the scope before the work begins. No surprise line items, no padded labor hours — just an honest quote and a straight answer.",
  },
  {
    num: "03",
    title: "Master Craftsmanship",
    text: "From lifter and cam work to full transmission service, our technicians treat every vehicle like it's going back to family. Most jobs done same-day.",
  },
  {
    num: "04",
    title: "Ironclad Warranty",
    text: "Qualifying repairs are backed by warranty and processed directly with your extended warranty provider — paperwork handled, on us.",
  },
];

export const REVIEWS = [
  {
    name: "Alarik Anderson",
    when: "A month ago",
    text: "Dropped my truck off to get the A/C belt replaced and they found another issue and notified me and showed me pictures of the issue. Once I agreed to the scope they got it completed that same day. Will definitely return.",
  },
  {
    name: "Jamiel Clark",
    when: "2 months ago",
    text: "Great customer service! Mike helped us and was able to fix our vehicle in a very timely manner. They all were very knowledgeable and nice.",
  },
];

export const HOURS = [
  { day: "Monday", time: "8:00 AM – 5:00 PM", jsDay: 1 },
  { day: "Tuesday", time: "8:00 AM – 5:00 PM", jsDay: 2 },
  { day: "Wednesday", time: "8:00 AM – 5:00 PM", jsDay: 3 },
  { day: "Thursday", time: "8:00 AM – 5:00 PM", jsDay: 4 },
  { day: "Friday", time: "8:00 AM – 5:00 PM", jsDay: 5 },
  { day: "Saturday", time: "Closed", jsDay: 6 },
  { day: "Sunday", time: "Closed", jsDay: 0 },
];

export const MARQUEE_ITEMS = [
  "Brakes",
  "Tires",
  "Suspension",
  "Shocks & Struts",
  "Tie Rods",
  "Engine",
  "Transmission",
  "A/C Service",
  "Battery",
  "Lifters & Cam",
  "Warranty Work",
];

export const HERO_IMAGE =
  "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1920&q=80";

export const ENGINE_IMAGE =
  "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1200&q=80";
