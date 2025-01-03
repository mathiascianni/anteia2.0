import React, { useEffect, useState } from 'react';
import { getDataDB } from '../../credentials';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';


const CarrouselGames = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        const obtenerJuegos = async () => {
            const data = await getDataDB('games');
            setGames(data);
            console.log(data);
        };
        obtenerJuegos();
    }, []);

    return (
        <div className='px-4 mb-12'>
            <h2 className='font-bold text-xl mb-4'>Carrousel de juegos</h2>
            <Swiper
                spaceBetween={10} 
                slidesPerView={4.5}
               
            >
                {games.map((game) => (
                    <SwiperSlide key={game.id} className=''>
                        <Link
                            to={`/game/${game.id}`}
                            className='flex items-center w-16 h-16 rounded-full border-2 border-dark'
                            style={{ backgroundColor: game.color }}
                        >
                            <img className='w-8 mx-auto my-auto' src={game.icon} alt={game.title} />
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default CarrouselGames;
