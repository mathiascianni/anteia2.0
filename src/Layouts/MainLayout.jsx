import { BottomBar } from "../components";
import { useEffect, useState } from "react";
import { ChangeCondition } from "../credentials";
import ToastBadge from "../components/Home/ToastBadge";

const MainLayout = ({ children }) => {
  const [badgeCondition, setBadgeCondition] = useState(null);
  const [badge, setBadge] = useState(null);

  const fetchBadgeData = () => {
    const condition = localStorage.getItem('badgeCondition');
    setBadgeCondition(condition === 'true');

    const badgeData = JSON.parse(localStorage.getItem('badge'));
    setBadge(badgeData);
  };

  useEffect(() => {
    // Llamar la primera vez que se monta el componente
    fetchBadgeData();

    // Escuchar cambios en localStorage cuando se actualice 'badgeCondition' o 'badge'
    const handleStorageChange = (event) => {
      if (event.key === 'badgeCondition' || event.key === 'badge') {
        fetchBadgeData();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Limpiar el event listener al desmontar el componente
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (badgeCondition) {
      console.log('Cambiando badgeCondition a false después de 5 segundos...');
      setTimeout(async () => {
        await ChangeCondition();
        const updatedCondition = localStorage.getItem('badgeCondition');
        setBadgeCondition(updatedCondition === 'true');
      }, 5000);
    }
  }, [badgeCondition]);

  return (
    <>
      {badgeCondition ? (
        <ToastBadge badge={badge} condition={badgeCondition} />
      ) : null}
      <main className="mb-[120px]">
        {children}
      </main>
      <BottomBar />
    </>
  );
};

export default MainLayout;
