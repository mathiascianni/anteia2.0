import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../credentials';
import OptionItem from '../components/Options/OptionItem';
import { TopBar } from '../components/Navigation';

const Options = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            localStorage.removeItem('userId');
            await auth.signOut();
            navigate('/login');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <>
        <TopBar title={'Opciones'}/>
        <div className='container px-4 my-4'>
            <ul>
                <OptionItem text="Cerrar Sesión" link="/splash" onClick={handleLogout} />
            </ul>
        </div>
        </>
    );
}

export default Options;
