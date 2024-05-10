import { Routes, Route } from "react-router-dom"
import MainLayout from "../Layouts/MainLayout"

const MainRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout><div>esto es una verga</div></MainLayout>} />
      </Routes>
    </>
  )
}

export default MainRoutes