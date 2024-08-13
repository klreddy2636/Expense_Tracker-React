import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-qy_LzwZ2x6a_jqcwiUtuKQDNxdkTmP0",
  authDomain: "expense-tracker-331a1.firebaseapp.com",
  projectId: "expense-tracker-331a1",
  storageBucket: "expense-tracker-331a1.appspot.com",
  messagingSenderId: "431049212735",
  appId: "1:431049212735:web:7d31b6db2a8db60458c98a",
  measurementId: "G-6M0SW30JDJ",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
