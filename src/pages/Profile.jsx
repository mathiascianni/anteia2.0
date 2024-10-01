import React, { useEffect, useState } from 'react';
import { auth, changeGameCondition, completeBadges, getDataDB, getUserById, followUser } from '../credentials';
import { Link, useLocation, useParams } from 'react-router-dom';
import { EditIcon } from '../Icons';
import UserCard from '../components/Home/UserCard';
import { SpinnerLoader } from '../components/General';
import { TopBar } from '../components/Navigation';
import { Badges, FavoriteGames, ProfileCardPreview, ProfileHeader, Stats } from '../components/Profile';

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
  const [isFollowing, setIsFollowing] = useState(false);

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

  const checkCurrentUser = auth.onAuthStateChanged((currentUser) => {
    if (currentUser) {
      setIsCurrentUser(currentUser.uid === uid);
      // Verificar si el usuario actual ya sigue a este perfil
      getUserById(currentUser.uid).then(currentUserData => {
        setIsFollowing(currentUserData.friends && currentUserData.friends.includes(uid));
      });
    }
  });

  const handleFollow = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        await followUser(currentUser.uid, user.id);
        setIsFollowing(true);
      }
    } catch (error) {
      console.error('Error al seguir al usuario:', error);
    }
  };

  if (loading) {
    return <SpinnerLoader />;
  }
  return (
    <div key={user.uid}>
      <div className='px-4'>
        <TopBar backBtn bell />
      </div>
      <ProfileHeader user={user} />
      {!isCurrentUser && (
        <div className='px-4 my-4'>
          {isFollowing ? (
            <Link to={`/chats/${user.id}`} className="btn">
              Mandar un mensaje
            </Link>
          ) : (
            <button
              onClick={handleFollow}
              className="btn"
            >
              Seguir
            </button>
          )}
        </div>
      )}
      <div className='px-4 my-4'>
        <Stats user={user} />
        <Badges user={user} />
        <FavoriteGames user={user} />
      </div>
    </div>
  );
};

export default Profile;
