import React from 'react';
import { Heart } from '../../Icons';
import { Link } from 'react-router-dom';

const OptionItem = ({ text = '', link = '', onClick = () => {} }) => {
    return (
        <li>
            <Link 
                to={link} 
                onClick={onClick} 
                className='flex space-x-2 items-center py-3 border-b-[1px] border-solid border-primary px-4'
            >
                <Heart />
                <p>{text}</p>
            </Link>
        </li>
    );
}

export default OptionItem;
