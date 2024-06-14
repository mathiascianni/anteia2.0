import React, { useState } from 'react';
import Input from '../components/Auth/Input';
import Checkbox from '../components/Auth/Checkbox';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'; // Agrega updateProfile
import { auth } from '../credentials';

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted:", { username, email, password, confirmPassword });
        if (!username || !email || !password || !confirmPassword) {
            setError("Todos los campos son obligatorios.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        try {
            setLoading(true);
            setError("");
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, {
                displayName: username,
                photoURL: "assets/user/avatar.png",
            });
            setUsername("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="text-center mt-7">
            <h1 className="text-2xl">Crear Cuenta</h1>
            <div className="mt-5 w-[90%] gap-6 flex flex-col mx-auto">
                <Input
                    title="Nombre de usuario"
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                />
                <Input
                    title="Email"
                    type="Email"
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
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                <label className="my-8">
                    ¿Ya tienes una cuenta?{" "}
                    <span onClick={() => window.location.href = "/login"} className="text-primary font-bold">Inicia sesión</span>
                </label>
            </div>
        </div>
    );
};

export default Register;
