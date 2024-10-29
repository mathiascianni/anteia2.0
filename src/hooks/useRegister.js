import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, firestore, uploadImage, uploadImageToStorage } from '../credentials';
import { useNavigate } from 'react-router-dom';

const useRegister = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profileImageURL, setProfileImageURL] = useState("");
    const [bannerImageURL, setBannerImageURL] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [borderColor, setBorderColor] = useState('')
    const [backgroundColor, setBackgroundColor] = useState('')
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

    const handleProfileImageChange = async (image) => {
        setProfileImageURL(image)
    };

    const handleBannerImageChange = async (image) => {
        setBannerImageURL(image)
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleBorderChange = (color) => {
        console.log(color)
        setBorderColor(color);
    };

    const handleBackgroundChange = (color) => {
        console.log(color)
        setBackgroundColor(color);
    };

    const validateStep = (step) => {
        if (step === 1) {
            if (!username || !email) {
                setError("El nombre de usuario y el email son obligatorios.");
                return false;
            }
            setError("");
        }

        if (step === 2) {
            if (!password || !confirmPassword) {
                setError("La contraseña y la confirmación son obligatorias.");
                return false;
            }

            const passwordValidation = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            if (!passwordValidation.test(password)) {
                setError("La contraseña debe tener al menos 8 caracteres, incluyendo letras y números.");
                return false;
            }

            if (password !== confirmPassword) {
                setError("Las contraseñas no coinciden.");
                return false;
            }
            setError("");
        }

        if (step === 3 && !profileImageURL) {
            setError("Debes seleccionar un avatar.");
            return false;
        }

        if (step === 4 && !bannerImageURL) {
            setError("Debes seleccionar un banner.");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateStep(4)) return;

        try {
            setLoading(true);
            setError("");
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, {
                displayName: username,
                photoURL: profileImageURL || "assets/user/avatar.png",
            });

            await setDoc(doc(firestore, "users", userCredential.user.uid), {
                displayName: username,
                email: email,
                badges: [],
                games: [],
                colors: { border: borderColor, background: backgroundColor },
                recommendations: 0,
                matchs: 0,
                stars: 0,
                banner: bannerImageURL || '',
                photoURL: profileImageURL || "https://firebasestorage.googleapis.com/v0/b/anteia-db.appspot.com/o/users%2Favatar.png?alt=media&token=1d387f13-2e06-40a1-966d-bb2c43506d4b",
                createdAt: new Date(),
                role: "user",
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
        profileImageURL,
        bannerImageURL,
        confirmPassword,
        error,
        loading,
        handleUsernameChange,
        handleEmailChange,
        handlePasswordChange,
        handleProfileImageChange,
        handleBannerImageChange,
        handleConfirmPasswordChange,
        handleBorderChange,
        handleBackgroundChange,
        handleSubmit,
        validateStep,
    };
};

export default useRegister;
