import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createOrder,
  getOrderById,
  getUserOrders,
} from "../services/orderService";

import type { CartItem } from "../types/Cart";

export const useOrders = (
  userId: string | undefined
) => {
  return useQuery({
    queryKey: ["orders", userId],

    queryFn: () =>
      getUserOrders(userId!),

    enabled: !!userId,
  });
};

export const useOrder = (
  orderId: string | undefined
) => {
  return useQuery({
    queryKey: ["order", orderId],

    queryFn: () =>
      getOrderById(orderId!),

    enabled: !!orderId,
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      cart,
    }: {
      userId: string;
      cart: CartItem[];
    }) => createOrder(userId, cart),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          "orders",
          variables.userId,
        ],
      });
    },
  });
};