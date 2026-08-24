import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  useProduct,
  useUpdateProduct,
} from "../hooks/useProducts";

function EditProduct() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data: product } =
    useProduct(id);

  const updateProduct =
    useUpdateProduct();

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

  useEffect(() => {
    if (product) {
      setTitle(product.title);

      setPrice(
        product.price.toString()
      );

      setDescription(
        product.description
      );

      setCategory(
        product.category
      );

      setImage(
        product.image ?? ""
      );
    }
  }, [product]);

  if (!id) {
    return <p>Product not found.</p>;
  }

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    updateProduct.mutate(
      {
        id,

        updates: {
          title,
          price: Number(price),
          description,
          category,
          image,
        },
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
      <h1>Edit Product</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <input
          type="number"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
        />

        <textarea
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
        />

        <input
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        />

        <input
          value={image}
          onChange={(e) =>
            setImage(e.target.value)
          }
        />

        <button type="submit">
          Save
        </button>
      </form>
    </main>
  );
}

export default EditProduct;