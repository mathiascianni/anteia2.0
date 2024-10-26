import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserCard from './UserCard';
import Input from '../Auth/Input';

const UserList = ({ users, title, search }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId')
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        console.log('Search Term:', e.target.value); 
    };

    
    const filteredUsers = users.filter((user) => {
        return user.id !== userId && 
               user.displayName?.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className='mb-12'>
            <h2 className='font-bold text-xl mb-2 px-4'>{title}</h2>
            {search && (
                <div className='px-4'>
                    <Input type='text' value={searchTerm} onChange={handleSearchChange} title='Buscar Usuario' />
                </div>
            )}
            <ul className='px-4'>
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                        <Link to={`/profile/${user.id}`} className='block' key={user.id}>
                            <UserCard user={user} />
                        </Link>
                    ))
                ) : (
                    <li>No se encontraron usuarios.</li>
                )}
            </ul>
        </div>
    );
};

export default UserList;
