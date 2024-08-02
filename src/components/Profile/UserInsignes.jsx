import React from 'react';

const UserInsignes = ({ data, title, functionData,}) => {
    return (
        <div>
            <div className='my-8'>
                <h2 className='font-bold text-lg'>Tus {title}</h2>
                <p className='text-xs'>Selecciona hasta tres para mostrar en las busquedas</p>
            </div>

            <div className={data.length === 0 ? '' : 'grid grid-cols-3'}>
                {data.length === 0 ? (
                    <p className='text-center'>No tienes ningún juego favorito de momento.</p>
                ) : (
                    data.map((game, index) => (
                        <div onClick={location.pathname === '/profile' ? () => functionData(index) : null} key={index}>

                            <div className={`rounded-full p-2 w-12 h-12 mx-auto flex items-center ${game.condition ? 'bg-primary' : 'bg-gray-300'}`}>
                                <img className='mx-auto w-7' src={game.icon} alt={game.title} />
                            </div>
                            <div className='text-center my-2'>{game.title}</div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default UserInsignes;
