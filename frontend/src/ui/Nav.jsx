import { AlignJustify } from 'lucide-react';
import { Link } from 'react-router-dom';

import Button from './Button';
import UserPhoto from '../features/user/UserPhoto';
import useCurrentUser from '../features/user/useCurrentUser';

import { LogoSvg } from './LogoSvg';
import TextLogo from './TextLogo';

const Nav = () => {
  const { user } = useCurrentUser();

  return (
    <nav className='border-b-2 border-lightGrey p-4'>
      <ul className='flex items-center gap-2'>
        <li>
          <AlignJustify className=' text-[dark]' />
        </li>

        <li className=' text-xs font-medium flex items-center '>
          <Link to='/home' className='flex items-center gap-1'>
            {' '}
            <LogoSvg height={28} width={28} />
            <TextLogo height={12.84} width={76.77} />
          </Link>
        </li>

        <li className='ml-[auto]  '>
          {user ? <UserPhoto /> : <Button to='/auth'>Iniciar sesión</Button>}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
