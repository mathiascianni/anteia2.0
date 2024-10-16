import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { addDataArrayDB, auth, completeBadges, getGameById, getUsersByGame } from '../credentials';
import { SpinnerLoader } from '../components/General';
import UserCard from '../components/Home/UserCard';

const Game = () => {
    const { uid } = useParams();
    const [game, setGame] = useState(null);
    const [status, setStatus] = useState(null);
    const [usersWithGame, setUsersWithGame] = useState([]);
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        const fetchGame = async () => {
            const userData = auth.currentUser;
            setUserId(userData.uid)
            const gameData = await getGameById(uid);
            setGame(gameData);
            const users = await getUsersByGame(gameData.uid);
            setUsersWithGame(users);
        };

        fetchGame();
    }, [uid]);

    const handleSubmit = async () => {
        const result = await addDataArrayDB(game, 'games');
        await completeBadges(userId, 'Juguemos')
        setStatus(result); 
    };

    if (!game) {
        return <SpinnerLoader/>;
    }
    console.log(usersWithGame)
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
                <button className='mt-2 bg-primary text-white py-2 px-4 rounded' onClick={handleSubmit}>
                    {status ? 'Agregar a favoritos' : 'Juego agregado'}
                </button>
            </div>
            <div className='px-4'>
                {usersWithGame.map(user => (
                    <Link to={`/profile/${user.id}`} className='block' key={user.id}>
                    <UserCard key={user.id} user={user} />
                  </Link>
                ))}
            </div>
            

        </div>
    );
}

export default Game;
