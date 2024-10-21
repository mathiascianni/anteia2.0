import React, { useState } from 'react';
import Input from '../components/Auth/Input';
import Checkbox from '../components/Auth/Checkbox';
import { TopBar } from '../components/Navigation';
import useRegister from '../hooks/useRegister';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

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
  } = useRegister();
  console.log(step)
  const handleNext = (e) => {
    e.preventDefault();
    console.log('Step before increment:', step);
    setStep(step + 1);
    console.log('Step after increment:', step + 1);
  };

  const handleProfileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleProfileImageChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleBannerImageChange(reader.result);
      };
      reader.readAsDataURL(file);
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
            <label>
              <p>Profile:</p>
              <input
                className='hidden'
                type="file"
                id="profile"
                name="profile"
                onChange={handleProfileUpload}
              />
              <div className='grid grid-cols-6'>
                {profileImageURL ? (
                  <img className='w-20 mx-auto my-auto rounded-full col-span-2' src={profileImageURL} alt="Profile" />
                ) : (
                  <img className='w-20 mx-auto my-auto rounded-full col-span-2' src='./assets/user/avatar.png' alt="Profile" />
                )}
                <div htmlFor="profile" className='w-full h-24 rounded-md bg-medium col-span-4 flex justify-center items-center'>
                  <p className='text-gray-300 border-dotted border-2 border-light py-6 px-9'>tap para cambiar</p>
                </div>
              </div>
            </label>
            <label>
              <p>Banner:</p>
              <input
                type="file"
                id='banner'
                name='banner'
                className='hidden'
                onChange={handleBannerUpload}
              />
              {bannerImageURL && <img className='rounded-md' src={bannerImageURL} alt="Banner" />}
            </label>
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
          {error && <p className="text-red-500 text-sm text-start mt-5 ">{error}</p>}
          <div className='flex flex-col'>
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
              onClick={step === 3 ? handleSubmit : handleNext}
              className="text-white bg-primary w-full py-5 rounded-lg mb-8"
            >
              {step === 3 ? 'Crear cuenta' : 'Continuar'}
            </button>
          </div>

        </form>

      </div>

      <div className="w-full flex flex-col">
        <p className='text-center'>
          ¿Ya tienes una cuenta? <span onClick={() => navigate('/login')} className="text-primary font-bold">Inicia sesión</span>
        </p>
      </div>
    </main>
  );
};

export default Register;
