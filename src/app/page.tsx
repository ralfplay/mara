const products = [
  { name: "Collar Luna", price: "$25.000" },
  { name: "Aros Sol", price: "$18.000" },
  { name: "Pulsera Mar", price: "$22.000" },
  { name: "Anillo Brisa", price: "$15.000" },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="flex items-center justify-between px-6 py-5 md:px-12">
        <span className="text-2xl font-semibold tracking-[0.3em]">MARA</span>
        <nav className="flex gap-6 text-sm">
          <a href="#coleccion" className="hover:text-accent">Colección</a>
          <a href="#contacto" className="hover:text-accent">Contacto</a>
        </nav>
      </header>

      <main className="flex-1">
        <section className="px-6 py-24 text-center md:px-12 md:py-36">
          <p className="mb-4 text-sm uppercase tracking-widest text-accent">
            Nueva colección
          </p>
          <h1 className="mx-auto max-w-3xl text-4xl font-light leading-tight md:text-6xl">
            Accesorios con estilo para todos los días
          </h1>
          <a
            href="#coleccion"
            className="mt-10 inline-block rounded-full bg-foreground px-8 py-3 text-sm text-background transition hover:bg-accent"
          >
            Ver colección
          </a>
        </section>

        <section id="coleccion" className="px-6 pb-24 md:px-12">
          <h2 className="mb-8 text-center text-2xl font-light">Colección</h2>
          <ul className="mx-auto grid max-w-5xl grid-cols-2 gap-6 md:grid-cols-4">
            {products.map((p) => (
              <li key={p.name}>
                <div className="aspect-square rounded-lg bg-foreground/10" />
                <p className="mt-3 text-sm">{p.name}</p>
                <p className="text-sm text-accent">{p.price}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer id="contacto" className="px-6 py-8 text-center text-sm md:px-12">
        © 2026 MARA. Todos los derechos reservados.
      </footer>
    </div>
  );
}
