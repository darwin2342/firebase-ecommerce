import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

import { useCreateOrder } from "../hooks/useOrders";

function Cart() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const {
    cart,
    removeFromCart,
    clearCart,
  } = useCart();

  const createOrder =
    useCreateOrder();

  const total = cart.reduce(
    (sum, item) =>
      sum +
      item.price * item.quantity,
    0
  );

  const handleOrder = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    createOrder.mutate(
      {
        userId: user.uid,
        cart,
      },

      {
        onSuccess: () => {
          clearCart();
          navigate("/orders");
        },
      }
    );
  };

  return (
    <main>
      <h1>Cart</h1>

      {cart.map((item) => (
        <div key={item.productId}>
          <h3>{item.title}</h3>

          <p>
            ${item.price}
          </p>

          <p>
            Quantity: {item.quantity}
          </p>

          <button
            onClick={() =>
              removeFromCart(
                item.productId
              )
            }
          >
            Remove
          </button>
        </div>
      ))}

      <h2>
        Total: ${total.toFixed(2)}
      </h2>

      <button
        onClick={handleOrder}
        disabled={cart.length === 0}
      >
        Place Order
      </button>
    </main>
  );
}

export default Cart;