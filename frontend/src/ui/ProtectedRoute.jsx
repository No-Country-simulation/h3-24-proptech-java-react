import { Outlet } from 'react-router-dom';

import Spinner from './Spinner';
import { useUser } from '../context/UserContext';
import { useLoan } from '../context/LoanContext';

function ProtectedRoute() {
  const { isPending, user } = useUser();
  const { isPending: isLoanPending } = useLoan();

  if (user)
    return (
      <>
        {(isPending || isLoanPending) && (
          <div className='z-50 inset-0 backdrop-blur-md fixed '>
            <div className=' w-full h-full flex justify-center items-center'>
              <Spinner />
            </div>
          </div>
        )}
        <Outlet />
      </>
    );

  // if (!isPending && !user) return navigate('/home');
}

export default ProtectedRoute;
