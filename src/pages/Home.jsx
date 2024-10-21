import React, { useEffect, useState } from 'react';
import { addDataArrayDB, getDataDB } from '../credentials';
import UserCard from '../components/Home/UserCard';
import CarrouselGames from '../components/Home/CarrouselGames';
import { SpinnerLoader } from '../components/General';
import { Link } from 'react-router-dom';
import { TopBar } from '../components/Navigation';
import { getAuth } from 'firebase/auth';
import UserList from '../components/Home/userList';

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
      <TopBar bell icon />
      <h2 className='font-bold text-lg mb-2 '>Usuarios con mas matchs</h2>
      <UserList users={users} />
      <CarrouselGames />
    </div>
  );
};

export default Home;