import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import RequireAuth from './RequireAuth';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<RequireAuth><Dashboard /></RequireAuth>} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
    <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
  </Routes>
);

export default AppRoutes;
