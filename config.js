// ═══════════════════════════════════════════════════════════
// I-MARATHON SITE CONFIG — All editable content lives here
// ═══════════════════════════════════════════════════════════

const CONFIG = {
  site: {
    name: "Independence Marathon",
    tagline: "Run for the Nation. Run for Pride.",
    story: "Uganda's premier national endurance event — a structured social movement anchored in four pillars: BELONG, OWN, BE PART, and PRIDE. Born from the spirit of independence.",
    date: "11 October 2026",
    dateShort: "Oct 2026",
    raceDate: "2026-10-11T06:00:00+03:00",
    location: "Northern Bypass, Kampala, Uganda",
    email: "info@independencemarathon.ug",
    phone: "+256 700 000 000",
    whatsapp: "+256700000000",
    socials: {
      facebook: "https://facebook.com/imarathonug",
      instagram: "https://instagram.com/imarathonug",
      twitter: "https://x.com/imarathonug",
      youtube: "https://youtube.com/@imarathonug",
      strava: "https://strava.com/clubs/imarathon"
    }
  },

  fees: [
    { category: "5K Fun Run", early: "UGX 30,000", standard: "UGX 50,000", late: "UGX 60,000", intl: "$8", slots: 3000, filled: 1247 },
    { category: "10K Race", early: "UGX 60,000", standard: "UGX 80,000", late: "UGX 100,000", intl: "$16", slots: 2000, filled: 812 },
    { category: "Half Marathon (21K)", early: "UGX 100,000", standard: "UGX 130,000", late: "UGX 150,000", intl: "$27", slots: 2500, filled: 1056 },
    { category: "Full Marathon (42K)", early: "UGX 150,000", standard: "UGX 200,000", late: "UGX 250,000", intl: "$40", slots: 2000, filled: 687 },
    { category: "Corporate Relay (4×10K)", early: "UGX 400,000", standard: "UGX 500,000", late: "UGX 600,000", intl: "$110/team", slots: 500, filled: 123 },
  ],

  startTimes: [
    { event: "Full Marathon (42K)", time: "06:00 AM", assembly: "05:15 AM", cutoff: "6 Hours" },
    { event: "Half Marathon (21K)", time: "06:30 AM", assembly: "05:45 AM", cutoff: "3.5 Hours" },
    { event: "10K Race", time: "07:00 AM", assembly: "06:30 AM", cutoff: "2 Hours" },
    { event: "5K Fun Run", time: "08:00 AM", assembly: "07:30 AM", cutoff: "No limit" },
    { event: "Corporate Relay", time: "06:45 AM", assembly: "06:00 AM", cutoff: "5 Hours" },
  ],

  prizes: [
    { category: "42K Men", first: "UGX 15,000,000", second: "UGX 10,000,000", third: "UGX 5,000,000" },
    { category: "42K Women", first: "UGX 15,000,000", second: "UGX 10,000,000", third: "UGX 5,000,000" },
    { category: "21K Men", first: "UGX 8,000,000", second: "UGX 5,000,000", third: "UGX 3,000,000" },
    { category: "21K Women", first: "UGX 8,000,000", second: "UGX 5,000,000", third: "UGX 3,000,000" },
    { category: "10K Men", first: "UGX 4,000,000", second: "UGX 2,500,000", third: "UGX 1,500,000" },
    { category: "10K Women", first: "UGX 4,000,000", second: "UGX 2,500,000", third: "UGX 1,500,000" },
    { category: "Relay", first: "UGX 5,000,000", second: "UGX 3,000,000", third: "UGX 2,000,000" },
  ],

  pillars: [
    { icon: "♡", title: "BELONG", desc: "Register. Train. Run. Become part of Uganda's endurance movement. First-timer guides, training plans, and community support.", color: "#B11226" },
    { icon: "⬡", title: "OWN", desc: "Communities, running clubs, schools, and volunteers — this is your marathon. Take ownership of the movement.", color: "#FFFFFF" },
    { icon: "◆", title: "BE PART", desc: "Corporate wellness, sponsorship, and partnerships — invest in the movement. Activate your brand at scale.", color: "#D4AF37" },
    { icon: "★", title: "PRIDE", desc: "National narrative. Results. Legacy. Celebrate what Uganda achieves on the roads and in the world.", color: "#B11226" },
  ],

  courseMarkers: [
    { km: "KM 0", name: "Start — Northern Bypass, Kampala", desc: "The marathon launches with a ceremonial start at the Northern Bypass toll plaza. All categories begin here." },
    { km: "KM 5", name: "Kyebando Gate", desc: "First hydration station. Runners pass through the Kyebando corridor with community cheer zones." },
    { km: "KM 10", name: "Sentema Junction", desc: "10K finish point. Hydration + electrolytes. Medical support available." },
    { km: "KM 15", name: "Wakiso Stretch", desc: "Scenic stretch through Wakiso. Spectator viewing areas and Engalabi drum zones." },
    { km: "KM 21", name: "Half Marathon Finish", desc: "Half marathon runners finish at the Bwaise interchange. Medal ceremony and refreshments." },
    { km: "KM 30", name: "Namungoona Corridor", desc: "Challenging section. Paramedic station. Deep hydration point." },
    { km: "KM 35", name: "Kalerwe Gate", desc: "Final major spectator zone. Energy gels and crowd support." },
    { km: "KM 42.195", name: "Finish — Kololo Airstrip", desc: "A grand finish at Kololo Airstrip with timing mats, medal ceremony, and celebration village." },
  ],

  aidStations: [
    { name: "Station 1", location: "KM 5", water: true, electrolytes: false, medical: "First Aid" },
    { name: "Station 2", location: "KM 10", water: true, electrolytes: true, medical: "First Aid" },
    { name: "Station 3", location: "KM 15", water: true, electrolytes: true, medical: "Paramedic" },
    { name: "Station 4", location: "KM 20", water: true, electrolytes: true, medical: "First Aid" },
    { name: "Station 5", location: "KM 25", water: true, electrolytes: true, medical: "Paramedic" },
    { name: "Station 6", location: "KM 30", water: true, electrolytes: true, medical: "First Aid" },
    { name: "Station 7", location: "KM 35", water: true, electrolytes: true, medical: "Paramedic" },
    { name: "Station 8", location: "KM 40", water: true, electrolytes: true, medical: "First Aid" },
  ],

  raceWeekSchedule: [
    { day: "Thursday", events: ["Expo opens 9 AM – 6 PM at Kololo Airstrip", "Bib collection begins", "Race Director welcome address", "Sponsor activation village opens"] },
    { day: "Friday", events: ["Expo continues 9 AM – 6 PM", "Shakeout run 6:30 AM (Northern Bypass preview)", "Runner's briefing 3 PM", "Pasta party 6 PM (Kololo Airstrip)"] },
    { day: "Saturday — Race Day", events: ["Assembly from 5:15 AM", "42K gun: 06:00 AM", "21K gun: 06:30 AM", "Relay gun: 06:45 AM", "10K gun: 07:00 AM", "5K gun: 08:00 AM", "Awards ceremony 12:00 PM"] },
    { day: "Sunday", events: ["Recovery run 7 AM (Kololo grounds)", "Post-race survey & feedback", "Results publication online", "Certificate downloads open"] },
  ],

  sponsorTiers: [
    { tier: "Title Partner", price: "Custom", perks: ["Full naming rights", "Start/finish branding", "All media & digital", "VIP hospitality (20 pax)", "Expo headline booth", "Bib & medal logo", "Full-page runner guide ad"] },
    { tier: "Gold Partner", price: "From $15,000", perks: ["Km gate branding (3 gates)", "Expo premium booth", "Bib logo placement", "Digital & social media", "VIP passes (10 pax)", "Post-event impact report"] },
    { tier: "Silver Partner", price: "From $8,000", perks: ["Expo standard booth", "Digital media mentions", "Hydration station branding", "Event passes (5 pax)", "Website logo"] },
    { tier: "Bronze Partner", price: "From $3,000", perks: ["Logo on website", "Social media mentions", "Expo presence", "Event passes (3 pax)"] },
    { tier: "In-Kind Partner", price: "Product / Service", perks: ["Logo on website", "Social media mentions", "Event passes (2 pax)", "Co-branded activation"] },
  ],

  results2025: [
    { pos: 1, name: "Joshua Kiprotich", cat: "42K", time: "2:12:34", gender: "M", nationality: "UGA" },
    { pos: 2, name: "Samuel Wanjiru", cat: "42K", time: "2:14:07", gender: "M", nationality: "KEN" },
    { pos: 3, name: "Emmanuel Mutai", cat: "42K", time: "2:15:22", gender: "M", nationality: "UGA" },
    { pos: 1, name: "Stella Chesang", cat: "42K", time: "2:28:45", gender: "F", nationality: "UGA" },
    { pos: 2, name: "Doreen Chesang", cat: "42K", time: "2:31:18", gender: "F", nationality: "UGA" },
    { pos: 3, name: "Juliet Chekwel", cat: "42K", time: "2:33:56", gender: "F", nationality: "UGA" },
    { pos: 1, name: "Peter Toroitich", cat: "21K", time: "1:04:22", gender: "M", nationality: "UGA" },
    { pos: 2, name: "Moses Kipsiro", cat: "21K", time: "1:05:41", gender: "M", nationality: "UGA" },
    { pos: 1, name: "Peruth Chemutai", cat: "21K", time: "1:12:33", gender: "F", nationality: "UGA" },
    { pos: 2, name: "Winnie Nanyondo", cat: "21K", time: "1:14:18", gender: "F", nationality: "UGA" },
  ],

  trainingPlans: [
    { level: "Beginner", weeks: 16, distance: "5K / 10K", desc: "Walk-to-run programme for first-timers. 3 sessions per week building to race day confidence." },
    { level: "Intermediate", weeks: 12, distance: "10K / 21K", desc: "Structured plan with tempo runs, long runs, and recovery. 4-5 sessions per week." },
    { level: "Advanced", weeks: 16, distance: "21K / 42K", desc: "Performance-focused plan with intervals, hill work, and race-pace sessions. 5-6 sessions per week." },
  ],

  faqs: [
    { q: "When is the Independence Marathon 2026?", a: "The race takes place on Sunday, 11 October 2026, starting at 06:00 EAT on the Northern Bypass route, Kampala." },
    { q: "What distances are available?", a: "Full Marathon (42K), Half Marathon (21K), 10K Race, 5K Fun Run, and Corporate Relay Challenge (4×10K)." },
    { q: "How do I register?", a: "Click the Register button and complete the multi-step form. Select your category, fill in personal details, accept the indemnity declaration, and pay via MTN Mobile Money, Airtel Money, or Visa/Mastercard." },
    { q: "What payment methods are accepted?", a: "MTN Mobile Money, Airtel Money, Visa/Mastercard (local and international). USD payment option available for international participants." },
    { q: "Is chip timing used?", a: "Yes. All categories use professional chip timing integrated with live tracking and results systems." },
    { q: "Can I transfer my bib to another person?", a: "Bib transfers are available subject to organiser approval. Submit a transfer request via the Runner Hub." },
    { q: "What is the cut-off time for the full marathon?", a: "The full marathon (42K) has a 6-hour cut-off time. Runners who do not reach specified checkpoints by the cut-off will be retired." },
    { q: "Is there a corporate team option?", a: "Yes! The Corporate Relay Challenge allows teams of 4 to each run 10K. Single checkout with individual bib assignments." },
    { q: "How can I track a runner on race day?", a: "Use the Race Day Hub to track any runner by bib number or name. GPS updates every 60-90 seconds on the interactive map." },
    { q: "What is included in my entry fee?", a: "Race bib with timing chip, finisher medal, official race t-shirt, hydration on course, medical support, post-race refreshments, and personalised digital finisher certificate." },
    { q: "Is there accommodation support?", a: "We provide a list of recommended hotels and lodges near the start/finish area. Partner hotels may offer discounted runner rates." },
    { q: "Can I get a refund?", a: "Entries are non-refundable. You may transfer your entry to another runner subject to organiser approval, up to 14 days before race day." },
    { q: "What is the indemnity declaration?", a: "All runners must sign an indemnity declaration confirming they are medically fit to participate and accepting the risks of the event. This is completed during online registration." },
    { q: "Is the course IAAF certified?", a: "The course is measured and certified to international standards. Full GPX files and route maps are available for download on the Course page." },
    { q: "Where is the expo / bib collection?", a: "The Expo and bib collection take place at Kololo Airstrip on Thursday and Friday before race day (9 AM – 6 PM). Bring your registration confirmation and ID." },
  ],

  routeLinks: {
    "42K": { strava: "#", gpx: "#", google: "#" },
    "21K": { strava: "#", gpx: "#", google: "#" },
    "10K": { strava: "#", gpx: "#", google: "#" },
    "5K": { strava: "#", gpx: "#", google: "#" },
  },

  seo: {
    "/": { title: "Independence Marathon — Run for the Nation", desc: "Uganda's premier national marathon. 5K, 10K, 21K, 42K & Corporate Relay. 11 October 2026, Northern Bypass, Kampala." },
    "/about": { title: "About — Independence Marathon", desc: "The story behind Uganda's national endurance movement. Four pillars: Belong, Own, Be Part, Pride." },
    "/register": { title: "Register — Independence Marathon 2026", desc: "Register for the Independence Marathon 2026. Entry fees, categories, and secure online payment." },
    "/categories": { title: "Race Categories — Independence Marathon", desc: "Full Marathon, Half Marathon, 10K, 5K Fun Run, and Corporate Relay Challenge details and pricing." },
    "/course": { title: "Course & Route — Independence Marathon", desc: "Explore the Northern Bypass route with interactive maps, GPX downloads, and elevation profiles." },
    "/runner-hub": { title: "Runner Hub — Independence Marathon", desc: "Your personal race portal. Dashboard, training plans, runner's guide, and race day tools." },
    "/community": { title: "Community — Independence Marathon", desc: "Running clubs, volunteer sign-up, school activation, and community stories." },
    "/sponsors": { title: "Sponsors & Partners — Independence Marathon", desc: "Partnership packages, activation plans, and sponsor enquiry form." },
    "/results": { title: "Results — Independence Marathon", desc: "Live results, finisher certificates, winners gallery, and multi-year results archive." },
    "/media": { title: "Media & Gallery — Independence Marathon", desc: "Photo gallery, video highlights, press kit, and media accreditation." },
    "/race-day": { title: "Race Day Hub — Independence Marathon", desc: "Live runner tracking, spectator guide, digital cheer cards, and live leaderboard." },
    "/contact": { title: "Contact — Independence Marathon", desc: "Get in touch with the Independence Marathon organising committee." },
  },
};
