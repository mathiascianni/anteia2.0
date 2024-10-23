import React, { useState } from 'react';
import IconGame from "../../Icons/IconGame";

const FavoriteGames = ({ user }) => {
    const [activeGamesCount, setActiveGamesCount] = useState(0); 

    return (
        <>
            <div className='my-4'>
                <h2 className='font-bold text-lg mb-2'>Juegos favoritos de {user.displayName}</h2>
            </div>
            {
                user.games && user.games.length > 0 ? (
                    <div className='grid grid-cols-3 gap-1'>
                        {user.games.map((game, index) => (
                            <div key={game.uid}>
                                <IconGame 
                                    game={game} 
                                    index={index} 
                                    activeGamesCount={activeGamesCount} 
                                    setActiveGamesCount={setActiveGamesCount} 
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Este usuario no tiene juegos favoritos</p>
                )
            }
        </>
    );
}

export default FavoriteGames;
