import React, { useState } from 'react';
import Input from '../components/Auth/Input';
import Checkbox from '../components/Auth/Checkbox';
import { TopBar } from '../components/Navigation';
import useRegister from '../hooks/useRegister';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const navigate = useNavigate();

  const {
    username,
    email,
    password,
    confirmPassword,
    error,
    loading,
    handleUsernameChange,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleSubmit,
  } = useRegister();


  return (
    <main className="px-4 pb-8 flex flex-col justify-between min-h-screen">
      <TopBar title="Crear cuenta" />
      
      <div className='flex-1'>
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
        {error && <p className="text-red-500 text-sm text-start mt-5 ">{error}</p>}
        <Checkbox text="Acepto los terminos y condiciones" />
      </div>

      <div className="w-full flex flex-col">
        <button
          className="text-white bg-primary py-5 rounded-lg mb-8"
          onClick={handleSubmit}
          disabled={loading}
        >
          Crear cuenta
        </button>
        <p className='text-center'>¿Ya tienes una cuenta? <span onClick={() => navigate('/login')} className="text-primary font-bold">Inicia sesión</span></p>
      </div>
    </main>
  );
};

export default Register;