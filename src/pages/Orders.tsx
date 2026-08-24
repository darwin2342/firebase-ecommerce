import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useOrders } from "../hooks/useOrders";

function Orders() {
  const { user } = useAuth();

  const {
    data: orders,
    isLoading,
  } = useOrders(user?.uid);

  if (isLoading) {
    return <p>Loading orders...</p>;
  }

  return (
    <main>
      <h1>Order History</h1>

      {orders?.map((order) => (
        <div key={order.id}>
          <h3>
            Order #{order.id}
          </h3>

          <p>
            {order.createdAt.toLocaleDateString()}
          </p>

          <p>
            Total: $
            {order.total.toFixed(2)}
          </p>

          <Link
            to={`/orders/${order.id}`}
          >
            View Order
          </Link>
        </div>
      ))}
    </main>
  );
}

export default Orders;