import {
  auth,
  db,
  signOut,
  onAuthStateChanged,
  getDoc,
  doc,
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
} from "../utils/utils.js";

let userId;
const logout_btn = document.getElementById("logout_btn");
const login_link = document.getElementById("login_link");
const user_img = document.getElementById("user_img");
const events_cards_container = document.getElementById("events_cards_container");

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;

    userId = user.uid;
    login_link.style.display = "none";
    user_img.style.display = "inline-block";
    getUserInfo(userId);
    getMyEvents(userId);
    // ...
  } else {
    login_link.style.display = "inline-block";
    user_img.style.display = "none";
  }
});

logout_btn.addEventListener("click", () => {
  signOut(auth);
});


function getUserInfo(uid) {
  const userRef = doc(db, "user", uid);
  getDoc(userRef).then((data) => {
    console.log("data=>", data.id);
    console.log("data=>", data.data());
    user_img.src = data.data().img;
  });
}

async function getMyEvents(uid) {
  try {
    const q = query(collection(db, "events"), where("createdBy", "==", uid));

    const querySnapshot = await getDocs(q);

    events_cards_container.innerHTML = "";
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);

      const events = doc.data();
      console.log("events=>", events);

      const { banner, title, location, createdByEmail,date } = events;

      const card = `<div class="bg-white shadow-lg rounded-lg overflow-hiddden">
  <img
  src=${banner}
  alt="Event Image"
  class="w-full h-48 object-cover"
  />
  <div class="p-4">
    <h2 class="text-xl font-bold mb-2">${title}</h2>
    <p class="text-gray-600 mb-2">Creator: ${createdByEmail}</p>
    <p class="text-gray-600 mb-2">Date:${date}</p>
    <p class="text-gray-600 mb-2">location: ${location}</p>
    <div class="flex justify-between items-center">
      <button  class="px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">${
        auth?.currentUser && events?.likes?.includes(auth?.currentUser.uid)
          ? "Liked.."
          : "Like"
      }${events?.likes?.length ? events?.likes?.length : ""}</button>


      <button id = ${ doc.id} onclick="deleteEvent(this)"  class="px-4 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Delete</button>
    </div>
    </div>
    </div>`;

      window.deleteEvent = deleteEvent;
      events_cards_container.innerHTML += card;
      console.log(events);
    });
  } catch (err) {
    console.log(err);
  }
}

async function deleteEvent(e) {
  console.log(e);

  const docRef = doc(db, "events", e.id);
  await deleteDoc(docRef);
  getMyEvents(userId);
}


