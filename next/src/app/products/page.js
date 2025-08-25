import Link from "next/link";

export default function Products() {
  const products = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <section>
      <h1>Products</h1>
      <p>Explore our wide range of products.</p>
      <ul>
        {products.map((id) => (
          <li key={id}>
            <Link href={`/products/${id}`}>Product {id}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
