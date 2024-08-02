import React, { useEffect, useState } from 'react';
import { auth, completeInsignes, getUserById, storage, updateAuthUserProfile, updateUserProfile } from '../credentials';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Input from '../components/Auth/Input';
import Button from '../components/Auth/Button';
import Loading from '../components/Navigation/Loading';

const ProfileEdit = () => {
    const [authUser, setAuthUser] = useState(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [banner, setBanner] = useState('');
    const [profileImage, setProfileImage] = useState(null);

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
                    setBanner(user.banner);
                    setProfileImage(user.photoURL);
                })
                .catch(error => console.error('Error fetching user data:', error));
        }
    }, [authUser]);

    const handleInputChange = (setter) => (e) => setter(e.target.value);

    const handleFileChange = (setter) => (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => setter(reader.result);
        if (file) reader.readAsDataURL(file);
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            let profileDownloadURL = profileImage;
            let bannerDownloadURL = banner;

            const uploadImage = async (image, path) => {
                const blob = await fetch(image).then(res => res.blob());
                const storageRef = ref(storage, `users/${authUser.uid}/${path}`);
                const snapshot = await uploadBytes(storageRef, blob, { contentType: 'image/png' });
                return await getDownloadURL(snapshot.ref);
            };

            if (profileImage && profileImage.startsWith('data:')) {
                profileDownloadURL = await uploadImage(profileImage, 'profile.png');
            }

            if (banner && banner.startsWith('data:')) {
                bannerDownloadURL = await uploadImage(banner, 'banner.png');
            }

            await updateUserProfile(authUser.uid, {
                displayName: username,
                email,
                banner: bannerDownloadURL,
                photoURL: profileDownloadURL,
            });

            await updateAuthUserProfile(username, profileDownloadURL, email);
            completeInsignes(authUser.uid, 'primer edit');
            console.log('Profile updated successfully!');
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
                        <Input title="Username" type="text" value={username} onChange={handleInputChange(setUsername)} required />
                        <Input title="Email" type="email" value={email} onChange={handleInputChange(setEmail)} />
                        <Input title="New Password" type="password" value={password} onChange={handleInputChange(setPassword)} />
                        <label>
                            <p>Profile:</p>
                            <input className='hidden' type="file" id="profile" name="profile" onChange={handleFileChange(setProfileImage)} />
                            <div className='grid grid-cols-6'>
                                {profileImage && <img className='w-20 mx-auto my-auto rounded-full col-span-2' src={profileImage} alt="Profile" />}
                                <div htmlFor="profile" className='w-full h-24 rounded-md bg-medium col-span-4 flex justify-center items-center'>
                                    <p className='text-gray-300 border-dotted border-2 border-light py-6 px-9'>tap para cambiar</p>
                                </div>
                            </div>
                        </label>
                        <label>
                            <p>Banner:</p>
                            <input type="file" id='banner' name='banner' className='hidden' onChange={handleFileChange(setBanner)} />
                            {banner && <img className='rounded-md' htmlFor="banner" src={banner} alt="Banner" />}
                        </label>
                        <Button text="Update Profile" handleSubmit={handleUpdateProfile} />
                    </form>
                </>
            ) : (
                <Loading />
            )}
        </div>
    );
};

export default ProfileEdit;
