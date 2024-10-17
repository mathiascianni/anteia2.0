import React, { useState } from 'react';
import Input from '../components/Auth/Input';
import Checkbox from '../components/Auth/Checkbox';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, completeBadges } from '../credentials';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Auth/Button';
import { TopBar } from '../components/Navigation';

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
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const userId = userCredential.user.uid; 
            localStorage.setItem('userId', userId); 
            await completeBadges(userId, 'Bienvenido')
            setError("");
            setEmail("");
            setPassword("");
            navigate("/");
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className='px-4 pb-8 flex flex-col justify-between min-h-screen'>
            <TopBar title="Iniciar sesión" />
            <div className='flex-1'>
                <form onSubmit={handleSubmit}>
                    <div className='mt-5 gap-6 flex flex-col mx-auto mb-4'>
                        <Input title="Email" type="email" value={email} onChange={handleEmailChange} />
                        <Input title="Contraseña" type="password" value={password} onChange={handlePasswordChange} />
                    </div>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                </form>
                <p className='text-primary text-sm'>¿Olvidaste tu contraseña?</p>
                <Checkbox text="Mantener sesión iniciada" />
            </div>
            <div className='w-full flex flex-col'>
                <button
                    className="text-white bg-primary py-5 rounded-lg mb-8"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    Iniciar sesión
                </button>

                <label className='text-center'>¿No tienes una cuenta? <span onClick={() => navigate("/register")} className='text-primary font-bold'>Crear cuenta</span></label>

            </div>
        </div>
    );
}

export default Login;
