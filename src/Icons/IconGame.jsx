import React from 'react';

const IconGame = ({ game }) => {
    return (
        <div key={game.title}>
            <div className={`mx-auto rounded-full flex items-center justify-center p-3 w-12 h-12 bg-primary`}>
                <img src={game.icon} alt={game.title} />
            </div>
            <div className='text-center text-sm my-2'>{game.title}</div>
        </div>
    );
}

export default IconGame;
