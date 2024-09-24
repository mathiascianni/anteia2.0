import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDataDB } from '../credentials';

const ListChats = () => {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const obtenerUsuarios = async () => {
            try {
                const datosUsuarios = await getDataDB('users');
                setUsuarios(datosUsuarios);
            } catch (error) {
                console.error('Error al obtener usuarios:', error);
            }
        };

        obtenerUsuarios();
    }, []);

    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-16">
            <div className="px-4 py-2 bg-gray-800">
                <h1 className="text-white text-lg font-bold">Chats</h1>
            </div>
            <ul className="divide-y divide-gray-200">
                {usuarios.map((usuario) => (
                    <Link 
                        key={usuario.id} 
                        to={`/chats/${usuario.id}`}
                        className="flex items-center px-4 py-3 hover:bg-gray-50 transition duration-150 ease-in-out cursor-pointer"
                    >
                        <div className="flex-shrink-0 h-10 w-10">
                            {usuario.photoURL ? (
                                <img className="h-10 w-10 rounded-full" src={usuario.photoURL} alt={usuario.displayName || usuario.email} />
                            ) : (
                                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold text-lg">
                                    {(usuario.displayName || usuario.email || '?')[0].toUpperCase()}
                                </div>
                            )}
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{usuario.displayName || usuario.email}</p>
                            <p className="text-sm text-gray-500">Último mensaje...</p>
                        </div>
                    </Link>
                ))}
            </ul>
        </div>
    );
}

export default ListChats;
