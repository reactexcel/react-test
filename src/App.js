import "./App.css";
import Login from "./component/Login";
import {
  Routes,
  Route,
  Navigate,
  Outlet
} from "react-router-dom";
import Dashboard from "./component/Dashboard";
import SimpleUser from "./component/SimpleUser";
import Admin from "./component/Admin";
import { HashRouter } from "react-router-dom";


function App() {
  const PrivateOutlet = () => {
    const token = localStorage.getItem("token");
    return token ? <Outlet /> : <Navigate to="/" />;
  };
  const UserRoute = () => {
    const userRole = localStorage.getItem("userRole");
    return userRole === "simple" ? <Outlet /> : <Navigate to="/" />;
  };
  const AdminRoute = () => {
    const userRole = localStorage.getItem("userRole");
    return userRole === "admin" ? <Outlet /> : <Navigate to="/" />;
  };
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<PrivateOutlet />}>
          <Route path="" element={<Dashboard />} />
        </Route>
        <Route path="/userPage" element={<UserRoute />}>
          <Route path="" element={<SimpleUser />} />
        </Route>
        <Route path="/adminPage" element={<AdminRoute />}>
          <Route path="" element={<Admin />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
