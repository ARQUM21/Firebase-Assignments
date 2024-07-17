// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut  } from   "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

import{ getDatabase, ref, set, get, child}  from  "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js"
    // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUdDvVMp6mtXYbwZs0gd3SEe5dQGT1G88",
  authDomain: "fir-authentication-692d2.firebaseapp.com",
  projectId: "fir-authentication-692d2",
  storageBucket: "fir-authentication-692d2.appspot.com",
  messagingSenderId: "522018789592",
  appId: "1:522018789592:web:6e622b59c1f4de90925fad",
  measurementId: "G-JL29Y9M86P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("app", app);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getDatabase(app)

var username = document.getElementById("username");
var email_signup = document.getElementById("email");
var password_signup = document.getElementById("password");
var btn_signup = document.getElementById("signup_btn");

var email_login = document.getElementById("email_login");
var password_login = document.getElementById("password_login");
var login_btn = document.getElementById("login_btn");

var logout_btn = document.getElementById("logout_btn");
var auth_container = document.getElementById("auth_container");
var user_container = document.getElementById("user_container");
var user_email = document.getElementById("user_email");

onAuthStateChanged(auth, (user) => {
  if (user) {
    auth_container.style.display = "none";
    user_container.style.display = "block";
    user_email.innerText = user.email;
    console.log("User is signup=>", user);
    const uid = user.uid;
  } else {
    console.log("User is log out =>");
    // User is signed out
    auth_container.style.display = "block";
    user_container.style.display = "none";
    // ...
  }
});



btn_signup.addEventListener("click", () => {
    const user_data = {
      username: username.value,
      email: email_signup.value,
      password: password_signup.value
    };
    set(ref(db, 'users/' + username.value), user_data)

    createUserWithEmailAndPassword(
      auth,
      email_signup.value,
      password_signup.value
    )

   .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      console.log("user=>", user);
      auth_container.style.display = "block";
      user_container.style.display = "none";
      
      //...
    })
   .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error->", errorCode, errorMessage);
      alert(errorMessage);
      //..
    });
  });



login_btn.addEventListener("click", () => {
  signInWithEmailAndPassword(auth, email_login.value, password_login.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      email_login.value = "";
      password_login.value = "";
      console.log("user after login=>", user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
});




logout_btn.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
});

const isUser = false;

if (isUser) {
    console.log('user', user)
} else if (isUser == false){}
