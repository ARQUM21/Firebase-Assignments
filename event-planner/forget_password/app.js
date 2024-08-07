import { 
    getAuth, 
    signInWithEmailAndPassword, 
    updatePassword, 
    doc, 
    setDoc, 
    db // Import Firestore methods
} from '../utils/utils.js';

const auth = getAuth();
const updatePasswordForm = document.getElementById("updatePasswordForm");
const emailInput = document.getElementById("email");
const oldPasswordInput = document.getElementById("oldPassword");
const newPasswordInput = document.getElementById("newPassword");
const confirmPasswordInput = document.getElementById("confirmPassword");
const messageDiv = document.getElementById("message");

updatePasswordForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    const oldPassword = oldPasswordInput.value.trim();
    const newPassword = newPasswordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    // Validate new password confirmation
    if (newPassword !== confirmPassword) {
        messageDiv.textContent = "New passwords do not match.";
        return;
    }

    try {
        // Sign in the user with their email and old password
        const userCredential = await signInWithEmailAndPassword(auth, email, oldPassword);
        const user = userCredential.user;

        // Update password
        await updatePassword(user, newPassword);
        messageDiv.textContent = "Password updated successfully!";

        // Update the password in Firestore
        const userRef = doc(db, 'user', user.uid); // Adjust collection name if necessary
        await setDoc(userRef, { password: newPassword }, { merge: true });
        console.log("Password updated in Firestore");

        // Optionally clear local storage if you were storing the password
        localStorage.removeItem('userPassword');

        // Clear inputs
        emailInput.value = "";
        oldPasswordInput.value = "";
        newPasswordInput.value = "";
        confirmPasswordInput.value = "";

    } catch (error) {
        messageDiv.textContent = "Error: " + error.message;
    }
});


