// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyBIiluUemUd_45lenKHelO4JLDeoW8vQjg",
  authDomain: "user-authentication-details.firebaseapp.com",
  projectId: "user-authentication-details",
  storageBucket: "user-authentication-details.appspot.com",
  messagingSenderId: "489588894413",
  appId: "1:489588894413:web:dcd6183e77357216141784",
  measurementId: "G-2P67BDKCD1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
// const analytics = getAnalytics(app);
export default app