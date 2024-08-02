import React, { useEffect, useState } from 'react';
import { auth, changeGameCondition, completeInsignes, getDataDB, getUserById } from '../credentials';
import { Link, useLocation, useParams } from 'react-router-dom';
import { EditIcon } from '../Icons';
import UserCard from '../components/Home/UserCard';
import UserInsignes from '../components/Profile/UserInsignes';
import Loading from '../components/Navigation/Loading';

const Profile = () => {
  const { uid } = useParams();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [insignes, setInsignes] = useState([]);
  const [profileImageURL, setProfileImageURL] = useState('');
  const [profileBannerURL, setProfileBannerURL] = useState('');
  const [games, setGames] = useState([]);

  useEffect(() => {
    const obtenerInsignias = async () => {
      try {
        const datos = await getDataDB('insignias');
        setInsignes(datos);
      } catch (error) {
        console.error('Error al obtener datos de las insignias:', error);
      }
    };
    obtenerInsignias();
  }, []);

  const changeInsignes = async (insigniaName) => {
    try {
      await completeInsignes(user.id, insigniaName);
      setUser(prevUser => ({
        ...prevUser,
        insignias: {
          ...prevUser.insignias,
          [insigniaName]: !prevUser.insignias[insigniaName]
        }
      }));
    } catch (error) {
      console.error('Error al cambiar las insignias:', error);
    }
  };

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
              setProfileImageURL(userData.photoURL);
              setProfileBannerURL(userData.banner);
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
          setProfileImageURL(userData.photoURL);
          setProfileBannerURL(userData.banner);
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
    return <Loading/>;
  }

  const backgroundStyle = profileBannerURL
    ? { backgroundImage: `url(${profileBannerURL})`, backgroundSize: 'cover' }
    : {};

  return (
    <div key={user.uid}>
      <div
        key={user.uid}
        style={backgroundStyle}
        className={`border-b-2 text-white text-center pt-44 relative ${!profileBannerURL ? 'bg-primary' : ''}`}
      >
        <img
          className="w-40 rounded-full absolute top-24 inset-0 mx-auto border-solid border-white border-8"
          src={profileImageURL || 'assets/user/avatar.png'}
          alt="User Profile"
        />
      </div>
      {location.pathname === '/profile' &&
        (<Link className='absolute right-28 top-64' to={`/profile/edit`}>
          <div className='bg-primary rounded-full p-2 mx-1 border-solid border-white border-2 shadow-sm'>
            <EditIcon />
          </div>
        </Link>)}

      <div className="px-4 pt-20">
        <h1 className="text-3xl font-bold text-center">{user.displayName}</h1>
        <p className="text-sm text-gray-500 text-center">⭐⭐⭐⭐⭐</p>
      </div>
      <div className='container mx-auto px-4 my-4'>
        <h2 className='font-bold text-lg my-4'>Tus estadísticas</h2>
        <div>
          <ul>
            <li>Cantidad de matchs <span className='text-primary font-bold'>7</span></li>
            <li>Cantidad de recomendaciones <span className='text-primary font-bold'>5</span></li>
            <li>Cantidad de insignias <span className='text-primary font-bold'>2/18</span></li>
          </ul>
        </div>
        <div>
          <div className='my-8'>
            <h2 className='font-bold text-lg'>Tus insignias</h2>
            <p className='text-xs'>Selecciona hasta tres para mostrar en las busquedas</p>
          </div>
          <div className='grid grid-cols-3'>
            {insignes.map((insignia) => (
              <div onClick={location.pathname === '/profile' ? () => changeInsignes(insignia.title) : null} key={insignia.id}>

                <div className={`rounded-full p-2 w-12 h-12 mx-auto ${user.insignias && user.insignias[insignia.title] ? 'bg-primary' : 'bg-gray-300'}`}>
                  <img className=' mx-auto' src={insignia.icon} alt={insignia.title} />
                </div>

                <div className='text-center my-2'>{insignia.title}</div>
              </div>
            ))}
          </div>
        </div>
        <UserInsignes data={games} title='Juegos favoritos' functionData={changeGames} />
        
        <div className='my-8'>
          <h2 className='font-bold text-lg'>Previsualización</h2>
          {location.pathname === '/profile' && (
            <UserCard user={user} />
          )}

        </div>
      </div>
    </div>
  );
};

export default Profile;
