import React, { useState } from 'react';
import Input from '../components/Auth/Input';
import Checkbox from '../components/Auth/Checkbox';
import { TopBar } from '../components/Navigation';
import useRegister from '../hooks/useRegister';


const Register = () => {
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
    <div className="">
      <TopBar backBtn title="Crear cuenta" />
      {error && <p className="text-red-500 text-sm text-start px-8 mt-5">{error}</p>}
      <div className="my-5 w-[90%] gap-6 flex flex-col mx-auto">
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
      
      <Checkbox text="Acepto los terminos y condiciones" />

      <div className="fixed bottom-0 w-full flex flex-col">
        <button
          className="mx-auto text-white bg-primary px-32 py-4 rounded-lg"
          onClick={handleSubmit}
          disabled={loading}
        >
          Crear cuenta
        </button>
        <label className="my-8">
          ¿Ya tienes una cuenta?{" "}
          <span onClick={() => window.location.href = "/login"} className="text-primary font-bold">
            Inicia sesión
          </span>
        </label>
      </div>
    </div>
  );
};

export default Register;