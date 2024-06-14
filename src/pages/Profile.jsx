import React, { useState, useEffect } from 'react';
import { auth, getUserProfileImageURL, uploadFile } from '../credentials';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileImageURL, setProfileImageURL] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        getUserProfileImageURL(currentUser.uid).then(url => {
          setProfileImageURL(url);
        }).catch(error => {
          console.error('Error getting profile image URL:', error);
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div key={user.uid}>
      <div className="bg-blue-500 text-white text-center pt-36 relative">
        <img
          className="w-40 rounded-full absolute top-16 inset-0 mx-auto border-solid border-white border-8"
          src={profileImageURL || 'assets/user/avatar.png'}
          alt="User Profile"
        />
      </div>
      <div className="px-4 pt-20">
        <h1 className="text-3xl font-bold text-center">{user.displayName}</h1>
        <p className="text-sm text-gray-500 text-center">⭐⭐⭐⭐⭐</p>
      </div>
      <div>
        <input type="file" name="" id="" onChange={e => uploadFile(e.target.files[0], user.uid)} />
      </div>
    </div>
  );
};

export default Profile;
