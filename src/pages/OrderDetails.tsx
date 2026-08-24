import { useParams } from "react-router-dom";

import { useOrder } from "../hooks/useOrders";
import { useAuth } from "../context/AuthContext";

function OrderDetails() {
  const { orderId } = useParams();

  const { user } = useAuth();

  const {
    data: order,
    isLoading,
  } = useOrder(orderId);

  if (isLoading) {
    return <p>Loading order...</p>;
  }

  if (!order) {
    return <p>Order not found.</p>;
  }

  if (order.userId !== user?.uid) {
    return <p>Unauthorized.</p>;
  }

  return (
    <main>
      <h1>Order Details</h1>

      <p>
        Order #{order.id}
      </p>

      <p>
        {order.createdAt.toLocaleDateString()}
      </p>

      {order.items.map(
        (item) => (
          <div
            key={item.productId}
          >
            <h3>
              {item.title}
            </h3>

            <p>
              ${item.price}
            </p>

            <p>
              Quantity:
              {" "}
              {item.quantity}
            </p>
          </div>
        )
      )}

      <h2>
        Total: $
        {order.total.toFixed(2)}
      </h2>
    </main>
  );
}

export default OrderDetails;