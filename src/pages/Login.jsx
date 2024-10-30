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
    const [keepLoggedIn, setKeepLoggedIn] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleKeepLoggedInChange = (e) => {
        setKeepLoggedIn(e.target.checked);
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

            if (keepLoggedIn) {
                localStorage.setItem('userId', userId);
            } else {
                sessionStorage.setItem('userId', userId);
            }

            await completeBadges(userId, 'Bienvenido');
            setError("");
            setEmail("");
            setPassword("");
            navigate("/");
        } catch (error) {

            if (error.code === 'auth/invalid-credential') {
                setError("La credenciales no coinciden.");
            } else {
                setError("Ocurrió un error. Por favor, inténtalo nuevamente.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <TopBar title="Iniciar sesión" backGround />
            <div className='px-4 pb-8 flex flex-col justify-between min-h-screen'>
                <div className='flex-1'>
                    <form onSubmit={handleSubmit} className='flex flex-col'>
                        <div className='mt-5 gap-6 flex flex-col mb-4'>
                            <Input title="Email" type="email" value={email} onChange={handleEmailChange} classInput='w-full' />
                            <Input title="Contraseña" type="password" value={password} onChange={handlePasswordChange} />
                        </div>
                        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                        <p className='text-primary text-sm mb-4'>¿Olvidaste tu contraseña?</p>

                        <Checkbox
                            text="Mantener sesión iniciada"
                            checked={keepLoggedIn}
                            onChange={handleKeepLoggedInChange}
                        />

                        <div className=' fixed bottom-4 left-4 right-4'>
                            <button
                                type="submit"
                                className="text-white bg-primary py-5 rounded-lg mb-4 w-full"
                                disabled={loading}
                            >
                                Iniciar sesión
                            </button>
                            <div className='text-center'>
                                <label>¿No tienes una cuenta? <span onClick={() => navigate("/register")} className='text-primary font-bold'>Crear cuenta</span></label>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
