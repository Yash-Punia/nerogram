import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAUOJ0H5n2AJakAcbv-pfoVsd1IeKKlzd4",
    authDomain: "nerogram-644ca.firebaseapp.com",
    projectId: "nerogram-644ca",
    storageBucket: "nerogram-644ca.appspot.com",
    messagingSenderId: "421332415608",
    appId: "1:421332415608:web:ab66c7a6023254dab3e98d"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore(); //database 
const auth = firebase.auth(); //authentication
const storage = firebase.storage(); //for storing the images
const provider = new firebase.auth.GoogleAuthProvider();

export {db, auth, provider, storage};