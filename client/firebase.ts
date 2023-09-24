import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "streak-stack.firebaseapp.com",
  projectId: "streak-stack",
  storageBucket: "streak-stack.appspot.com",
  messagingSenderId: "611906999660",
  appId: "1:611906999660:web:5f45af847c4d7e7a284f49",
  measurementId: "G-EFDKQSMFQH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export { app, auth };
