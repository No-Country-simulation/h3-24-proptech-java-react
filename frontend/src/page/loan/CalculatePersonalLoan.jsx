import { useForm } from 'react-hook-form';
import FormRow from '../../ui/FormRow';
import SubmitButton from '../../ui/SubmitButton';
import { useLoanSimulation } from '../../features/loan/useLoanSimulation';
import { useLoan } from '../../context/LoanContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const months = [
  '6 Meses',
  '9 Meses',
  '12 Meses',
  '18 Meses',
  '24 Meses',
  '30 Meses',
  '36 Meses',
  '48 Meses',
  '60 Meses',
  '72 Meses',
  '84 Meses',
  '96 Meses',
  '120 Meses',
  '150 Meses',
  '180 Meses',
];

function CalculatePersonalLoan() {
  const navigate = useNavigate();
  const { simulateLoan, loanSimulation, isPending } = useLoan();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  async function onSubmit(data) {
    // loanSimulation(loan, { onSettled: () => reset() });
    const res = await simulateLoan({
      requestedAmount: +data.requestedAmount,
      termMonths: +data.termMonths,
    });
    if (res) {
      reset();
      navigate('/loan-simulation-result', {
        replace: true,
      });
    }
  }

  return (
    <section className='px-5  py-8 h-[68vh] md:w-[60%] lg:w-[50%] lg:max-w-[600px]  m-auto'>
      <h1 className=' text-2xl font-semibold mb-5'>
        Calcula tu préstamo personal
      </h1>

      <p className='mb-7'>
        Completa los campos para simular tu préstamo y elegir el financiamiento
        que necesitas.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='h-full  flex flex-col gap-5'>
        <FormRow
          label='Cuanto dinero necesitas?'
          error={errors?.requestedAmount?.message}>
          <input
            type='number'
            placeholder='5.000$ - 50.000$'
            disabled={isPending}
            {...register('requestedAmount', {
              required: 'Este campo es obligatorio',
            })}
          />
        </FormRow>

        <FormRow
          label='En cuantos meses te gustaría pagar?'
          error={errors?.termMonths?.message}>
          <select
            id='mesSelect'
            className=''
            disabled={isPending}
            {...register('termMonths', {
              required: 'Este campo es obligatorio',
            })}>
            <option value=''>Meses</option>

            {months.map((month, index) => {
              const num = month.slice(0, month.indexOf(' '));

              return (
                <option key={index} value={num}>
                  {month}
                </option>
              );
            })}
          </select>
        </FormRow>

        <div className=' text-center'>
          <button className='bg-[#2962FF] w-[90%] sm:max-w-[386px] m-auto hover:bg-[#1F47B4] transition-all text-white px-4 py-2 rounded-md'>
            Ver resultados
          </button>
        </div>
      </form>
    </section>
  );
}

export default CalculatePersonalLoan;

//  h-[57vh]
