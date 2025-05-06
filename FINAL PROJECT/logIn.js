// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
  signOut
} from "https://cdnjs.cloudflare.com/ajax/libs/firebase/11.1.0/firebase-auth.min.js";


const firebaseConfig = {
  apiKey: "AIzaSyBsT17gw5Zmv9vPsc-uNZyTy1zLOhBJMUE",
  authDomain: "learn-72898.firebaseapp.com",
  projectId: "learn-72898",
  storageBucket: "learn-72898.firebasestorage.app",
  messagingSenderId: "501969319193",
  appId: "1:501969319193:web:97f781903b654e5ffd8188"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
let auth = getAuth(app);
const provider = new GoogleAuthProvider();


document.addEventListener("DOMContentLoaded", () => {
  const googleBtn = document.getElementById("googleBtn");
  googleBtn.addEventListener("click", async () => {
    try {
      await signOut(auth);
      signInWithGoogle();
    } catch (error) {
      console.error("Error during authentication process:", error);
    }
  });
})

const authSection = document.querySelector('#auth-section');
const appContent = document.querySelector('#app-content');
const logoutBtn = document.querySelector('#logout-btn');

onAuthStateChanged(auth, (user) => {
  if (user) {

    authSection.style.display = 'none';
    appContent.style.display = 'block';
    logoutBtn.style.display = 'block';
  } else {

    authSection.style.display = 'block';
    appContent.style.display = 'none';
    logoutBtn.style.display = 'none';
  }
});


document.querySelector('#signup-btn').addEventListener('click', async () => {
  const email = document.querySelector('#signup-email').value;
  const password = document.querySelector('#signup-password').value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert('Signup successful!');
  } catch (error) {
    alert(error.message);
  }
});


document.querySelector('#login-btn').addEventListener('click', async () => {
  const email = document.querySelector('#login-email').value;
  const password = document.querySelector('#login-password').value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert('Login successful!');
  } catch (error) {
    alert(error.message);
  }
});


logoutBtn.addEventListener('click', async () => {
  try {
    await signOut(auth);
    alert('Logout successful!');
  } catch (error) {
    alert(error.message);
  }
});

function signInWithGoogle() {
  signInWithRedirect(auth, provider);
}