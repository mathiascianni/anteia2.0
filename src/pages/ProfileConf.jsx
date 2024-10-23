import React from 'react';
import { TopBar } from '../components/Navigation';
import OptionItem from '../components/Options/OptionItem';
import { auth, changeFollowStatusFalse, getUserById, sendNotification } from '../credentials';
import { useParams } from 'react-router-dom';

const ProfileConf = () => {
    const { uid } = useParams();
    const handleUnfollow = async () => {
        let authUserId = localStorage.getItem('userId')
        if (!authUserId) {
            authUserId = sessionStorage.getItem('userId')
        }
        await changeFollowStatusFalse(authUserId, uid)
        const message = `te dejo de seguir`
        await sendNotification(message, authUserId, uid, 'follow')
    }
    return (
        <div className='px-4'>
            <TopBar backBtn bell />
            <ul>
                <OptionItem text="Dejar de seguir" onClick={handleUnfollow} />
                <OptionItem text="Denunciar" />
            </ul>
        </div>
    );
}

export default ProfileConf;
