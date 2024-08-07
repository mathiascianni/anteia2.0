import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDataDB, deleteDataDB } from '../../credentials';
import Select from '../../components/Auth/Select';
import ListAdmin from './ListAdmin';

const AdminGames = () => {

  return (
    <ListAdmin table='games' addRoute='addgame' editRoute='editgame' title='Crear nuevo juego' secondTable='Usuarios' />
  );
};

export default AdminGames;