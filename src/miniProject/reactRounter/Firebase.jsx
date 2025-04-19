// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlV5HXw9B5mk4dBHRnwWO_aFanF-NLvKk",
  authDomain: "todo-authentication-3f47d.firebaseapp.com",
  projectId: "todo-authentication-3f47d",
  storageBucket: "todo-authentication-3f47d.firebasestorage.app",
  messagingSenderId: "501715733331",
  appId: "1:501715733331:web:d4592fda8fce84c0bb2fa6",
  measurementId: "G-Q499HYDG47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);

export const auth = getAuth(app);


