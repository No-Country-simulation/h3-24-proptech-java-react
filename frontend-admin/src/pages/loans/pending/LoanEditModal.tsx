import { useEffect, useState } from 'react';
import { Button } from '../../../ui/Button';
import { useParams } from 'react-router-dom';
import { loanStore } from '../../../stores/loanStore';
import toast from 'react-hot-toast';
import { LoanFormData } from '../../../types/loan-service.types';
import { Title } from '../../../components/titles-subtitles/Title';
import { LoanSimulateResult } from './LoanSimulateResult';
import { SubTitle } from '../../../components/titles-subtitles/SubTitle';

interface Props {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  amount: number;
}

export const LoanEditModal = ({ setShowModal, amount }: Props) => {
  const [amountState, setAmountState] = useState<number>(amount);
  const {
    months: monthly,
    findMonths,
    simulateLoan,
    loanSimulate,
    updateLoan,
  } = loanStore();
  const [selectedQuantity, setSelectedQuantity] = useState<number>(0);
  useEffect(() => {
    findMonths();
  }, [findMonths]);
  const { loanId } = useParams();

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedQuantity(+e.target.value); // Guarda el valor seleccionado
  };

  const handleSimulateLoan = () => {
    const formData: LoanFormData = {
      requestedAmount: amountState,
      termMonths: selectedQuantity,
    };
    if (selectedQuantity === 0 || amountState === 0) {
      toast.error('La cantidad de meses o el monto deben ser distintos de 0');
      return;
    }
    simulateLoan(formData);
  };

  const handleUpdateLoan = () => {
    console.log('update loan');
    const formData: LoanFormData = {
      requestedAmount: amountState,
      termMonths: selectedQuantity,
    };
    if (selectedQuantity === 0 || amountState === 0) {
      toast.error('La cantidad de meses o el monto deben ser distintos de 0');
      return;
    }
    updateLoan(formData, loanId!);
    setShowModal(false);
  };
  return (
    <div className='fixed z-10 inset-0 animate-scale-up  overflow-y-auto'>
      <div className='flex items-center justify-center min-h-screen'>
        <div
          className='fixed inset-0 backdrop-blur-sm bg-opacity-70 transition-opacity'
          onClick={() => setShowModal(false)}></div>
        <div className='bg-[#f7f7f7] w-[95%] min-h-[50vh] md:min-h-[40vh] rounded-xl overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full py-6 px-8 flex flex-col justify-between border-2'>
          <div className='flex flex-col gap-3 mb-4 w-[100%]'>
            <Title className='text-start'>Prestamo</Title>
            <label className='text-sm font-semibold'>Monto:</label>
            <input
              className='flex items-center border rounded-sm h-10 px-3 text-[#71717A]'
              value={amountState}
              onChange={(e) => setAmountState(+e.target.value)}
              type='number'
            />

            <div>
              <label
                className='text-sm font-semibold'
                id='quantity-quote-select'>
                Selecciona un plazo
              </label>
              <select
                name='quantity-quote'
                id='quantity-quote-select'
                className='flex items-center border rounded-sm h-10 px-3 text-[#71717A] bg-white overflow-auto transition-all duration-300 ease-in-out w-40'
                value={selectedQuantity}
                onChange={handleSelectChange}>
                <option value={0}>Plazo</option>
                {/* <option value=''>Plazos</option> */}
                {monthly?.map((m) => (
                  <option value={m} key={m}>
                    {`${m} Meses.`}
                  </option>
                ))}
              </select>
            </div>
            {loanSimulate && (
              <>
                <SubTitle>Resultado de la simulacion</SubTitle>
                <LoanSimulateResult
                  interestRate={loanSimulate.schedule[0].interest}
                  monthlyQuota={loanSimulate.monthlyQuota}
                  requestedAmount={loanSimulate.requestedAmount}
                  termMonths={loanSimulate.termMonths}
                />
              </>
            )}
          </div>
          <div className='flex gap-2 justify-center items-center'>
            <Button
              type='button'
              className='text-xs py-3 w-full bg-green-500'
              onClick={handleSimulateLoan}>
              Simular prestamo
            </Button>

            <Button
              type='button'
              className='text-xs py-3 w-full'
              onClick={handleUpdateLoan}>
              Actualizar prestamo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
