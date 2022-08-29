// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKQtDUzlj36DPsdYR1yCwYrgg3r1XKv0A",
  authDomain: "trip-c2e12.firebaseapp.com",
  projectId: "trip-c2e12",
  storageBucket: "trip-c2e12.appspot.com",
  messagingSenderId: "655197446375",
  appId: "1:655197446375:web:76ef63a84aef0c4b040242",
  measurementId: "G-G8Q2J4RH28",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore();
export const storage = getStorage();
export const auth = getAuth();
