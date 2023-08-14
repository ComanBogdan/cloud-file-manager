// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "cloud-file-6fea5.firebaseapp.com",
  projectId: "cloud-file-6fea5",
  storageBucket: "cloud-file-6fea5.appspot.com",
  messagingSenderId: "198678283118",
  appId: "1:198678283118:web:cba3a26f4cd1abf86a777f",
  measurementId: "G-DZHZP4N0NH"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const app = initializeApp(firebaseConfig)