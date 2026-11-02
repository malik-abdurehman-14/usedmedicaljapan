// Full equipment range, grouped as in the client's company profile. Items with their own
// category page link to it; the rest are sourced on request and listed by name only.

export const equipmentRange = {
  intro:
    "We source a broad range of pre-owned medical equipment from Japan. Availability depends on the current Japanese market, equipment condition and customer requirements.",
  note: "Equipment availability, condition, ownership, removal requirements and export suitability are confirmed case by case.",
  groups: [
    {
      id: "imaging",
      title: "Diagnostic Imaging",
      items: [
        { name: "MRI systems", slug: "used-mri-machines" },
        { name: "CT scanners", slug: "used-ct-scanners" },
        { name: "X-Ray systems", slug: "used-x-ray-machines" },
        { name: "Mobile X-Ray systems" },
        { name: "C-Arm / surgical X-Ray systems", slug: "used-c-arm-systems" },
        { name: "Angiography systems", slug: "used-angiography-systems" },
        { name: "Mammography systems", slug: "used-mammography-machines" },
        { name: "Ultrasound systems", slug: "used-ultrasound-machines" },
        { name: "Bone densitometry systems" },
        { name: "PET/CT and related imaging equipment", slug: "used-pet-ct-scanners" },
      ],
    },
    {
      id: "surgical",
      title: "Endoscopy & Surgical Equipment",
      items: [
        { name: "Endoscopy systems" },
        { name: "Gastroscopes and colonoscopes" },
        { name: "Endoscopic ultrasound" },
        { name: "Operating tables" },
        { name: "Operating lights" },
        { name: "Electrosurgical units" },
        { name: "Anesthesia machines" },
        { name: "Sterilizers / autoclaves" },
        { name: "Surgical navigation systems" },
      ],
    },
    {
      id: "monitoring",
      title: "Monitoring & Laboratory Equipment",
      items: [
        { name: "Patient monitors" },
        { name: "ECG / Holter ECG" },
        { name: "Central monitoring systems" },
        { name: "Vital-sign monitors" },
        { name: "Clinical laboratory analyzers" },
        { name: "Blood-gas analyzers" },
        { name: "Hematology analyzers" },
        { name: "Centrifuges and laboratory equipment" },
      ],
    },
    {
      id: "other",
      title: "Other Medical Equipment",
      items: [
        { name: "Ophthalmology equipment" },
        { name: "Dental equipment" },
        { name: "Obstetrics / neonatal equipment" },
        { name: "Hospital beds and stretchers" },
        { name: "Physical therapy / rehabilitation equipment" },
        { name: "Medical displays and imaging accessories" },
        { name: "Medical device parts and accessories where appropriate" },
      ],
    },
  ],
};
