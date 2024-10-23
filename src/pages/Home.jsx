import React, { useEffect, useState } from 'react';
import { addDataArrayDB, getDataDB, getUrlsStorage } from '../credentials';
import UserCard from '../components/Home/UserCard';
import CarrouselGames from '../components/Home/CarrouselGames';
import { SpinnerLoader } from '../components/General';
import { Link } from 'react-router-dom';
import { TopBar } from '../components/Navigation';
import { getAuth } from 'firebase/auth';
import UserList from '../components/Home/userList';
import Banner from '../components/Home/Banner';

const Home = () => {
  let userId = localStorage.getItem('userId');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);
  const [matchs, setMatchs] = useState([]);

  if (!userId) {
    userId = sessionStorage.getItem('userId');
  }

  useEffect(() => {
    setLoading(true);
    const obtenerUsuarios = async () => {
      try {
        const datos = await getDataDB('users');
        const usuariosFiltrados = datos.filter(user => user.id !== userId);
        const usuariosRecomendados = usuariosFiltrados.sort((a, b) =>
          (b.recommendations?.length ?? 0) - (a.recommendations?.length ?? 0)
        ).slice(0, 4);

        const usuariosMatchs = usuariosFiltrados.sort((a, b) =>
          (b.matchs?.length ?? 0) - (a.matchs?.length ?? 0)
        ).slice(0, 4);

        setUsers(usuariosFiltrados);
        setRecommendations(usuariosRecomendados);
        setMatchs(usuariosMatchs);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener datos de usuarios:', error);
      }
    };

    obtenerUsuarios();
    return () => { };
  }, []);

  if (loading) {
    return <SpinnerLoader />;
  }

  return (
    <div className="mx-auto">
      <TopBar bell icon />
      <div>
        <UserList users={recommendations} title={'Usuarios Recomendados'} />
        <Banner />
        <CarrouselGames />
        <UserList users={matchs} title={'Usuarios Matchs'} />
      </div>
    </div>
  );
};

export default Home;
