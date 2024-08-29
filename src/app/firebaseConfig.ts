// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { FirebaseOptions } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2SfEOtgwdpBWjWI-zZg-gZsUzA9N3jvw",
  authDomain: "d-modelshop.firebaseapp.com",
  projectId: "d-modelshop",
  storageBucket: "d-modelshop.appspot.com",
  messagingSenderId: "747531117937",
  appId: "1:747531117937:web:6fed58db7232c899fe82d0",
  measurementId: "G-6FZLMXNL4L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export { firebaseConfig, app };
