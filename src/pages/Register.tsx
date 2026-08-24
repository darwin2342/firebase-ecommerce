import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../services/authService";

function Register() {
  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      await registerUser(
        email,
        password,
        name,
        address
      );

      navigate("/");
    } catch {
      setError(
        "Unable to create account."
      );
    }
  };

  return (
    <main>
      <h1>Register</h1>

      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          placeholder="Address"
          value={address}
          onChange={(e) =>
            setAddress(e.target.value)
          }
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button type="submit">
          Register
        </button>
      </form>
    </main>
  );
}

export default Register;