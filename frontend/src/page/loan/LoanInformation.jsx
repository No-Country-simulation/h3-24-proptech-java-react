import { CirclePlus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import FormRow from '../../ui/FormRow';
import SubmitButton from '../../ui/SubmitButton';
import useLoanApplication from '../../features/loan/useLoanApplication';
import { useState } from 'react';

function LoanInformation() {
  const [salaryReceipts, setSalaryReceipts] = useState([]);
  const [serviceReceipt, setServiceReceipt] = useState(null);

  const navigate = useNavigate();
  const { addLoanData, loanResults } = useLoanApplication();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      economicActivity: loanResults?.economicActivity,
      monthlyIncome: loanResults?.monthlyIncome,
      bankAccountCbu: loanResults?.bankAccountCbu,
    },
  });

  ////////////////////////
  //  Subida de documentos

  const handleFileChange = (e, setFiles, multiple = false) => {
    const files = Array.from(e.target.files);
    console.log(e.target.files);
    if (multiple) {
      const data = [files];
      console.log(e, files);
      salaryReceipts.length === 0
        ? setFiles(data)
        : setFiles([...salaryReceipts, ...files]);
    } else {
      setFiles(files[0]);
    }
  };
  console.log({
    salario: salaryReceipts,
    servicio: serviceReceipt,
  });

  ////////////////////////

  async function onSubmit(data) {
    const values = {
      ...data,
      monthlyIncome: Number(data?.monthlyIncome),
      salaryReceipts: salaryReceipts,
      serviceReceipt: serviceReceipt,
    };
    console.log(values);
    addLoanData('form2', values);

    // reset();
    // navigate('/loan/address-details', {
    //   replace: true,
    // });
  }

  ////////////////////////

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='  max-w-[500px] mx-auto  min-h-[75vh]  flex flex-col gap-5'>
      <h1 className='text-2xl font-semibold mb-3'>Datos sobre el prestamo</h1>
      <FormRow
        label='Cuál es tu principal actividad económica?'
        error={errors?.economicActivity?.message}>
        <textarea
          placeholder='Cuéntanos más'
          className='h-[100px] '
          {...register('economicActivity', {
            required: 'Este campo es obligatorio',
          })}></textarea>
      </FormRow>
      <FormRow
        label='Cuantos son tus ingresos mensuales?'
        error={errors?.monthlyIncome?.message}>
        <input
          type='number'
          placeholder='Ingrese un numero'
          {...register('monthlyIncome', {
            required: 'Este campo es obligatorio',
          })}
        />
      </FormRow>
      <FormRow
        label='CBU de su cuenta bancaria'
        error={errors?.bankAccountCbu?.message}>
        <input
          type='number'
          placeholder='Ingrese un numero'
          {...register('bankAccountCbu', {
            required: 'Este campo es obligatorio',
          })}
        />
      </FormRow>

      {/* Subida de documentos */}
      <div className='flex items-center gap-3'>
        <div className=' p-2  bg-dark rounded-xl'>
          <CirclePlus className=' text-light w-[25px] h-[25px]' />
        </div>

        <div className='cursor-pointer'>
          <p className='text-xs'>
            Adjunte{' '}
            {salaryReceipts.length > 0 ? `${salaryReceipts.length}/3` : '3'}{' '}
            documentos de:
          </p>
          <p className='  font-medium text-base'>Recibos de sueldos</p>
        </div>

        <input
          type='file'
          multiple
          className='absolute opacity-0'
          onChange={(e) => handleFileChange(e, setSalaryReceipts, true)}
        />
      </div>

      <div className='flex items-center gap-3'>
        <div className=' p-2  bg-dark rounded-xl'>
          <CirclePlus className=' text-light w-[25px] h-[25px]' />
        </div>

        <div>
          <p className='  text-xs'>Adjunte 1 documento de:</p>
          <p className='  font-medium text-base'>Factura de servicios</p>
        </div>

        <input
          type='file'
          className='absolute opacity-0'
          onChange={(e) => handleFileChange(e, setServiceReceipt)}
        />
      </div>

      <div className='ml-auto mt-3'>
        <SubmitButton>Continuar</SubmitButton>
      </div>
    </form>
  );
}

export default LoanInformation;
