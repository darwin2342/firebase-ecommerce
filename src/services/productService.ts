import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

import type { Product } from "../types/Product";

export const getProducts = async (): Promise<Product[]> => {
  const snapshot = await getDocs(
    collection(db, "products")
  );

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  })) as Product[];
};

export const getProductById = async (
  id: string
): Promise<Product> => {
  const productRef = doc(db, "products", id);

  const snapshot = await getDoc(productRef);

  if (!snapshot.exists()) {
    throw new Error("Product not found");
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as Product;
};

export const createProduct = async (
  product: Omit<Product, "id">
) => {
  return addDoc(
    collection(db, "products"),
    product
  );
};

export const updateProduct = async (
  id: string,
  updates: Partial<Omit<Product, "id">>
) => {
  await updateDoc(
    doc(db, "products", id),
    updates
  );
};

export const deleteProduct = async (
  id: string
) => {
  await deleteDoc(
    doc(db, "products", id)
  );
};