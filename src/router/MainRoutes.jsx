import { Routes, Route } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Home from "../pages/Home";
import AdminIndex from "../pages/Admin/AdminIndex";
import AddGame from "../pages/Admin/AddGame";
import EditGame from "../pages/Admin/EditGame";
import ProfileEdit from "../pages/ProfileEdit";
import AddPlans from "../pages/Admin/AddPlans";
import Options from "../pages/Options";
import Game from "../pages/Game";


const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout><Home /></MainLayout>} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<MainLayout><Profile /></MainLayout>} />
      <Route path="/profile/edit" element={<MainLayout><ProfileEdit /></MainLayout>} />
      <Route path="/profile/:uid" element={<MainLayout><Profile /></MainLayout>} />
      <Route path="/admin" element={<MainLayout><AdminIndex /></MainLayout>} />
      <Route path="/admin/addgame" element={<MainLayout><AddGame /></MainLayout>} />
      <Route path="/admin/editgame/:uid" element={<MainLayout><EditGame /></MainLayout>} />
      <Route path="/admin/addplan" element={<MainLayout><AddPlans /></MainLayout>} />
      <Route path="/admin/editplan/:uid" element={<MainLayout><EditGame /></MainLayout>} />
      <Route path="/options" element={<MainLayout><Options /></MainLayout>} />
      <Route path="game/:uid" element={<MainLayout><Game /></MainLayout>} />
    </Routes>
  );
};

export default MainRoutes;
