import { useNavigate } from 'react-router-dom';
import MessagesStartingLoan from '../../page/loan/MessagesStartingLoan';
import Button from '../../ui/Button';
import useCurrentUser from '../user/useCurrentUser';
import useUserLoans from './useUserLoans';

function UserLoans() {
  const navigate = useNavigate();
  const { user } = useCurrentUser();
  const { loans, isLoading } = useUserLoans(user.user.userId);

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
    <div className="mt-[30px]">
      <LoanList
        loans={loans.filter((loan) => loan.status === 'APPROVED')}
        status={'Aprobada'}
        urlProvider={(loanId) => `/payment-quotas/${loanId}`}
        buttonLabel={'Pagar cuota'}
      />
      <LoanList
        loans={loans.filter((loan) => loan.status === 'PRE_APPROVED')}
        status={'Preaprobada'}
        urlProvider={() => `/loan/upload-documentation`}
        buttonLabel={'Subir documentos de garantes'}
      />
      <LoanList
        loans={loans.filter((loan) => loan.status === 'PENDING')}
        status={'Pendiente'}
      />
      <LoanList
        loans={loans.filter((loan) => loan.status === 'INITIATED')}
        status={'Iniciada'}
      />
    </div>
  );
}

const LoanCard = ({ loan, status, urlProvider, buttonLabel }) => {
  function getStatusChipStyling() {
    switch (status) {
      case 'Aprobada':
        return 'bg-green-100 text-green-80';
      case 'Preaprobada':
        return 'bg-yellow-100 text-yellow-800';
      case 'Pendiente':
        return 'bg-blue-100 text-blue-800';
      case 'Iniciada':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Préstamo con referencia:{' '}
          <span className="italic underline">{loan.loanId}</span>
        </h3>
        <span
          className={` px-3 py-1 rounded-full text-sm font-medium ${getStatusChipStyling()}`}
        >
          {status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500">Monto Solicitado</p>
          <p className="font-bold text-gray-800">
            ${loan.requestedAmount.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Tasa de Interés</p>
          <p className="font-bold text-gray-800">
            {loan.interestRate.toFixed(2)}%
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Capital restante</p>
          <p className="font-bold text-gray-800">
            ${loan.remainingBalance.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Cuota Mensual</p>
          <p className="font-bold text-gray-800">
            ${loan.monthlyQuota.toLocaleString()}
          </p>
        </div>
      </div>

      {urlProvider && (
        <div className="mt-4 flex justify-end">
          <Button
            variant="outline"
            className="w-full"
            to={urlProvider(loan.loanId)}
          >
            {buttonLabel || 'Ver Detalles'}
          </Button>
        </div>
      )}
    </div>
  );
};

function LoanList({ loans, status, buttonLabel, urlProvider }) {
  if (loans.length === 0) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {loans.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No hay préstamos para mostrar
        </div>
      ) : (
        <div>
          {loans.map((loan) => (
            <LoanCard
              key={loan.loanId}
              loan={loan}
              status={status}
              urlProvider={urlProvider}
              buttonLabel={buttonLabel}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default UserLoans;
