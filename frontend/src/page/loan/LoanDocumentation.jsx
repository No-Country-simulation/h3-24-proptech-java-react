import { useEffect } from 'react';
import { useLoan } from '../../context/LoanContext';
import { LoanDocumentationPending } from './LoanDocumentationPending';
import { LoanDocumentationPreApproved } from './LoanDocumentationPreApproved';

export const LoanDocumentation = () => {
  const { loan, getLoan } = useLoan();
  useEffect(() => {
    getLoan();
  }, []);
  console.log(loan);
  return (
    <>
      <div>Carga la data</div>
      {loan?.status === 'PENDING' ? (
        <LoanDocumentationPending />
      ) : (
        <LoanDocumentationPreApproved />
      )}
    </>
  );
};
