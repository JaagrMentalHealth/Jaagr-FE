// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFwvJqaoNIpSZfiARrdkcMe9Z4pHRcmsw",
  authDomain: "myblogproject-b66dd.firebaseapp.com",
  projectId: "myblogproject-b66dd",
  storageBucket: "myblogproject-b66dd.firebasestorage.app",
  messagingSenderId: "160655501593",
  appId: "1:160655501593:web:de5edf2f0b1e5977a9bd88",
  measurementId: "G-DECK7P3V66"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);