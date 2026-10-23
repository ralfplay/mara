const products = [
  { name: "Collar Luna", price: "$25.000" },
  { name: "Aretes Sol", price: "$18.000" },
  { name: "Pulsera Mar", price: "$22.000" },
  { name: "Anillo Brisa", price: "$15.000" },
];

export default function Home() {
  return (
    <main className="flex-1">
      <section className="px-6 py-24 text-center md:px-12 md:py-36">
        <p className="mb-4 text-sm uppercase tracking-widest text-primary">
          Nueva colección
        </p>
        <h1 className="mx-auto max-w-3xl text-4xl font-light leading-tight md:text-6xl">
          Accesorios con estilo para todos los días
        </h1>
        <a
          href="#coleccion"
          className="mt-10 inline-block rounded-full bg-primary px-8 py-3 text-sm text-on-primary transition hover:bg-secondary"
        >
          Ver colección
        </a>
      </section>

      <section id="coleccion" className="px-6 pb-24 md:px-12">
        <h2 className="mb-8 text-center text-2xl font-light">Colección</h2>
        <ul className="mx-auto grid max-w-5xl grid-cols-2 gap-6 md:grid-cols-4">
          {products.map((p) => (
            <li key={p.name}>
              <div className="aspect-square rounded-lg border border-border bg-muted" />
              <p className="mt-3 text-sm">{p.name}</p>
              <p className="text-sm text-primary">{p.price}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
