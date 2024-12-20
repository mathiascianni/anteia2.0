import React, { useEffect, useState } from 'react';
import { getDataDB } from '../credentials';
import { Link } from 'react-router-dom';

const Plans = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const obtenerData = async () => {
      try {
        const data = await getDataDB('plans');
        setPlans(data);
      } catch (error) {
        console.error('Error al obtener datos', error);
      }
    };

    obtenerData();
  }, []);

  console.log(plans);

  return (
    <div>
      {plans.map((plan) => (
        <Link key={plan.id} to={`/plans/${plan.id}`} style={{ textDecoration: 'none' }}>
          <div
            style={{
              background: `linear-gradient(-70deg, ${plan.color} 10%, white 40%, ${plan.color} 100%)`, 
              padding: '14px',
              margin: '10px',
              borderRadius: '8px',
              cursor: 'pointer', 
            }}
            className="plan-card flex items-end relative h-[210px] overflow-hidden"
          >
            <div>
              <div className='font-bold text-2xl'>Plan {plan.title}</div>
              <div>USD {plan.price}/{plan.duration} mes</div>
            </div>

            <img className='w-50 absolute -right-14 -bottom-14' src="./assets/plans/gold.png" alt="" />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Plans;
