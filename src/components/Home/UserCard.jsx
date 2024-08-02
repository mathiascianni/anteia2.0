import React from 'react';
import { Link } from 'react-router-dom';

const UserCard = ({ user }) => {

  const gamesTrue = user.games.filter(game => game.condition === true);
  console.log(gamesTrue); 

  const profileBannerURL = user.banner;
  const backgroundStyle = profileBannerURL
    ? { backgroundImage: `url(${profileBannerURL})`, backgroundSize: 'cover' }
    : {};

  return (
      <div
        style={backgroundStyle}
        className={`${!user.banner ? 'bg-primary rounded-lg p-4 flex my-4 space-x-4' : 'rounded-lg p-4 flex my-4 space-x-4'}`}
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
            {gamesTrue.map((game, index) => (
              <div className='bg-primary p-1 w-6 h-6 rounded-full' key={index}>
                <img className='w-4 h-4 rounded-full' src={game.icon} alt={game.title} />
              </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default UserCard;
