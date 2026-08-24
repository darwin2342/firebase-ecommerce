import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

import type { CartItem } from "../types/Cart";
import type { Order } from "../types/Order";

export const createOrder = async (
  userId: string,
  cart: CartItem[]
) => {
  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  return addDoc(collection(db, "orders"), {
    userId,
    items: cart,
    total,
    createdAt: serverTimestamp(),
  });
};

export const getUserOrders = async (
  userId: string
): Promise<Order[]> => {
  const ordersQuery = query(
    collection(db, "orders"),
    where("userId", "==", userId)
  );

  const snapshot = await getDocs(ordersQuery);

  return snapshot.docs.map((document) => {
    const data = document.data();

    return {
      id: document.id,
      userId: data.userId,
      items: data.items,
      total: data.total,

      createdAt:
        data.createdAt?.toDate() ?? new Date(),
    };
  });
};

export const getOrderById = async (
  orderId: string
): Promise<Order> => {
  const orderRef = doc(db, "orders", orderId);

  const snapshot = await getDoc(orderRef);

  if (!snapshot.exists()) {
    throw new Error("Order not found");
  }

  const data = snapshot.data();

  return {
    id: snapshot.id,
    userId: data.userId,
    items: data.items,
    total: data.total,

    createdAt:
      data.createdAt?.toDate() ?? new Date(),
  };
};