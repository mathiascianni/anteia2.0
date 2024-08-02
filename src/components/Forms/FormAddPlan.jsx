import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Input from '../Auth/Input';
import { doc, setDoc } from 'firebase/firestore';
import { firestore, storage } from '../../credentials';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const FormAddPlan = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('');
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');
  const [features, setFeatures] = useState('');
  const [iconDownloadURL, setIconDownloadURL] = useState('');
  const [iconFile, setIconFile] = useState(null);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleDurationChange = (e) => {
    const value = e.target.value;

    // Validar que solo se ingresen números
    if (/^\d*$/.test(value)) {
      setDuration(value);
    }
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;

    // Validar que solo se ingresen números
    if (/^\d*$/.test(value)) {
      setPrice(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!iconFile) {
      console.error('No se ha seleccionado ningún archivo de ícono.');
      return;
    }

    try {
      const iconStorageRef = ref(storage, `plans/${title}/icon.png`);
      const iconSnapshot = await uploadBytes(iconStorageRef, iconFile);
      const iconURL = await getDownloadURL(iconSnapshot.ref);
      setIconDownloadURL(iconURL);

      const planData = {
        title,
        color,
        duration: parseInt(duration, 10), // Convertir a número
        price: parseFloat(price), // Convertir a número
        features,
        icon: iconURL,
        uid: uuidv4(),
      };

      await setDoc(doc(firestore, 'plans', planData.uid), planData);
      console.log('Datos enviados correctamente a Firestore:', planData);

      navigate('/admin');
    } catch (error) {
      console.error('Error al enviar datos a Firestore:', error);
    }
  };

  const renderInputs = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Input title="Título" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <Input title="Color" type="color" value={color} onChange={(e) => setColor(e.target.value)} required />
            <Input title="Duración" type="text" value={duration} onChange={handleDurationChange} required />
            <Input title="Precio" type="text" value={price} onChange={handlePriceChange} required />
            <Input title="Características" type="text" value={features} onChange={(e) => setFeatures(e.target.value)} required />
          </>
        );
      case 2:
        return (
          <>
            <input type="file" id="iconInput" onChange={(e) => setIconFile(e.target.files[0])} required />
          </>
        );
      case 3:
        return (
          <>
            <p>Título: {title}</p>
            <p>Color: {color}</p>
            <p>Duración: {duration}</p>
            <p>Precio: {price}</p>
            <p>Características: {features}</p>
            {iconDownloadURL && <img src={iconDownloadURL} alt="Icono del plan" />}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className='flex justify-center my-8'>
        {Array.from({ length: 3 }, (_, index) => (
          <div
            key={index}
            className="w-6 h-6 rounded-full mx-4 flex items-center justify-center"
            style={{ backgroundColor: index + 1 <= step ? '#3f51b5' : '#ccc' }}
          >
            {index + 1 === step && (
              <span className="text-white">{index + 1}</span>
            )}
          </div>
        ))}
      </div>

      <div className='container px-4'>
        <h2 className='font-bold text-2xl my-3'>Paso {step}: {step === 1 ? 'Datos del plan' : step === 2 ? 'Ícono' : 'Resumen'}</h2>
        <form className='space-y-4' onSubmit={handleSubmit}>
          {renderInputs()}
          <div className="w-full fixed bottom-[120px] right-0 left-0 text-center">
              {step !== 1 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="mx-auto text-white bg-gray-600 px-32 py-4 rounded-lg mb-4"
                >
                  Regresar
                </button>
              )}
              <button
                type={step === 3 ? 'submit' : 'button'}
                onClick={step === 3 ? null : handleNext}
                className="mx-auto text-white bg-primary px-32 py-4 rounded-lg"
              >
                {step === 3 ? 'Enviar' : 'Continuar'}
              </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default FormAddPlan;
