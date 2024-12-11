import { ChevronDown, OctagonAlert } from 'lucide-react';
import Button from '../../ui/Button';
import { formatNumber } from '../../utils/helpers';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import StartLoanRequest from '../../features/loan/StartLoanRequest';
import { useLoan } from '../../context/LoanContext';

const sameStyle = 'flex items-center justify-between text-[#475569]';

function LoanSimulationResult() {
  const [show, setShow] = useState(false);
  const [showTa, setShowTa] = useState(false);
  const navigate = useNavigate();
  const { loanSimulation: loan } = useLoan();
  useEffect(
    function () {
      if (!loan) navigate('/loan-simulation', { replace: true });
    },
    [loan, navigate]
  );
  console.log(loan.schedule);
  return (
    <section className='lg:w-[50%] m-auto'>
      {!show ? (
        <>
          <div className=' px-5  py-8 '>
            <h1 className=' text-2xl font-semibold mb-4'>
              Resultado de la simulación
            </h1>

            <div className='mb-4 flex flex-col gap-2'>
              <p className={sameStyle}>
                Monto solicitado
                <span className=' font-medium text-dark'>
                  {formatNumber(loan?.requestedAmount)}$ USD
                </span>
              </p>

              <p className={sameStyle}>
                Plazo
                <span className=' font-medium text-dark'>
                  {loan?.termMonths} meses
                </span>
              </p>
            </div>

            <h3 className=' text-xl font-semibold mb-4'>Condiciones</h3>

            <div className=' flex flex-col gap-2 mb-8'>
              <p className={sameStyle}>
                Plazo
                <span className=' font-medium text-dark'>
                  {loan?.termMonths / 12} años
                </span>
              </p>

              <p className={sameStyle}>
                Pago mensual estimado
                <span className=' font-medium text-dark'>
                  {formatNumber(loan?.monthlyQuota)}$ USD
                </span>
              </p>
            </div>

            <div className='bg-[#F1F5F9] p-5 rounded-xl flex gap-3 '>
              <OctagonAlert className='text-dark w-7 h-7' />
              <div>
                <p className='mb-5'>
                  Si no estas conforme con los resultados de tu simulación,
                  podes re-simular tu crédito personal.
                </p>

                <Button to='/loan-simulation'>Simular otro préstamooo</Button>
              </div>
            </div>
            <div className='mt-8 '>
              <div
                className='flex justify-between items-center mb-1 cursor-pointer'
                onClick={() => setShowTa(!showTa)}>
                <h2 className='font-bold text-xl'>Tabla de amortización</h2>
                <ChevronDown />
              </div>
              <h2 className='mb-4 text-[#475569] text-sm'>
                *Los montos pueden sufrir variaciones de precio{' '}
              </h2>
              <div
                className={`overflow-hidden transition-all  duration-500 max-h-0 ${
                  showTa && 'max-h-[1000px]'
                } '`}>
                <table border='1' className='w-full   '>
                  <thead>
                    <tr className='border-y py-4 '>
                      <th>Mes</th>
                      <th>Cuota</th>
                      <th>Interés</th>
                      <th>Saldo Restante</th>
                    </tr>
                  </thead>
                  <tbody className='w-full text-center mt-4'>
                    {loan.schedule.map((item) => (
                      <tr key={item.month}>
                        <td>{item.month}</td>
                        <td>{item.quota} $USD</td>
                        <td>{item.interest}</td>
                        <td>{item.remaining} $USD</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <h2></h2>
            </div>
          </div>

          <div className='w-full flex justify-end  ml-auto mt-10 p-5 border-t-2 border-lightGrey '>
            <Button type='secondary' onClick={() => setShow(true)}>
              Iniciar solicitud
            </Button>
          </div>
        </>
      ) : (
        <StartLoanRequest />
      )}
    </section>
  );
}

export default LoanSimulationResult;
