import { Routes, Route } from "react-router-dom"
import MainLayout from "../Layouts/MainLayout"

const MainRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout><div>Home</div></MainLayout>} />
      </Routes>
    </>
  )
}

export default MainRoutes