import { AlignJustify } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import UserPhoto from '../features/user/UserPhoto';
import useCurrentUser from '../features/user/useCurrentUser';

import { LogoSvg } from './LogoSvg';
import TextLogo from './TextLogo';

const Nav = () => {
  const navigate = useNavigate();
  const { user } = useCurrentUser();

  return (
    <nav className='border-b-2 h-16 flex z-50 bg-white border-lightGrey p-4 fixed w-full md:w-full md:max-w-[1920px]'>
      <ul className='flex items-center w-full  gap-2'>
        <li className=' text-xs font-medium flex items-center '>
          <Link to='/home' className='flex items-center gap-1'>
            {' '}
            <LogoSvg height={28} width={28} />
            <TextLogo height={12.84} width={76.77} />
          </Link>
        </li>

        <li className='ml-[auto]  '>
          {user ? (
            <UserPhoto />
          ) : (
            <div className='flex gap-5'>
              <button
                className='text-[#2962FF] hover:text-blue-500 font-semibold'
                onClick={() => navigate('/auth', { state: 'login' })}>
                Iniciar sesión
              </button>
              <button
                className='bg-[#2962FF] hidden md:inline hover:bg-[#1F47B4] transition-all text-white px-4 py-2 rounded-md'
                onClick={() => navigate('/auth', { state: 'register' })}>
                Registrate
              </button>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
