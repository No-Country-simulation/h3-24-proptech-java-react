import { LoanCard } from '../../components/loan/LoanCard';
import { loanStore } from '../../stores/loanStore';

export const Dashboard = () => {
  const { loans } = loanStore();
  return (
    <div className='text-black'>
      <div className='mt-4 flex flex-col gap-5'>
        {loans && loans.length > 0
          ? loans?.map((l) => <LoanCard loanResponse={l} key={l.loanId} />)
          : 'No hay prestamos'}
      </div>
    </div>
  );
};
