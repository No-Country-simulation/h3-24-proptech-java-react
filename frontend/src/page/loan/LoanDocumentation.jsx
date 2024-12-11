import { useEffect } from 'react';
import { useLoan } from '../../context/LoanContext';
import { LoanDocumentationPending } from './LoanDocumentationPending';
import { LoanDocumentationPreApproved } from './LoanDocumentationPreApproved';
import { useNavigate } from 'react-router-dom';

export const LoanDocumentation = () => {
  const navigate = useNavigate();
  const { loan, getLoan, allDocumentationUploaded } = useLoan();
  useEffect(() => {
    getLoan();
  }, []);
  useEffect(() => {
    if (!loan) {
      console.log('holaaaaaaaaaa');
      navigate('/home');
    } else if (loan?.status === 'INITIATED') {
      return;
    } else if (loan?.status === 'PENDING') {
      navigate('/loan/loan-send-information');
    } else if (loan?.status === 'APPROVED') {
      navigate('/loans');
    } else if (allDocumentationUploaded) {
      navigate('/loan/loan-send-information');
    }
  }, [loan]);

  return (
    <div className='pt-8  h-[100vh]'>
      {loan?.status === 'INITIATED' ? (
        <LoanDocumentationPending loanId={loan.loanId} />
      ) : (
        loan?.status === 'PRE_APPROVED' && (
          <LoanDocumentationPreApproved loanId={loan.loanId} />
        )
      )}
    </div>
  );
};
