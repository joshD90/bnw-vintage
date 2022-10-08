// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "blackandwhitevintage-e228d.firebaseapp.com",
  projectId: "blackandwhitevintage-e228d",
  storageBucket: "blackandwhitevintage-e228d.appspot.com",
  messagingSenderId: "365956559338",
  appId: "1:365956559338:web:33069dd3645a3c783b8293",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage();
export default storage;
