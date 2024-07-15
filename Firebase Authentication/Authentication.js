
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
  import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut  } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
  
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
  const analytics = getAnalytics(app);
  const auth = getAuth(app);


  const signup_email = document.getElementById("signup_email");
  const signup_password = document.getElementById("signup_password");
  const signup_button = document.getElementById("signup_btn");
  const signin_email = document.getElementById("signin_email");
  const signin_password = document.getElementById("signin_password");
  const signin_button = document.getElementById("signin_btn");

  const auth_container = document.getElementById("auth_container");
  const user_container = document.getElementById("user_container");
  const user_email = document.getElementById("user_email");
  const logout_btn = document.getElementById("logout");
  

  signup_button.addEventListener("click", createUserAccount);
  signin_button.addEventListener("click", signIn);
  logout_btn.addEventListener("click", logout)

  onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("user is logged in")
        const uid = user.uid;
        auth_container.style.display = "none";
        user_container.style.display = "block";
        user_email.innerText = user.email;
    } else {
        console.log("user is not logged in")
        auth_container.style.display = "block";
        user_container.style.display = "none";
        
    }
  });
  

  


  function createUserAccount(){

    createUserWithEmailAndPassword(auth, signup_email.value, signup_password.value)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
    // console.log("email=>", signup_email.value);
    // console.log("pasword=>", signup_password.value);
  }


  function signIn(){

    signInWithEmailAndPassword(auth, signin_email.value, signin_password.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("user");
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
  });
//    console.log("email=>", signin_email.value);
//     console.log("pasword=>", signin_password.value);
  }

  function logout(){
    const auth = getAuth();
signOut(auth).then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});
  }
