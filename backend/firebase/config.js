// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6JnbIyCxoZfLd_spKFBzgfH2aWnEBjDk",
  authDomain: "usermanagement-d7484.firebaseapp.com",
  projectId: "usermanagement-d7484",
  storageBucket: "usermanagement-d7484.appspot.com",
  messagingSenderId: "908584226152",
  appId: "1:908584226152:web:940be8dabdf4840bf09add",
  measurementId: "G-T1914M63B6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);