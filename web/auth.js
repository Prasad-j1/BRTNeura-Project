// src/auth.js
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  GoogleAuthProvider, 
  signInWithPopup 
} from "firebase/auth";
import { auth } from "./firebase";

// Sign up with email/password
export const signUpWithEmail = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

// Sign in with email/password
export const signInWithEmail = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

// Sign out
export const logout = () => signOut(auth);

export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};
