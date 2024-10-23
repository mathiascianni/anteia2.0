import React, { useState, useEffect } from 'react';
import { auth, changeGameCondition } from '../credentials';
import { useNavigate } from 'react-router-dom';

const IconGame = ({ game, index, activeGamesCount, setActiveGamesCount }) => {
    const [isConditionActive, setIsConditionActive] = useState(game.condition);
    const [error, setError] = useState(null)
    const navigate = useNavigate();
    
    useEffect(() => {
        if (isConditionActive) {
            setActiveGamesCount(prevCount => prevCount + 1);
        }
    }, []);

    const handleClick = async () => {
        if (location.pathname === '/profile') {
          
            if (!isConditionActive && activeGamesCount >= 3) {
                setError('Solo puedes seleccionar 3 juegos')
                return;
            }

            let userId = localStorage.getItem('userId');
            if (!userId) {
                userId = sessionStorage.getItem('userId');
            }

            await changeGameCondition(userId, index);
            
          
            setIsConditionActive(!isConditionActive);
            if (!isConditionActive) {
                setActiveGamesCount(prevCount => prevCount + 1);
            } else {
                setActiveGamesCount(prevCount => prevCount - 1);
            }
        } else {
            navigate(`/game/${game.uid}`);
        }
    };

    return (
        <div key={game.title} onClick={handleClick}>
            <div className={`mx-auto rounded-full flex items-center justify-center p-3 w-12 h-12 ${isConditionActive ? 'bg-primary' : 'bg-medium'} ${activeGamesCount >= 3 && !isConditionActive ? 'opacity-50 cursor-not-allowed' : ''}`}>
                <img src={game.icon} alt={game.title} />
            </div>
            <div className='text-center text-sm my-2'>{game.title}</div>
        </div>
    );
}

export default IconGame;
