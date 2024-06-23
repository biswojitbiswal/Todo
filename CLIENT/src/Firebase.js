// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "mern-todo-7417d.firebaseapp.com",
  projectId: "mern-todo-7417d",
  storageBucket: "mern-todo-7417d.appspot.com",
  messagingSenderId: "1010510243613",
  appId: "1:1010510243613:web:7bb5bef61fd79b96e2e3f4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);