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
import MyProfile from "../pages/MyProfile";
import ListChats from "../pages/ListChats";
import Chat from "../pages/Chat";
//Middlewares
import IsAuth from "../middlewares/IsAuth";
import SliderMatchs from "../pages/SliderMatchs";
import ProfileConf from "../pages/ProfileConf";
import IsMatch from "../middlewares/IsMatch";


const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<IsAuth><MainLayout><Home /></MainLayout></IsAuth>} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<IsAuth><MainLayout><MyProfile /></MainLayout></IsAuth>} />
      <Route path="/matchs" element={<IsAuth><MainLayout><SliderMatchs/></MainLayout></IsAuth>} />
      <Route path="/chats" element={<IsAuth><MainLayout><ListChats/></MainLayout></IsAuth>} />
      <Route path="/chats/:userId" element={<IsMatch><IsAuth><MainLayout><Chat /></MainLayout></IsAuth></IsMatch>} />
      <Route path="/profile/edit" element={<IsAuth><MainLayout><ProfileEdit /></MainLayout></IsAuth>} />
      <Route path="/profile/:uid" element={<IsAuth><MainLayout><Profile /></MainLayout></IsAuth>} />
      <Route path="/profile/:uid/configuration" element={<IsAuth><MainLayout><ProfileConf /></MainLayout></IsAuth>} />
      <Route path="/admin" element={<IsAuth><MainLayout><AdminIndex /></MainLayout></IsAuth>} />
      <Route path="/admin/addgame" element={<IsAuth><MainLayout><AddGame /></MainLayout></IsAuth>} />
      <Route path="/admin/editgame/:uid" element={<IsAuth><MainLayout><EditGame /></MainLayout></IsAuth>} />
      <Route path="/admin/addplan" element={<IsAuth><MainLayout><AddPlans /></MainLayout></IsAuth>} />
      <Route path="/admin/editplan/:uid" element={<IsAuth><MainLayout><EditGame /></MainLayout></IsAuth>} />
      <Route path="/options" element={<IsAuth><MainLayout><Options /></MainLayout></IsAuth>} />
      <Route path="game/:uid" element={<IsAuth><MainLayout><Game /></MainLayout></IsAuth>} />
    </Routes>
  );
};

export default MainRoutes;
