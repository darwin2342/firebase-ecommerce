import {
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { deleteUser } from "firebase/auth";

import { auth, db } from "../firebase/firebase";

import type { UserProfile } from "../types/UserProfile";

export const getUserProfile = async (
  uid: string
): Promise<UserProfile> => {
  const userRef = doc(db, "users", uid);

  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    throw new Error("User profile not found");
  }

  return snapshot.data() as UserProfile;
};

export const updateUserProfile = async (
  uid: string,
  updates: Partial<UserProfile>
) => {
  const userRef = doc(db, "users", uid);

  await updateDoc(userRef, updates);
};

export const deleteUserAccount = async (
  uid: string
) => {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("No authenticated user");
  }

  await deleteDoc(doc(db, "users", uid));

  await deleteUser(currentUser);
};