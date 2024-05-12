import { Routes, Route } from "react-router-dom"
import MainLayout from "../Layouts/MainLayout"
import Login from "../pages/Login"

const MainRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout><div>esto es una verga</div></MainLayout>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default MainRoutes