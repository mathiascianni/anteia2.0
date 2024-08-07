import { BottomBar } from "../components"
import Toast from "../components/Home/Toast"
import TopBar from "../components/Navigation/TopBar"

const MainLayout = ({ children }) => {
  return (
    <>
      {/* <Toast /> */}
      <main className="mb-[120px]">
        {children}
      </main>
      <BottomBar />
    </>
  )
}

export default MainLayout