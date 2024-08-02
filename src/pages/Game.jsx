import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { addDataArrayDB, getGameById } from '../credentials';


const Game = () => {
    const { uid } = useParams();
    const [game, setGame] = useState(null);

    useEffect(() => {
        const fetchGame = async () => {
            const gameData = await getGameById(uid);
            setGame(gameData);
        };

        fetchGame();
    }, [uid]);

    if (!game) {
        return <div>Cargando...</div>;
    }

    const backgroundStyle = game.banner
        ? { backgroundImage: `url(${game.banner})`, backgroundSize: 'cover' }
        : {};
    return (
        <div>
            <div
                key={game.uid}
                style={backgroundStyle}
                className={`border-b-2 text-white text-center pt-44 relative ${!game.banner ? 'bg-primary' : ''}`}
            >
                <img
                    className="w-30 bg-primary rounded-full p-4 absolute top-28 inset-0 mx-auto border-solid border-white border-8"
                    src={game.icon}
                    alt="User Profile"
                />
            </div>
            <div className='text-center mt-[3.5rem]'>
                <h1 className='text-2xl font-bold'>{game.title}</h1>
                <button className='mt-2 bg-primary text-white py-2 px-4 rounded' onClick={() => addDataArrayDB(game, 'games')}>Agregar a Favoritos</button>
            </div>

        </div>
    );
}

export default Game;
