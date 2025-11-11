import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";

// Read API key from Vite env
const apiKey = import.meta.env.VITE_FIREBASE_APIKEY;

if (!apiKey) {
  // Provide a clear developer-facing error — Firebase will also throw, but this is friendlier
  console.error(
    "VITE_FIREBASE_APIKEY is not set. Google Firebase auth will be disabled.\n" +
      "Set VITE_FIREBASE_APIKEY in your Frontend/.env and restart the dev server."
  );
}

const firebaseConfig = {
  apiKey: apiKey || "",
  authDomain: "loginonecart-a5727.firebaseapp.com",
  projectId: "loginonecart-a5727",
  storageBucket: "loginonecart-a5727.firebasestorage.app",
  messagingSenderId: "551497644488",
  appId: "1:551497644488:web:87eded463c966582e0e8fd",
};

let app = null;
let auth = null;
let provider = null;

if (apiKey) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    provider = new GoogleAuthProvider();
  } catch (err) {
    console.error("Failed to initialize Firebase:", err);
    app = null;
    auth = null;
    provider = null;
  }
}

export { auth, provider };