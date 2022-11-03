// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
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
export default app;
//initialize firebase storage - we initialize storage and auth in the file so that
//the app does not try to initialize them else were before initializeApp happens
export const storage = getStorage();
//intialize firebase auth
export const auth = getAuth();
