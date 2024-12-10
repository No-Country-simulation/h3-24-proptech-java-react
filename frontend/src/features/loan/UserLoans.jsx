import { useNavigate } from 'react-router-dom';
import MessagesStartingLoan from '../../page/loan/MessagesStartingLoan';
import Button from '../../ui/Button';
import useUserLoans from './useUserLoans';
import { useUser } from '../../context/UserContext';

function UserLoans() {
  const navigate = useNavigate();
  const { user } = useUser();

  const { loans, isLoading } = useUserLoans(user.userId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (loans.length === 0) {
    return <MessagesStartingLoan />;
  }

  if (loans.length === 1) {
    const loan = loans[0];
    if (loan.status === 'APPROVED') {
      return navigate(`/payment-quotas/${loan.loanId}`, { replace: true });
    }
  }

  return (
    <div className='mt-[30px]'>
      <LoanList
        header={<div>Préstamos aprobados</div>}
        loans={loans.filter((loan) => loan.status === 'APPROVED')}
        status={'Aprobadas'}
        canBeOpened={true}
      />
      <LoanList
        loans={loans.filter((loan) => loan.status === 'PRE_APPROVED')}
        status={'Preaprobados'}
      />
      <LoanList
        loans={loans.filter((loan) => loan.status === 'PENDING')}
        status={'Pendientes'}
      />
      <LoanList
        loans={loans.filter((loan) => loan.status === 'INITIATED')}
        status={'Iniciados'}
      />
    </div>
  );
}

function LoanList({ header, loans, status, canBeOpened = false }) {
  return (
    <div>
      {header}
      {header ? null : <div>{status}</div>}
      {loans.map((loan) => {
        return (
          <div key={loan.loanId} className='my-5'>
            <div>{loan.loanId}</div>
            <div>{loan.requestedAmount}</div>
            <div>{loan.monthlyQuota}</div>
            {canBeOpened ? (
              <>
                <Button to={`/payment-quotas/${loan.loanId}`}>
                  Pagar couta
                </Button>
              </>
            ) : null}
          </div>
        );
      })}
      <hr className='my-3' />
    </div>
  );
}

export default UserLoans;
