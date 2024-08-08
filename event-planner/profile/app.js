import {
    auth,
    storage,
    db,
    signOut,
    onAuthStateChanged,
    getDoc,
    doc,
   
} from "../utils/utils.js";
const backevent = document.getElementById("backevent");

let userId;

// Check if user is logged in
onAuthStateChanged(auth, (user) => {
    if (user) {
        userId = user.uid; // Get the logged-in user ID
        profile(userId); // Call the profile function
    } else {
        window.location.href = 'signup.html'; // Redirect to signup if not logged in
    }
});

function profile(uid) {
    const userRef = doc(db, "user", uid);
    getDoc(userRef).then((docSnap) => {
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            const data = docSnap.data();


           
            // Destructure user data
            const {
                img,
                name,
                email,
                password,
                phone,
                company,
            } = data;
            const updatedPassword = localStorage.getItem('userPassword') || '********';
            // Display user profile information
            document.getElementById('profileData').innerHTML = `
            <div class="container mx-auto p-4">
                <div class="container mx-auto mt-10 p-6 bg-white rounded-lg shadow-2xl">
                    <h1 class="text-2xl font-bold mb-4">User Profile</h1>
                    <div class="flex items-center mb-4">
                        <img id="profileImage" src="${img}" alt="Profile Image" class="w-24 h-24 rounded-full border-2 border-gray-300 object-cover mr-4">
                        <div>
                            <p class="text-lg font-semibold" id="userName">${name}</p>
                            <p class="text-gray-600" id="userEmail">${email}</p>
                        </div>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-md shadow-2xl">
                    <p class="mb-2"><strong>Password:</strong> <span id="userPassword">${password}</span></p>
                        <p class="mb-2"><strong>Phone:</strong> <span id="userPhone">${phone}</span></p>
                        <p class="mb-2"><strong>Company:</strong> <span id="userCompany">${company}</span></p>
                    </div>
                </div>
                </div>
            `;
        } else {
            console.log("No such document!");
        }
    }).catch((error) => {
        console.error("Error getting document:", error);
    });
}

backevent.addEventListener('click', function(e) {
    e.preventDefault(); 
    window.location.href = "../event-planner/index.html";
  });


  

  
