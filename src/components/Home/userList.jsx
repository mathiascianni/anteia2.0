import React from 'react';
import { Link } from 'react-router-dom';
import UserCard from './UserCard';

const UserList = ({ users, title }) => {
    return (
        <div className='mb-12'>
            <h2 className='font-bold text-xl mb-2 px-4'>{title}</h2>
            <ul className='px-4'>
                {users.map((user) => (
                    <Link to={`/profile/${user.id}`} className='block' key={user.id}>
                        <UserCard key={user.id} user={user} />
                    </Link>
                ))}
            </ul>
        </div>
    );
}

export default UserList;
