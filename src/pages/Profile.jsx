import React, { useEffect, useState } from 'react';
import { auth, changeGameCondition, completeBadges, getDataDB, getUserById } from '../credentials';
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

  if (loading) {
    return <SpinnerLoader />;
  }
  return (
    <div key={user.uid}>
      <div className='px-4'>
        <TopBar backBtn bell />
      </div>
      <ProfileHeader user={user} />
      <div className='px-4 my-4'>
        <Stats user={user} />
        <Badges user={user} />
        <FavoriteGames user={user} />
      </div>
    </div>
  );
};

export default Profile;
