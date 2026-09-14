// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBILqAmJrcIjRf6MQOpcmOaDGr1NszHnO8",
  authDomain: "netflix-gpt-e30aa.firebaseapp.com",
  projectId: "netflix-gpt-e30aa",
  storageBucket: "netflix-gpt-e30aa.firebasestorage.app",
  messagingSenderId: "684583094631",
  appId: "1:684583094631:web:1c2b0560543ca8d8c187c2",
  measurementId: "G-SGDB9LYYER"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);