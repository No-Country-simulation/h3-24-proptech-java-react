import { useLocation } from 'react-router-dom';
import { LoanCard } from '../../components/loan/LoanCard';
import { Title } from '../../components/titles-subtitles/Title';
import { loanStore } from '../../stores/loanStore';
import { Status } from '../../types/loan-response.interface';
import { SubTitle } from '../../components/titles-subtitles/SubTitle';

export const PendingPage = () => {
  const { loans } = loanStore();
  const location = useLocation();
  const title = location.state as Status;
  const titles: { [key in Status]: string } = {
    PENDING: 'Pendientes',
    PRE_APPROVED: 'Pre aprobados',
    APPROVED: 'Aprobados',
    INITIATED: 'Iniciados',
  };
  return (
    <div className='text-black md:p-8'>
      <Title className='mb-10 text-center mt-10'>
        Prestamos {titles[title]}
      </Title>
      <div className='mt-4 flex flex-col gap-5 items-center md:items-start md:flex-row'>
        {loans && loans.length > 0 ? (
          loans?.map((l) => <LoanCard loanResponse={l} key={l.loanId} />)
        ) : (
          <SubTitle className='text-center'>No hay prestamos...</SubTitle>
        )}
      </div>
    </div>
  );
};
