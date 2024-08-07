import React from 'react';
import { useNavigate } from 'react-router-dom';
import OptionItem from '../components/Options/OptionItem';
import { auth } from '../credentials';

const Options = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await auth.signOut();
            navigate('/login');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <div className='container px-4 my-4'>
            <ul>
                <OptionItem text="Cerrar Sesión" link="/login" onClick={handleLogout} />
            </ul>
        </div>
    );
}

export default Options;
