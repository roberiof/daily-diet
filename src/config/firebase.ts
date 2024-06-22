import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD7nS8uZTEZN3HjgJwaHZayBxugs5WF9XY",
  authDomain: "daily-diet-cb60a.firebaseapp.com",
  projectId: "daily-diet-cb60a",
  storageBucket: "daily-diet-cb60a.appspot.com",
  messagingSenderId: "887621337625",
  appId: "1:887621337625:web:b291b473b428fc93d02088",
  measurementId: "G-2VPCS6RVT1"
};

const app = initializeApp(firebaseConfig);
getAuth(app);
getFirestore(app);

export default app;
