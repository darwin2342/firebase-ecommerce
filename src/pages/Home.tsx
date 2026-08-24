import { Link } from "react-router-dom";

function Home() {
  return (
    <main>
      <h1>My E-Commerce Store</h1>

      <p>
        Browse our available products.
      </p>

      <Link to="/products">
        Shop Products
      </Link>
    </main>
  );
}

export default Home;