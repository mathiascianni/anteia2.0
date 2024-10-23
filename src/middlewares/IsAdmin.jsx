import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { firestore } from '../credentials';

const IsAdmin = ({ children }) => {
  const navigate = useNavigate();
  const currentUserId = localStorage.getItem('userId') || sessionStorage.getItem('userId')

  useEffect(() => {
    const checkMatch = async () => {
      try {
        const currentUserRef = doc(firestore, 'users', currentUserId);
        const currentUserDoc = await getDoc(currentUserRef);
        const data = currentUserDoc.data();

        if (!currentUserDoc.exists()) {
          console.log('Usuario no encontrado');
          return navigate('/');
        }

        if (data.role !== 'admin') {
          console.log('No eres admin');
          return navigate('/');
        }

        console.log(data)

      } catch (error) {
        console.error('Error verificando matchs:', error);
        navigate('/');
      }
    };

    checkMatch();
  }, [currentUserId, navigate]);

  return <>{children}</>;
};
export default IsAdmin;
