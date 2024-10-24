import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div className='relative mb-12'>
            <div className='bg-image'></div>
            <div className='p-4 text-white space-y-4 flex flex-col relative z-10 border-y-4 border-white'>
                <h2 className='text-2xl'>Explorá al <span className='font-bold'>máximo</span> a tus próximos <span className='font-bold'>compañeros</span></h2>
                <p>Puedes conocer gamers con tus mismos gustos para jugar de la forma más sana posible.</p>
                <ul className='text-xs font-light space-y-1'>
                    <li>Conocer gente</li>
                    <li>Informa tus gustos</li>
                    <li>Juega y diviértete</li>
                </ul>
                <div className='flex justify-end'>
                    <Link to={'/matchs'} className='bg-primary rounded-lg text-sm font-bold !mt-12 px-8 py-4'>¡Matchea ahora!</Link>
                </div>
            </div>
        </div>
    );
}

export default Banner;
