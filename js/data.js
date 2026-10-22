/**
 * LocalLink - Master Data & SVG Icon Definitions
 * Clean, modular data structures for easy viva explanation.
 */

// SVG Icon Helper Registry
const SVG_ICONS = {
  electrician: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  plumber: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
  ac_repair: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="12" rx="2"/><path d="M6 20h12"/><path d="M12 16v4"/><circle cx="8" cy="10" r="1"/><circle cx="12" cy="10" r="1"/><circle cx="16" cy="10" r="1"/></svg>`,
  cleaning: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 21 8.02-8.02"/><path d="m14.5 9.5 5 5"/><path d="M12.5 4.5 19.5 11.5"/><path d="m9.5 14.5-5-5"/><circle cx="16" cy="7" r="3.5"/></svg>`,
  carpenter: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
  painter: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z"/><path d="m5 2 5 5"/><path d="M2 13h15"/><path d="M22 20a2 2 0 1 1-4 0c0-1.6 1.6-2.4 2-4 .4 1.6 2 2.4 2 4Z"/></svg>`,
  appliance: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="4" y1="10" x2="20" y2="10"/><line x1="12" y1="14" x2="12.01" y2="14"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`,
  mechanic: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
  pest_control: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v2"/><path d="M12 20v2"/><path d="M20 12h2"/><path d="M2 12h2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="m4.93 19.07 1.41-1.41"/><path d="m17.66 6.34 1.41-1.41"/><rect x="8" y="8" width="8" height="8" rx="2"/></svg>`,
  gardening: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>`,
  star: `<svg class="star-icon" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`,
  check: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  location: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
  phone: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  calendar: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  clock: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  search: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`
};

// 10 Service Categories
const SERVICE_CATEGORIES = [
  {
    id: "electrician",
    name: "Electrician",
    iconKey: "electrician",
    shortDesc: "Wiring, switchboard replacement, fan installation, fault detection & appliance setup.",
    startingPrice: 299
  },
  {
    id: "plumber",
    name: "Plumber",
    iconKey: "plumber",
    shortDesc: "Pipe leak fixes, tap & sink repair, bathroom fitting, drainage & water tank cleaning.",
    startingPrice: 349
  },
  {
    id: "ac_repair",
    name: "AC Repair",
    iconKey: "ac_repair",
    shortDesc: "Jet pump service, gas refilling, cooling issue troubleshooting & installation.",
    startingPrice: 499
  },
  {
    id: "cleaning",
    name: "Home Cleaning",
    iconKey: "cleaning",
    shortDesc: "Deep kitchen cleaning, bathroom sanitization, sofa shampooing & full house reset.",
    startingPrice: 799
  },
  {
    id: "carpenter",
    name: "Carpenter",
    iconKey: "carpenter",
    shortDesc: "Furniture assembly, door lock repair, cabinet fixing & custom woodwork.",
    startingPrice: 399
  },
  {
    id: "painter",
    name: "Painter",
    iconKey: "painter",
    shortDesc: "Interior & exterior wall painting, waterproof treatment, texture coating.",
    startingPrice: 1299
  },
  {
    id: "appliance",
    name: "Appliance Repair",
    iconKey: "appliance",
    shortDesc: "Washing machine, refrigerator, microwave & water purifier maintenance.",
    startingPrice: 399
  },
  {
    id: "mechanic",
    name: "Mechanic",
    iconKey: "mechanic",
    shortDesc: "Two-wheeler & car general servicing, battery jump-start & breakdown help.",
    startingPrice: 499
  },
  {
    id: "pest_control",
    name: "Pest Control",
    iconKey: "pest_control",
    shortDesc: "Cockroach gel treatment, termite control, bed bug treatment & rodent management.",
    startingPrice: 899
  },
  {
    id: "gardening",
    name: "Gardening",
    iconKey: "gardening",
    shortDesc: "Lawn trimming, plant pruning, soil fertilization, balcony garden setup.",
    startingPrice: 449
  }
];

