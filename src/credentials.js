import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, updateEmail, updateProfile } from "firebase/auth";
import { collection, query, onSnapshot, deleteDoc, updateDoc, arrayUnion, addDoc, orderBy, limit, arrayRemove } from 'firebase/firestore';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, uploadString, listAll } from 'firebase/storage';
import { get, getDatabase, update } from "firebase/database";
import { getDocs, where } from 'firebase/firestore';
import Push from 'push.js';


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
export const provider = new GoogleAuthProvider();
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

export const searchBadgeForName = async (badgeTitle) => {
  try {
    const badgesRef = collection(firestore, 'badges');
    const q = query(badgesRef, where('title', '==', badgeTitle));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const badge = {
        id: doc.id,
        title: doc.data().title,
        ...doc.data()
      };
      return badge;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

//Iniciar sesion con Google
export const loginWithGoogle = async () => {

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    console.log('Usuario logueado:', user);

    return user;
  } catch (error) {
    console.error('Error al iniciar sesión con Google:', error);
    throw error;
  }
};

// Cambia el estado de una insignia especificada para un usuario
export const completeBadges = async (userId, badgeName) => {
  try {
    const userRef = doc(firestore, "users", userId);
    const userSnap = await getDoc(userRef);
    const badgeData = await searchBadgeForName(badgeName);
    console.log(badgeData);

    if (!badgeData) {
      console.log(`No se encontró la insignia con el nombre: ${badgeName}`);
      return;
    }

    if (userSnap.exists()) {
      const userData = userSnap.data();
      const currentStatus = userData.badges && userData.badges[badgeData.id];
      console.log(userData.badges);

      // Verifica si userData.badges es un array o un objeto
      const badges = userData.badges || {};
      const badgeExists = Array.isArray(badges)
        ? badges.some(badge => badge.id === badgeData.id)
        : badges[badgeData.id] !== undefined;

      if (badgeExists) {
        console.log(`La insignia '${badgeName}' ya existe en el usuario.`);
        return; // Si ya existe, no hacer nada
      }

      await updateDoc(userRef, {
        [`badges.${badgeData.id}`]: badgeData
      });

      localStorage.setItem(`badgeCondition`, true);
      localStorage.setItem(`badge`, JSON.stringify(badgeData));

      console.log(`Insignia '${badgeName}' actualizada a ${!currentStatus}.`);
    } else {
      console.log("No se encontró el documento del usuario.");
    }
  } catch (error) {
    console.error("Error al actualizar la insignia:", error);
  }
};


export const ChangeCondition = async () => {
  localStorage.setItem('badgeCondition', false);
  console.log('badgeCondition cambiado a false en localStorage.');
};


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

export const uploadImageToStorage = async (imageData, displaName, fileName) => {
  const storageRef = ref(storage, `users/${displaName}/${fileName}`);
  await uploadString(storageRef, imageData, 'data_url');
  return await getDownloadURL(storageRef);
};

export const getUrlsStorage = async (carpeta) => {
  try {
    const storage = getStorage();
    const folderRef = ref(storage, carpeta);

    const archivos = await listAll(folderRef);
    const urls = await Promise.all(
      archivos.items.map(async (itemRef) => {

        const url = await getDownloadURL(itemRef);
        return url;
      })
    );

    return urls;
  } catch (error) {
    console.error("Error al obtener URLs de la carpeta:", error);
    return [];
  }
};

export const uploadImage = async (image, path) => {
  const currentUser = auth.currentUser
  const blob = await fetch(image).then(res => res.blob());
  const storageRef = ref(storage, `users/${currentUser.displayName}/${path}`);
  const snapshot = await uploadBytes(storageRef, blob, { contentType: 'image/png' });
  return await getDownloadURL(snapshot.ref);
};

// Actualiza el perfil del usuario en Firebase Authentication
export const updateAuthUserProfile = async (displayName, photoURL) => {
  const auth = getAuth();
  console.log(auth.currentUser);
  try {
    await updateProfile(auth.currentUser, {
      displayName,
      photoURL,
    });
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
  const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId')
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
    return false;
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
  return true
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

export const matchsUser = async (currentUserId, userFollowId) => {
  try {
    console.log(currentUserId, userFollowId)
    const currentUserRef = doc(firestore, 'users', currentUserId);
    const userFollowRef = doc(firestore, 'users', userFollowId)

    await updateDoc(userFollowRef, {
      matchs: arrayUnion(currentUserId)
    });

    await updateDoc(currentUserRef, {
      matchs: arrayUnion(userFollowId)
    });

    console.log(`Usuario ${currentUserId} ahora sigue a ${userFollowId}`);
  } catch (error) {
    console.error('Error al seguir al usuario:', error);
    throw error;
  }
};

export const createChat = async (currentUserId, userFollowId) => {
  let chatRef = doc(firestore, 'chats', `${currentUserId}_${userFollowId}`);
  let chatDoc = await getDoc(chatRef);

  if (chatDoc.exists()) {
    console.log('El chat ya existe, no se creará uno nuevo.');
    return false;
  }

  chatRef = doc(firestore, 'chats', `${userFollowId}_${currentUserId}`);
  chatDoc = await getDoc(chatRef);

  if (chatDoc.exists()) {
    console.log('El chat ya existe en la otra dirección, no se creará uno nuevo.');
    return false;
  }

  await setDoc(chatRef, { participants: [currentUserId, userFollowId], [currentUserId]: true, [userFollowId]: false }, { merge: true });
  console.log('Chat creado');
}

export const checkFollowStatus = async (currentUserId, userFollowId) => {
  try {
    let chatRef = doc(firestore, 'chats', `${currentUserId}_${userFollowId}`);
    let chatDoc = await getDoc(chatRef);

    if (!chatDoc.exists()) {
      chatRef = doc(firestore, 'chats', `${userFollowId}_${currentUserId}`);
      chatDoc = await getDoc(chatRef);
    }

    const exists1 = chatDoc.exists() ? chatDoc.data()[currentUserId] : false;
    const exists2 = chatDoc.exists() ? chatDoc.data()[userFollowId] : false;


    if (exists1 && exists2) {
      return 1;
    } else if (exists1) {
      return 2;
    } else if (exists2) {
      return 3;
    } else if (!chatDoc.exists()) {
      return 4;
    } else if (!exists1 && !exists2) {
      return 5
    }
  } catch (error) {
    console.error('Error al verificar el seguimiento:', error);
    return 'Seguir +';
  }
};


export const changeFollowStatusTrue = async (currentUserId, userFollowId) => {
  let chatRef = doc(firestore, 'chats', `${currentUserId}_${userFollowId}`);
  let chatDoc = await getDoc(chatRef);

  if (!chatDoc.exists()) {
    chatRef = doc(firestore, 'chats', `${userFollowId}_${currentUserId}`);
    chatDoc = await getDoc(chatRef);
  }

  const exists = chatDoc.data() ? chatDoc.data()[currentUserId] : false;

  if (exists === false) {
    await updateDoc(chatRef, {
      [currentUserId]: true
    });
    await completeBadges(currentUserId, 'Primer Amigo');
  }
}

export const changeFollowStatusFalse = async (currentUserId, userFollowId) => {
  let chatRef = doc(firestore, 'chats', `${currentUserId}_${userFollowId}`);
  let chatDoc = await getDoc(chatRef);
  const currentUserRef = doc(firestore, 'users', currentUserId);
  const userFollowRef = doc(firestore, 'users', userFollowId)

  if (!chatDoc.exists()) {
    chatRef = doc(firestore, 'chats', `${userFollowId}_${currentUserId}`);
    chatDoc = await getDoc(chatRef);
  }

  const exists = chatDoc.data() ? chatDoc.data()[currentUserId] : false;

  if (exists === true) {
    await updateDoc(chatRef, {
      [currentUserId]: false,
      [userFollowId]: false
    });
  }
  await updateDoc(currentUserRef, {
    matchs: arrayRemove(userFollowId)
  });
  await updateDoc(userFollowRef, {
    matchs: arrayRemove(currentUserId)
  });
}

export const getFriends = async (userId) => {
  try {
    const userRef = doc(firestore, 'users', userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData.friends || [];
    } else {
      console.log('No se encontró el documento del usuario.');
      return [];
    }
  } catch (error) {
    console.error('Error al obtener la lista de amigos:', error);
    throw error;
  }
};

// Recupera datos de los amigos del usuario autenticado desde Firestore
export async function getMatchsData() {
  const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId')
  const userRef = doc(firestore, 'users', userId);
  const userDoc = await getDoc(userRef);


  if (!userDoc.exists()) {
    throw new Error('El documento del usuario no existe');
  }

  const userData = userDoc.data();
  const matchsIds = userData.matchs || [];

  const matchsData = await Promise.all(matchsIds.map(async (matchId) => {
    const matchRef = doc(firestore, 'users', matchId);
    const matchDoc = await getDoc(matchRef);
    return { id: matchDoc.id, ...matchDoc.data() };
  }));

  return matchsData;
}


export const createMatchDocument = async (matchId, userAuth, userFollow) => {
  try {
    const matchRef = doc(firestore, 'matchs', matchId);
    await setDoc(matchRef, {
      [userAuth]: { active: true },
      [userFollow]: { active: false }
    });
    console.log(`Documento creado en 'matchs' con ID: ${matchId}`);
  } catch (error) {
    console.error('Error al crear el documento en matchs:', error);
    throw error;
  }
};

// Función para obtener datos del usuario por token
export const getUserByToken = async (token) => {
  if (!token) {
    console.error('getUserByToken: token es undefined o null');
    return null;
  }

  try {
    const auth = getAuth();
    const userCredential = await auth.signInWithCustomToken(token);
    const user = userCredential.user;

    if (user) {
      const userData = await getUserById(user.uid);
      return userData;
    } else {
      console.log('No se encontró el usuario.');
      return null;
    }
  } catch (error) {
    console.error('Error al obtener usuario por token:', error);
    throw error;
  }
};

export const banUser = async (userId) => {
  const userRef = doc(firestore, 'users', userId);
  await updateDoc(userRef, {
    ban: { status: true },
  });

  console.log('el usuario a sido baneado')
}

export const getUsersByGame = async (gameId) => {
  const auth = getAuth();
  const currentUserId = localStorage.getItem('userId') || sessionStorage.getItem('userId')

  const usersWithGame = await getDataDB('users');
  const usersWithSpecificGame = usersWithGame.filter(user => {
    return user.games.some(game => game.uid === gameId) && user.id !== currentUserId;
  });
  return usersWithSpecificGame;
};

export const AddRecomendation = async (userLikedId) => {
  const auth = getAuth();
  const userLiked = await getUserById(userLikedId);
  const userAuth = await getUserById(auth.currentUser.uid);
  console.log(userAuth);

  await updateDoc(doc(firestore, 'users', userLikedId), {
    recommendations: arrayUnion(userLikedId)
  });

  console.log(`Recomendación agregada para el usuario ${userLikedId} por el usuario ${userAuth.id}.`);

  return userLiked;
};



export const sendNotification = async (message, currentUser, userSend, status) => {
  try {
    // Referencia al documento en la subcolección 'notifications' usando `currentUser` como ID
    const notificationDocRef = doc(
      firestore,
      `users/${userSend}/notifications`,
      currentUser
    );

    // Obtener el documento actual de notificación
    const docSnapshot = await getDoc(notificationDocRef);
    const existingMessages = docSnapshot.exists() ? docSnapshot.data().messages : [];

    // Agregar el nuevo mensaje al array de mensajes existente
    const updatedMessages = [
      ...existingMessages,
      {
        message,
        timestamp: new Date(),
        status: status,
      },
    ];

    // Guardar o actualizar el documento de notificación con el array completo de mensajes
    await setDoc(notificationDocRef, { messages: updatedMessages }, { merge: true });

    console.log('Notificación enviada exitosamente a Firestore.');

  } catch (error) {
    console.error('Error al enviar la notificación:', error);
  }
};

export const getAllNotifications = async (notificationsRef) => {
  try {
    const notificationsCollection = collection(firestore, notificationsRef);
    const querySnapshot = await getDocs(notificationsCollection);
    const notifications = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return notifications;
  } catch (error) {
    console.error('Error al obtener todas las notificaciones:', error);
    throw error;
  }
};
export const getLastMessage = async (usersData, currentUserId) => {
  const lastMessages = {};

  try {

    for (const user of usersData) {
      const userFollowId = user.id;
      let chatRef = doc(firestore, 'chats', `${currentUserId}_${userFollowId}`);
      let chatDoc = await getDoc(chatRef);

      if (!chatDoc.exists()) {
        chatRef = doc(firestore, 'chats', `${userFollowId}_${currentUserId}`);
        chatDoc = await getDoc(chatRef);
      }

      if (chatDoc.exists()) {
        console.log("Chat encontrado:", chatRef.id);

        const messagesRef = collection(firestore, `chats/${chatRef.id}/messages`);
        const q = query(messagesRef, orderBy('timestamp', 'desc'), limit(1));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const lastMessageDoc = querySnapshot.docs[0];
          const lastMessageData = lastMessageDoc.data();
          console.log("Último mensaje:", lastMessageData);
          lastMessages[user.id] = lastMessageData.text || 'No content';
        } else {
          lastMessages[user.id] = 'No messages yet';
        }
      } else {
        console.log("No se encontró un chat entre los usuarios:", currentUserId, userFollowId);
        lastMessages[user.id] = 'No messages yet';
      }
    }
  } catch (error) {
    console.error('Error fetching users or chat data:', error);
  }

  return lastMessages;
};
























