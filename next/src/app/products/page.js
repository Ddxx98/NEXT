import Link from "next/link";

export const metadata = {
  title: "This is Homepage",
  description: "Explore our wide range of products.",
};

const S = {
  section: { maxWidth: 1120, margin: "0 auto", padding: "2rem 1rem" },
  headerWrap: { display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "1rem", marginBottom: "1rem" },
  title: { fontSize: "clamp(1.5rem, 2vw, 2rem)", fontWeight: 800, letterSpacing: "-0.01em", margin: 0 },
  subtitle: { color: "#6b7280", margin: 0 },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "1rem",
    listStyle: "none",
    padding: 0,
    margin: "1rem 0 0",
  },
  card: {
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    background: "#fff",
    display: "grid",
    gridTemplateRows: "auto 1fr auto",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
  },
  media: {
    width: "100%",
    aspectRatio: "16 / 10",
    objectFit: "cover",
    background: "#f8fafc",
    borderBottom: "1px solid #f1f5f9",
  },
  body: { padding: "0.9rem", display: "grid", gap: "0.4rem" },
  name: { margin: 0, fontWeight: 700, fontSize: "1rem", color: "#0f172a" },
  metaRow: { display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" },
  price: { fontWeight: 800, color: "#111827" },
  rating: { fontWeight: 600, color: "#374151", fontSize: "0.9rem" },
  desc: {
    color: "#374151",
    margin: "0.2rem 0 0",
    lineHeight: 1.5,
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    fontSize: "0.95rem",
  },
  footer: { padding: "0.9rem", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f1f5f9" },
  brand: { color: "#6b7280", fontWeight: 600 },
  link: {
    textDecoration: "none",
    color: "#1d4ed8",
    fontWeight: 700,
    display: "inline-flex",
    alignItems: "center",
    gap: "0.375rem",
    padding: "0.45rem 0.7rem",
    borderRadius: 10,
    background: "rgba(37, 99, 235, 0.12)",
  },
};

export default async function Products() {
  const res = await fetch("https://dummyjson.com/products", { cache: "no-store" });
  const products = await res.json();

  return (
    <section style={S.section}>
      <div style={S.headerWrap}>
        <h1 style={S.title}>Products</h1>
        <p style={S.subtitle}>Explore our wide range of products.</p>
      </div>

      <ul style={S.grid}>
        {products.products.map((product) => {
          const primaryImage =
            Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : product.thumbnail;

          return (
            <li key={product.id}>
              <article style={S.card}>
                {primaryImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={primaryImage} alt={product.title} style={S.media} />
                ) : (
                  <div style={S.media} />
                )}

                <div style={S.body}>
                  <h3 style={S.name} title={product.title}>
                    {product.title}
                  </h3>
                  <div style={S.metaRow}>
                    <span style={S.price}>${Number(product.price).toFixed(2)}</span>
                    <span style={S.rating}>
                      ★ {product.rating?.toFixed ? product.rating.toFixed(1) : product.rating}
                    </span>
                    {product.availabilityStatus ? (
                      <span
                        style={{
                          fontSize: "0.8rem",
                          color: "#6b7280",
                          background: "#f3f4f6",
                          padding: "0.25rem 0.5rem",
                          borderRadius: 999,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {product.availabilityStatus}
                      </span>
                    ) : null}
                  </div>
                  <p style={S.desc}>{product.description}</p>
                </div>

                <div style={S.footer}>
                  {product.brand ? <span style={S.brand}>{product.brand}</span> : <span />}
                  <Link href={`/products/${product.id}`} style={S.link}>
                    View <span aria-hidden>→</span>
                  </Link>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
