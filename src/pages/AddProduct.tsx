import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCreateProduct } from "../hooks/useProducts";

function AddProduct() {
  const navigate = useNavigate();

  const createProduct =
    useCreateProduct();

  const [title, setTitle] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [image, setImage] =
    useState("");

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    createProduct.mutate(
      {
        title,
        price: Number(price),
        description,
        category,
        image,
      },
      {
        onSuccess: () => {
          navigate("/products");
        },
      }
    );
  };

  return (
    <main>
      <h1>Add Product</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
        />

        <input
          placeholder="Category"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        />

        <input
          placeholder="Image URL"
          value={image}
          onChange={(e) =>
            setImage(e.target.value)
          }
        />

        <button type="submit">
          Create Product
        </button>
      </form>
    </main>
  );
}

export default AddProduct;