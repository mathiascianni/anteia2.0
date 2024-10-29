import React, { useEffect, useState } from 'react';
import Input from '../components/Auth/Input';
import UserCard from '../components/Home/UserCard';
import { TopBar } from '../components/Navigation';
import useRegister from '../hooks/useRegister';
import { useNavigate } from 'react-router-dom';
import { getDataDB, getUrlsStorage } from '../credentials';

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [avatars, setAvatars] = useState([]);
  const [banners, setBanners] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [selectedBanner, setSelectedBanner] = useState('');
  const [selectedBorderColor, setSelectedBorderColor] = useState('');
  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState('');
  const [colors, setColors] = useState([]);

  const {
    username,
    email,
    password,
    confirmPassword,
    error,
    handleUsernameChange,
    handleEmailChange,
    handlePasswordChange,
    handleProfileImageChange,
    handleBannerImageChange,
    handleConfirmPasswordChange,
    handleBorderChange,
    handleBackgroundChange,
    handleSubmit,
    validateStep,
  } = useRegister();

  const handleAvatarSelect = (url) => {
    setSelectedAvatar(url);
    handleProfileImageChange(url);
  };

  const handleBannerSelect = (url) => {
    setSelectedBanner(url);
    handleBannerImageChange(url);
  };

  useEffect(() => {
    const fetchUrls = async () => {
      const avatarsUrl = await getUrlsStorage('avatars');
      const bannersUrl = await getUrlsStorage('banners');
      setAvatars(avatarsUrl);
      setBanners(bannersUrl);
    };
    fetchUrls();
  }, []);

  useEffect(() => {
    const fetchColors = async () => {
      const colorsData = await getDataDB('colors');
      setColors(colorsData[0]?.color || []);
    };
    fetchColors();
  }, []);

  const handleNext = (e) => {
    e.preventDefault();
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    setStep(step - 1);
  };

  const handleBorderColorSelect = (color) => {
    setSelectedBorderColor(color);
    handleBorderChange(color);
  };

  const handleBackgroundColorSelect = (color) => {
    setSelectedBackgroundColor(color);
    handleBackgroundChange(color);
  };

  const renderInputs = () => {
    switch (step) {
      case 1:
        return (
          <div className="my-5 gap-6 flex flex-col">
            <Input
              title="Nombre de usuario"
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
            <Input
              title="Email"
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
        );
      case 2:
        return (
          <div className="my-5 gap-6 flex flex-col">
            <Input
              title="Contraseña"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <Input
              title="Confirmar contraseña"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>
        );
      case 3:
        return (
          <>
            <p className='mb-4'>Selecciona tu Avatar:</p>
            <div className='grid grid-cols-3 gap-4'>
              {avatars.map((avatar) => (
                <div
                  key={avatar}
                  onClick={() => handleAvatarSelect(avatar)}
                  className={`hover:border-4 border-primary cursor-pointer rounded-full ${selectedAvatar === avatar ? 'border-4 border-primary' : ''}`}
                >
                  <img className='w-full' src={avatar} alt="Avatar" />
                </div>
              ))}
            </div>
          </>
        );
      case 4:
        return (
          <>
            <p className='mb-4'>Selecciona tu Banner:</p>
            <div className='grid grid-cols-2 gap-4'>
              {banners.map((banner) => (
                <div
                  key={banner}
                  onClick={() => handleBannerSelect(banner)}
                  className={`hover:border-4 border-primary cursor-pointer ${selectedBanner === banner ? 'border-4 border-primary' : ''}`}
                >
                  <img className='w-full' src={banner} alt="Banner" />
                </div>
              ))}
            </div>
          </>
        );
      case 5:
        return (
          <>
            <UserCard
              user={{
                photoURL: selectedAvatar,
                displayName: username,
                colors: {
                  border: selectedBorderColor,
                  background: selectedBackgroundColor,
                }
              }}
            />
            <p className='mb-4'>Selecciona tu Color de borde:</p>
            <div className='grid grid-cols-4 gap-4'>
              {colors.map((color, index) => (
                <div
                  key={index}
                  onClick={() => handleBorderColorSelect(color)}
                  className={`w-20 h-20 rounded-full cursor-pointer transition-transform transform hover:scale-110 ${selectedBorderColor === color ? 'border-4 border-black' : ''}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <p className='mb-4'>Selecciona tu Color de fondo:</p>
            <div className='grid grid-cols-4 gap-4'>
              {colors.map((color, index) => (
                <div
                  key={index}
                  onClick={() => handleBackgroundColorSelect(color)}
                  className={`w-20 h-20 rounded-full cursor-pointer transition-transform transform hover:scale-110 ${selectedBackgroundColor === color ? 'border-4 border-black' : ''}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <main className="px-4 pb-8 flex flex-col justify-between min-h-screen">
      <TopBar title="Crear cuenta" />

      <div className='flex-1'>
        <h2 className="font-bold text-2xl my-3">Paso {step}</h2>
        <form className="space-y-4">
          {renderInputs()}
          {error && <p className="text-red-500 text-sm text-start mt-5">{error}</p>}
          <div className='flex flex-col fixed bottom-4 left-4 right-4'>
            {step > 1 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="mx-auto text-white w-full bg-gray-600 py-5 rounded-lg mb-4"
              >
                Regresar
              </button>
            )}
            <button
              type="button"
              onClick={step === 5 ? handleSubmit : handleNext}
              className="text-white bg-primary w-full py-5 rounded-lg mb-4"
            >
              {step === 5 ? 'Crear cuenta' : 'Continuar'}
            </button>
            <div className="w-full flex flex-col">
              <p className='text-center'>
                ¿Ya tienes una cuenta? <span onClick={() => navigate('/login')} className="text-primary font-bold">Inicia sesión</span>
              </p>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Register;
