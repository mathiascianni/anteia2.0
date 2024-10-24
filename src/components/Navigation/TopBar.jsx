import { BackBtn, Bell } from "../../Icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, getUserById, firestore as firebaseFirestore } from "../../credentials";
import { collection, orderBy, query, onSnapshot, doc } from "firebase/firestore";
import Toast from "../Home/Toast";

const TopBar = ({ backBtn, title, bell, icon }) => {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userData, setUserData] = useState({});

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

                    let notifications = [];

                    return onSnapshot(
                        query(notificationsRef, orderBy('timestamp', 'asc')),
                        snapshot => {
                            notifications = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                            setNotifications(notifications);
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
            if (notifications) {
                const users = await Promise.all(notifications.map(async (notification) => {
                    const user = await getUserById(notification.sender);
                    return user;
                }));
                setUserData(users);
            }
        }
        fetchUsersData();
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
                {icon && (
                    <img
                        className='text-primary absolute block left-0 top-1/2 -translate-y-1/2'
                        src="./assets/icon.svg"
                        alt="Anteia"
                    >
                    </img>
                )}

                {title && <h1 className='text-2xl font-titles font-thin flex-1 text-center'>{title}</h1>}

                {bell &&
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 block" onClick={handleBellClick}>
                        <Bell />
                        {notifications && notifications.length > 0 && <div className="w-4 h-4 rounded-full bg-primary absolute bottom-3 left-3 flex items-center justify-center">
                            <span className="text-white text-[12px]">{notifications.length}</span>
                        </div>}
                    </div>
                }
                {isModalOpen && (

                    <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center z-50">
                        <div className="flex justify-end w-full px-4">
                            <button
                                className="mt-4 bg-primary text-white py-2 px-4 rounded-full hover:bg-primary-dark"
                                onClick={() => setIsModalOpen(false)}>
                                X
                            </button>
                        </div>
                        {notifications && notifications.length > 0 ? (
                            notifications.map((notification, index) => (
                                <Toast user={userData[index]} notification={notification} />
                            ))
                        ) : (
                            <p className="text-white font-bold bg-primary p-2">No hay notificaciones.</p>
                        )}
                    </div>

                )}
            </div>
        </div>

    );
}

export default TopBar;
