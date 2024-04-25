// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9ayk43GEh1f9f6OYaUfvazKdj_E1bsI0",
  authDomain: "ecen-404-3547f.firebaseapp.com",
  projectId: "ecen-404-3547f",
  storageBucket: "ecen-404-3547f.appspot.com",
  messagingSenderId: "564036508225",
  appId: "1:564036508225:web:1d39b21a2c1335bc6884c0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebase_auth = getAuth(app);
export const firestore = getFirestore(app);
export const database = getDatabase(app); // Export database as a named export
export const firebase = app;
