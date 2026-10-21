import { clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge about our custom type-scale utilities so that
// e.g. "text-title text-white" keeps both (size + colour).
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["display", "title", "subtitle", "lead"] }],
    },
  },
});

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
