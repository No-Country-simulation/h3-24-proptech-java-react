import { useNavigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react';

import Spinner from './Spinner';
import { useUser } from '../context/UserContext';

function ProtectedRoute() {
  const navigate = useNavigate();
  const { isPending, user } = useUser();

  if (user)
    return (
      <>
        {isPending && (
          <div className='z-50 inset-0 backdrop-blur-md fixed '>
            <div className=' w-full h-full flex justify-center items-center'>
              <Spinner />
            </div>
          </div>
        )}
        <Outlet />
      </>
    );

  if (!isPending && !user) return navigate('/home');
}

export default ProtectedRoute;
