import React, { useState, useRef, useEffect } from 'react';
import { checkFollowStatus, createChat, getDataDB } from '../credentials';
import { TopBar } from '../components/Navigation';
import { getAuth } from 'firebase/auth';
import { Badge, EmptyStar, Heart, Star, Thumb } from '../Icons';
import { FavoriteGames } from '../components/Profile';
import IconGame from '../Icons/IconGame';
import { useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import { SpinnerLoader } from '../components/General';

const SliderMatchs = () => {
    const [users, setUsers] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const cardRef = useRef(null);
    const auth = getAuth();
    const currentUserId = auth.currentUser ? auth.currentUser.uid : null;
    const navigate = useNavigate();
    const whiteTextColors = ['#272727', '#225789', '#0066FF'];
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const dataUsers = await getDataDB('users');
                const filteredUsers = await Promise.all(dataUsers.map(async (user) => {
                    const followStatus = await checkFollowStatus(user.id);
                    return followStatus !== 1 && user.id !== currentUserId ? user : null;
                }));


                setUsers(filteredUsers.filter(user => user !== null));
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
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

    const handlers = useSwipeable({
        onSwipedLeft: () => handleSwipe('left', currentUserId, users[currentIndex].id),
        onSwipedRight: () => handleSwipe('right', currentUserId, users[currentIndex].id),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    });

    return (
        <div {...handlers}>
            <TopBar bell backBtn />

            {loading ? (
                <SpinnerLoader />
            ) : users.length > 0 ? (
                <div className='px-4'>
                    <div
                        className={`rounded-xl h-[calc(100vh-25vh)] pt-4 ${whiteTextColors.includes(users[currentIndex].colors.background) ? 'text-white' : 'text-dark'}`}
                        ref={cardRef}
                        style={{
                            backgroundImage: `url(${users[currentIndex].banner})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            transition: 'transform 0.3s ease',
                        }}
                    >
                        <div className='px-8'>
                            <div className='card w-full rounded-xl py-4' style={{
                                border: `4px solid ${users[currentIndex].colors.border}`,
                                backgroundColor: users[currentIndex].colors.background,
                            }}>
                                <div className='w-[50%] mx-auto '>
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
                                            {users[currentIndex].games.map((game, index) => (
                                                <img key={index} className='w-[80%]' src={game.icon} alt="" />
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
                            </div>
                        </div>
                    </div>
                </div>

            ) : (
                <p>No hay usuarios disponibles</p>
            )
            }
        </div >
    );
};

export default SliderMatchs;
