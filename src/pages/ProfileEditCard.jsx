import React, { useEffect, useState } from 'react';
import { firestore, getDataDB, getUserById } from '../credentials';
import UserCard from '../components/Home/UserCard';
import { SpinnerLoader } from '../components/General';
import { TopBar } from '../components/Navigation';
import Button from '../components/Auth/Button';
import { doc, updateDoc } from 'firebase/firestore';

const ProfileEditCard = () => {
    const [user, setUser] = useState(null);
    const [colors, setColors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBorderColor, setSelectedBorderColor] = useState('');
    const [selectedBackgroundColor, setSelectedBackgroundColor] = useState('');
    const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId');

    useEffect(() => {
        const fetchUserData = async () => {
            if (!userId) {
                console.error("No se encontró un userId");
                return;
            }
            try {
                const userData = await getUserById(userId);
                const colorsData = await getDataDB('colors');
                setColors(colorsData[0].color);

                setSelectedBorderColor(userData.colors[0]?.border || ''); // Asume que quieres editar el primer color
                setSelectedBackgroundColor(userData.colors[0]?.background || '');

                setUser(userData);
            } catch (error) {
                console.error("Error al obtener los datos del usuario:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    const handleBorderColorSelect = (color) => {
        setSelectedBorderColor(color);
    };

    const handleBackgroundColorSelect = (color) => {
        setSelectedBackgroundColor(color);
    };

    const handleSubmit = async () => {
        if (user) {
            try {
                const userRef = doc(firestore, 'users', userId);
                await updateDoc(userRef, {

                    colors:
                    {
                        border: selectedBorderColor,
                        background: selectedBackgroundColor,
                    },


                });
                console.log("Colores actualizados correctamente");
            } catch (error) {
                console.error("Error al actualizar los colores:", error);
            }
        }
    };

    if (loading) {
        return <SpinnerLoader />;
    }

    return (
        <div>
            <TopBar backBtn bell title={'Edita la card'} />
            <div className='px-4'>
                {user ? (
                    <UserCard
                        user={user}
                        borderColor={selectedBorderColor}
                        backgroundColor={selectedBackgroundColor}
                    />
                ) : (
                    <p>No se encontraron datos de usuario</p>
                )}

                <p className='mb-4'>Selecciona tu Color de borde:</p>
                <div className='grid grid-cols-4 gap-4'>
                    {colors.map((color, index) => (
                        <div
                            key={index}
                            onClick={() => handleBorderColorSelect(color)}
                            className={`w-20 h-20 rounded-full cursor-pointer transition-transform transform hover:scale-110 ${selectedBorderColor === color ? 'border-4 border-black' : ''}`}
                            style={{ backgroundColor: color }}
                        />
                    ))}
                </div>
                <p className='mb-4'>Selecciona tu Color de fondo:</p>
                <div className='grid grid-cols-4 gap-4'>
                    {colors.map((color, index) => (
                        <div
                            key={index}
                            onClick={() => handleBackgroundColorSelect(color)}
                            className={`w-20 h-20 rounded-full cursor-pointer transition-transform transform hover:scale-110 ${selectedBackgroundColor === color ? 'border-4 border-black' : ''}`}
                            style={{ backgroundColor: color }}
                        />
                    ))}
                </div>
                <div className='pt-8'>
                    <Button text={'Editar'} handleSubmit={handleSubmit} />
                </div>
            </div>
        </div>
    );
};

export default ProfileEditCard;
