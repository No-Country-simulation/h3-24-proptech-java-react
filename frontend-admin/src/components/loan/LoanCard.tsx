import { useNavigate } from 'react-router-dom';
import { LoanResponse, Status } from '../../types/loan-response.interface';
import { LoanLogo } from '../logos/LoanLogo';

interface Props {
  loanResponse: LoanResponse;
}

export const LoanCard = ({ loanResponse }: Props) => {
  const navigate = useNavigate();
  const data: { [key in Status]: string } = {
    PENDING: 'pending',
    PRE_APPROVED: 'pre-approved',
    APPROVED: 'approved',
    INITIATED: 'initiated',
  };
  const handleNavigation = () => {
    // Usamos `navigate` para pasar el `loanData` al estado
    navigate(`/loan-${data[loanResponse.status]}/${loanResponse.loanId}`, {
      state: loanResponse,
    });
  };
  return (
    <div
      className='border border-[#0E1A39] w-[90%] md:w-[300px] p-3 rounded-lg font-semibold cursor-pointer'
      onClick={handleNavigation}>
      <div className='flex items-center justify-between'>
        <p>{`${loanResponse.user.name} ${loanResponse.user.lastname}`}</p>
        <LoanLogo />
      </div>
      <p>Dni: {loanResponse.user.dni}</p>
      <p>Email: {loanResponse.user.email}</p>
      <p>
        Monto: {loanResponse.requestedAmount}{' '}
        <span className='font-bold text-green-600'>$ USD</span>
      </p>
      <p>Plazo: {loanResponse.termMonths} Meses</p>
    </div>
  );
};
