import {
  auth,
  storage,
  db,
  signOut,
  onAuthStateChanged,
  getDoc,
  doc,
  getDocs,
  collection,
  
} from "../utils/utils.js";

const backevent = document.getElementById("backevent");

// Function to fetch and display all events
async function displayAllEvents(uid) {
  try {
    const docRef = doc(db, 'events', uid)
    const querySnapshot = await getDoc(docRef);

    const eventsContainer = document.getElementById('Event_details_form');
    Event_details_form.innerHTML = ''; // Clear previous content
    const event = querySnapshot.data()
      
      const { banner, title, location, registration, desc, time, date } = event;

      // Create an HTML structure for each event
      const eventCard = `
       <div class="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-2xl">
        
        <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">Event Details</h1>

        <!-- Event Image -->
        <div class="mb-6 flex justify-center">
          <img src="${banner}" alt="Event Image" style="width: 50%; height: auto; object-fit: contain;" class="rounded-lg shadow-md">
        </div>

        <div class="mb-4 p-4 border rounded-lg shadow-sm bg-gray-50">
          <h2 class="text-xl font-semibold text-gray-800">Event Title:</h2>
          <p class="text-gray-700">${title}</p>
        </div>

        <div class="mb-4 p-4 border rounded-lg shadow-sm bg-gray-50">
          <h2 class="text-xl font-semibold text-gray-800">Event Description:</h2>
          <p class="text-gray-700">${desc}</p>
        </div>

        <div class="mb-4 p-4 border rounded-lg shadow-sm bg-gray-50">
          <h2 class="text-xl font-semibold text-gray-800">Event Location:</h2>
          <p class="text-gray-700">${location}</p>
        </div>

        <div class="mb-4 p-4 border rounded-lg shadow-sm bg-gray-50">
          <h2 class="text-xl font-semibold text-gray-800">Event Date:</h2>
          <p class="text-gray-700">${date}</p>
        </div>

        <div class="mb-4 p-4 border rounded-lg shadow-sm bg-gray-50">
          <h2 class="text-xl font-semibold text-gray-800">Event Time:</h2>
          <p class="text-gray-700">${time}</p>
        </div>

        <div class="mb-4 p-4 border rounded-lg shadow-sm bg-gray-50">
          <h2 class="text-xl font-semibold text-gray-800">Registration Link:</h2>
          <a href="${registration}" class="text-blue-500 hover:underline" target="_blank">Register Here</a>
        </div>

       
    </div>

      `;
      // Append the event card to the container
      Event_details_form.innerHTML += eventCard;

    // });

  } catch (error) {
    console.error("Error fetching events:", error);
    console.log("Error fetching events. Please try again.");
  }
}

// Call the function to display all events on page load
displayAllEvents(localStorage.getItem('eventId'));


      backevent.addEventListener('click', function(e) {
        e.preventDefault(); 
        window.location.href = "../index.html";
      });
