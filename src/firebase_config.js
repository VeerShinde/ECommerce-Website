// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgfDgZqYt2X9-VsgxCIxtlZ17SlX0vX8c",
  authDomain: "ecommerce-7e716.firebaseapp.com",
  projectId: "ecommerce-7e716",
  storageBucket: "ecommerce-7e716.appspot.com",
  messagingSenderId: "474602136226",
  appId: "1:474602136226:web:e57c9e6a20703bd4f9edfb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const database = getFirestore(app); 