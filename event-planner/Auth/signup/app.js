import{
    auth,
    createUserWithEmailAndPassword,
    doc,
    setDoc,
    db,
    storage,
    ref,  
    uploadBytes,
    getDownloadURL,
} from '../../utils/utils.js';


const signup_btn = document.getElementById("signup_form");
const submit_btn = document.getElementById("submit_btn");

signup_btn.addEventListener('submit', function(e){
    e.preventDefault(); 
    console.log(e);
     

    const img = e.target[0].files[0];
    const name = e.target[1].value;
    const email = e.target[2].value;
    const password = e.target[3].value;
    const phone = e.target[4].value;
    const company = e.target[5].value;
    

    console.log(e.target)

    const userInfo = {
        img,
        name,
        email,
        password,
        phone,
        company,

    };
 
//create Account
submit_btn.disabled = true
submit_btn.innerText = 'loading...'
    createUserWithEmailAndPassword(auth, email, password)
    .then((user) => {
     console.log("user=>", user.user.uid);
     
     //upload image
     const userRef = ref(storage, `user/${user.user.uid}`)
     uploadBytes(userRef, img)
     .then(() => {
        console.log('user image uploaded')
    //getting url of the image  we just uploaded
        getDownloadURL(userRef)
        .then((url) =>{
            console.log('user image url', url);
           //update user info object
            userInfo.img = url
            //created user document reference
            const userDbRef = doc(db, 'user', user.user.uid);


            //set this document to db
            setDoc(userDbRef, userInfo).then(() => {
                console.log("user object updated into Db");
                window.location.href = "../../index.html";
                submit_btn.disabled = false;
                submit_btn.innerText = "submit";
            });
        })
        .catch((err) => console.log('url firebase ni de rha'));

        submit_btn.disabled = false;
        submit_btn.innerText = "submit";
        })

     .catch(() =>{
        console.log('user image not uploaded');
        submit_btn.disabled = false;
        submit_btn.innerText = "submit";
     });

    })
    .catch((err) => {
        console.log(err),   (submit_btn.disabled = false);
        submit_btn.innerText = "submit"; });
    
    
    
    
    
    console.log(userInfo);



});