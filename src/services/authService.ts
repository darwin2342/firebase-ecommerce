import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";

import { auth, db } from "../firebase/firebase";

export const registerUser = async (
  email: string,
  password: string,
  name: string,
  address: string
) => {
  const credential =
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

  const user = credential.user;

  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    email: user.email,
    name,
    address,
  });

  return user;
};

export const loginUser = async (
  email: string,
  password: string
) => {
  return signInWithEmailAndPassword(
    auth,
    email,
    password
  );
};

export const logoutUser = async () => {
  return signOut(auth);
};