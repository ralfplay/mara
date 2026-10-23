import Link from "next/link";
import { categories, type Category } from "@/data/products";

const base = "rounded-full border px-5 py-2 text-sm transition";
const active = "border-primary bg-primary text-on-primary";
const idle = "border-border bg-card hover:border-primary hover:text-primary";

export default function CategoryFilter({ current }: { current?: Category }) {
  return (
    <nav aria-label="Categorías" className="flex flex-wrap justify-center gap-3">
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
