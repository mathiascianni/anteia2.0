import React from 'react';

const Button = ({text, Color, backgroundColor}) => {
    return (
        <>
            <button className='bg-white text-{fontColor} bg-red-500 border-2 border-medium px-8 py-2 rounded-md my-4'>{text}</button>
        </>
    );
}

export default Button;
