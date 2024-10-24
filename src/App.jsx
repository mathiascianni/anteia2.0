import { useEffect, useState } from 'react';
import MainRoutes from "./router/MainRoutes";

const App = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showInstallButton, setShowInstallButton] = useState(false);

    useEffect(() => {
        window.addEventListener('beforeinstallprompt', (e) => {
          
            e.preventDefault();
       
            setDeferredPrompt(e);
            
            setShowInstallButton(true);
        });
    }, []);

    const handleInstallClick = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                console.log('Usuario aceptó la instalación');
            } else {
                console.log('Usuario rechazó la instalación');
            }
            setDeferredPrompt(null);
            setShowInstallButton(false); 
        }
    };

    return (
        <div>
            <MainRoutes />
            {showInstallButton && (
                <button onClick={handleInstallClick} className="install-button">
                    Instalar Aplicación
                </button>
            )}
        </div>
    );
};

export default App;
