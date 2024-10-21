import React, { useState } from 'react';
import { auth, changeGameCondition } from '../credentials';
import { useNavigate } from 'react-router-dom';

const IconGame = ({ game, index }) => {
    const [isConditionActive, setIsConditionActive] = useState(game.condition);
    const navigate = useNavigate()
    console.log(game)
    const handleClick = async () => {
        if (location.pathname === '/profile') {
            const userId = localStorage.getItem('userId');
            await changeGameCondition(userId, index);
            setIsConditionActive(!isConditionActive);
        } else {
           
            navigate(`/game/${game.uid}`)
        }
    };

    return (
        <div key={game.title} onClick={handleClick}>
            <div className={`mx-auto rounded-full flex items-center justify-center p-3 w-12 h-12 ${isConditionActive ? 'bg-primary' : 'bg-medium'}`}>
                <img src={game.icon} alt={game.title} />
            </div>
            <div className='text-center text-sm my-2'>{game.title}</div>
        </div>
    );
}

export default IconGame;
