import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, deleteDataDB, getAllNotifications } from '../../credentials';

const Toast = ({ user, notification, hour }) => {
    const navigate = useNavigate();
    const userId = auth.currentUser.uid;

    const handleClick = async () => {
        const notificationsRef = `users/${userId}/notifications`;

        const notificationsToDelete = await getAllNotifications(notificationsRef);

        await Promise.all(notificationsToDelete.map(n => deleteDataDB(`${notificationsRef}/${n.id}`)));

        navigate(`/chats/${user.id}`)
    };
    
    return (
        <div onClick={handleClick} className="w-full shadow p-4 max-w-[90%] z-50 text-gray-500 bg-white rounded-lg mt-2">
            <div className="flex">
                <img className="w-8 h-8 rounded-full" src={user.photoURL} alt={user.displayName} />
                <div className="ms-3 text-sm font-normal">
                    <span className="mb-1 text-sm font-semibold text-primary">{user.displayName}</span>
                    {user.messages.map((msg, msgIndex) => (
                        <div key={msgIndex} className="text-gray-600">
                            {msg.status === 'follow' ? (
                                <div>
                                    <div>{msg.message}</div>
                                </div>
                            ) : msg.status === 'message' ? (
                                <div>
                                    <div>{msg.message}</div>
                                </div>
                            ) : (
                                <div>{msg.message}</div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="ms-auto -mt-1">
                    <span className="text-xs text-gray-400">{hour}</span>
                </div>
            </div>
        </div>
    );
};

export default Toast;
