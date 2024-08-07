import React from 'react';

const UserCard = ({ user }) => {

  return (
      <div
        className={`${!user.banner ? 'bg-primary rounded-lg p-4 flex my-4 space-x-4' : 'rounded-lg p-4 flex my-4 space-x-4'}`}
        style={{
          backgroundImage: `url(${user.banner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div>
          <img
            className='rounded-full w-16 border-4 border-white'
            src={user.photoURL}
            alt={`Foto de perfil de ${user.username}`}
          />
        </div>
        <div>
          <p className='text-white font-bold'>{user.displayName}</p>
          <div className='flex space-x-2'>
          </div>
        </div>
      </div>
  );
};

export default UserCard;
