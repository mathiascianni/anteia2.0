import React from 'react';
import Button from './Button';

const Modal = () => {
    return (
        <div className='mx-4 rounded-lg '>
            <h1 className='w-full rounded-t-lg py-4 text-white bg-black px-8'>titulo</h1>
            <div className='container px-4 py-4'>
                <p>texto</p>
            </div>
            <div className='container mx-auto flex space-x-8 justify-center my-4 font-sm text-sm'>
                <Button text="No, cancelar" />
                <Button text="Para Continuar" />
            </div>

        </div>
    );
}

export default Modal;
