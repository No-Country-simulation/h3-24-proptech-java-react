import { userStore } from '../../stores/userStore';
import Logo from '../logos/Logo';
import { MenuLogo } from '../logos/MenuLogo';
import TextLogo from '../logos/TextLogo';

interface NavbarProps {
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
  showMenu: boolean;
}

export const Navbar = ({ setShowMenu, showMenu }: NavbarProps) => {
  const { user } = userStore();
  const data = `${user?.name[0]}${user?.lastname[0]}`;
  return (
    <header className=''>
      <nav>
        <div className='flex justify-between border-b fixed w-full  bg-white border-[#E2E8F0] items-center px-6 h-16 z-50'>
          <div className='flex items-center'>
            <MenuLogo
              className='mr-3 md:hidden'
              onClick={() => setShowMenu(!showMenu)}
            />
            <Logo height={28} width={28} className='mr-1' />
            <TextLogo height={11.84} width={76.77} />
          </div>
          <div className='w-7 h-7 rounded-full bg-[#E2E8F0] flex justify-center items-center'>
            <p className='font-semibold text-[#475569]'>{data}</p>
          </div>
        </div>
      </nav>
    </header>
  );
};
