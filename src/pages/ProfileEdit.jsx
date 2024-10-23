import React, { useEffect, useState } from 'react';
import { auth, completeBadges, getUrlsStorage, getUserById, updateAuthUserProfile, updateUserProfile, uploadImage } from '../credentials';
import Input from '../components/Auth/Input';
import Button from '../components/Auth/Button';
import { SpinnerLoader } from '../components/General';
import { useNavigate } from 'react-router-dom';

const ProfileEdit = () => {
    const [authUser, setAuthUser] = useState(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [avatars, setAvatars] = useState([]);
    const [banners, setBanners] = useState([]);
    const [selectedAvatar, setSelectedAvatar] = useState('');
    const [selectedBanner, setSelectedBanner] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => setAuthUser(user));
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (authUser) {
            getUserById(authUser.uid)
                .then(user => {
                    setUsername(user.displayName);
                    setEmail(user.email);
                    setSelectedBanner(user.banner);
                    setSelectedAvatar(user.photoURL);
                })
                .catch(error => console.error('Error fetching user data:', error));
        }
    }, [authUser]);

    useEffect(() => {
        const fetchUrls = async () => {
            const avatarsUrl = await getUrlsStorage('avatars');
            const bannersUrl = await getUrlsStorage('banners');
            setAvatars(avatarsUrl);
            setBanners(bannersUrl);
        };
        fetchUrls();
    }, []);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            let profileDownloadURL = selectedAvatar;
            let bannerDownloadURL = selectedBanner;

            if (selectedAvatar.startsWith('data:')) {
                profileDownloadURL = await uploadImage(selectedAvatar, 'profile.png');
            }

            if (selectedBanner.startsWith('data:')) {
                bannerDownloadURL = await uploadImage(selectedBanner, 'banner.png');
            }

            await updateUserProfile(authUser.uid, {
                displayName: username,
                email,
                banner: bannerDownloadURL,
                photoURL: profileDownloadURL,
            });

            await updateAuthUserProfile(username, profileDownloadURL, email);
            await completeBadges(authUser.uid, 'Primer Cambio');
            return navigate('/profile');
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div className='container mx-auto px-4'>
            {authUser ? (
                <>
                    <h1 className='text-3xl font-bold text-center mt-4'>Profile Edit</h1>
                    <form className='flex flex-col space-y-4 my-8' onSubmit={handleUpdateProfile}>
                        <Input title="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        <Input title="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                      
                        <p>Selecciona tu Avatar:</p>
                        <div className='grid grid-cols-3 gap-4'>
                            {avatars.map((avatar) => (
                                <div
                                    key={avatar}
                                    onClick={() => setSelectedAvatar(avatar)}
                                    className={`cursor-pointer rounded-full ${selectedAvatar === avatar ? 'border-4 border-primary' : ''}`}
                                >
                                    <img className='w-full rounded-full' src={avatar} alt="Avatar" />
                                </div>
                            ))}
                        </div>

                
                        <p>Selecciona tu Banner:</p>
                        <div className='grid grid-cols-2 gap-2'>
                            {banners.map((banner) => (
                                <div
                                    key={banner}
                                    onClick={() => setSelectedBanner(banner)}
                                    className={`cursor-pointer rounded-md ${selectedBanner === banner ? 'border-4 border-primary' : ''}`}
                                >
                                    <img className='w-full rounded-md' src={banner} alt="Banner" />
                                </div>
                            ))}
                        </div>

                        <Button text="Update Profile" handleSubmit={handleUpdateProfile} />
                    </form>
                </>
            ) : (
                <SpinnerLoader />
            )}
        </div>
    );
};

export default ProfileEdit;
