import { useNavigate } from 'react-router-dom';
import { loanStore } from '../../stores/loanStore';
import { LoanStatus } from '../../types/status.enum';
import { MenuButton } from './MenuButton';
import { Status } from '../../types/loan-response.interface';
import { DoorClosed, DoorOpen, LogOut } from 'lucide-react';
import { userStore } from '../../stores/userStore';
import { useState } from 'react';

const data: { value: string; status: Status }[] = [
  {
    value: 'Préstamos Iniciados',
    status: LoanStatus.Initiated,
  },
  {
    value: 'Préstamos Pendientes',
    status: LoanStatus.Pending,
  },
  {
    value: 'Préstamos Pre aprobados',
    status: LoanStatus.PreAproved,
  },
  {
    value: 'Préstamos Aprobados',
    status: LoanStatus.Approved,
  },
];

interface MenuProps {
  showMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Menu = ({ showMenu, setShowMenu }: MenuProps) => {
  const { findByStatus } = loanStore();
  const [isHovered, setIsHovered] = useState(false);
  const { logout } = userStore();
  const navigate = useNavigate();
  const data2: { [key in Status]: string } = {
    PENDING: 'pending',
    PRE_APPROVED: 'pre-approved',
    APPROVED: 'approved',
    INITIATED: 'initiated',
  };
  const findLoans = (status: Status) => {
    findByStatus(status);
    setShowMenu(false);
    navigate(`/loan-${data2[status]}`, { state: status });
  };

  return (
    <div
      className={`fixed bg-white  z-10 w-full md:w-[16.5%] h-screen transition-all duration-300 ease-in-out md:border-r  mt-16 md:min-w-[300px] ${
        !showMenu
          ? '-left-[100%] md:left-0 md:inline'
          : 'left-0 md:inline-block'
      } `}>
      <div className='pt-12 pl-6 flex flex-col gap-6'>
        <p className='text-xl font-semibold '> Listas de usuarios</p>
        <div className='flex flex-col gap-10'>
          {data.map((m, i) => (
            <div key={i} onClick={() => findLoans(m.status)}>
              <MenuButton key={i} value={m.value} status={m.status} />
            </div>
          ))}
        </div>
      </div>
      <div
        className='flex gap-3 items-center absolute bottom-28  left-[50%] transform -translate-x-1/2 cursor-pointer hover:bg-[#F23D4F] hover:text-white shadow-md rounded-md border  bg-[#f8f4f4] py-2 px-4 transition-all duration-200'
        onClick={logout}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        {!isHovered ? <DoorClosed className='' /> : <DoorOpen />}{' '}
        <span className='font-semibold'>Logout</span>
      </div>
    </div>
  );
};
