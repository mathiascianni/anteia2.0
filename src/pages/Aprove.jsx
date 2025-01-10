import React, { useEffect } from 'react';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { firestore } from '../credentials';
 

const Aprove = () => {
  useEffect(() => {
    const guardarCompra = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const userRef = doc(firestore, 'users', user.uid); 
          await updateDoc(userRef, {
            purchases: arrayUnion({
              item: 'Plan Premium', 
              date: new Date().toISOString(),
            }),
          });

          console.log('Compra guardada con éxito en Firebase.');
        } else {
          console.error('Usuario no autenticado. No se pudo guardar la compra.');
        }
      } catch (error) {
        console.error('Error al guardar la compra:', error);
      }
    };

    guardarCompra();
  }, []);

  return (
    <div>
      <h1>Felicidades</h1>
      <p>Se ha completado el pago con éxito.</p>
    </div>
  );
};

export default Aprove;
