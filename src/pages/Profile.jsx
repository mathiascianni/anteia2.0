import React, { useEffect, useState } from 'react';
import { auth, changeGameCondition, completeBadges, getDataDB, getUserById, checkFollowStatus, changeFollowStatus, createChat, matchsUser, searchBadgeForName } from '../credentials';
import { Link, useLocation, useParams } from 'react-router-dom';
import { EditIcon } from '../Icons';
import UserCard from '../components/Home/UserCard';
import { SpinnerLoader } from '../components/General';
import { TopBar } from '../components/Navigation';
import { Badges, FavoriteGames, ProfileCardPreview, ProfileHeader, Stats } from '../components/Profile';
import Button from '../components/Auth/Button';

const Profile = () => {
  const { uid } = useParams();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [badges, setBadges] = useState([]);
  const [profileImageURL, setProfileImageURL] = useState('');
  const [profileBannerURL, setProfileBannerURL] = useState('');
  const [games, setGames] = useState([]);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [isFollowing, setIsFollowing] = useState();
  const [buttonText, setButtonText] = useState('Seguir +'); // Estado para el texto del botón

  useEffect(() => {
    const getBadges = async () => {
      try {
        const datos = await getDataDB('badges');
        setBadges(datos);
      } catch (error) {
        console.error('Error al obtener datos de las insignias:', error);
      }
    };
    getBadges();
  }, []);

  const changeGames = async (gameIndex) => {
    try {
      await changeGameCondition(user.id, gameIndex);

      setUser(prevUser => {
        const updatedGames = [...prevUser.games];
        updatedGames[gameIndex] = {
          ...updatedGames[gameIndex],
          condition: !updatedGames[gameIndex].condition
        };
        return {
          ...prevUser,
          games: updatedGames
        };
      });
    } catch (error) {
      console.error('Error al cambiar los juegos:', error);
    }
  };

  useEffect(() => {
    setLoading(true);

    if (location.pathname === '/profile') {
      const getUser = auth.onAuthStateChanged((currentUser) => {
        if (currentUser) {
          getUserById(currentUser.uid)
            .then(userData => {
              setUser(userData);
              setGames(userData.games || []);
              setLoading(false);
            })
            .catch(error => {
              console.error('Error obteniendo datos del usuario:', error);
              setLoading(false);
            });
        } else {
          setLoading(false);
        }
      });

      return () => {
        getUser();
      };

    } else {
      getUserById(uid)
        .then(userData => {
          setUser(userData);
          setGames(userData.games || []);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error obteniendo datos del usuario:', error);
          setLoading(false);
        });
    }
  }, [location.pathname, uid]);

  const handleFollow = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const connectionExists = await checkFollowStatus(currentUser.uid, user.id);
        if (connectionExists === 3) {
          await changeFollowStatus(currentUser.uid, user.id)
          await matchsUser(currentUser.uid, user.id)
        } else if (connectionExists === 4) {
          await createChat(currentUser.uid, user.id);
        } 
      }
    } catch (error) {
      console.error('Error al seguir al usuario:', error);
    }
  };

  useEffect(() => {
    const checkUserConnection = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const status = await checkFollowStatus(currentUser.uid, uid);
        setIsFollowing(status);
      }
    };

    checkUserConnection();
  }, [uid, user, isFollowing]);

  if (loading) {
    return <SpinnerLoader />;
  }
  return (
    <div key={user.uid}>
      <div className='px-4'>
        <TopBar backBtn bell />
      </div>
      <ProfileHeader user={user} like />
      {console.log(isFollowing)}
      <div className='px-4 my-4'>
        {isFollowing === 1 ?
          <div className='grid grid-cols-3 gap-2'>
            <Link className='col-span-1'>
            <Button text={'Conf'}/>
            </Link>
            <Link to={`/chats/${user.id}`} className='col-span-2'>
              <Button text={'Mandar un mensaje'} handleSubmit={handleFollow} />
            </Link>
          </div>
          :
          <Button text={isFollowing === 2 ? 'Esperando follow' : isFollowing === 3 ? 'Seguir Tambien' : 'Seguir +'} handleSubmit={handleFollow} />
        }
      </div>

      <div className='px-4 my-4'>
        <Stats user={user} />
        <Badges user={user} badges={badges} />
        <FavoriteGames user={user} />
      </div>
    </div>
  );
};

export default Profile;
