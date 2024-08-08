import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB6RI-b-91E_sS7rsmIq8mRZVl2qHPOuf4",
    authDomain: "anteia-db.firebaseapp.com",
    projectId: "anteia-db",
    storageBucket: "anteia-db.appspot.com",
    messagingSenderId: "253082058484",
    appId: "1:253082058484:web:56486ab70fa27360c7a8a1",
    measurementId: "G-DX85C4L2WS"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

//Database
export const db = getFirestore(app);

//Storage
export const storage = getStorage(app);