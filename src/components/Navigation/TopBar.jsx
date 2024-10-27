import { BackBtn, Bell } from "../../Icons";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, getUserById, firestore as firebaseFirestore } from "../../credentials";
import { collection, onSnapshot, doc } from "firebase/firestore";
import Toast from "../Home/Toast";

const TopBar = ({ backBtn, title, bell, icon, userChat }) => {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userData, setUserData] = useState([]);

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleBellClick = () => {
        setIsModalOpen(true);
    };

    useEffect(() => {
        if (bell) {
            const fetchNotiData = async () => {
                const user = auth.currentUser;
                if (user) {
                    const userId = user.uid;
                    const userRef = doc(firebaseFirestore, 'users', userId);
                    const notificationsRef = collection(userRef, 'notifications');

                    return onSnapshot(
                        notificationsRef,
                        snapshot => {
                            const notiData = {};
                            snapshot.forEach(doc => {
                                const data = doc.data();
                                if (!notiData[doc.id]) {
                                    notiData[doc.id] = data; 
                                }
                            });
                            setNotifications(notiData);
                        }
                    );
                } else {
                    console.error("Usuario no autenticado");
                }
            };
            fetchNotiData();
        }
    }, [bell]);

    useEffect(() => {
        const fetchUsersData = async () => {
            const users = await Promise.all(
                Object.keys(notifications).map(async (userId) => {
                    const user = await getUserById(userId);
                    const messages = notifications[userId]?.messages || [];
                    return { ...user, messages };
                })
            );
            setUserData(users);
        };
        if (Object.keys(notifications).length > 0) fetchUsersData();
    }, [notifications]);

    return (
        <div className="px-4 sticky top-0 left-0 right-0 bg-white z-30">
            <div className='h-menu flex items-center justify-between relative'>
                {backBtn && (
                    <button
                        className='text-primary absolute block left-0 top-1/2 -translate-y-1/2'
                        onClick={handleBackClick}
                    >
                        <BackBtn />
                    </button>
                )}
                {userChat && (
                    <Link
                        to={`/profile/${userChat.id}`}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    >
                        <div className="bg-white rounded-full flex items-center justify-center">
                            <img className="w-8 h-8 border-2 border-medium rounded-full" src={userChat.photoURL} alt={userChat.displayName} />
                        </div>
                        <div className="text-xs text-center">@{userChat.displayName}</div>
                    </Link>
                )}
                {icon && (
                    <img
                        className='text-primary absolute block left-0 top-1/2 -translate-y-1/2'
                        src="./assets/icon.svg"
                        alt="Anteia"
                    />
                )}
                {title && <h1 className='text-2xl font-titles font-thin flex-1 text-center'>{title}</h1>}

                {bell && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 block" onClick={handleBellClick}>
                        <Bell />
                        {Object.keys(notifications).length > 0 && (
                            <div className="w-4 h-4 rounded-full bg-primary absolute bottom-3 left-3 flex items-center justify-center">
                                <span className="text-white text-[12px]">{Object.keys(notifications).length}</span>
                            </div>
                        )}
                    </div>
                )}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center z-50">
                        <div className="flex justify-end w-full px-4">
                            <button
                                className="mt-4 bg-primary text-white py-2 px-4 rounded-full hover:bg-primary-dark"
                                onClick={() => setIsModalOpen(false)}>
                                X
                            </button>
                        </div>
                        {userData.length > 0 ? (
                            userData.map((userInfo) => {
                                const uniqueMessages = [...new Set(userInfo.messages.map(msg => msg.message))]; // Evitar mensajes duplicados
                                return (
                                    <Toast
                                        key={userInfo.id}
                                        user={userInfo}
                                        notification={{
                                            sender: userInfo.id,
                                            message: uniqueMessages.join(', '), // Mostrar todos los mensajes
                                            status: userInfo.messages[0]?.status // Usar el estado del primer mensaje (o ajusta según sea necesario)
                                        }}
                                        hour={new Date(userInfo.messages[0]?.timestamp?.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    />
                                );
                            })
                        ) : (
                            <p className="text-white font-bold bg-primary p-2">No hay notificaciones.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TopBar;
