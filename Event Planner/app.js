import{ auth, storage, db, signOut,onAuthStateChanged, getDoc, doc, getDocs,collection, updateDoc, arrayUnion, arrayRemove,} from "./utils/utils.js";



const logout_btn = document.getElementById("logout_btn");
const login_link = document.getElementById("login_link");
const user_img = document.getElementById("user_img");
const events_cards_container = document.getElementById("events_cards_container");
const myevents_btn = document.getElementById("myevents_btn");
const create_event_btn = document.getElementById("create_event_btn");
// console.log("auth=>", auth);
// console.log("storage=>", storage);
// console.log("db=>", db);
getAllEvents()
onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      console.log('logged in');
      
      const uid = user.uid;
      login_link.style.display = 'none';
      user_img.style.display = 'inline-block';
      logout_btn.style.display = "block";
      myevents_btn.style.display = "inline-block";
      create_event_btn.style.display = "inline-block";
      getUserInfo(uid);
      // ...
    } else {
      //  window.location.href = '../Auth/Login/index.html';
       login_link.style.display = 'inline-block';
      user_img.style.display = 'none';
      logout_btn.style.display = "none";
      myevents_btn.style.display = "none";
      create_event_btn.style.display = "none";
    }
  });

  logout_btn.addEventListener('click', ()=>{
    signOut(auth);
  });


  function getUserInfo(uid){
    const userRef = doc(db, "user", uid);
    getDoc(userRef).then((data) => {
      console.log("data=>", data.id);
      console.log("data=>", data.data());
      user_img.src = data.data().img;
      
    });
  }


async  function getAllEvents(){
    try{
      const querySnapshot = await getDocs(collection(db, "events"));
      events_cards_container.innerHTML = ''
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);

  const events = doc.data();
  console.log("events=>", events);

  const { banner, title, createdByEmail,  time, date, location,} = events;

  
  const card = `<div  class="bg-white shadow-md  rounded-lg overflow-hiddden">
  <img
  src=${banner}
  alt="Event Image"
  class="w-full h-48 object-cover"
  />
  <div class="p-4">
    <h2 class="text-xl font-bold mb-2">${title}</h2>
     <p class="text-gray-600 mb-2">Creator: ${createdByEmail}</p>
     <p class="text-gray-600 mb-2">Date: ${date}</p>
     <p class="text-gray-600 mb-2">location: ${location}</p>
    
    

    <div class="flex justify-between items-center">
      <button  id = ${doc.id}  onclick="likeEvent(this)" class="bg-blue-500 text-white px-3 py-1 rounded-md  hover:bg-blue-600">${auth?.currentUser  && events?.likes?.includes(auth?.currentUser.uid) ? "Liked.." : "Like"}${events?.likes?.length ? events?.likes?.length: ''}</button>
      <button id=${doc.id} onclick="viewEvent(this)" class="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600">View Event</button>

    </div>
    </div>
    </div>`;

    
  
    events_cards_container.innerHTML += card;
    console.log(events);
    window.likeEvent = likeEvent;
    console.log(events);


  // window.viewEvent = viewEvent;
  // console.log("Event_details_form=>", Event_details_form);

});

    }catch(err){
      console.log(err);
    }
  }


async function likeEvent(e){
  console.log(e.innerText);
  if(auth.currentUser){
    e.disabled = true;
    const docRef = doc(db, "events", e.id);
    if(e.innerText == 'Liked..'){
      updateDoc(docRef,{
        likes: arrayRemove(auth.currentUser.uid),
       
    }).then(()=> { e.innerText = 'Like';
      e.disabled = false;
     })
    .catch((err)=> console.log(err));
      
    }else{
    updateDoc(docRef,{
      likes: arrayUnion(auth.currentUser.uid),
    }).then(()=> {e.innerText ='Liked..';
      e.disabled = false;
    })
    .catch((err)=> console.log(err));
  }
}else{
    window.location.href = "../auth/login/index.html"
  }
  console.log(auth.currentUser);
}  

window.viewEvent = viewEvent;
// console.log("Event_details_form=>", Event_details_form);
async function viewEvent(e){
  console.log("Current User:", auth.currentUser); // Check the current user

  // Check if user is authenticated
  if (auth.currentUser){
    e.disabled = true; // Disable the button to prevent multiple clicks

    const eventId = e.id; // Get the event ID from the clicked element
    console.log('event id', eventId);

    // Store the event ID in local storage
    localStorage.setItem('eventId', eventId);

    // Redirect to the event page
    window.location.href = "../view Event/index.html"; 
  } else {
    // If not authenticated, redirect to the login page
    console.log("User not authenticated. Redirecting to login."); // Debug log
    window.location.href = "../auth/login/index.html";
  }
}


