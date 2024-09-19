// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-dcebe.firebaseapp.com",
  projectId: "mern-blog-dcebe",
  storageBucket: "mern-blog-dcebe.appspot.com",
  messagingSenderId: "611236306419",
  appId: "1:611236306419:web:4cb0f76eb74370915f4686"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);