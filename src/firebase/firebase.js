// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1C5R_2hMRakoe0TAPeKDcdV-8sYNueVk",
  authDomain: "graduation-project-653fb.firebaseapp.com",
  projectId: "graduation-project-653fb",
  storageBucket: "graduation-project-653fb.firebasestorage.app",
  messagingSenderId: "886776938088",
  appId: "1:886776938088:web:b407382275ef9d1061c5dd",
  measurementId: "G-NXDC8C8J65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export default app
