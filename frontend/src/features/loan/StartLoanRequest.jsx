import { useNavigate } from 'react-router-dom';
import { useLoan } from '../../context/LoanContext';
import Button from '../../ui/Button';
import { useEffect } from 'react';

function StartLoanRequest() {
  const { createLoan, isPending, loan, getLoan } = useLoan();

  const navigate = useNavigate();

  useEffect(() => {
    console.log('asdasd');
    getLoan();
  }, []);

  useEffect(() => {
    if (loan) {
      if (loan.status === 'PENDING') {
        navigate('/loan/loan-send-information', { replace: true });
      } else {
        navigate('/loan/veriff', { replace: true });
      }
    }
  }, [loan]);

  const handleCreateLoan = () => {
    createLoan().then((res) => {
      if (res) {
        navigate('/loan/veriff', { replace: true });
      }
    });
  };

  return (
    <div className='flex flex-col  min-h-[90vh]'>
      <div className='flex-grow px-5  py-8 '>
        <h1 className=' text-2xl font-semibold mb-5'>
          ¡Genial! Estamos listos para avanzar
        </h1>
        <p className='mb-3'>
          Para continuar con tu solicitud de préstamo, necesitamos que completes
          algunos datos adicionales.
        </p>
        <p>
          Esto nos permitirá evaluar tu solicitud de forma rápida y precisa.
        </p>
      </div>

      <div className='w-full flex justify-end  ml-auto mt-10 p-5 border-t-2 border-lightGrey '>
        <Button
          type='secondary'
          disabled={isPending}
          onClick={handleCreateLoan}>
          Iniciar solicitud
        </Button>
      </div>
    </div>
  );
}

export default StartLoanRequest;
