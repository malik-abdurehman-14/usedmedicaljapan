// Shared page content (English). Japanese versions live in content.ja.js.

import * as ja from "./content.ja";

export const processSteps = [
  {
    title: "Tell Us Your Requirements",
    text: "Let us know which equipment you need, your preferred brands or models, your budget, and your destination country.",
    detail:
      "A brief inquiry is all it takes to get started. If you have specific technical requirements or a preferred delivery schedule, please share them with us.",
  },
  {
    title: "We Source Equipment in Japan",
    text: "We search for suitable pre-owned medical equipment through our network of hospitals, medical equipment dealers, and other suppliers in Japan.",
    detail:
      "Based on your requirements, we provide available options with relevant details such as the manufacturer, model, year of manufacture, and available condition information.",
  },
  {
    title: "Review Equipment Details",
    text: "We help you review the available information about the equipment before making a purchasing decision.",
    detail:
      "Depending on the unit and supplier, photographs, videos, service records, usage data, or inspection reports may be available. Any additional inspection or testing requirements will be confirmed before purchase.",
  },
  {
    title: "Quotation and Agreement",
    text: "Once a suitable unit has been identified, we provide a detailed quotation and proforma invoice.",
    detail:
      "The quotation outlines the equipment specifications, included accessories, available condition information, payment terms, and estimated timeline. Full payment by T/T bank transfer is required in advance before shipment. Shipping and export arrangements are agreed upon with the buyer before the order is finalized.",
  },
  {
    title: "Equipment Preparation and Packing",
    text: "After payment and confirmation of the order, we coordinate the necessary preparation for shipment with the relevant supplier or service provider.",
    detail:
      "Depending on the equipment and agreed arrangements, this may include de-installation, packing, and export crating. Packing details and estimated crate dimensions and weights can be provided when available.",
  },
  {
    title: "Shipping and Export Documentation",
    text: "We coordinate shipping and the preparation of applicable export documents according to the agreed arrangements.",
    detail:
      "Documents may include a commercial invoice, packing list, and other required export paperwork. Shipping schedules and estimated arrival dates are confirmed as far as possible. Installation or technical support may also be arranged separately, subject to availability.",
  },
];

export const services = [
  {
    icon: "search",
    title: "Equipment sourcing",
    text: "We find units that match your clinical needs and budget through our network of hospitals and dealers in Japan.",
  },
  {
    icon: "clipboard",
    title: "Inspection and testing",
    text: "Function tests, image checks, photos and video of the specific unit, summarised in a written inspection report.",
  },
  {
    icon: "wrench",
    title: "De-installation",
    text: "Removal by engineers familiar with each manufacturer, including magnet ramp-down and component labelling.",
  },
  {
    icon: "package",
    title: "Export crating",
    text: "Custom wooden crates with shock and moisture protection, built for long sea journeys.",
  },
  {
    icon: "file",
    title: "Export documentation",
    text: "Commercial invoice, packing list, certificate of origin and the technical documents importers commonly need.",
  },
  {
    icon: "ship",
    title: "Shipping and Installation Support",
    text: "Sea or air freight, export coordination, and installation support arranged to meet your requirements.",
  },
];

export const whyJapan = [
  {
    title: "Maintained to a high standard",
    text: "Many Japanese hospitals keep imaging systems under manufacturer service contracts throughout their working life.",
  },
  {
    title: "Replaced early",
    text: "Regular upgrade cycles mean systems often leave service while they still have years of useful life.",
  },
  {
    title: "Strong domestic brands",
    text: "Japan is home to Canon, Fujifilm, Shimadzu and others, so there is a wide supply of their systems.",
  },
  {
    title: "Careful handling",
    text: "Clean, climate-controlled rooms and careful operation help equipment age well.",
  },
];

export const generalFaqs = [
  {
    q: "Is this new or used equipment?",
    a: "All equipment we supply is pre-owned, sourced from hospitals and clinics in Japan. The condition of each unit is described in its inspection report.",
  },
  {
    q: "Which countries do you ship to?",
    a: "We ship worldwide. Import rules for used medical equipment differ by country, so please check local requirements. We supply the documents regulators usually ask for.",
  },
  {
    q: "What shipping terms do you offer?",
    a: "We quote FOB at a Japanese port or CIF to your destination port. Air freight is available for smaller systems such as ultrasound and C-arms.",
  },
  {
    q: "Do you install the equipment?",
    a: "Installation support by experienced engineers can be arranged on request. We also share technical documents with your own engineers ahead of delivery.",
  },
  {
    q: "How do I get a price?",
    a: "Send us a quote request with the equipment you need and your destination country. We reply with available units and pricing.",
  },
];

export const companyProfile = [
  { label: "Company Name", value: "SK Global Co., Ltd." },
  { label: "Date of Establishment", value: "9/16/2015" },
  { label: "Address", value: "2F, 4-12-38 Shibaura, Minato-ku, Tokyo 108-0023" },
  { label: "Phone", value: "+81 03-6435-4449" },
  { label: "Business", value: "Sourcing, inspection and export of used medical imaging equipment" },
  { label: "Languages", value: "English, Japanese" },
  { label: "Contact", value: "info@usedmedicaljapan.com" },
];

const en = { processSteps, services, whyJapan, generalFaqs, companyProfile };

export const getContent = (locale = "en") => (locale === "ja" ? ja : en);
