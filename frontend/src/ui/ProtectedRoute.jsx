import { useNavigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react';

import Spinner from './Spinner';
import { useUser } from '../context/UserContext';

function ProtectedRoute() {
  const navigate = useNavigate();
  const { isPending, user } = useUser();

  useEffect(function () {
    if (!user && !isPending) navigate('/auth', { replace: true });
  }, []);

  if (isPending)
    return (
      <div className='z-50 inset-0 backdrop-blur-md fixed '>
        <div className=' w-full h-full flex justify-center items-center'>
          <Spinner />
        </div>
      </div>
    );
  if (user) return <Outlet />;

  return null;
}

export default ProtectedRoute;
