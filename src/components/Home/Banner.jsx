import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div className='relative mb-12 bg-primary-dark'>
            <div className='p-4 text-light space-y-4 flex flex-col relative z-10 border-y-4 border-dark'>
                <h2 className='text-2xl'>Explorá al <span className='font-bold'>máximo</span> a tus próximos <span className='font-bold'>compañeros</span></h2>
                <p>Puedes conocer gamers con tus mismos gustos para jugar de la forma más sana posible.</p>
                <ul className='text-xs font-light space-y-1'>
                    <li>Conocer gente</li>
                    <li>Informa tus gustos</li>
                    <li>Juega y diviértete</li>
                </ul>
                <div className='flex justify-end'>
                    <Link to={'/plans'} className='bg-dark rounded-lg text-sm font-bold !mt-12 px-8 py-4'>¡Mirar Planes!</Link>
                </div>
            </div>
        </div>
    );
}

export default Banner;
