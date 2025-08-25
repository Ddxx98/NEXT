export default async function ProductDetails({ params }) {
  const { id } = await params;

  return (
    <section>
      <h1>Product Details</h1>
      <p>Here you can find more information about the product.</p>
      <p><strong>Product ID:</strong> {id}</p>
    </section>
  );
}
