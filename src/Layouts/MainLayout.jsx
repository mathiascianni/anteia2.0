import { BottomBar } from "../components"
import TopBar from "../components/Navigation/TopBar"
import { useEffect, useState } from "react"
import { ChangeCondition } from "../credentials"
import ToastBadge from "../components/Home/ToastBadge"

const MainLayout = ({ children }) => {
  const [badgeCondition, setBadgeCondition] = useState(null);
  const [badge, setBadge] = useState(null);

  useEffect(() => {
    const fetchBadgeCondition = async () => {
      const condition = localStorage.getItem('badgeCondition');
      setBadgeCondition(condition === 'true');

      const badgeData = JSON.parse(localStorage.getItem('badge'));
      setBadge(badgeData);

      if (condition === 'true') {
        console.log('Cambiando badgeCondition a false después de 5 segundos...');
        setTimeout(async () => {
          await ChangeCondition();
          const updatedCondition = localStorage.getItem('badgeCondition');
          setBadgeCondition(updatedCondition === 'true');
        }, 5000);
      }
    };
    fetchBadgeCondition();
  }, []);

  return (
    <>
      {badgeCondition ? (
        <ToastBadge badge={badge} />
      ) : null}
      <main className="mb-[120px]">
        {children}
      </main>
      <BottomBar />
    </>
  )
}

export default MainLayout
