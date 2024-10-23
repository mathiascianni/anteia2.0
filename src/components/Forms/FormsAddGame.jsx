import React, { useEffect, useState } from 'react';
import Input from '../Auth/Input';
import { doc, setDoc } from 'firebase/firestore';
import { firestore, getDataDB, storage } from '../../credentials';
import Select from '../Auth/Select';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { TopBar } from '../Navigation';

const FormAddGame = () => {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('');
  const [genero, setGenero] = useState('');
  const [generos, setGeneros] = useState([]);
  const [clasificacion, setClasificacion] = useState('');
  const [clasificaciones, setClasificaciones] = useState([]);
  const [iconoFile, setIconoFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const navigate = useNavigate()
  useEffect(() => {
    const obtenerData = async () => {
      try {
        const datosGenres = await getDataDB('genres');
        const datosClasifications = await getDataDB('clasification');
        setClasificaciones(datosClasifications);
        setGeneros(datosGenres);
      } catch (error) {
        console.error('Error al obtener géneros:', error);
      }
    };
    obtenerData();
  }, []);

  const handleNext = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!iconoFile || !bannerFile) {
      console.error('Icono y banner son obligatorios.');
      return;
    }

    try {
      const iconoStorageRef = ref(storage, `games/${title}/icon.png`);
      const bannerStorageRef = ref(storage, `games/${title}/banner.png`);

      const iconoSnapshot = await uploadBytes(iconoStorageRef, iconoFile, {
        contentType: 'image/png',
      });
      const iconoDownloadURL = await getDownloadURL(iconoSnapshot.ref);

      const bannerSnapshot = await uploadBytes(bannerStorageRef, bannerFile, {
        contentType: 'image/png',
      });
      const bannerDownloadURL = await getDownloadURL(bannerSnapshot.ref);

      const gameData = {
        title,
        color,
        genero,
        icon: iconoDownloadURL,
        banner: bannerDownloadURL,
        clasificacion,
        uid: uuidv4(),
      };

      await setDoc(doc(firestore, 'games', gameData.uid), gameData);
      navigate('/admin')
      console.log('Datos enviados correctamente a Firestore:', gameData);
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
            <Select title="Género" options={generos} value={genero} onChange={(e) => setGenero(e.target.value)} required />
          </>
        );
      case 2:
        return (
          <>
            <input type="file" id="icon" name="icon" onChange={(e) => setIconoFile(e.target.files[0])} />
            <div htmlFor="icon" className='w-full h-24 rounded-md bg-medium col-span-4 flex justify-center items-center'>
              <p className='text-gray-300 border-dotted border-2 border-light py-6 px-9'>tap para cambiar</p>
            </div>
            <input type="file" id="bannerInput" onChange={(e) => setBannerFile(e.target.files[0])} />
          </>
        );
      case 3:
        return (
          <div className="grid grid-cols-3 gap-4">
            {clasificaciones.map((clasificacionItem) => (
              <img
                key={clasificacionItem.id}
                src={clasificacionItem.img}
                alt={clasificacionItem.title}
                className={`cursor-pointer ${clasificacion === clasificacionItem.img ? 'border-2 border-blue-500' : ''} hover:border-2 hover:border-blue-500`}
                onClick={() => setClasificacion(clasificacionItem.img)}
              />
            ))}
          </div>
        );
      default:
        return null;
    }
  };
  console.log(step);
  return (
    <div>
      <TopBar backBtn />
      <div className="flex justify-center my-8">
        {Array.from({ length: 4 }, (_, index) => (
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

      {step !== 4 && (
        <div className="container px-4">
          <h2 className="font-bold text-2xl my-3">Paso {step}: {step === 1 ? 'Datos del juego' : step === 2 ? 'Ícono y Banner' : 'Clasificación'}</h2>
          <form className="space-y-4" onSubmit={step === 4 ? handleSubmit : handleNext}>
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
                type="submit"
                className="mx-auto text-white bg-primary px-32 py-4 rounded-lg"
              >
                {step === 4 ? 'Enviar' : 'Continuar'}
              </button>
            </div>
          </form>
        </div>
      )}
      {step === 4 && (
        <div className="container px-4">
          <h2 className="font-bold text-2xl my-3">Resumen</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input title="Título" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <Input title="Color" type="color" value={color} onChange={(e) => setColor(e.target.value)} required />
            <Select title="Género" options={generos} value={genero} onChange={(e) => setGenero(e.target.value)} required />
            <input type="file" id="iconoInput" onChange={(e) => setIconoFile(e.target.files[0])} />
            <input type="file" id="bannerInput" onChange={(e) => setBannerFile(e.target.files[0])} />
            <div className="grid grid-cols-3 gap-4">
              {clasificaciones.map((clasificacionItem) => (
                <img
                  key={clasificacionItem.id}
                  src={clasificacionItem.img}
                  alt={clasificacionItem.title}
                  className={`cursor-pointer ${clasificacion === clasificacionItem.img ? 'border-2 border-blue-500' : ''} hover:border-2 hover:border-blue-500`}
                  onClick={() => setClasificacion(clasificacionItem.img)}
                />
              ))}
            </div>
            <button type="button" onClick={handlePrevious} className="mx-auto text-white bg-gray-600 px-32 py-4 rounded-lg mb-4">
              Regresar
            </button>
            <button type="submit" className="mx-auto text-white bg-primary px-32 py-4 rounded-lg">
              Enviar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default FormAddGame;
