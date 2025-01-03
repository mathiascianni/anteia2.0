import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { addDataArrayDB, auth, completeBadges, firestore, getGameById, getUserById, getUsersByGame } from '../credentials';
import { SpinnerLoader } from '../components/General';
import UserCard from '../components/Home/UserCard';
import { TopBar } from '../components/Navigation';
import { arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore';
import { Heart } from '../Icons';

const Game = () => {
    const { uid } = useParams();
    const [game, setGame] = useState(null);
    const [isGameAdded, setIsGameAdded] = useState(false);
    const [usersWithGame, setUsersWithGame] = useState([]);
    const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId');

    useEffect(() => {
        const fetchGame = async () => {
            const userData = await getUserById(userId);
            const gameData = await getGameById(uid);
            setGame(gameData);
            const users = await getUsersByGame(gameData.uid);
            setUsersWithGame(users);
            const userGames = userData.games || [];
            setIsGameAdded(userGames.some(game => game.uid === uid));
        };

        fetchGame();
    }, [uid, userId]);

    const handleSubmit = async () => {
        if (!isGameAdded) {
            await addDataArrayDB(game, 'games');
            const gameRef = doc(firestore, 'games', game.uid);
            await updateDoc(gameRef, {
                users: arrayUnion(userId)
            });
            await completeBadges(userId, 'Juguemos');
            const updatedUserData = await getUserById(userId);
            const updatedUserGames = updatedUserData.games || [];
            setIsGameAdded(updatedUserGames.some(game => game.uid === uid));
        }
    };

    if (!game) {
        return <SpinnerLoader />;
    }

    const backgroundStyle = game.banner
        ? { backgroundImage: `url(${game.banner})`, backgroundSize: 'cover' }
        : {};

    return (
        <div>
            <TopBar backBtn bell />

            <div
                className={`border-b-2 text-white text-center pt-44 relative bg-cover bg-center bg-primary`}
                style={{
                    backgroundImage: `url(${game.banner})`
                }}
            >
                <div className="w-40 h-40 rounded-full flex items-center justify-center absolute top-24 inset-0 mx-auto border-solid border-white border-8" style={{ backgroundColor: game.color }}>
                    <img className='w-20' src={game.icon} alt="User Profile" />
                </div>
            </div>
            <div className='text-center mt-[6rem]'>
                <h1 className='text-2xl font-bold'>{game.title}</h1>
                <div className='flex justify-center gap-4'>
                    <button
                        className='mt-2 bg-primary  text-white py-2 px-4 rounded'
                        onClick={handleSubmit}
                        disabled={isGameAdded}
                    >
                        {isGameAdded ? 'Juego agregado' : 'Agregar juego'}
                    </button>
                    {isGameAdded && (
                        <Link className='mt-2 bg-primary  text-white py-2 px-4 rounded'  to="/matchs" state={{ gameCountUser: game.players }}>
                            <Heart/>
                        </Link>
                    )}
                </div>
            </div>
            <div className='px-4 mt-4'>
                <h2 className='font-bold text-lg mb-2 '>Jugadores de {game.title}</h2>
                {usersWithGame.map(user => (
                    <Link to={`/profile/${user.id}`} className='block' key={user.id}>
                        <UserCard key={user.id} user={user} />
                    </Link>
                ))}
            </div>
        </div >
    );
}

export default Game;
