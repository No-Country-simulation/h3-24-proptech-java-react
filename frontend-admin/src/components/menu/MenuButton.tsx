import { useLocation } from 'react-router-dom';
import { RightArrow } from '../logos/RightArrow';
import { useEffect, useState } from 'react';
import { Status } from '../../types/loan-response.interface';

interface Props {
  value: string;
  status: Status;
}

export const MenuButton = ({ value, status }: Props) => {
  const [isActive, setIsActive] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const pathname = location.pathname;
    if (status === 'APPROVED') {
      // Loan approved no debe contener 'pre-approved' y sí 'loan-approved'
      const isLoanApproved = pathname.includes('loan-approved');
      const isPre = pathname.includes('pre');
      setIsActive(isLoanApproved && !isPre);
    } else if (status === 'PRE_APPROVED') {
      // Loan pre-approved debe contener 'loan-pre-approved'
      const isLoanPreApproved = pathname.includes('loan-pre-approved');
      setIsActive(isLoanPreApproved);
    } else if (status === 'INITIATED' || status === 'PENDING') {
      // Compara con 'loan-initiated' o 'loan-pending'
      const isStatusInUrl = pathname.includes(status.toLowerCase());
      setIsActive(isStatusInUrl);
    }
  }, [location.pathname, status]);

  return (
    <div
      className={`text-[15px] transition-all font-semibold p-2  flex items-center justify-between w-[90%] h-10 border text-start border-[#E2E8F0] cursor-pointer hover:bg-slate-100 rounded-md ${
        isActive && 'bg-slate-100'
      }`}>
      <p>{value}</p>
      <RightArrow />
    </div>
  );
};
