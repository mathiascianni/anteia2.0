import React, { useEffect, useState } from 'react';
import { addDataArrayDB, getDataDB } from '../credentials';
import UserCard from '../components/Home/UserCard';
import CarrouselGames from '../components/Home/CarrouselGames';
import Loading from '../components/Navigation/Loading';
import { Link } from 'react-router-dom';


const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const obtenerUsuarios = async () => {
      try {
        const datos = await getDataDB('users');
        setUsers(datos);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener datos de usuarios:', error);
      }
    };
    obtenerUsuarios();
    return () => {

    };
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4">
      <ul>
        {users.map((user) => (
          <Link to={`/profile/${user.id}`} className='block'>
            <UserCard key={user.id} user={user} />
          </Link>
        ))}
      </ul>

      <CarrouselGames />

    </div>
  );
};

export default Home;