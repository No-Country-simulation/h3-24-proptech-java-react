/** @format */
import { Navigate, Outlet } from 'react-router-dom';
import { userStore } from '../stores/userStore';

export default function PublicRoutes() {
  const isAuthenticate = userStore((state) => state.isAuthenticated);
  return isAuthenticate ? <Navigate to={'/'} /> : <Outlet />;
}
