// Full equipment range, grouped as in the client's company profile. Listed by name only.

export const equipmentRange = {
  intro:
    "We source a broad range of pre-owned medical equipment from Japan. Availability depends on the current Japanese market, equipment condition and customer requirements.",
  note: "Equipment availability, condition, ownership, removal requirements and export suitability are confirmed case by case.",
  groups: [
    {
      id: "imaging",
      title: "Diagnostic Imaging",
      items: [
        { name: "MRI systems" },
        { name: "CT scanners" },
        { name: "X-Ray systems" },
        { name: "Mobile X-Ray systems" },
        { name: "C-Arm / surgical X-Ray systems" },
        { name: "Angiography systems" },
        { name: "Mammography systems" },
        { name: "Ultrasound systems" },
        { name: "Bone densitometry systems" },
        { name: "PET/CT and related imaging equipment" },
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

/** Category page → its name in the range, so product pages can pre-select the quote form. */
export const rangeNameBySlug = {
  "used-mri-machines": "MRI systems",
  "used-ct-scanners": "CT scanners",
  "used-pet-ct-scanners": "PET/CT and related imaging equipment",
  "used-spect-gamma-cameras": "PET/CT and related imaging equipment",
  "used-angiography-systems": "Angiography systems",
  "used-c-arm-systems": "C-Arm / surgical X-Ray systems",
  "used-x-ray-machines": "X-Ray systems",
  "used-mammography-machines": "Mammography systems",
  "used-ultrasound-machines": "Ultrasound systems",
};
