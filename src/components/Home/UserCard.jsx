import React from 'react';

const UserCard = ({ user }) => {
  console.log(user);
  const filteredGames = Array.isArray(user.games) ? user.games.filter(game => game.condition === true) : [];

  
  const whiteTextColors = ['#272727', '#225789', '#0066FF'];

  return (
    <div 
      className='rounded-lg p-4 flex my-4 space-x-4 shadow-lg' 
      style={{
        border: `4px solid ${user.colors.border}`, 
        backgroundColor: user.colors.background,   
      }}
    >
      <div>
        <img
          className='rounded-full w-16 border-4 border-white'
          src={user.photoURL}
          alt={`Foto de perfil de ${user.displayName}`} 
        />
      </div>
      <div>
        <p className={`font-bold ${whiteTextColors.includes(user.colors.background) ? 'text-white' : 'text-dark'}`}>
          {user.displayName}
        </p>
        <div className='flex space-x-2'>
          {filteredGames.length > 0 && filteredGames.map((game, index) => (
            <div key={index} className="text-dark bg-primary p-1 flex items-center rounded-full">
              <img className='w-4' src={game.icon} alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
