import Link from "next/link";
import { categories, type Category } from "@/data/products";

const base =
  "caps inline-flex min-h-11 items-center rounded-full border border-foreground px-6 transition";
const active = "bg-foreground text-background";
const idle = "hover:border-primary hover:text-primary";

export default function CategoryFilter({ current }: { current?: Category }) {
  return (
    <nav aria-label="Categorías" className="flex flex-wrap gap-2.5">
      <Link
        href="/catalogo"
        aria-current={current ? undefined : "page"}
        className={`${base} ${current ? idle : active}`}
      >
        Todos
      </Link>
      {categories.map((c) => (
        <Link
          key={c.slug}
          href={`/catalogo?categoria=${c.slug}`}
          aria-current={current === c.slug ? "page" : undefined}
          className={`${base} ${current === c.slug ? active : idle}`}
        >
          {c.label}
        </Link>
      ))}
    </nav>
  );
}
