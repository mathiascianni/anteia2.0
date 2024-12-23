import React, { useEffect, useState } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { getPlanById } from '../credentials';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Plan = () => {
  const [plan, setPlan] = useState(null);
  const [preferenceId, setPreferenceId] = useState(null);
  const { planId } = useParams();
  const navigate = useNavigate(); 
  initMercadoPago('TEST-2b037921-520a-43df-a2a6-d38f108742d9');

  useEffect(() => {
    const obtenerData = async () => {
      try {
        const data = await getPlanById(planId);
        setPlan(data);
      } catch (error) {
        console.error('Error al obtener datos', error);
      }
    };

    obtenerData();
  }, [planId]);

  useEffect(() => {
    const createPreference = async () => {
      if (plan && plan.title && plan.price) {
        try {
          const response = await axios.post(
            'https://api.mercadopago.com/checkout/preferences',
            {
              items: [
                {
                  title: plan.title,
                  quantity: 1,
                  currency_id: 'USD',
                  unit_price: plan.price,
                },
              ],
              back_urls: {
                success: `${window.location.origin}/success`, 
                failure: `${window.location.origin}/failure`,
                pending: `${window.location.origin}/pending`, 
              },
              auto_return: 'approved', 
            },
            {
              headers: {
                Authorization:
                  'Bearer TEST-4730979253198126-120711-2d390d8d1c5e1447e94dd3e2d90d8434-682998227',
              },
            }
          );
          setPreferenceId(response.data.id);
        } catch (error) {
          console.error('Error al crear preferencia:', error);
        }
      }
    };

    if (plan) {
      createPreference();
    }
  }, [plan]);

  const handlePayment = () => {
    console.log('Iniciando proceso de pago con Mercado Pago...');
  };

  if (!plan) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <div key={plan.id}>
        <div>{plan.title}</div>
        <button onClick={handlePayment}>Pagar {plan.title}</button>

        {preferenceId && <Wallet initialization={{ preferenceId }} />}
      </div>
    </div>
  );
};

export default Plan;
