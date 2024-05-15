import React from 'react';
import Input from '../components/Auth/Input';
import Checkbox from '../components/Auth/Checkbox';

const Register = () => {
    return (
        <div className='text-center mt-7'>
            <h1 className='text-2xl'>Crear Cuenta</h1>
            <div className='mt-5 w-[90%] gap-6 flex flex-col mx-auto'>
                <Input title="Nombre de usuario" type="text" />
                <Input title="Email" type="Email" />
                <Input title="Contraseña" type="password" />
                <Input title="Confirmar contraseña" type="password" />
            </div>
            <Checkbox text="Acepto los terminos y condiciones" />
            <div className='fixed bottom-0 w-full flex flex-col'>
                <button className='mx-auto text-white bg-primary px-32 py-4 rounded-lg'>Crear cuenta</button>
                <label className='my-8'>¿Ya tienes una cuenta? <span className='text-primary font-bold'>Inicia sesión</span></label>
            </div>
        </div>
    );
}

export default Register;
