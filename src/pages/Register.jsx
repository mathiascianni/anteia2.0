import React, { useEffect, useState } from 'react';
import Input from '../components/Auth/Input';
import Checkbox from '../components/Auth/Checkbox';
import { TopBar } from '../components/Navigation';
import useRegister from '../hooks/useRegister';
import { useNavigate } from 'react-router-dom';
import { getUrlsStorage } from '../credentials';

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [avatars, setAvatars] = useState([]);
  const [banners, setBanners] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [selectedBanner, setSelectedBanner] = useState('');

  const {
    username,
    email,
    password,
    confirmPassword,
    profileImageURL,
    bannerImageURL,
    error,
    loading,
    handleUsernameChange,
    handleEmailChange,
    handlePasswordChange,
    handleProfileImageChange,
    handleBannerImageChange,
    handleConfirmPasswordChange,
    handleSubmit,
    validateStep,
  } = useRegister();

  const handleAvatarSelect = (url) => {
    setSelectedAvatar(url);
    handleProfileImageChange(url);
  }

  const handleBannerSelect = (url) => {
    setSelectedBanner(url);
    handleBannerImageChange(url);
  }

  useEffect(() => {
    const fetchUrls = async () => {
      const avatarsUrl = await getUrlsStorage('avatars');
      const bannersUrl = await getUrlsStorage('banners');
      setAvatars(avatarsUrl);
      setBanners(bannersUrl);
    }
    fetchUrls();
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
            <div className='grid grid-cols-1 gap-4'>
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
            {step !== 1 && (
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
              onClick={step === 4 ? handleSubmit : handleNext}
              className="text-white bg-primary w-full py-5 rounded-lg mb-4"
            >
              {step === 4 ? 'Crear cuenta' : 'Continuar'}
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
