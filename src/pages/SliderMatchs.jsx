import React, { useState, useRef, useEffect } from 'react';
import { createChat, getDataDB } from '../credentials';
import { TopBar } from '../components/Navigation';
import { getAuth } from 'firebase/auth';
import { Badge, EmptyStar, Heart, Star, Thumb } from '../Icons';
import { FavoriteGames } from '../components/Profile';
import IconGame from '../Icons/IconGame';
import { useNavigate } from 'react-router-dom';

const SliderMatchs = () => {
    const [users, setUsers] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const cardRef = useRef(null);
    const auth = getAuth();
    const currentUserId = auth.currentUser ? auth.currentUser.uid : null;
    const navigate = useNavigate();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataUsers = await getDataDB('users');
                const filteredUsers = dataUsers.filter(user => user.id !== currentUserId);
                setUsers(filteredUsers);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchData();
    }, [currentUserId]);


    const handleSwipe = async (direction, currentUserId, targetUserId) => {
        const card = cardRef.current;


        if (direction === 'right') {
            card.style.transition = 'transform 0.3s ease';
            card.style.transform = 'translateX(100%)';
            await createChat(currentUserId, targetUserId);
            navigate(`/profile/${targetUserId}`); 
        } else if (direction === 'left') {
            card.style.transition = 'transform 0.3s ease';
            card.style.transform = 'translateX(-100%)';
        }


        setTimeout(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex + 1 < users.length ? prevIndex + 1 : 0
            );
            card.style.transition = '';
            card.style.transform = 'translateX(0)';
        }, 300);
    };

    return (
        <div>
            <div className='px-4'>
                <TopBar bell backBtn />
            </div>


            {users.length > 0 ? (
                <div className='px-4'>
                    <div className=' rounded-xl bg-primary-dark h-[calc(100vh-25vh)] pt-4 text-white'>
                        <div
                            ref={cardRef}
                            className='card w-full h-64'
                        >
                            <div className='w-[50%] mx-auto'>
                                <img
                                    src={users[currentIndex].photoURL}
                                    alt={users[currentIndex].displayName}
                                    className="w-full rounded-full object-cover"
                                />
                                <div className='flex w-full justify-center pt-4'>
                                    {Array.from({ length: 5 }, (_, i) =>
                                        i < users[currentIndex].stars ? <Star key={`star-${i}`} /> : <EmptyStar key={`star-${i}`} />
                                    )}
                                </div>
                            </div>
                            <h3 className="text-center mt-4 text-2xl font-bold">{users[currentIndex].displayName}</h3>
                            <p className="px-4 mb-4 pt-4 text-[12px]">The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality</p>
                            <div className='grid grid-cols-2 gap-4 px-4'>
                                <div className='w-3/4'>
                                    <h3 className="text-md font-bold pb-2">Intereses</h3>
                                    <div className='grid grid-cols-3 gap-2'>
                                        {users[currentIndex].games.map((game) => (
                                            <img className='w-[80%]' src={game.icon} alt="" />
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-md font-bold">Stats</h3>
                                    <ul>
                                        <li className="flex items-center text-[12px] gap-1">Cantidad de matchs: <span className='text-white font-bold'>{users[currentIndex].matchs?.length || 0}</span></li>
                                        <li className="flex items-center text-[12px] gap-1">Cantidad de likes: <span className='text-white font-bold'>{users[currentIndex].recommendations?.length || 0}</span></li>
                                      
                                    </ul>
                                </div>
                            </div>

                            <div className="flex justify-between mt-4">
                                <button
                                    className="bg-red-500 text-white w-[7rem] h-[7rem] rounded-full flex items-center border-[10px] border-white justify-center"
                                    onClick={() => handleSwipe('left', currentUserId, users[currentIndex].id)}
                                >
                                    Dislike
                                </button>
                                <button
                                    className="bg-green-500 text-white w-[7rem] h-[7rem] rounded-full flex items-center border-[10px] border-white justify-center"
                                    onClick={() => handleSwipe('right', currentUserId, users[currentIndex].id)}
                                >
                                    Like
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>No hay usuarios disponibles</p>
            )}


        </div>
    );
};

export default SliderMatchs;
