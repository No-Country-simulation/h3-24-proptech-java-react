import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';

import { formatNumber } from '../../utils/helpers';
import { useLoanSimulationResult } from './useLoanSimulationResult';

function Quotas() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const loan = useLoanSimulationResult();
  useEffect(
    function () {
      if (!loan) navigate('/messagesStartingLoan', { replace: true });
    },
    [loan, navigate]
  );

  const nextPayment = loan?.schedule?.find((payment) => payment.remaining > 0);
  const remainingMonths = loan?.schedule.filter(
    (payment) => payment.remaining > 0
  );
  const paidMonths = loan?.termMonths - remainingMonths?.length;

  return (
    <section className='max-w-[500px] mx-auto'>
      <h2 className=' text-3xl font-semibold mb-3'>Tabla de cuotas</h2>
      <p className='mb-7'>Paga y administra tus cuotas pendientes.</p>

      <div className='grid  grid-cols-2 gap-4 mb-7 items-center w-full'>
        <div className='bg-[#F1F5F9] text-center text-dark p-3  rounded-md flex items-center justify-center flex-col'>
          <p className=' text-sm font-medium text-dark'>Total a pagar</p>
          <p className=' text-lg font-bold min-[450px]:text-2xl'>
            {formatNumber(loan?.totalPayment)} USD
          </p>
        </div>

        <div className='bg-[#F1F5F9] text-center text-dark p-3 rounded-md   flex items-center justify-center flex-col'>
          <p className=' text-sm font-medium text-dark'>Cuotas</p>
          <p className='text-lg font-bold min-[450px]:text-2xl'>
            {paidMonths}
            <span className='font-normal'>/</span>
            <span className='text-base min-[450px]:text-xl  font-medium'>
              {loan?.termMonths}
            </span>
          </p>
        </div>
      </div>

      {nextPayment && (
        <div className='mb-7  flex justify-between items-center gap-2'>
          <div>
            <small className='text-sm'>Cuota {nextPayment.month}</small>
            <p className=' text-xl font-semibold'>
              {formatNumber(nextPayment.quota)} USD
            </p>
            <small className='text-sm'>
              Saldo restante: {formatNumber(nextPayment.remaining)} USD
            </small>
          </div>

          <button className='px-3 py-1 text-base text-light font-medium bg-primary rounded-lg '>
            Pagar
          </button>
        </div>
      )}

      <h3
        className='mb-7 text-lg font-medium flex items-center justify-between'
        role='button'
        onClick={() => setShow((prev) => !prev)}>
        Adelanta cuotas
        {show ? <ChevronUp /> : <ChevronDown />}
      </h3>

      {show && (
        <ul>
          {remainingMonths.map((payment) => (
            <li key={payment.month}>
              <div className='mb-7 flex justify-between items-center gap-2'>
                <div>
                  <small className='text-sm'>Cuota {payment.month}</small>
                  <p className=' text-xl font-semibold flex items-center gap-3'>
                    {formatNumber(payment.quota)} USD
                    <span className=' px-2 py-1 border-[#22C55E] border-[1px] rounded-full  font-semibold  text-xs text-[#22C55E]'>
                      {payment.interest.toFixed(2)}%
                    </span>
                  </p>
                  <small className='text-sm'>
                    Saldo restante: {formatNumber(payment.remaining)} USD
                  </small>
                </div>

                <button className='px-3 py-1 text-base text-light font-medium bg-primary rounded-lg '>
                  Pagar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Quotas;
