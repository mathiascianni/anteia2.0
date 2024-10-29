import React from 'react';
import { TopBar } from '../components/Navigation';
import OptionItem from '../components/Options/OptionItem';

const ProfileEdit = () => {
   
    return (
        <div className='px-4'>
            <TopBar backBtn bell title={'Editar'} />
            <ul>
                <OptionItem link='/profile/edit/user' text="Datos de usuario" />
                <OptionItem link='/profile/edit/card' text="Card de usuario" />
            </ul>
        </div>
    );
}

export default ProfileEdit;
