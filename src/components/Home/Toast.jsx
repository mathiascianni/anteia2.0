import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, deleteDataDB, getAllNotifications } from '../../credentials';

const Toast = ({ user, notification, hour }) => {
    const navigate = useNavigate();
    const userId = auth.currentUser.uid
    const handleClick = async () => {
        const notificationsRef = `users/${userId}/notifications`;
        const allNotifications = await getAllNotifications(notificationsRef); 
        const notificationsToDelete = allNotifications.filter(n => n.sender === notification.sender);

        if(notification.status === 'follow'){
            navigate(`/profile/${user.id}`);
        } else if(notification.status === 'message'){
            navigate(`/chats/${user.id}`);
        }
        
        await Promise.all(notificationsToDelete.map(n => deleteDataDB(`${notificationsRef}/${n.id}`))); 
    }
    console.log(notification)
    return (
        <div onClick={handleClick} className="w-full shadow p-4 max-w-[90%] z-50 text-gray-500 bg-white rounded-lg mt-2">
            <div className="flex">
                <img className="w-8 h-8 rounded-full" src={user.photoURL} alt="Adrian" />
                <div className="ms-3 text-sm font-normal">
                    <span className="mb-1 text-sm font-semibold text-primary">{user.displayName}</span>
                    <div className="mb-2 text-xs font-normal text-black">{notification.message}</div>
                </div>
                <div className="ms-auto -mt-1">
                    <span className="text-xs text-gray-400">22:00</span>
                </div>
            </div>

        </div>
    );
}

export default Toast;
