import { cn } from "@/lib/utils";

/**
 * Hanko-style inspection seal (検品済 = "inspected").
 * The only place the seal red is used on the site.
 */
export function InspectionSeal({ className, label = "Inspected in Japan" }) {
  return (
    <svg viewBox="0 0 120 120" role="img" aria-label={label} className={cn("text-seal", className)}>
      <defs>
        <filter id="seal-ink" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="noise" />
          <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -0.9 1.2" result="mask" />
          <feComposite in="SourceGraphic" in2="mask" operator="in" />
        </filter>
        <path id="seal-arc-top" d="M 22 60 A 38 38 0 0 1 98 60" />
        <path id="seal-arc-bottom" d="M 25 64 A 35 35 0 0 0 95 64" />
      </defs>
      <g filter="url(#seal-ink)" fill="currentColor" stroke="currentColor">
        <circle cx="60" cy="60" r="55" fill="none" strokeWidth="4.5" />
        <circle cx="60" cy="60" r="47" fill="none" strokeWidth="1.4" />
        <text fontSize="9.5" fontWeight="600" letterSpacing="1.2" stroke="none">
          <textPath href="#seal-arc-top" startOffset="50%" textAnchor="middle">Used Medical Japan</textPath>
        </text>
        <text x="60" y="68" textAnchor="middle" fontSize="23" fontWeight="700" stroke="none" fontFamily="'IBM Plex Sans JP', 'Hiragino Sans', 'Yu Gothic', sans-serif">
          検品済
        </text>
        <text fontSize="9" fontWeight="600" letterSpacing="1.4" stroke="none">
          <textPath href="#seal-arc-bottom" startOffset="50%" textAnchor="middle">Inspected</textPath>
        </text>
      </g>
    </svg>
  );
}
