import Image from "next/image";

export default async function ProductDetails({ params }) {
  const { id } = await params;
  const product = await fetch(`https://dummyjson.com/products/${id}`, { cache: "no-store" });
  const productData = await product.json();

  return (
    <section>
      <h1>Product Details</h1>
      <p>Here you can find more information about the product.</p>
      <p><strong>Product ID:</strong> {id}</p>
      <h4>{productData.title}</h4>
      <p>{productData.description}</p>
      <Image src={productData.image} alt={productData.title} width={500} height={500} />
    </section>
  );
}
