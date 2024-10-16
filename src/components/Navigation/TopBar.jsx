import { BackBtn, Bell } from "../../Icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, getNotifications, getUserById } from "../../credentials";
import { collection, orderBy, query, onSnapshot, doc, getFirestore as firestore } from "firebase/firestore";
import Toast from "../Home/Toast";

const TopBar = ({ backBtn, title, bell }) => {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal
    const [userData, setUserData] = useState({}); // Estado para almacenar los datos del usuario

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleBellClick = () => { // Nueva función para manejar el clic en Bell
        setIsModalOpen(true);
    };

    useEffect(() => {
        if (bell) {
            const fetchNotiData = async () => {
                const notiRef = await getNotifications();
                setNotifications(notiRef);

                // Obtener datos de los usuarios a partir de los IDs en las notificaciones
                const users = await Promise.all(notiRef.map(async (notification) => {
                    const user = await getUserById(notification.sender); // Obtener datos del usuario
                    return user;
                }));
                setUserData(users); // Almacenar los datos de los usuarios
            };
            fetchNotiData();
        }
    }, [bell]);

    return (
        <div className='h-menu flex items-center justify-between relative'>
            {backBtn && (
                <button
                    className='text-primary absolute block left-0 top-1/2 -translate-y-1/2'
                    onClick={handleBackClick}
                >
                    <BackBtn />
                </button>
            )}

            {title && <h1 className='text-2xl font-titles font-thin flex-1 text-center'>{title}</h1>}

            {bell &&
                <div className="absolute right-0 top-1/2 -translate-y-1/2 block" onClick={handleBellClick}> {/* Agregado onClick */}
                    <Bell />
                    {notifications && notifications.length > 0 && <div className="w-4 h-4 rounded-full bg-primary absolute bottom-3 left-3 flex items-center justify-center">
                        <span className="text-white text-[12px]">{notifications.length}</span>
                    </div>}
                </div>
            }
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center z-50"> {/* Fondo del modal */}
                    {notifications && notifications.length > 0 ? (
                        notifications.map((notification, index) => (
                            <Toast user={userData[index]} message={notification.message} />
                        ))
                    ) : (
                        <p>No hay notificaciones.</p> // Mensaje si no hay notificaciones
                    )}
                    <button
                        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        onClick={() => setIsModalOpen(false)}> {/* Botón para cerrar el modal */}
                        Cerrar
                    </button>
                </div>

            )}
        </div>
    );
}

export default TopBar;
