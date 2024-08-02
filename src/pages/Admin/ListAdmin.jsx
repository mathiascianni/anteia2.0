import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteDataDB, getDataDB } from '../../credentials';

const ListAdmin = ({table, addRoute, editRoute, title, secondTable}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
      const obtenerData = async () => {
        try {
          const datos = await getDataDB(table);
          setData(datos);
        } catch (error) {
          console.error('Error al obtener datos', error);
        }
      };
      obtenerData();
      return () => { };
    }, []);
  
    const handleDelete = async (dataId) => {
      try {
        await deleteDataDB(`${table}/${dataId}`);
        console.log('Plan eliminado correctamente');
        setData(data.filter((data) => data.id !== dataId));
      } catch (error) {
        console.error('Error al eliminar el Plan:', error);
      }
    };
  
    return (
      <div className=''>
        <h1 className='text-2xl font-bold my-2 '>Administrar {title}</h1>
        <div className='text-xl mb-4'>Lista de {title}</div>
        <div className='mb-6'>
          <Link to={`/admin/${addRoute}`} className='bg-primary text-white px-4 py-2 text-xs rounded-md'>
            Crear nuevo {title}
          </Link>
        </div>
        <div className=''>
        <table className='border-collapse w-full'>
          <thead className='w-full '>
            <tr>
              <th className='text-start px-4'>Título</th>
              <th>{secondTable}</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data, index) => (
              <tr className={index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-300'} key={data.id}>
                <td className='w-1/3 px-4'>
                  {data.title}
                </td>
                <td>{secondTable === 'Precio' ? data.price : '13k'}</td>
                <td className='flex justify-end'>
                  <Link to={`/admin/${editRoute}/${data.id}`}><button className='bg-primary text-white px-4 py-2 text-sm' >Editar</button></Link>
                  <button className='bg-error text-white px-4 py-2 text-sm' onClick={() => handleDelete(data.id)}>Borrar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        
      </div>
    );
  };

export default ListAdmin;
