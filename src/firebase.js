// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA302fzNX0N9f0D2xuN9_Av1Qt6u7jqHBM",
  authDomain: "silhouette-b33cd.firebaseapp.com",
  projectId: "silhouette-b33cd",
  storageBucket: "silhouette-b33cd.appspot.com",
  messagingSenderId: "228886845440",
  appId: "1:228886845440:web:99cc7f5efdc015d135e0e5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
