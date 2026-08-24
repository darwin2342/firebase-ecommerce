import ProductCard from "../components/ProductCard";

import { useProducts } from "../hooks/useProducts";

function Products() {
  const {
    data: products,
    isLoading,
    error,
  } = useProducts();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <p>
        Could not load products.
      </p>
    );
  }

  return (
    <main>
      <h1>Products</h1>

      <div className="products-grid">
  {products?.map((product) => (
    <ProductCard
      key={product.id}
      product={product}
    />
  ))}
</div>
    </main>
  );
}

export default Products;