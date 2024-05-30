import React, { useState } from 'react';
import Input from '../components/Auth/Input';
import Checkbox from '../components/Auth/Checkbox';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../credentials';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Todos los campos son obligatorios.");
            return;
        }
        try {
            setLoading(true);
            setError("");
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
            setEmail("");
            setPassword("");
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='mt-7'>
            <h1 className='text-2xl text-center'>Iniciar sesión</h1>
            <div className='mt-5 w-[90%] gap-6 flex flex-col mx-auto'>
                <Input title="Email" type="email" value={email} onChange={handleEmailChange} />
                <Input title="Contraseña" type="password" value={password} onChange={handlePasswordChange} />
                <label className='text-primary text-sm'>¿Olvidaste tu contraseña?</label>
            </div>
            <Checkbox text="Mantener sesión iniciada" />
            <div className='fixed bottom-0 w-full flex flex-col'>
                <button
                    className='mx-auto text-white bg-primary px-32 py-4 rounded-lg'
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    Iniciar sesión
                </button>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                <label className='text-center my-8'>¿No tienes una cuenta? <span className='text-primary font-bold'>Crear cuenta</span></label>
            </div>
        </div>
    );
}

export default Login;
