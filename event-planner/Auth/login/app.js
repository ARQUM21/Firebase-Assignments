import{
    auth,
    signInWithEmailAndPassword,
   
} from '../../utils/utils.js';


const login_form = document.getElementById("login_form");


login_form.addEventListener('submit', function(e){
    e.preventDefault(); 
     
    const email = e.target[0].value.trim();
    const password = e.target[1].value;
    console.log("email", email)
    console.log("password", password )

    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const user = userCredential.user;
        // Capture the logged-in user's email
        const loggedInEmail = user.email;
        // Store it in a global variable or sessionStorage
        localStorage.setItem('loggedInEmail', loggedInEmail);
        
        location.href='../../index.html';
    })
    .catch((err) => {
        console.error("Login failed:", err);
        if (err.code === 'auth/user-not-found') {
            alert("This email is not registered. Please sign up first.");
        } else {
            alert("Login failed. Please check your email and password.");
        }
    });
});




    