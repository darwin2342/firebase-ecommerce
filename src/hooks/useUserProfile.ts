import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  deleteUserAccount,
  getUserProfile,
  updateUserProfile,
} from "../services/userService";

import type { UserProfile } from "../types/UserProfile";

export const useUserProfile = (
  uid: string | undefined
) => {
  return useQuery({
    queryKey: ["user", uid],

    queryFn: () => getUserProfile(uid!),

    enabled: !!uid,
  });
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      uid,
      updates,
    }: {
      uid: string;
      updates: Partial<UserProfile>;
    }) => updateUserProfile(uid, updates),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["user", variables.uid],
      });
    },
  });
};

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: deleteUserAccount,
  });
};