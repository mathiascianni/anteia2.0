import React, { useState } from 'react';
import AdminGames from './AdminGames';
import Dashboard from './Dashboard';
import AdminPlans from './AdminPlans';

const AdminIndex = () => {
    const [selectedComponent, setSelectedComponent] = useState('adminGames');

    const handleChange = (event) => {
        setSelectedComponent(event.target.value);
    };

    return (
        <div className='container mx-auto px-4 my-4 space-y-4'>
            <select
                className='w-full text-sm px-4 py-2 bg-primary text-white rounded-md  focus:outline-none focus:ring focus:border-primary'
                value={selectedComponent}
                onChange={handleChange}
            >
                <option value="adminGames">Admin Games</option>
                <option value="dashboard">Dashboard</option>
            </select>

            {selectedComponent === 'adminGames' && <AdminGames />}
            {selectedComponent === 'dashboard' && <Dashboard />}
        </div>
    );
}

export default AdminIndex;
