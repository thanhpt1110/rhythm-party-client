// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDM8OQFO6rrCVUmZHqXWMpXj2Cp37D5NZo",
  authDomain: "rythm-party.firebaseapp.com",
  projectId: "rythm-party",
  storageBucket: "rythm-party.appspot.com",
  messagingSenderId: "613991631137",
  appId: "1:613991631137:web:72d345c9a14141f9891660",
  measurementId: "G-T9MN1K6GE8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);