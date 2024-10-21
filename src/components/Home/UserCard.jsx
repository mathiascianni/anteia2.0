import React from 'react';

const UserCard = ({ user }) => {
  // Filtramos los juegos que tienen la condición en true
  const filteredGames = user.games.filter(game => game.condition === true);

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
          {filteredGames.map((game, index) => (
            <div key={index} className="text-white bg-primary p-1 flex items-center rounded-full">
              <img className='w-4' src={game.icon} alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
