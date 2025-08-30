// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsQTBPK5CABWZr-332rrqnmBfdkJOoqWs",
  authDomain: "ideamanagementsystem-f259f.firebaseapp.com",
  projectId: "ideamanagementsystem-f259f",
  storageBucket: "ideamanagementsystem-f259f.firebasestorage.app",
  messagingSenderId: "211239266636",
  appId: "1:211239266636:web:4fe941a64990a5d6dc07e9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth instance
const auth = getAuth(app);

// Google provider
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
