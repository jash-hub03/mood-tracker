import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA8RUlI4HeaX2mrRrj13lohmd3f5TOcFFM",
  authDomain: "mood-tracker345.firebaseapp.com",
  projectId: "mood-tracker345",
  storageBucket: "mood-tracker345.firebasestorage.app",
  messagingSenderId: "1007046113746",
  appId: "1:1007046113746:web:97d2cb51c586be2739700b",
  measurementId: "G-CG9WJ1VQYQ"
};

const app = initializeApp(firebaseConfig);

// 🔥 THIS IS THE IMPORTANT LINE
export const db = getFirestore(app);