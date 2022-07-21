
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyB569WIwO7d8A19nlWprPYu84gpz5uPoB4",
    authDomain: "fir-auth-673f8.firebaseapp.com",
    projectId: "fir-auth-673f8",
    storageBucket: "fir-auth-673f8.appspot.com",
    messagingSenderId: "914472665469",
    appId: "1:914472665469:web:ad02c09e636b2d3aa08c14"
  };

  
export const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app)
export const db = getFirestore(app);