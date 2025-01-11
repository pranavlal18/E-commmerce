import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9Y4_IF1Xay4d9R7ZuZM76WRIG6OtHPHg",
  authDomain: "ecom-19ac6.firebaseapp.com",
  projectId: "ecom-19ac6",
  storageBucket: "ecom-19ac6.firebasestorage.app",
  messagingSenderId: "1094535077753",
  appId: "1:1094535077753:web:ed1025f9bb1d18df03d9a8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth }