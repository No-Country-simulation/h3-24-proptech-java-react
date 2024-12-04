import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/navbar/Navbar';
import { useEffect, useState } from 'react';
import { Menu } from '../components/menu/Menu';
import { loanStore } from '../stores/loanStore';
import toast from 'react-hot-toast';
import Spinner from '../components/Spinner';

export const AppLayout = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { clearError, clearSucces, isLoading, messageSucces, messageError } =
    loanStore();
  useEffect(() => {
    if (messageError.length > 0) {
      toast.error(messageError);
      clearError();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageError]);

  useEffect(() => {
    if (messageSucces.length > 0) {
      toast.success(messageSucces);
      clearSucces();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageSucces]);
  return (
    <>
      <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
      <Navbar setShowMenu={setShowMenu} showMenu={showMenu} />
      <div className='pt-16 md:max-w-[100%] md:ml-[23.6%]  m-auto  '>
        <Outlet />
        {isLoading && (
          <>
            <div className='z-50 inset-0 backdrop-blur-md fixed '>
              <div className=' w-full h-full flex justify-center items-center'>
                <Spinner />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
