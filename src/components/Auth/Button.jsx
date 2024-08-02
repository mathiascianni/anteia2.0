import React from 'react';

const Button = ({ text, handleSubmit }) => {
    return (
        <button
            className='mx-auto text-white bg-primary px-32 py-4 rounded-lg'
            onClick={handleSubmit}
        >
            {text}
        </button>
    );
}

export default Button;
