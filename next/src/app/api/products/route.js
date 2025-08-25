export default async function GetProducts() {
    const products = await fetch("https://dummyjson.com/products", { cache: "no-store" });
    return products.json();
}