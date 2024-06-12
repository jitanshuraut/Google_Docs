import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import axios from "axios";

const firebaseConfig = {
  apiKey: "AIzaSyA3Y0LFkfzOgK5kAsMX_5Al9HmQDja5nKA",
  authDomain: "docv3-a4f69.firebaseapp.com",
  projectId: "docv3-a4f69",
  storageBucket: "docv3-a4f69.appspot.com",
  messagingSenderId: "636478887843",
  appId: "1:636478887843:web:92e85f91b0643a3b482c16",
  measurementId: "G-VSSMF1M6WP",
};

// http://localhost:3000/
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const name = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;
      alert(`${name} ${email}`);

     
      console.log(profilePic);
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("profilePic", profilePic);
    })
    .catch((error) => {
      console.log(error);
    });
};