// 15 Realistic Service Providers (Indian names, ₹ pricing, ratings, availability)
const PROVIDERS_DATA = [
  {
    id: 1,
    name: "Arun Kumar",
    service: "Electrician",
    rating: 4.8,
    reviewsCount: 126,
    experience: 7,
    price: 299,
    availability: "Available Today",
    avatar: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80",
    about: "Certified electrician with 7 years of hands-on experience in residential and commercial electrical wiring, short-circuit troubleshooting, and modern light installations.",
    servicesOffered: ["Full House Wiring", "Switchboard & Socket Fixing", "Ceiling Fan Installation", "MCB & Fuse Repair", "Inverter Setup"],
    serviceAreas: ["Indiranagar", "Koramangala", "HSR Layout", "BTM Layout"],
    workingHours: "08:00 AM - 07:00 PM (Mon - Sat)",
    reviews: [
      { name: "Rahul S.", rating: 5, comment: "Arun arrived on time and fixed our main circuit breaker issue within 30 minutes. Highly recommended!", date: "2026-07-28" },
      { name: "Priya M.", rating: 4.5, comment: "Polite and knowledgeable. Installed 3 new ceiling fans quickly.", date: "2026-07-15" }
    ]
  },
  {
    id: 2,
    name: "Karthik Raj",
    service: "Plumber",
    rating: 4.9,
    reviewsCount: 98,
    experience: 9,
    price: 349,
    availability: "Available Today",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    about: "Expert plumber specializing in high-pressure leak detection, tap replacement, flush tank repairs, and sanitary pipe fitting.",
    servicesOffered: ["Tap & Faucet Repair", "Drainage Unblocking", "Water Heater (Geyser) Installation", "Water Tank Cleaning", "Toilet & Flush Repair"],
    serviceAreas: ["Whitefield", "Marathahalli", "Bellandur", "Sarjapur"],
    workingHours: "08:30 AM - 08:00 PM (Everyday)",
    reviews: [
      { name: "Amitabh V.", rating: 5, comment: "Extremely skilled plumber. Resolved a persistent bathroom pipe leak that others couldn't fix.", date: "2026-08-01" }
    ]
  },
  {
    id: 3,
    name: "Suresh Babu",
    service: "AC Repair",
    rating: 4.7,
    reviewsCount: 142,
    experience: 8,
    price: 499,
    availability: "Available Tomorrow",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    about: "Specialist AC technician skilled in split and window AC servicing, gas charging, PCB repair, and deep foam jet cleaning.",
    servicesOffered: ["AC Foam Jet Service", "Freon Gas Charging", "AC Uninstallation & Installation", "Compressor Diagnostics", "Noise & Water Leak Fix"],
    serviceAreas: ["Jayanagar", "JP Nagar", "Banashankari", "Basavanagudi"],
    workingHours: "09:00 AM - 06:30 PM (Mon - Sun)",
    reviews: [
      { name: "Deepak K.", rating: 5, comment: "Great cooling after Suresh's foam jet service! Honest pricing.", date: "2026-07-20" }
    ]
  },
  {
    id: 4,
    name: "Priya Devi",
    service: "Home Cleaning",
    rating: 4.9,
    reviewsCount: 215,
    experience: 6,
    price: 799,
    availability: "Available Today",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    about: "Professional home hygiene expert leading a team of eco-friendly deep cleaning specialists for kitchens, bathrooms, and full apartments.",
    servicesOffered: ["Full House Deep Cleaning", "Kitchen Degreasing & Scrubbing", "Bathroom Sanitization", "Sofa & Carpet Vacuuming", "Balcony Wash"],
    serviceAreas: ["Koramangala", "HSR Layout", "Indiranagar", "MG Road"],
    workingHours: "07:30 AM - 06:00 PM (Mon - Sat)",
    reviews: [
      { name: "Sneha R.", rating: 5, comment: "Priya and her team transformed our flat before housewarming. Spotless clean!", date: "2026-08-03" }
    ]
  },
  {
    id: 5,
    name: "Vignesh Kumar",
    service: "Carpenter",
    rating: 4.6,
    reviewsCount: 74,
    experience: 11,
    price: 399,
    availability: "Available Tomorrow",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    about: "Master wood craftsman providing custom furniture repairs, door lock fitting, modular kitchen cabinet tweaks, and wardrobe assembly.",
    servicesOffered: ["Door & Window Hinge Repair", "Smart Lock Installation", "IKEA / Modular Furniture Assembly", "Cabinet Drawer Repair", "Plywood Polish"],
    serviceAreas: ["Hebbal", "Yelahanka", "Manyata Tech Park", "RT Nagar"],
    workingHours: "09:00 AM - 07:00 PM (Mon - Sat)",
    reviews: [
      { name: "Vikram N.", rating: 4.5, comment: "Fixed my sliding wardrobe smoothly. Excellent craftsmanship.", date: "2026-07-12" }
    ]
  },
  {
    id: 6,
    name: "Ravi Shankar",
    service: "Painter",
    rating: 4.8,
    reviewsCount: 88,
    experience: 10,
    price: 1299,
    availability: "Available Today",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    about: "Experienced house painter proficient in Asian Paints color consultancy, wall putty smoothness, damp-proofing, and stencil art.",
    servicesOffered: ["Full House Interior Painting", "Exterior Weatherproof Paint", "Damp Sealing & Waterproofing", "Accent Wall Stencils", "Wood & Metal Polish"],
    serviceAreas: ["Malleswaram", "Rajajinagar", "Sadashivanagar", "Yeshwanthpur"],
    workingHours: "08:00 AM - 06:00 PM (Mon - Sat)",
    reviews: [
      { name: "Geetha B.", rating: 5, comment: "Ravi completed 3 BHK painting in 4 days. Very clean finishing and no paint spills.", date: "2026-07-25" }
    ]
  },
  {
    id: 7,
    name: "Manoj Kumar",
    service: "Appliance Repair",
    rating: 4.7,
    reviewsCount: 110,
    experience: 7,
    price: 399,
    availability: "Available Today",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    about: "Specialized in front-load/top-load washing machines, double-door refrigerators, convection microwaves, and RO water purifiers.",
    servicesOffered: ["Washing Machine Motor & Drum Repair", "Refrigerator Gas & Thermostat Repair", "Microwave Heating Fix", "RO Filter Replacement", "Geyser Repair"],
    serviceAreas: ["Electronic City", "Silk Board", "Bommanahalli", "BTM Layout"],
    workingHours: "09:00 AM - 08:00 PM (Mon - Sun)",
    reviews: [
      { name: "Anand T.", rating: 4.8, comment: "Replaced washing machine drain pump quickly. Original spare parts used.", date: "2026-07-30" }
    ]
  },
  {
    id: 8,
    name: "Dinesh Raj",
    service: "Mechanic",
    rating: 4.9,
    reviewsCount: 165,
    experience: 12,
    price: 499,
    availability: "Available Today",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
    about: "Automobile mechanic offering door-step bike engine oil change, brake pad inspection, car battery replacement, and emergency roadside help.",
    servicesOffered: ["Two-Wheeler Full Service", "Car Battery Jump-Start", "Brake Pad Replacement", "Engine Diagnostic", "Doorstep Oil Filter Replacement"],
    serviceAreas: ["Koramangala", "HSR Layout", "BTM Layout", "Jayanagar"],
    workingHours: "08:00 AM - 09:00 PM (Everyday)",
    reviews: [
      { name: "Kiran P.", rating: 5, comment: "Dinesh came to rescue when my scooty wouldn't start in the morning. Lifesaver!", date: "2026-08-02" }
    ]
  },
  {
    id: 9,
    name: "Sunil Verma",
    service: "Pest Control",
    rating: 4.6,
    reviewsCount: 82,
    experience: 5,
    price: 899,
    availability: "Available Tomorrow",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    about: "Government approved odorless herbal pest management expert specializing in cockroach gel treatment and long-term termite barriers.",
    servicesOffered: ["Cockroach Herbal Gel Spray", "Anti-Termite Piping Treatment", "Bed Bug Eradication", "Mosquito Spraying", "Rodent Control Traps"],
    serviceAreas: ["Whitefield", "Brookefield", "ITPL", "Hoodi"],
    workingHours: "09:00 AM - 06:00 PM (Mon - Sat)",
    reviews: [
      { name: "Meena R.", rating: 4.5, comment: "No harsh chemicals, safe for my toddler. Cockroaches completely gone after 1 week.", date: "2026-07-18" }
    ]
  },
  {
    id: 10,
    name: "Ganesh Hegde",
    service: "Gardening",
    rating: 4.8,
    reviewsCount: 64,
    experience: 8,
    price: 449,
    availability: "Available Today",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    about: "Passionate horticulturist providing balcony garden designing, indoor plant maintenance, organic repotting, and lawn mowing.",
    servicesOffered: ["Lawn Mowing & Edging", "Plant Pruning & Trimming", "Organic Fertilizer Application", "Pot Repotting & Soil Mix", "Balcony Garden Setup"],
    serviceAreas: ["Indiranagar", "Domlur", "HAL", "Old Airport Road"],
    workingHours: "07:00 AM - 05:00 PM (Mon - Sat)",
    reviews: [
      { name: "Swati S.", rating: 5, comment: "Ganesh revived all my drooping balcony plants! Great advice on watering.", date: "2026-07-22" }
    ]
  },
  {
    id: 11,
    name: "Rajesh Sharma",
    service: "Electrician",
    rating: 4.7,
    reviewsCount: 92,
    experience: 6,
    price: 299,
    availability: "Available Tomorrow",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    about: "Reliable electrician skilled in LED cove lights setup, chandelier mounting, and commercial panel troubleshooting.",
    servicesOffered: ["Chandelier Installation", "LED Strip & Profile Lighting", "Heavy Load Line Wiring", "Short Circuit Repair"],
    serviceAreas: ["Whitefield", "Marathahalli", "Varthur"],
    workingHours: "08:30 AM - 07:30 PM (Mon - Sat)",
    reviews: [
      { name: "Nikhil C.", rating: 4.8, comment: "Installed living room ambient profile lighting neatly.", date: "2026-07-19" }
    ]
  },
  {
    id: 12,
    name: "Lakshmi Narayanan",
    service: "Plumber",
    rating: 4.8,
    reviewsCount: 118,
    experience: 12,
    price: 349,
    availability: "Available Today",
    avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&auto=format&fit=crop&q=80",
    about: "Veteran plumber expert in pressure pump installation, underground sump cleaning, and modern concealed bathroom fittings.",
    servicesOffered: ["Concealed Mixer Repair", "Pressure Booster Pump Setup", "Main Line Blockage Clearance", "Sump Tank Wash"],
    serviceAreas: ["Jayanagar", "Banashankari", "Girinagar"],
    workingHours: "08:00 AM - 08:00 PM (Mon - Sun)",
    reviews: [
      { name: "Ramesh H.", rating: 5, comment: "Fixed low water pressure in 4th floor master bathroom efficiently.", date: "2026-07-31" }
    ]
  },
  {
    id: 13,
    name: "Imran Khan",
    service: "AC Repair",
    rating: 4.9,
    reviewsCount: 178,
    experience: 9,
    price: 499,
    availability: "Available Today",
    avatar: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=150&auto=format&fit=crop&q=80",
    about: "Master HVAC technician specialized in Inverter AC diagnosis, copper pipe brazing, and emergency cooling repairs.",
    servicesOffered: ["Inverter AC Error Code Diagnostics", "Copper Piping Work", "Outdoor Unit Service", "Gas Leakage Brazing"],
    serviceAreas: ["HSR Layout", "Koramangala", "Bellandur"],
    workingHours: "09:00 AM - 08:00 PM (Mon - Sat)",
    reviews: [
      { name: "Varun P.", rating: 5, comment: "Solved refrigerant leak in my Daikin inverter AC fast.", date: "2026-08-04" }
    ]
  },
  {
    id: 14,
    name: "Kavitha Sundaram",
    service: "Home Cleaning",
    rating: 4.8,
    reviewsCount: 154,
    experience: 7,
    price: 799,
    availability: "Available Tomorrow",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    about: "Detail-oriented sanitization specialist for move-in / move-out house cleaning and post-renovation dust scrubbing.",
    servicesOffered: ["Move-In / Move-Out Deep Clean", "Post-Renovation Scrubbing", "Window Glass Polishing", "Kitchen Chimney Scrub"],
    serviceAreas: ["Electronic City", "Sarjapur Road", "HSR Layout"],
    workingHours: "08:00 AM - 06:00 PM (Mon - Sat)",
    reviews: [
      { name: "Archana K.", rating: 4.7, comment: "House was sparkling clean before we moved in. Recommended!", date: "2026-07-29" }
    ]
  },
  {
    id: 15,
    name: "Sanjay Dutt",
    service: "Appliance Repair",
    rating: 4.6,
    reviewsCount: 89,
    experience: 8,
    price: 399,
    availability: "Available Today",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    about: "Multi-appliance expert specializing in LG, Samsung, Whirlpool, and IFB kitchen & laundry equipment.",
    servicesOffered: ["Automatic Washing Machine PCB Repair", "Double Door Refrigerator Fan Fix", "Dishwasher Servicing"],
    serviceAreas: ["Indiranagar", "Ulsoor", "Frazer Town"],
    workingHours: "09:00 AM - 07:00 PM (Mon - Sat)",
    reviews: [
      { name: "Mahesh B.", rating: 4.5, comment: "Prompt repair for refrigerator cooling coil.", date: "2026-07-26" }
    ]
  }
];

// Initial seed reviews for localStorage
const SEED_REVIEWS = [
  {
    id: 101,
    bookingId: "LL20260001",
    customerName: "Rahul Sharma",
    providerName: "Arun Kumar",
    serviceName: "Electrician",
    rating: 5,
    comment: "Prompt arrival, clear explanation of the electrical fault, and fair pricing. Very professional service!",
    date: "2026-08-01"
  },
  {
    id: 102,
    bookingId: "LL20260002",
    customerName: "Ananya Roy",
    providerName: "Karthik Raj",
    serviceName: "Plumber",
    rating: 5,
    comment: "Karthik replaced our kitchen sink tap effortlessly and cleaned up the space afterwards.",
    date: "2026-08-02"
  },
  {
    id: 103,
    bookingId: "LL20260003",
    customerName: "Siddharth Nair",
    providerName: "Priya Devi",
    serviceName: "Home Cleaning",
    rating: 4,
    comment: "Deep kitchen cleaning was very thorough. Removed years of grease behind stove.",
    date: "2026-08-04"
  }
];
