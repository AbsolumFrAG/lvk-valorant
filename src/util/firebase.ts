// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlIrS5tIXuYYlgiRa5F3JnH17W3oTrAXQ",
  authDomain: "valorant-tracker-8a9aa.firebaseapp.com",
  projectId: "valorant-tracker-8a9aa",
  storageBucket: "valorant-tracker-8a9aa.appspot.com",
  messagingSenderId: "1095404988764",
  appId: "1:1095404988764:web:ae911ca3d344aeb3433999"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
    auth,
    db
};