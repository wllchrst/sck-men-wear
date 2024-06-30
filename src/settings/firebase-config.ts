// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "sckmenwear.firebaseapp.com",
  projectId: "sckmenwear",
  storageBucket: "sckmenwear.appspot.com",
  messagingSenderId: "609475332974",
  appId: "1:609475332974:web:d3fd7eab24bc4491c3cf7f",
  measurementId: "G-X9H19JMNG4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const db = getFirestore(app);

const promotionCollection = collection(db, "promotion");
const productCollection = collection(db, "product");
const categoryCollection = collection(db, "category");
const userCollection = collection(db, "user");
const chatWithAdminCollection = collection(db, "chatWithAdmin");

export {
  app,
  storage,
  promotionCollection,
  productCollection,
  categoryCollection,
  userCollection,
  chatWithAdminCollection,
};
