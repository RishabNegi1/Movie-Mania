import { initializeApp } from "firebase/app";
import {getFirestore, collection} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCfPRpR2uwPyJnu2CkTzpQSpt9hIQZzs8c",
  authDomain: "moviemania-9b57b.firebaseapp.com",
  projectId: "moviemania-9b57b",
  storageBucket: "moviemania-9b57b.appspot.com",
  messagingSenderId: "567072153404",
  appId: "1:567072153404:web:0bebd72b166a7ac9f38839"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const moviesRef = collection(db, 'movies');
export const usersRef = collection(db, 'users');
export const reviewsRef = collection(db, 'reviews');
export default app;