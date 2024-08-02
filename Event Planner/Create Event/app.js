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
console.log("auth=>",auth);

const event_form = document.getElementById("event_form" );

event_form.addEventListener('submit', (e) =>{
    e.preventDefault();
    console.log(e);

    const eventInfo = {
        banner: e.target[0].files[0],
        title: e.target[1].value,
        desc: e.target[2].value,
        registration: e.target[3].value,
        location: e.target[4].value,
        date: e.target[5].value,
        time: e.target[6].value,
        createdBy: auth.currentUser.uid,
        createdByEmail: auth.currentUser.email,
        likes: [],
    };
    console.log("eventInfo=>",eventInfo);

    const imgRef = ref(storage,eventInfo.banner.name);
    uploadBytes(imgRef, eventInfo.banner).then(()=>{
        console.log("file uploaded");

        getDownloadURL(imgRef).then((url)=>{
            console.log("file url=>",url);
            eventInfo.banner = url;


            //add document to events collection

            const eventCollection = collection(db, "events")
            addDoc(eventCollection, eventInfo).then(()=>{
             console.log('Document Added');
             window.location.href = '../utils/index.html';
            });
        });
    });
    
});