import {
    ref,
    storage,
    uploadBytes,
    getDownloadURL,
    db,
    collection,
    addDoc,
    auth,
} from '../utils/utils.js';

console.log("auth=>", auth);

const event_form = document.getElementById("event_form");

event_form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(e);
    // Additional validation for event information
    const banner = e.target[0].files[0]; // Assuming the banner is the first input
    const title = e.target[1].value;
    const desc = e.target[2].value;
    const registration = e.target[3].value;
    const location = e.target[4].value;

    // Check if all required fields are filled
    if (!banner || !title || !desc || !registration || !location) {
        alert('Please fill in all the required fields.');
        return; // Stop the event creation if any field is incomplete
    }

    // Prepare event info
    const eventInfo = {
        banner: banner,
        title: title,
        desc: desc,
        registration: registration,
        location: location,
        date: `${day}-${month}-${year}`, // Combined date
        time: `${hours}:${minutes} ${ampm}`, // Combined time
        createdBy: auth.currentUser.uid, // User ID
        createdByEmail: auth.currentUser.email, // User Email
        likes: [],
    };

    // Time validation
    const hours = document.getElementById('hours').value;
    const minutes = document.getElementById('minutes').value;
    const ampm = document.getElementById('ampm').value;

    // Check if time is complete
    if (!hours || !minutes || !ampm) {
        alert('Please select a complete time.');
        return; // Stop the event creation if time is incomplete
    }

    const day = document.getElementById('day').value;
    const month = document.getElementById('month').value;
    const year = document.getElementById('year').value;

    // Check if date is complete
    if (!day || !month || !year) {
        alert('Please select a complete date.');
        return; // Stop the event creation if date is incomplete
    }

    




    console.log("eventInfo=>", eventInfo);

    const imgRef = ref(storage, eventInfo.banner.name);
    uploadBytes(imgRef, eventInfo.banner).then(() => {
        console.log("file uploaded");

        getDownloadURL(imgRef).then((url) => {
            console.log("file url=>", url);
            eventInfo.banner = url;

            // Add document to events collection
            const eventCollection = collection(db, "events");
            addDoc(eventCollection, eventInfo).then(() => {
                console.log('Document Added');
                // Redirect or notify the user after successful event creation
                window.location.href = '../index.html';
            });
        });
    });
});

