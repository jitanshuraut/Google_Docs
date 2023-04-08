import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import {getFirestore} from"@firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCOjKdTqXTZQ8mH0xcSTpGOc4MOOqBbdeY",
    authDomain: "docs-4fcb9.firebaseapp.com",
    projectId: "docs-4fcb9",
    storageBucket: "docs-4fcb9.appspot.com",
    messagingSenderId: "408667984851",
    appId: "1:408667984851:web:ff99b95030f8bf1a2b9526",
    measurementId: "G-GK77RM8ZCZ"
  };
  
  const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db=getFirestore(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const name = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;
console.log(profilePic)
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("profilePic", profilePic);
    })
    .catch((error) => {
      console.log(error);
    });
};
  