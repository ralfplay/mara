import type { Category } from "@/data/products";

// Dibujos de línea que ocupan el lugar de la foto mientras no exista el archivo en public/.
const circle = (x: number, y: number, r: number) =>
  `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;

const chain = "M22 20q38 72 76 0";
const band = "M24 60a36 22 0 1 0 72 0a36 22 0 1 0 -72 0";
const sun = `${circle(60, 60, 18)}M60 30v-14M60 104v-14M30 60h-14M104 60h-14M39 39l-9-9M90 90l-9-9M81 39l9-9M30 90l9-9`;
const moonPendant = `${chain}M60 56v8M66 66a12 12 0 1 0 0 22a14 14 0 0 1 0-22Z`;
const beads = `${band}${circle(60, 82, 5)}${circle(44, 79, 4)}${circle(76, 79, 4)}`;

const bySlug: Record<string, string> = {
  "aretes-sol": sun,
  "aretes-perla": `M60 20v24${circle(60, 60, 15)}${circle(60, 14, 5)}`,
  "aretes-luna": "M74 28a34 34 0 1 0 0 64a40 40 0 0 1 0-64Z",
  "aretes-aro": `${circle(60, 66, 26)}M60 40v-18`,
  "collar-luna": moonPendant,
  "collar-brisa": `${chain}M30 20q30 96 60 0`,
  "collar-estrella": `${chain}M60 60L62.9 68L71.4 68.3L64.8 73.5L67.1 81.7L60 77L52.9 81.7L55.2 73.5L48.6 68.3L57.1 68Z`,
  "collar-perla": `${chain}${circle(60, 56, 5)}${circle(44, 50, 4)}${circle(76, 50, 4)}${circle(31, 38, 3)}${circle(89, 38, 3)}`,
  "pulsera-mar": `${band}M40 92q5-6 10 0t10 0t10 0t10 0`,
  "pulsera-arena": `${band}M30 60a30 16 0 1 0 60 0`,
  "pulsera-coral": beads,
  "pulsera-brisa": `${band}M60 82v10${circle(60, 97, 5)}`,
};

const byCategory: Record<Category, string> = {
  aretes: sun,
  collares: moonPendant,
  pulseras: beads,
};

export default function ProductArt({
  slug,
  category,
  className = "w-1/2",
}: {
  slug?: string;
  category: Category;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 120"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-auto text-gold ${className}`}
    >
      <path d={(slug && bySlug[slug]) || byCategory[category]} />
    </svg>
  );
}
