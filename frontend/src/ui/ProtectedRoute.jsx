import { useNavigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react';

import useCurrentUser from '../features/user/useCurrentUser';
import Spinner from './Spinner';

function ProtectedRoute() {
  const navigate = useNavigate();
  const { isPending, isAuthenticated } = useCurrentUser();

  useEffect(
    function () {
      if (!isAuthenticated && !isPending) navigate('/auth', { replace: true });
    },
    [isAuthenticated, isPending, navigate]
  );

  if (isPending)
    return (
      <div className='z-50 inset-0 backdrop-blur-md fixed '>
        <div className=' w-full h-full flex justify-center items-center'>
          <Spinner />
        </div>
      </div>
    );
  if (isAuthenticated) return <Outlet />;

  return null;
}

export default ProtectedRoute;
