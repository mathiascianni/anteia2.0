import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth, getLastMessage, getMatchsData } from '../credentials';
import { TopBar } from '../components/Navigation';

const ListChats = () => {
    const [users, setUsers] = useState([]);
    const [chatMessages, setChatMessages] = useState({});
    const currentUserId = localStorage.getItem('userId')

    useEffect(() => {
        const fetchUsers = async () => {
            const usersData = await getMatchsData();
            setUsers(usersData);

            const lastMessages = await getLastMessage(usersData, currentUserId);
            console.log(lastMessages);
            setChatMessages(lastMessages);
        };

        fetchUsers();
    }, [currentUserId]);

    return (
        <div className="max-w-md mx-auto bg-white shadow-lg">
            <div className='px-4'>
                <TopBar title={'Chats'} backBtn />
            </div>

            {users.length === 0 ? (
                <div className="px-4 py-6 text-center">
                    <p className="text-lg text-gray-600">No tienes matchs</p>
                </div>
            ) : (
                <ul className="divide-y divide-gray-200">
                    {users.map((user) => (
                        <Link
                            key={user.id}
                            to={`/chats/${user.id}`}
                            className="flex items-center px-4 py-3 hover:bg-gray-50 transition duration-150 ease-in-out cursor-pointer"
                        >
                            <div className="flex-shrink-0 h-10 w-10">
                                {user.photoURL ? (
                                    <img className="h-10 w-10 rounded-full" src={user.photoURL} alt={user.displayName || user.email} />
                                ) : (
                                    <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold text-lg">
                                        {(user.displayName || user.email || '?')[0].toUpperCase()}
                                    </div>
                                )}
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900">{user.displayName || user.email}</p>
                                <p className="text-sm text-gray-500">{chatMessages[user.id] || 'No messages yet'}</p>
                            </div>
                        </Link>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ListChats;
