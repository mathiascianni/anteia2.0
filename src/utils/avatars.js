export const getRandomAvatar = () => {
    const avatars = [
        '/media/avatars/avatar_1.png',
        '/media/avatars/avatar_2.png',
        '/media/avatars/avatar_3.png',
        '/media/avatars/avatar_4.png',
        '/media/avatars/avatar_5.png',
        '/media/avatars/avatar_6.png',
        '/media/avatars/avatar_7.png',
        '/media/avatars/avatar_8.png',
        '/media/avatars/avatar_9.png',
    ];

    const randomIndex = Math.floor(Math.random() * avatars.length);
    return avatars[randomIndex];
};