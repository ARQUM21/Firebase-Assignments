// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import { 
  getAuth, 
  onAuthStateChanged,  
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updatePassword ,
    } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { 
  getFirestore, 
  doc, 
  setDoc,
  getDoc,
  getDocs,
  collection,
  addDoc,
  updateDoc, 
  arrayUnion, 
  arrayRemove, 
  query, 
  where,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { 
  getStorage, 
  ref,  
  uploadBytes, 
  getDownloadURL,  } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js";



  const firebaseConfig = {
    apiKey: "AIzaSyBUdDvVMp6mtXYbwZs0gd3SEe5dQGT1G88",
    authDomain: "fir-authentication-692d2.firebaseapp.com",
    databaseURL: "https://fir-authentication-692d2-default-rtdb.firebaseio.com",
    projectId: "fir-authentication-692d2",
    storageBucket: "fir-authentication-692d2.appspot.com",
    messagingSenderId: "522018789592",
    appId: "1:522018789592:web:6e622b59c1f4de90925fad",
    measurementId: "G-JL29Y9M86P"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// const analytics = getAnalytics(app);


export { auth,
  getAuth,
   db,
  storage, 
  onAuthStateChanged, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, 
  updatePassword ,
  doc, 
  setDoc,
  ref,  
  uploadBytes, 
  getDownloadURL,
  signOut,
  getDoc,
  collection,
  addDoc, 
  getDocs,
  updateDoc, 
  arrayUnion, 
  arrayRemove,
  query, 
  where,
  deleteDoc,
};