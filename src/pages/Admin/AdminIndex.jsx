import React, { useEffect, useState } from 'react';
import AdminGames from './AdminGames';
import Dashboard from './Dashboard';
import AdminPlans from './AdminPlans';
import UserList from '../../components/Home/userList';
import { getDataDB } from '../../credentials';

const AdminIndex = () => {
    const [selectedComponent, setSelectedComponent] = useState('adminGames');
    const [users, setUsers] = useState('')

    useEffect(() => {
        const fetchUsers = async () => {
            const data = await getDataDB('users')
            setUsers(data)
        }
        fetchUsers()
    }, [])
    const handleChange = (event) => {
        setSelectedComponent(event.target.value);
    };

    return (
        <div className='container mx-auto  my-4 space-y-4'>
            <div className='px-4'>
                <select
                    className='w-full text-sm px-4 py-2 bg-primary text-white rounded-md  focus:outline-none focus:ring focus:border-primary'
                    value={selectedComponent}
                    onChange={handleChange}
                >
                    <option value="adminGames">Admin Games</option>
                    <option value="dashboard">Dashboard</option>
                    <option value="users">Usuarios</option>
                </select>
            </div>

            {selectedComponent === 'adminGames' && <AdminGames />}
            {selectedComponent === 'dashboard' && <Dashboard />}
            {selectedComponent === 'users' && <UserList users={users} search />}
        </div>
    );
}

export default AdminIndex;
