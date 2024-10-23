import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { firestore } from '../credentials';

const IsMatch = ({ children }) => {
  const navigate = useNavigate();
  const { userId } = useParams();
  let currentUserId = localStorage.getItem('userId');
  if (!currentUserId) {
    currentUserId = sessionStorage.getItem('userId')
  }

  useEffect(() => {
    const checkMatch = async () => {
      try {
        const currentUserRef = doc(firestore, 'users', currentUserId);
        const currentUserDoc = await getDoc(currentUserRef);

        if (!currentUserDoc.exists()) {
          console.log('Usuario no encontrado');
          return navigate('/');
        }

        const { matchs } = currentUserDoc.data();

        if (!matchs || !matchs.includes(userId)) {
          console.log('No tienes match con este usuario');
          return navigate('/');
        }
      } catch (error) {
        console.error('Error verificando matchs:', error);
        navigate('/');
      }
    };

    checkMatch();
  }, [userId, currentUserId, navigate]);

  return <>{children}</>;
};

export default IsMatch;
