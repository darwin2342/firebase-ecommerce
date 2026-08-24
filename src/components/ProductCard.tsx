import type { Product } from "../types/Product";
import { useCart } from "../context/CartContext";
import { useDeleteProduct } from "../hooks/useProducts";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

function ProductCard({
  product,
}: ProductCardProps) {
  const { addToCart } = useCart();

  const deleteProduct =
    useDeleteProduct();

  return (
    <div>
      {product.image && (
        <img
          src={product.image}
          alt={product.title}
          width="200"
        />
      )}

      <h2>{product.title}</h2>

      <p className="product-price">${product.price}</p>

      <p className="product-category">{product.category}</p>

      <button
        className="button"
        onClick={() =>
          addToCart(product)
        }
      >
        Add to Cart
      </button>

      <Link
        className="button"
        to={`/products/${product.id}/edit`}
      >
        Edit
      </Link>

      <button
        onClick={() =>
          deleteProduct.mutate(
            product.id
          )
        }
      >
        Delete
      </button>
    </div>
  );
}

export default ProductCard;