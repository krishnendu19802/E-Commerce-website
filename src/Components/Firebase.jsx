// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1yIulid2o0AYu6nhlihNnXZy5Tj6grb4",
  authDomain: "e-com-f5ced.firebaseapp.com",
  projectId: "e-com-f5ced",
  storageBucket: "e-com-f5ced.appspot.com",
  messagingSenderId: "898964936662",
  appId: "1:898964936662:web:300258dca61fea12f53677",
  databaseUrl:'https://e-com-f5ced-default-rtdb.firebaseio.com',
  
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);