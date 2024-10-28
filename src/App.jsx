import { useEffect, useState } from 'react';
import gsap from 'gsap';
import MainRoutes from "./router/MainRoutes";

const App = () => {
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
        if (!hasSeenSplash) {
            const tl = gsap.timeline({
                onComplete: () => setShowSplash(false)
            });

            tl.fromTo(".splash-img",
                { y: 0, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.5, delay: 1, ease: "power3.out" }
            );

            tl.fromTo(".splash-title",
                { y: -30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" }
            );

            tl.to(".circle-animate", {
                scale: 20,
                duration: 1.5,
                ease: "power3.out",
                opacity: 1
            });
            sessionStorage.setItem('hasSeenSplash', 'true');
        } else {
            setShowSplash(false) 
        }

    }, []);

    return (
        <div>
            {showSplash ? (
                <div className="fixed inset-0 flex items-center flex-col justify-center z-50 bg-primary">
                    <div className='circle-animate w-20 h-20 bg-white rounded-full absolute opacity-0'></div>
                    <img className='w-20 h-20 splash-img ' src="./assets/iconWhite.svg" alt="Logo" />
                    <p className="splash-title text-white font-bold text-2xl">ANTEIA</p>
                </div>
            ) : (
                <div className="opacity-0 transition-opacity duration-1000 ease-in" style={{ opacity: showSplash ? 0 : 1 }}>
                    <MainRoutes />
                </div>
            )}
        </div>
    );
};

export default App;
