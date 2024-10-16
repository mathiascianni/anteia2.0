import React from 'react';
import { Link } from 'react-router-dom';

const Toast = ({ user, message, hour }) => {
    console.log(user)
    return (

        <Link to={`/chats/${user.id}`} className="w-full shadow p-4 max-w-[90%] z-50 text-gray-500 bg-white rounded-lg mt-2">
            <div className="flex">
                <img className="w-8 h-8 rounded-full" src={user.photoURL} alt="Adrian" />
                <div className="ms-3 text-sm font-normal">
                    <span className="mb-1 text-sm font-semibold text-primary">{user.displayName}</span>
                    <div className="mb-2 text-xs font-normal text-black">{message}</div>
                </div>
                <div className="ms-auto -mt-1">
                    <span className="text-xs text-gray-400">22:00</span>
                </div>
            </div>

        </Link>
    );
}

export default Toast;
