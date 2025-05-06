import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyB2NBfJuwuFI2gabl3KppJyf8PC0wDqDpc",
    authDomain: "favorites-716d6.firebaseapp.com",
    projectId: "favorites-716d6",
    storageBucket: "favorites-716d6.firebasestorage.app",
    messagingSenderId: "79630871536",
    appId: "1:79630871536:web:ae298defa17cf3cc090b35",
    measurementId: "G-D6DS6FG6C7"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();


import { getAuth, createUserWithEmailAndPassword, signInWithRedirect, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", () => {
  let nameInput = document.getElementById("name");
  let emailInput = document.getElementById("email");
  let messageInput = document.getElementById("message");
  const sendMessage = document.getElementById("sendMessage");
  const googleBtn = document.getElementById("googleBtn");


  async function saveDBData() {
    try {
      await addDoc(collection(db, "products"), {
        userName: nameInput.value,
        message: messageInput.value,
      });
      alert("Message saved successfully!");
    } catch (error) {
      console.error("Error saving message:", error);
    }
  }


  function createUserWithEmail() {
    const email = emailInput.value;
    const password = messageInput.value;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User created with email:", user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error creating user:", errorCode, errorMessage);
      });
  }

  function signInWithGoogle() {
    signInWithRedirect(auth, provider);
  }


  sendMessage.addEventListener("click", (event) => {
    saveDBData();
    createUserWithEmail();
    alert("thank you!");
  });

});  