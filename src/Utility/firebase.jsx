// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKa-Pm5jrGCaH6PxTJm_QK-G3jHXkDBm4",
  authDomain: "clone-b55f7.firebaseapp.com",
  projectId: "clone-b55f7",
  storageBucket: "clone-b55f7.firebasestorage.app",
  messagingSenderId: "770363536927",
  appId: "1:770363536927:web:5924c784d473967c32c72a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();
