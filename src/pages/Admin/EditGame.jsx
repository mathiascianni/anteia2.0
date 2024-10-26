import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { firestore, getDataDB, storage } from '../../credentials';
import Input from '../../components/Auth/Input';
import Button from '../../components/Auth/Button';
import Select from '../../components/Auth/Select';
import { SpinnerLoader } from '../../components/General';

const EditGame = () => {
  const { uid } = useParams();
  const navigate = useNavigate()
  const [game, setGame] = useState(null);
  const [generos, setGenres] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    color: '',
    genero: '',
    icon: '',
    banner: '',
    clasificacion: '',
  });

  useEffect(() => {
    const getGenres = async () => {
      try {
        const data = await getDataDB('genres');
        setGenres(data);
      } catch (error) {
        console.error('Error al obtener los generos:', error);
      }
    };
    getGenres();
  }, []);

  const handleChangetitle = (e) => {
    setFormData({ ...formData, title: e.target.value });
  };

  const handleChangeColor = (e) => {
    setFormData({ ...formData, color: e.target.value });
  };

  const handleChangeGenero = (e) => {
    setFormData({ ...formData, genero: e.target.value });
  };

  const handleChangeClasificacion = (e) => {
    setFormData({ ...formData, clasificacion: e.target.value });
  };


  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const gameRef = doc(firestore, 'games', uid);
        const gameDoc = await getDoc(gameRef);

        if (gameDoc.exists()) {
          setGame({ id: gameDoc.id, ...gameDoc.data() });
          setFormData({
            title: gameDoc.data().title,
            color: gameDoc.data().color,
            genero: gameDoc.data().genero,
            icon: gameDoc.data().icon,
            banner: gameDoc.data().banner,
            clasificacion: gameDoc.data().clasificacion,
          });
        } else {
          console.log('No se encontró ningún juego con el ID especificado.');
        }
      } catch (error) {
        console.error('Error al obtener juego por ID:', error);
      }
    };

    fetchGameData();
  }, [uid]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (setter) => (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setter(reader.result);
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let iconDownloadURL = formData.icon;
      let bannerDownloadURL = formData.banner;

      const uploadImage = async (image, path) => {
        const blob = await fetch(image).then(res => res.blob());
        const storageRef = ref(storage, `${path}`);
        const snapshot = await uploadBytes(storageRef, blob, { contentType: 'image/png' });
        return await getDownloadURL(snapshot.ref);
      };

      if (formData.icon && formData.icon.startsWith('data:')) {
        iconDownloadURL = await uploadImage(formData.icon, `games/${title}/icon.png`);
      }

      if (formData.banner && formData.banner.startsWith('data:')) {
        bannerDownloadURL = await uploadImage(formData.banner, `banners/banner${formData.title}.png`);
      }

      await updateDoc(doc(firestore, 'games', game.id), {
        ...formData,
        icon: iconDownloadURL,
        banner: bannerDownloadURL,
      });
      navigate('/admin')
      console.log('Juego actualizado correctamente.');
    } catch (error) {
      console.error('Error al actualizar juego:', error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      {game ? (
        <>
          <h1 className="text-3xl font-bold text-center mt-4">Editar juego</h1>
          <form className="flex flex-col space-y-4 my-8" onSubmit={handleSubmit}>
            <Input title="Título" type="text" name="title" value={formData.title} onChange={handleChangetitle} required />
            <Input title="Color" type="color" name="color" value={formData.color} onChange={handleChangeColor} required />
            <Select title='Género' options={generos} value={formData.genero} onChange={handleChangeGenero} required />


            <label>
              <p>Profile:</p>
              <input
                type="file"
                id="icon"
                name="icon"
                className='hidden'
                onChange={handleFileChange((url) => setFormData({ ...formData, icon: url }))} />
              <div className='grid grid-cols-6'>
                {formData.icon &&
                  <div className='bg-primary rounded-full my-auto h-20 w-20 mx-auto col-span-2 flex items-center justify-center'>
                    <img className='w-12' src={formData.icon} alt="Profile" />
                  </div>
                }
                <div htmlFor="icon" className='w-full h-24 rounded-md bg-medium col-span-4 flex justify-center items-center'>
                  <p className='text-gray-300 border-dotted border-2 border-light py-6 px-9'>tap para cambiar</p>
                </div>
              </div>
            </label>

            <label>
              <p>Banner:</p>
              <input
                type="file"
                id="banner"
                name="banner"
                className='hidden'
                onChange={handleFileChange((url) => setFormData({ ...formData, banner: url }))}
              />
              {formData.banner && <img src={formData.banner} alt="Banner" />}
            </label>
            <label>
              <p>Clasificación:</p>
              <img src={formData.clasificacion} alt="" />
            </label>
            <Button text="Guardar cambios" handleSubmit={handleSubmit} />
          </form>
        </>
      ) : (
        <SpinnerLoader />
      )}
    </div>
  );
};

export default EditGame;
