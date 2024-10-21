import React from 'react';
import { Link } from 'react-router-dom';
import UserCard from './UserCard';

const UserList = ({ users }) => {
    return (
        <ul>
            {users.map((user) => (
                <Link to={`/profile/${user.id}`} className='block' key={user.id}>
                    <UserCard key={user.id} user={user} />
                </Link>
            ))}
        </ul>
    );
}

export default UserList;
