import Image from "next/image";
import Link from "next/link";

export const generateMetadata = async ({ params }) => {
  const { id } = params;
  const product = await fetch(`https://dummyjson.com/products/${id}`, { cache: "no-store" });
  const productData = await product.json();

  return {
    title: productData.title,
    description: productData.description,
  };
};

const S = {
  section: { maxWidth: 1120, margin: "0 auto", padding: "2rem 1rem" },
  header: { marginBottom: "1rem" },
  title: { fontSize: "clamp(1.5rem, 2vw, 2rem)", fontWeight: 800, letterSpacing: "-0.01em", margin: 0 },
  subtitle: { color: "#6b7280", margin: "0.25rem 0 0" },
  layout: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "1rem",
  },
  // media query substitute: a slightly wider container makes two-column feel natural
  // To keep strictly inline, we rely on the grid minmax behavior and container width.
  leftCol: {
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    background: "#fff",
    padding: "0.75rem",
  },
  rightCol: {
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    background: "#fff",
    padding: "1rem",
    display: "grid",
    gap: "0.75rem",
  },
  mainImageWrap: {
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
    background: "#f8fafc",
    border: "1px solid #f1f5f9",
  },
  thumbsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(72px, 1fr))",
    gap: "0.5rem",
    marginTop: "0.75rem",
  },
  thumbWrap: {
    width: "100%",
    aspectRatio: "1 / 1",
    border: "1px solid #e5e7eb",
    borderRadius: 10,
    overflow: "hidden",
    background: "#fff",
  },
  h4: { margin: 0, fontSize: "1.1rem", fontWeight: 800, color: "#0f172a" },
  metaRow: { display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" },
  pill: {
    fontSize: "0.8rem",
    color: "#6b7280",
    background: "#f3f4f6",
    padding: "0.25rem 0.5rem",
    borderRadius: 999,
    whiteSpace: "nowrap",
  },
  price: { fontWeight: 800, fontSize: "1.25rem", color: "#111827" },
  rating: { fontWeight: 700, color: "#374151" },
  desc: {
    color: "#374151",
    margin: 0,
    lineHeight: 1.6,
  },
  kvGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: "0.5rem",
  },
  kvItem: {
    border: "1px solid #f1f5f9",
    background: "#f8fafc",
    borderRadius: 10,
    padding: "0.5rem 0.75rem",
  },
  kvKey: { color: "#6b7280", fontSize: "0.85rem", margin: 0 },
  kvVal: { color: "#111827", fontWeight: 700, margin: "0.15rem 0 0" },
  actions: { display: "flex", gap: "0.5rem", marginTop: "0.25rem", flexWrap: "wrap" },
  btnPrimary: {
    padding: "0.6rem 0.9rem",
    borderRadius: 10,
    border: "1px solid #2563eb",
    background: "#2563eb",
    color: "#fff",
    fontWeight: 800,
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
  },
  btnGhost: {
    padding: "0.6rem 0.9rem",
    borderRadius: 10,
    border: "1px solid #e5e7eb",
    background: "#fff",
    color: "#111827",
    fontWeight: 800,
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
  },
};

export default async function ProductDetails({ params }) {
  const { id } = await params;
  const product = await fetch(`https://dummyjson.com/products/${id}`, { cache: "no-store" });
  const productData = await product.json();

  // Derive primary and thumbnails with graceful fallbacks
  const images = Array.isArray(productData.images) ? productData.images : [];
  const primaryImage = images[0] || productData.thumbnail || null;

  // Compute pricing helpers
  const price = typeof productData.price === "number" ? productData.price : 0;
  const discount = typeof productData.discountPercentage === "number" ? productData.discountPercentage : 0;
  const discountedPrice =
    discount > 0 ? Math.max(0, price - price * (discount / 100)) : price;

  // Simple layout tweak: use two columns if container gets wide enough
  // Achieved implicitly with container maxWidth and grid in parent UI.
  const twoColLayout = {
    ...S.layout,
    gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
  };

  return (
    <section style={S.section}>
      <header style={S.header}>
        <h1 style={S.title}>Product Details</h1>
        <p style={S.subtitle}>Here you can find more information about the product.</p>
      </header>

      <div style={twoColLayout}>
        {/* Left: Gallery */}
        <div style={S.leftCol}>
          <div style={S.mainImageWrap}>
            {primaryImage ? (
              <Image
                src={primaryImage}
                alt={productData.title}
                width={900}
                height={600}
                style={{ width: "100%", height: "auto", objectFit: "cover" }}
                priority
              />
            ) : (
              <div style={{ width: "100%", aspectRatio: "3 / 2", background: "#f1f5f9" }} />
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 ? (
            <div style={S.thumbsRow}>
              {images.slice(0, 6).map((src, i) => (
                <div key={`${productData.id}-thumb-${i}`} style={S.thumbWrap}>
                  <Image
                    src={src}
                    alt={`${productData.title} - ${i + 1}`}
                    width={200}
                    height={200}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
          ) : null}
        </div>

        {/* Right: Info */}
        <div style={S.rightCol}>
          <p style={{ margin: 0 }}>
            <strong>Product ID:</strong> {id}
          </p>

          <h4 style={S.h4}>{productData.title}</h4>

          <div style={S.metaRow}>
            <span style={S.price}>
              ${discountedPrice.toFixed(2)}
            </span>
            {discount > 0 ? (
              <span
                style={{
                  color: "#6b7280",
                  textDecoration: "line-through",
                  fontWeight: 600,
                }}
              >
                ${price.toFixed(2)}
              </span>
            ) : null}
            {discount > 0 ? (
              <span style={S.pill}>-{discount.toFixed(0)}%</span>
            ) : null}
            {typeof productData.rating === "number" ? (
              <span style={S.rating}>★ {productData.rating.toFixed(1)}</span>
            ) : null}
            {productData.availabilityStatus ? (
              <span style={S.pill}>{productData.availabilityStatus}</span>
            ) : null}
          </div>

          <p style={S.desc}>{productData.description}</p>

          {/* Key values */}
          <div style={S.kvGrid}>
            {productData.brand ? (
              <div style={S.kvItem}>
                <p style={S.kvKey}>Brand</p>
                <p style={S.kvVal}>{productData.brand}</p>
              </div>
            ) : null}
            {productData.category ? (
              <div style={S.kvItem}>
                <p style={S.kvKey}>Category</p>
                <p style={S.kvVal}>{productData.category}</p>
              </div>
            ) : null}
            {typeof productData.stock === "number" ? (
              <div style={S.kvItem}>
                <p style={S.kvKey}>Stock</p>
                <p style={S.kvVal}>{productData.stock}</p>
              </div>
            ) : null}
            {productData.sku ? (
              <div style={S.kvItem}>
                <p style={S.kvKey}>SKU</p>
                <p style={S.kvVal}>{productData.sku}</p>
              </div>
            ) : null}
            {productData.warrantyInformation ? (
              <div style={S.kvItem}>
                <p style={S.kvKey}>Warranty</p>
                <p style={S.kvVal}>{productData.warrantyInformation}</p>
              </div>
            ) : null}
            {productData.shippingInformation ? (
              <div style={S.kvItem}>
                <p style={S.kvKey}>Shipping</p>
                <p style={S.kvVal}>{productData.shippingInformation}</p>
              </div>
            ) : null}
          </div>

          {/* Actions */}
          <div style={S.actions}>
            <a href="#" style={S.btnPrimary} aria-label="Add to cart">
              Add to cart
            </a>
            <Link href="/products" style={S.btnGhost} aria-label="Back to products">
              ← Back
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
