import React from 'react';
import ListAdmin from './ListAdmin';

const AdminPlans = () => {
 
    return (
     <ListAdmin table='plans' addRoute = 'addplan' editRoute = 'editplan' title = 'Planes' secondTable = 'Precio' />
    );
  };

export default AdminPlans;
