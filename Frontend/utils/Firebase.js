import {getAuth, GoogleAuthProvider}from "firebase/auth"
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginonecart-a5727.firebaseapp.com",
  projectId: "loginonecart-a5727",
  storageBucket: "loginonecart-a5727.firebasestorage.app",
  messagingSenderId: "551497644488",
  appId: "1:551497644488:web:87eded463c966582e0e8fd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const provider=new GoogleAuthProvider()

export {auth,provider}