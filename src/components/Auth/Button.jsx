import React from 'react';

const Button = ({ text, handleSubmit }) => {
    return (
        <button
            className='mx-auto text-white bg-primary w-full py-4 rounded-lg'
            onClick={handleSubmit}
        >
            {text}
        </button>
    );
}

export default Button;
