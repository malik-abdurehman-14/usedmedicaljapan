// Equipment catalogue — one entry per product detail page.
// All copy is placeholder until the client supplies final content.
// `modality` uses the DICOM modality code radiology buyers already know.

import { commonProductFaqsJa, equipmentJa } from "./equipment.ja";

const img = (file) => `/images/equipment/${file}`;

export const equipment = [
  {
    slug: "used-mri-machines",
    name: "MRI Systems",
    plural: "MRI systems",
    singular: "MRI system",
    modality: "MR",
    featured: true,
    image: img("mri-suite.webp"),
    gallery: [img("mri-suite.webp"), img("mri-room.webp"), img("mri-render.webp"), img("scanner-controls.webp")],
    summary: "Closed-bore and open MRI from 0.3T to 3.0T, with coils and workstation.",
    intro:
      "Pre-owned 1.5T and 3.0T closed-bore systems and low-field open MRI, removed from hospitals in Japan and checked before export.",
    quickInfo: [
      { label: "Field strength", value: "0.3T open to 3.0T closed bore" },
      { label: "Brands", value: "Canon, Fujifilm, Siemens, GE, Philips" },
      { label: "Condition", value: "Used, function-tested" },
      { label: "Shipping", value: "FOB Japan or CIF destination port" },
    ],
    overview: [
      "MRI is the largest single investment most imaging departments make. Buying a well-maintained used system from Japan can lower that cost considerably while keeping image quality suitable for routine neuro, spine, musculoskeletal and body work.",
      "Each unit is de-installed by experienced engineers, with magnet ramp-down, helium status and coil inventory documented before crating.",
    ],
    applications: ["Neuro and spine imaging", "Musculoskeletal and joints", "Abdominal and pelvic imaging", "Cardiac and vascular (model dependent)"],
    brands: [
      { brand: "Canon (Toshiba)", models: "Vantage series" },
      { brand: "Fujifilm (Hitachi)", models: "Echelon, Airis, APERTO" },
      { brand: "Siemens Healthineers", models: "MAGNETOM series" },
      { brand: "GE HealthCare", models: "SIGNA series" },
      { brand: "Philips", models: "Achieva, Ingenia" },
    ],
    specs: [
      { label: "Field strength", value: "0.3T, 0.4T, 1.5T, 3.0T" },
      { label: "Magnet type", value: "Superconducting or permanent (open)" },
      { label: "Bore size", value: "60 cm to 71 cm (closed bore)" },
      { label: "Helium level", value: "Reported per unit" },
      { label: "Coils included", value: "Head, spine, body, knee and others, per unit" },
      { label: "Year of manufacture", value: "Stated per unit" },
    ],
    included: ["Magnet and gantry", "Patient table", "Operator console and workstation", "Available RF coils", "Manuals and service history where available"],
    faqs: [
      {
        q: "Can you ship an MRI with the magnet at field?",
        a: "Most units are shipped ramped down. Some systems can be shipped cold with helium; this depends on the model, route and transit time, and is confirmed in the quotation.",
      },
      {
        q: "Do you provide the helium level and coil list?",
        a: "Yes. The inspection report for each MRI lists the helium level at de-installation and every coil included with the system.",
      },
    ],
  },
  {
    slug: "used-ct-scanners",
    name: "CT Scanners",
    plural: "CT scanners",
    singular: "CT scanner",
    modality: "CT",
    featured: true,
    image: img("ct-modern.webp"),
    gallery: [img("ct-modern.webp"), img("ct-eclos.webp"), img("ct-lightspeed.webp"), img("ct-room.webp"), img("ct-bore.webp"), img("ct-somatom.webp")],
    summary: "16 to 128-slice CT with tube history, from leading manufacturers.",
    intro:
      "Multi-slice CT scanners from 16 to 128 slices, sourced from Japanese hospitals with tube scan history and service records where available.",
    quickInfo: [
      { label: "Configurations", value: "16, 32, 64, 80 and 128 slice" },
      { label: "Brands", value: "Canon, Fujifilm, Siemens, GE, Philips" },
      { label: "Condition", value: "Used, function-tested" },
      { label: "Shipping", value: "FOB Japan or CIF destination port" },
    ],
    overview: [
      "CT is often the first advanced imaging system a growing hospital adds. Japanese CT scanners are commonly replaced on fixed upgrade cycles, so many used units come to market with moderate tube usage.",
      "We report the X-ray tube's scan count or mAs where the system records it, so you can plan for tube replacement before you buy.",
    ],
    applications: ["Emergency and trauma imaging", "Chest, abdomen and pelvis", "CT angiography (model dependent)", "Oncology staging and follow-up"],
    brands: [
      { brand: "Canon (Toshiba)", models: "Aquilion series" },
      { brand: "Fujifilm (Hitachi)", models: "Supria, ECLOS, Scenaria" },
      { brand: "Siemens Healthineers", models: "SOMATOM series" },
      { brand: "GE HealthCare", models: "LightSpeed, Optima, Revolution" },
      { brand: "Philips", models: "Ingenuity, Brilliance" },
    ],
    specs: [
      { label: "Slice count", value: "16 to 128 slice" },
      { label: "X-ray tube", value: "Scan count or mAs reported per unit" },
      { label: "Gantry aperture", value: "70 cm to 80 cm" },
      { label: "Rotation time", value: "Model dependent" },
      { label: "Software options", value: "Listed per unit" },
      { label: "Year of manufacture", value: "Stated per unit" },
    ],
    included: ["Gantry", "Patient table", "Operator console", "Power distribution unit (if separate)", "Manuals and service history where available"],
    faqs: [
      {
        q: "How do I know how much life the CT tube has left?",
        a: "We record the tube's scan count or mAs from the system log where available and include it in the inspection report.",
      },
      {
        q: "Are software licences transferred with the scanner?",
        a: "Installed software options are listed in the inspection report. Licence transfer rules differ by manufacturer, so we confirm what is transferable for each unit.",
      },
    ],
  },
  {
    slug: "used-pet-ct-scanners",
    name: "PET-CT Scanners",
    plural: "PET-CT scanners",
    singular: "PET-CT scanner",
    modality: "PT",
    image: img("pet-ct.webp"),
    gallery: [img("pet-ct.webp"), img("scanner-controls.webp")],
    summary: "Combined PET and CT for oncology, cardiology and neurology.",
    intro:
      "Pre-owned PET-CT systems for oncology centres and hospitals building nuclear medicine capability at a lower entry cost.",
    quickInfo: [
      { label: "CT component", value: "16 to 64 slice" },
      { label: "Brands", value: "Siemens, GE, Canon, Philips" },
      { label: "Condition", value: "Used, function-tested" },
      { label: "Shipping", value: "FOB Japan or CIF destination port" },
    ],
    overview: [
      "PET-CT combines metabolic imaging with anatomical CT in a single scan. New systems carry a very high price, which makes well-kept used units from Japan an attractive option for new oncology services.",
      "Detector status and calibration records are reviewed during inspection and summarised in the report.",
    ],
    applications: ["Cancer detection and staging", "Treatment response monitoring", "Cardiac viability studies", "Neurological imaging"],
    brands: [
      { brand: "Siemens Healthineers", models: "Biograph series" },
      { brand: "GE HealthCare", models: "Discovery series" },
      { brand: "Canon (Toshiba)", models: "Celesteion" },
      { brand: "Philips", models: "Ingenuity TF, Vereos" },
    ],
    specs: [
      { label: "CT slice count", value: "16 to 64 slice" },
      { label: "PET detector", value: "LSO, LYSO or BGO crystal, per model" },
      { label: "Time of flight", value: "Model dependent" },
      { label: "Axial field of view", value: "Stated per unit" },
      { label: "Year of manufacture", value: "Stated per unit" },
    ],
    included: ["PET-CT gantry", "Patient table", "Acquisition and processing workstations", "Phantoms where available", "Manuals and service history where available"],
    faqs: [
      {
        q: "Do I need a licence to import a PET-CT?",
        a: "Most countries regulate the import and use of nuclear medicine equipment. The buyer is responsible for local permits; we supply the technical documents your regulator usually asks for.",
      },
    ],
  },
  {
    slug: "used-spect-gamma-cameras",
    name: "SPECT & Gamma Cameras",
    plural: "SPECT and gamma cameras",
    singular: "SPECT or gamma camera",
    modality: "NM",
    image: img("spect-ct.webp"),
    gallery: [img("spect-ct.webp"), img("gamma-camera.webp")],
    summary: "Dual-head SPECT, SPECT-CT and gamma cameras for nuclear medicine.",
    intro:
      "Dual-head SPECT, SPECT-CT and general-purpose gamma cameras for bone, cardiac, thyroid and renal studies.",
    quickInfo: [
      { label: "Configurations", value: "Dual-head SPECT, SPECT-CT" },
      { label: "Brands", value: "Siemens, GE, Philips, Canon" },
      { label: "Condition", value: "Used, function-tested" },
      { label: "Shipping", value: "FOB Japan or CIF destination port" },
    ],
    overview: [
      "Gamma cameras are the workhorse of nuclear medicine. A used dual-head system is often the most practical way to open or expand a nuclear medicine department.",
      "Collimators supplied with each unit are listed individually, as they make up a large part of the system's value.",
    ],
    applications: ["Bone scans", "Myocardial perfusion imaging", "Thyroid and parathyroid studies", "Renal and lung studies"],
    brands: [
      { brand: "Siemens Healthineers", models: "Symbia, e.cam" },
      { brand: "GE HealthCare", models: "Discovery NM/CT, Infinia" },
      { brand: "Philips", models: "BrightView" },
      { brand: "Canon (Toshiba)", models: "Model on request" },
    ],
    specs: [
      { label: "Detector heads", value: "Single or dual head" },
      { label: "CT component", value: "None, or low-dose to diagnostic CT" },
      { label: "Collimators", value: "Listed per unit" },
      { label: "Year of manufacture", value: "Stated per unit" },
    ],
    included: ["Gantry and detector heads", "Patient table", "Collimators and cart", "Acquisition and processing workstation", "Manuals where available"],
    faqs: [
      {
        q: "Which collimators come with the system?",
        a: "Each unit is supplied with the collimators removed from the original site. The full list appears in the inspection report and quotation.",
      },
    ],
  },
  {
    slug: "used-angiography-systems",
    name: "Angiography Systems",
    plural: "angiography systems",
    singular: "angiography system",
    modality: "XA",
    image: img("angiography.webp"),
    gallery: [img("angiography.webp")],
    summary: "Cath lab and interventional systems, single plane and biplane.",
    intro:
      "Single-plane and biplane angiography systems for cardiac catheterisation, interventional radiology and vascular surgery.",
    quickInfo: [
      { label: "Configurations", value: "Single plane, biplane" },
      { label: "Brands", value: "Canon, Siemens, Philips, GE, Shimadzu" },
      { label: "Condition", value: "Used, function-tested" },
      { label: "Shipping", value: "FOB Japan or CIF destination port" },
    ],
    overview: [
      "A cath lab is one of the most capital-intensive rooms in a hospital. Used angiography systems from Japan let cardiology and interventional teams start procedures sooner and at a lower budget.",
      "Ceiling-mounted systems need careful site planning. We share room layout and ceiling requirements with your engineers before purchase.",
    ],
    applications: ["Coronary angiography and PCI", "Peripheral vascular intervention", "Neuro-interventional procedures", "Electrophysiology support"],
    brands: [
      { brand: "Canon (Toshiba)", models: "Infinix, Alphenix" },
      { brand: "Siemens Healthineers", models: "Artis series" },
      { brand: "Philips", models: "Allura Xper, Azurion" },
      { brand: "GE HealthCare", models: "Innova series" },
      { brand: "Shimadzu", models: "Trinias" },
    ],
    specs: [
      { label: "Plane", value: "Single plane or biplane" },
      { label: "Detector", value: "Flat panel, size stated per unit" },
      { label: "Mounting", value: "Floor or ceiling mounted" },
      { label: "Year of manufacture", value: "Stated per unit" },
    ],
    included: ["C-arm stand(s)", "Patient table", "Generator and cabinets", "Monitors and ceiling suspension where applicable", "Manuals where available"],
    faqs: [
      {
        q: "Can a ceiling-mounted system be installed in my existing room?",
        a: "Often yes, with modification. We send the manufacturer's room and ceiling requirements so your engineers can confirm the fit before you commit.",
      },
    ],
  },
  {
    slug: "used-c-arm-systems",
    name: "C-Arm Systems",
    plural: "C-arm systems",
    singular: "C-arm",
    modality: "RF",
    image: img("c-arm-or.webp"),
    gallery: [img("c-arm-or.webp"), img("c-arm.webp"), img("c-arm-blue.webp")],
    summary: "Mobile surgical C-arms with flat panel or image intensifier.",
    intro:
      "Mobile C-arms for orthopaedic, general, urology and pain management procedures, with flat panel or image intensifier detectors.",
    quickInfo: [
      { label: "Detector", value: "Flat panel or image intensifier" },
      { label: "Brands", value: "Siemens, GE, Philips, Shimadzu, Ziehm" },
      { label: "Condition", value: "Used, function-tested" },
      { label: "Shipping", value: "Sea or air freight" },
    ],
    overview: [
      "C-arms are compact, high-demand systems for operating theatres. Because they are mobile, they need no construction work and can be in use soon after delivery.",
      "Each C-arm is tested for image quality, motion, and monitor cart function before packing.",
    ],
    applications: ["Orthopaedic and trauma surgery", "General and vascular surgery", "Urology", "Pain management"],
    brands: [
      { brand: "Siemens Healthineers", models: "Arcadis, Cios" },
      { brand: "GE HealthCare", models: "OEC series" },
      { brand: "Philips", models: "BV Pulsera, Zenition" },
      { brand: "Shimadzu", models: "Opescope" },
      { brand: "Ziehm Imaging", models: "Vision series" },
    ],
    specs: [
      { label: "Detector", value: "Flat panel or 9 to 12 inch image intensifier" },
      { label: "Generator", value: "Power stated per unit" },
      { label: "Imaging", value: "2D, 3D on selected models" },
      { label: "Year of manufacture", value: "Stated per unit" },
    ],
    included: ["C-arm unit", "Monitor cart", "Foot switch and hand switch", "Manuals where available"],
    faqs: [
      {
        q: "Can a C-arm be shipped by air?",
        a: "Yes. Mobile C-arms are compact enough for air freight, which is useful when a theatre needs equipment quickly.",
      },
    ],
  },
  {
    slug: "used-x-ray-machines",
    name: "X-Ray & DR Systems",
    plural: "X-ray and DR systems",
    singular: "X-ray system",
    modality: "DX",
    image: img("x-ray-dr.webp"),
    gallery: [img("x-ray-dr.webp")],
    summary: "Digital radiography rooms, CR and mobile X-ray units.",
    intro:
      "Digital radiography rooms, CR systems and mobile X-ray units for hospitals, clinics and diagnostic centres.",
    quickInfo: [
      { label: "Configurations", value: "DR room, CR, mobile X-ray" },
      { label: "Brands", value: "Shimadzu, Canon, Fujifilm, Konica Minolta, Philips" },
      { label: "Condition", value: "Used, function-tested" },
      { label: "Shipping", value: "Sea or air freight" },
    ],
    overview: [
      "General radiography is the highest-volume imaging service in most facilities. Japanese manufacturers such as Shimadzu, Canon and Fujifilm make a large share of the systems available.",
      "Detectors, generators and stands are tested individually so you know the condition of each component.",
    ],
    applications: ["Chest and general radiography", "Orthopaedic imaging", "Emergency departments", "Outpatient and clinic imaging"],
    brands: [
      { brand: "Shimadzu", models: "RADspeed series" },
      { brand: "Canon (Toshiba)", models: "RADREX series" },
      { brand: "Fujifilm", models: "FDR series" },
      { brand: "Konica Minolta", models: "AeroDR" },
      { brand: "Philips", models: "DigitalDiagnost" },
    ],
    specs: [
      { label: "System type", value: "Fixed DR, CR, or mobile" },
      { label: "Generator", value: "Power stated per unit" },
      { label: "Detector", value: "Wired or wireless flat panel, per unit" },
      { label: "Year of manufacture", value: "Stated per unit" },
    ],
    included: ["Generator and tube", "Table and/or wall stand", "Detectors", "Acquisition workstation", "Manuals where available"],
    faqs: [
      {
        q: "Can I buy only a DR detector to upgrade my existing room?",
        a: "Yes, in many cases. Tell us your current system and we will check compatibility before quoting.",
      },
    ],
  },
  {
    slug: "used-mammography-machines",
    name: "Mammography Systems",
    plural: "mammography systems",
    singular: "mammography system",
    modality: "MG",
    image: img("mammography.webp"),
    gallery: [img("mammography.webp")],
    summary: "Digital mammography, including 3D tomosynthesis models.",
    intro:
      "Full-field digital mammography and 3D tomosynthesis systems for breast screening and diagnostic programmes.",
    quickInfo: [
      { label: "Configurations", value: "2D digital, 3D tomosynthesis" },
      { label: "Brands", value: "Hologic, Fujifilm, Siemens, GE" },
      { label: "Condition", value: "Used, function-tested" },
      { label: "Shipping", value: "Sea or air freight" },
    ],
    overview: [
      "Digital mammography is central to breast cancer screening. Used systems help clinics and hospitals start or expand screening with a lower initial investment.",
      "Detector condition and image quality are checked with test exposures during inspection.",
    ],
    applications: ["Breast cancer screening", "Diagnostic mammography", "Stereotactic biopsy (with option)", "Women's health centres"],
    brands: [
      { brand: "Hologic", models: "Selenia, Selenia Dimensions" },
      { brand: "Fujifilm", models: "AMULET series" },
      { brand: "Siemens Healthineers", models: "MAMMOMAT series" },
      { brand: "GE HealthCare", models: "Senographe series" },
    ],
    specs: [
      { label: "Imaging", value: "2D digital or 3D tomosynthesis" },
      { label: "Detector", value: "Flat panel, size stated per unit" },
      { label: "Biopsy option", value: "Stated per unit" },
      { label: "Year of manufacture", value: "Stated per unit" },
    ],
    included: ["Gantry", "Acquisition workstation", "Compression paddles", "Radiation shield", "Manuals where available"],
    faqs: [
      {
        q: "Are 3D tomosynthesis licences included?",
        a: "Where the original system had tomosynthesis enabled, we confirm whether the licence transfers with the unit before quoting.",
      },
    ],
  },
  {
    slug: "used-ultrasound-machines",
    name: "Ultrasound Machines",
    plural: "ultrasound machines",
    singular: "ultrasound machine",
    modality: "US",
    image: img("ultrasound.webp"),
    gallery: [img("ultrasound.webp")],
    summary: "Cart-based and portable ultrasound with probes included.",
    intro:
      "General imaging, cardiac and OB/GYN ultrasound systems, cart-based and portable, supplied with tested probes.",
    quickInfo: [
      { label: "Configurations", value: "Cart-based, portable" },
      { label: "Brands", value: "Canon, Fujifilm, GE, Philips, Siemens" },
      { label: "Condition", value: "Used, function-tested" },
      { label: "Shipping", value: "Sea or air freight" },
    ],
    overview: [
      "Ultrasound is the most versatile imaging tool in a hospital. Used systems are an efficient way to equip additional rooms, clinics and departments.",
      "Every probe supplied is tested for element dropout and image quality, and listed separately in the report.",
    ],
    applications: ["General abdominal imaging", "Cardiac echo", "Obstetrics and gynaecology", "Vascular and point-of-care"],
    brands: [
      { brand: "Canon (Toshiba)", models: "Aplio, Xario" },
      { brand: "Fujifilm (Hitachi)", models: "ARIETTA series" },
      { brand: "GE HealthCare", models: "LOGIQ, Vivid, Voluson" },
      { brand: "Philips", models: "EPIQ, Affiniti" },
      { brand: "Siemens Healthineers", models: "ACUSON series" },
    ],
    specs: [
      { label: "System type", value: "Cart-based or portable" },
      { label: "Probes", value: "Listed and tested per unit" },
      { label: "Imaging modes", value: "B-mode, Doppler, 3D/4D per model" },
      { label: "Year of manufacture", value: "Stated per unit" },
    ],
    included: ["Main unit", "Tested probes", "Printer where available", "Manuals where available"],
    faqs: [
      {
        q: "Can I choose which probes come with the system?",
        a: "Yes. Tell us your clinical applications and we will match the system and probe set to them.",
      },
    ],
  },
];

// Questions shared by every product page
export const commonProductFaqs = [
  {
    q: "Is the price shown on the website?",
    a: "Prices depend on model, year and condition, and stock changes quickly. Send us your requirement and we will quote available units.",
  },
  {
    q: "Can I see the actual unit before buying?",
    a: "Yes. We share recent photos and video of the specific unit, and you or your engineer are welcome to inspect it in Japan.",
  },
];

/** The catalogue in one language. Japanese entries are the English ones with equipment.ja.js merged over them. */
export const getEquipmentList = (locale = "en") =>
  locale === "ja" ? equipment.map((e) => ({ ...e, ...equipmentJa[e.slug] })) : equipment;

export const getCommonProductFaqs = (locale = "en") => (locale === "ja" ? commonProductFaqsJa : commonProductFaqs);

export const getEquipment = (slug, locale = "en") => getEquipmentList(locale).find((e) => e.slug === slug);

export const getRelated = (slug, locale = "en", count = 3) => {
  const list = getEquipmentList(locale);
  const i = list.findIndex((e) => e.slug === slug);
  return Array.from({ length: count }, (_, k) => list[(i + k + 1) % list.length]);
};
