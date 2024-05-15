import React from 'react';
import Input from '../components/Auth/Input';
import Checkbox from '../components/Auth/Checkbox';

const Login = () => {
    return (
        <div className=' mt-7'>
        <h1 className='text-2xl text-center'>Iniciar sesión</h1>
        <div className='mt-5 w-[90%] gap-6 flex flex-col mx-auto'>       
            <Input title="Email" type="Email" />
            <Input title="Contraseña" type="password" />
            <label className='text-primary text-sm '>¿Olvidaste tu contraseña?</label>
        </div>
        <Checkbox text="Mantener sesión iniciada" />
        <div className='fixed bottom-0 w-full flex flex-col'>
            <button className='mx-auto text-white bg-primary px-32 py-4 rounded-lg'>Iniciar sesión</button>
            <label className='text-center my-8'>¿No tienes una cuenta? <span className='text-primary font-bold'>Crear cuenta</span></label>
        </div>
    </div>
    );
}

export default Login;
