import React, { useState, useEffect } from 'react';
import { auth } from '../credentials'; 

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userValidation = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => userValidation();
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div key={user.id}>
              <div className="bg-blue-500 text-white text-center pt-36 relative">
                <img className="w-40 rounded-full absolute top-16 inset-0 mx-auto border-solid border-white border-8" src={user.img?'assets/user/Adrian.jpg':'assets/user/avatar.png'} alt="User Profile" />
              </div>
              <div className="px-4 pt-20">
                <h1 className="text-3xl font-bold text-center">{user.displayName}</h1>
                <p className="text-sm text-gray-500 text-center">⭐⭐⭐⭐⭐</p>
              </div>
            </div>
    );
};

export default Profile;
