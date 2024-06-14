import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB6RI-b-91E_sS7rsmIq8mRZVl2qHPOuf4",
  authDomain: "anteia-db.firebaseapp.com",
  projectId: "anteia-db",
  storageBucket: "anteia-db.appspot.com",
  messagingSenderId: "253082058484",
  appId: "1:253082058484:web:56486ab70fa27360c7a8a1",
  measurementId: "G-DX85C4L2WS"
};

export function uploadFile(file, userId) {
  const storageRef = ref(storage, `img/${userId}/profile.png`);
  uploadBytes(storageRef, file).then((snapshot) => {
    console.log(snapshot);
  });
}

export function getUserProfileImageURL(userId) {
  const storageRef = ref(storage, `img/${userId}/profile.png`); 
  return getDownloadURL(storageRef);
}

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage = getStorage();
export const firestore = getFirestore(app);
