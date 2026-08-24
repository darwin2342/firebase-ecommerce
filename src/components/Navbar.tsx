import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

import { logoutUser } from "../services/authService";

function Navbar() {
  const { user } = useAuth();
  const { cart } = useCart();

  return (
    <nav>
      <Link to="/">Home</Link>

      <Link to="/products">
        Products
      </Link>

      <Link to="/cart">
        Cart ({cart.length})
      </Link>

      {user ? (
        <>
          <Link to="/profile">
            Profile
          </Link>

          <Link to="/orders">
            Orders
          </Link>

          <Link to="/products/new">
            Add Product
          </Link>

          <button
            onClick={logoutUser}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login">
            Login
          </Link>

          <Link to="/register">
            Register
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;