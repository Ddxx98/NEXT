import Link from "next/link";

export default async function Products() {
  const product = await fetch("https://dummyjson.com/products", { cache: "no-store" });
  const products = await product.json();

  return (
    <section>
      <h1>Products</h1>
      <p>Explore our wide range of products.</p>
      <ul style={{ listStyle: "inside"}}>
        {products.products.map((product) => (
          <li key={product.id}>
            <h4>{product.title}</h4>
            <Link href={`/products/${product.id}`}>Product {product.id}</Link>
            <p>{product.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
