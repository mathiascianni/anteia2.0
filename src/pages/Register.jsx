import React, { useState } from 'react';
import Input from '../components/Auth/Input';
import Checkbox from '../components/Auth/Checkbox';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, firestore } from '../credentials';

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

      await setDoc(doc(firestore, "users", userCredential.user.uid), {
        displayName: username,
        email: email,
        insignias: {},
        games: {},
        banner: '',
        photoURL: "https://firebasestorage.googleapis.com/v0/b/anteia-db.appspot.com/o/users%2Favatar.png?alt=media&token=1d387f13-2e06-40a1-966d-bb2c43506d4b",
        createdAt: new Date(),
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
      {error && <p className="text-red-500 text-sm mt-2 text-start px-8 mt-5">{error}</p>}
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