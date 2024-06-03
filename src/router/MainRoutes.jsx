import { Routes, Route } from "react-router-dom"
import MainLayout from "../Layouts/MainLayout"
import Register from "../pages/Register"
import Login from "../pages/Login"
import Profile from "../pages/Profile"

const MainRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout><div>esto es una verga</div></MainLayout>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<MainLayout><Profile /></MainLayout>} />
      </Routes>
    </>
  )
}

export default MainRoutes