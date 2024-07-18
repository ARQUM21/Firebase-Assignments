 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
 import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
   apiKey: "AIzaSyBUdDvVMp6mtXYbwZs0gd3SEe5dQGT1G88",
   authDomain: "fir-authentication-692d2.firebaseapp.com",
   databaseURL: "https://fir-authentication-692d2-default-rtdb.firebaseio.com",
   projectId: "fir-authentication-692d2",
   storageBucket: "fir-authentication-692d2.appspot.com",
   messagingSenderId: "522018789592",
   appId: "1:522018789592:web:6e622b59c1f4de90925fad",
   measurementId: "G-JL29Y9M86P"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app);
 const db = getFirestore(app);
let numbersCollection = collection(db, "numbers");
let todosCollection = collection(db, "todos");


const todo_input = document.getElementById("todo_input");
const add_todo = document.getElementById("add_todo");
const todo_list =document.getElementById("todo_list");


add_todo.addEventListener('click', addTodoToDb);

async function addTodoToDb(){
    try{
        const obj = 
        {
            todo: todo_input.value,
            createAt : new Date().toISOString(),
        };
        const docRef = await addDoc(todosCollection, obj);
        console.log("Todo addad", docRef);
        getTodoFromDb();
        todo_input.value = "";
        //    todo_list.innerHTML += `<li class="list-group-item">${doc.data().value}</li>`
    }
    catch(e){
     console.log(e)
    }
}

getTodoFromDb();

async function getTodoFromDb(){
    try{
        const querySnapshot = await getDocs(todosCollection);
        todo_list.innerHTML = ''
        querySnapshot.forEach((doc) => {
            console.log("Doc=>", doc.id);
            console.log("data=>", doc.data);
            const { todo, createAt }= doc.data();
            const ele = `<li class="list-group-item" id = ${doc.id} > ${todo} ▌│║▌║▌║║▌║▌│ ▌   ${new Date(createAt).toLocaleString()} </li>`
            todo_list.innerHTML += ele;
            });
        todo_list.childNodes.forEach((li) => li.addEventListener('click', deleteTodo)
            
        );
          
    }
    catch(e){
        console.log(e);
    }
}



async function deleteTodo(){
    try{
        const docId = this.id;
        const docCollection = doc(db, "todos", docId);
        const docRef = await deleteDoc(docCollection );
        getTodoFromDb();
        console.log("Document deleted =>", docRef);

    }
    catch(e){
        console.log(e);
    }
}

