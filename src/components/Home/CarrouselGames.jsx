import React, { useEffect, useState } from 'react';
import { addDataArrayDB, getDataDB } from '../../credentials';
import { Link } from 'react-router-dom';

const CarrouselGames = () => {
    const [games, setGames] = useState([]);
    useEffect(() => {
        const obtenerJuegos = async () => {
            const data = await getDataDB('games');
            setGames(data);
            console.log(data);
        }
        obtenerJuegos();
    }, [])




    return (
        <div>
            <h1>Carrousel de juegos</h1>
            <div className='grid grid-cols-4 my-4'>
                {games.map((game) => (
                    <Link to={`/game/${game.id}`} key={game.id} className='bg-primary flex items-center w-16 h-16 rounded-full '>
                        <img className='w-8 mx-auto my-auto' src={game.icon} alt={game.title} />
                    </Link >
                ))}
            </div>

        </div>
    );
}

export default CarrouselGames;