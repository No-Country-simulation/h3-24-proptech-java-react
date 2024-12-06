import { useEffect, useState } from 'react';
import { LoanResponse } from '../../../types/loan-response.interface';
import { useLocation, useNavigate } from 'react-router-dom';
import { Title } from '../../../components/titles-subtitles/Title';
import { QuoteCard } from './QuoteCard';

export const LoanApprovedPage = () => {
  const [loan, setLoan] = useState<LoanResponse | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const loanData = location.state as LoanResponse;
    if (loanData === undefined || loanData === null) {
      navigate('/');
    } else {
      setLoan(loanData);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const loanData = location.state as LoanResponse;
    setLoan(loanData);
    console.log(loanData);
  }, [location.state]);
  if (loan)
    return (
      <div className='flex justify-center flex-col items-center gap-3 py-5 px-4'>
        <Title className='text-[#2962FF] mb-3 font-semibold'>{`${loan.user.name} ${loan.user.lastname}`}</Title>

        <Title className='mb-8 font-semibold'>Datos de cuotas a pagar</Title>
        {loan.payments.map((p, index) => (
          <QuoteCard p={p} index={index} key={index} />
        ))}
      </div>
    );
};
