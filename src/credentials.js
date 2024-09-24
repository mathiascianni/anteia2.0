import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, updateEmail, updateProfile } from "firebase/auth";
import { collection, query, onSnapshot, deleteDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getDatabase, update } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB6RI-b-91E_sS7rsmIq8mRZVl2qHPOuf4",
  authDomain: "anteia-db.firebaseapp.com",
  projectId: "anteia-db",
  storageBucket: "anteia-db.appspot.com",
  messagingSenderId: "253082058484",
  appId: "1:253082058484:web:56486ab70fa27360c7a8a1",
  measurementId: "G-DX85C4L2WS"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage = getStorage();
export const firestore = getFirestore(app);

// Recupera datos del usuario por ID desde Firestore
export async function getUserById(userId) {
  if (!userId) {
    console.error('getUserById: userId es undefined o null');
    return null;
  }
  
  try {
    const userRef = doc(firestore, 'users', userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      return { id: userDoc.id, ...userDoc.data() };
    } else {
      console.log('No se encontró ningún usuario con el ID especificado:', userId);
      return null;
    }
  } catch (error) {
    console.error('Error al obtener usuario por ID:', error);
    throw error;
  }
}

// Cambia el estado de una insignia especificada para un usuario
export const completeBadges = async (userId, badgeName) => {
  try {
    const userRef = doc(firestore, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      const currentStatus = userData.badges && userData.badges[badgeName];

      await updateDoc(userRef, {
        name: badgeName,
        status: !currentStatus
      });

      console.log(`Insignia '${badgeName}' actualizada a ${!currentStatus}.`);
    } else {
      console.log("No se encontró el documento del usuario.");
    }
  } catch (error) {
    console.error("Error al actualizar la insignia:", error);
  }
};

// Cambia la condición de un juego en un índice específico en el array de juegos del usuario
export const changeGameCondition = async (userId, gameIndex) => {
  try {
    const userRef = doc(firestore, 'users', userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      const gamesArray = userData.games;

      if (Array.isArray(gamesArray)) {
        if (gamesArray[gameIndex]) {
          const currentCondition = gamesArray[gameIndex].condition;

          const updatedGamesArray = [...gamesArray];
          updatedGamesArray[gameIndex] = {
            ...updatedGamesArray[gameIndex],
            condition: !currentCondition
          };

          await updateDoc(userRef, {
            games: updatedGamesArray
          });

          console.log(`Condición del juego en la posición ${gameIndex} actualizada a ${!currentCondition}.`);
        } else {
          console.log(`No se encontró un juego en la posición ${gameIndex}.`);
        }
      } else {
        console.log('El campo "games" no es un array.');
      }
    } else {
      console.log('No se encontró el documento del usuario.');
    }
  } catch (error) {
    console.error('Error al actualizar la condición del juego:', error);
    throw error;
  }
};

// Actualiza el perfil de usuario en Firestore
export const updateUserProfile = async (userId, userData) => {
  try {
    const userRef = doc(firestore, 'users', userId);
    await setDoc(userRef, userData, { merge: true });
    console.log('Perfil de usuario actualizado exitosamente en Firestore!');
  } catch (error) {
    throw new Error('Error al actualizar el perfil de usuario en Firestore:', error);
  }
};

// Actualiza el perfil del usuario en Firebase Authentication
export const updateAuthUserProfile = async (displayName, photoURL, email) => {
  const auth = getAuth();
  console.log(auth.currentUser);
  try {
    await updateProfile(auth.currentUser, {
      displayName,
      photoURL,
    });
    //await updateEmail(auth.currentUser, email);  hay que verificar el email 
    console.log('Perfil de usuario actualizado exitosamente en Firebase Authentication!');
  } catch (error) {
    throw new Error('Error al actualizar el perfil de usuario en Firebase Authentication:', error);
  }
};

// Sube un archivo a Firebase Storage y actualiza la URL de la foto de perfil del usuario en Firestore
export async function uploadFile(file, userId) {
  const storageRef = ref(storage, `users/${userId}/profile.png`);
  const snapshot = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);
  console.log(downloadURL);
  await setDoc(doc(firestore, 'users', userId), { photoURL: downloadURL }, { merge: true });
}

// Recupera datos de una tabla específica de Firestore
export async function getDataDB(table) {
  const q = query(collection(firestore, table));

  try {
    return new Promise((resolve) => {
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const array = [];
        querySnapshot.forEach((doc) => {
          array.push({ ...doc.data(), id: doc.id });
        });
        resolve(array);
      });
    });
  } catch (error) {
    console.error('Error en la operación de Firestore:', error);
    throw error;
  }
}

// Agrega datos a un array en un documento de usuario en Firestore, verificando si el juego ya existe
export const addDataArrayDB = async (data, path) => {
  const auth = getAuth();
  const userId = auth.currentUser.uid;
  const userRef = doc(firestore, 'users', userId);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    throw new Error('El documento del usuario no existe');
  }

  const user = await getUserById(userId);
  console.log(user);

  const existingGames = user.games || [];

  const gameExists = existingGames.some(game => game.uid === data.uid);

  if (gameExists) {
    console.log('El juego ya existe en el array de juegos del usuario.');
    return;
  }

  const newData = {
    uid: data.uid,
    icon: data.icon,
    title: data.title,
    condition: false
  };

  await updateDoc(userRef, {
    [`${path}`]: arrayUnion(newData)
  });

  console.log('Juego agregado exitosamente al array de juegos del usuario.');
};

// Elimina un documento de una ruta específica en Firestore
export const deleteDataDB = async (path) => {
  try {
    await deleteDoc(doc(firestore, path));
  } catch (error) {
    console.error('Error al eliminar datos:', error);
  }
};

// Obtiene la URL de la imagen de perfil de usuario desde Firebase Storage
export function getUserProfileImageURL(userId) {
  const storageRef = ref(storage, `users/${userId}/profile.png`);
  return getDownloadURL(storageRef);
}


export async function getGameById(gameId) {
  try {
    const gameRef = doc(firestore, 'games', gameId);
    const gameDoc = await getDoc(gameRef);

    if (gameDoc.exists()) {
      return { id: gameDoc.id, ...gameDoc.data() };
    } else {
      console.log('No se encontró ningún juego con el ID especificado.');
      return null;
    }
  } catch (error) {
    console.error('Error al obtener juego por ID:', error);
    throw error;
  }
}