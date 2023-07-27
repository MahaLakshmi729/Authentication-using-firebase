// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqpzQZ7KTwY_yUUfGDWlqhDq2gem1h4tU",
  authDomain: "principal-sonar-383615.firebaseapp.com",
  projectId: "principal-sonar-383615",
  storageBucket: "principal-sonar-383615.appspot.com",
  messagingSenderId: "584678863335",
  appId: "1:584678863335:web:e48fe3403b09ed51020d42",
  measurementId: "G-WZ62G5CZKM"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);