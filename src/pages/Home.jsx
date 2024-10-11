import React, { useEffect, useState } from 'react';
import { addDataArrayDB, getDataDB } from '../credentials';
import UserCard from '../components/Home/UserCard';
import CarrouselGames from '../components/Home/CarrouselGames';
import { SpinnerLoader } from '../components/General';
import { Link } from 'react-router-dom';
import { TopBar } from '../components/Navigation';
import { getAuth } from 'firebase/auth';

const Home = () => {
  const auth = getAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const obtenerUsuarios = async () => {
      try {
        const datos = await getDataDB('users');
        const usuariosFiltrados = datos.filter(user => user.id !== auth.currentUser.uid);

        const usuariosOrdenados = usuariosFiltrados.sort((a, b) => b.matchs - a.matchs).slice(0, 3);

        setUsers(usuariosOrdenados);
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
    return <SpinnerLoader />;
  }

  return (
    <div className="mx-auto px-4">
      <TopBar bell />
      <h1>Usuarios con mas matchs</h1>
      <ul>
        {users.map((user) => (
          <Link to={`/profile/${user.id}`} className='block' key={user.id}>
            <UserCard key={user.id} user={user} />
          </Link>
        ))}
      </ul>
      <CarrouselGames />
    </div>
  );
};

export default Home;