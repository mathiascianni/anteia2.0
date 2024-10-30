import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { loginWithGoogle } from '../credentials';
import gsap from 'gsap';

const Splash = () => {
    useEffect(() => {

        gsap.fromTo(".presentacion",
            { opacity: 0, },
            { opacity: 1, delay: 1, duration: 1.2, ease: "power3.out" }
        );


        gsap.fromTo(".anthony-img",
            { x: -200, opacity: 0 },
            { x: -100, opacity: 1, duration: 1.2, delay: 0.3, ease: "back.out(1.7)" }
        );
    }, []);

    const handleLoginWithGoogle = async () => {
        try {
            const user = await loginWithGoogle();
            console.log('Usuario logueado:', user);
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    };

    return (
        <div className='bg-light h-screen relative'>
            <div>
                <div className='py-8'>
                    <div>
                        <img className='w-20 h-20 mx-auto' src="./assets/icon.svg" alt="" />
                    </div>

                    <h1 className='text-primary font-peace-sans text-center text-3xl'>
                        ANTEIA
                    </h1>
                </div>
                <div className="text-center px-6 py-8 mx-6 border-2 border-primary presentacion">
                    <p className="text-dark text-lg font-medium">
                        ¡Hola! Soy <span className='font-bold'>Anthony</span>, la mascota de la aplicación.
                    </p>

                    <p className="text-dark mt-2">
                        Es un gusto conocerte. Estoy aquí para ayudarte a explorar todas las funciones que ofrece nuestra app. Puedes <span className='font-bold'>iniciar sesión</span> si ya tienes una cuenta o <span className='font-bold'>registrarte</span> para unirte a la diversión.
                    </p>
                </div>


                <div className='px-8 text-center pt-8'>
                    <img src="./media/anthony/anthony_happy_2.png" className='w-24 anthony-img mx-auto' alt="Anthony" />
                </div>


                <div className='flex flex-col absolute left-0 right-0 bottom-10'>
                    <div className='grid grid-cols-2 px-4 gap-4'>
                        <Link className='px-4 text-center py-2 bg-white border-2 border-dark rounded-lg text-primary font-bold w-full' to={'/login'}>
                            Iniciar Sesión
                        </Link>
                        <Link className='px-4 text-center py-2 bg-white border-2 border-dark rounded-lg text-primary font-bold w-full' to={'/register'}>
                            Registrarse
                        </Link>
                    </div>
                    <div className='px-4'>
                        <button onClick={handleLoginWithGoogle} className="flex items-center justify-center px-4 py-2 w-full bg-white border-2 border-dark mt-4 font-bold rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" viewBox="0 0 48 48">
                                <path fill="#4285F4" d="M47.6 24.5c0-1.5-.1-3-.4-4.4H24v8.4h13.4c-.6 3.2-2.5 5.9-5.3 7.7v6.4h8.6c5.1-4.7 8-11.5 8-18.1z" />
                                <path fill="#34A853" d="M24 48c6.4 0 11.7-2.1 15.6-5.7l-8.6-6.4c-2.1 1.4-4.8 2.3-7.5 2.3-5.8 0-10.8-3.9-12.6-9.3H2.9v6.4C7 42.5 14.9 48 24 48z" />
                                <path fill="#FBBC05" d="M11.4 28.9c-1-3.2-1-6.6 0-9.8V12.7H2.9c-3 6.2-3 13.6 0 19.8l8.5-6.4z" />
                                <path fill="#EA4335" d="M24 9.5c3.2-.1 6.3 1.1 8.6 3.2l6.4-6.4C34.1 2.8 29.1 0 24 0 14.9 0 7 5.5 2.9 12.7l8.5 6.4c1.8-5.4 6.8-9.3 12.6-9.6z" />
                            </svg>
                            Iniciar sesión con Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Splash;
