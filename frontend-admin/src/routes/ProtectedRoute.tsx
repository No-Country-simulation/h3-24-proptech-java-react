import { Navigate, Outlet } from 'react-router-dom';
import { userStore } from '../stores/userStore';

export default function ProtectedRoute() {
  const isAuthenticated = userStore((state) => state.isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />;
}
