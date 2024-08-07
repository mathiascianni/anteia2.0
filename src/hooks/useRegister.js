import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, firestore } from '../credentials';
import { useNavigate } from 'react-router-dom';

const useRegister = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

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
            setError("Las contraseñas no coinciden.");
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
                badges: {},
                games: {},
                stats: {},
                stars: 0,
                banner: '',
                photoURL: "https://firebasestorage.googleapis.com/v0/b/anteia-db.appspot.com/o/users%2Favatar.png?alt=media&token=1d387f13-2e06-40a1-966d-bb2c43506d4b",
                createdAt: new Date(),
            });

            setUsername("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            navigate("/login");
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return {
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
        handleSubmit
    };
};

export default useRegister;