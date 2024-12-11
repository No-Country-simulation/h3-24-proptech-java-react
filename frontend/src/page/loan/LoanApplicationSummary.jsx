import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import Button from '../../ui/Button';

import { formatNumber } from '../../utils/helpers';
import { useLoan } from '../../context/LoanContext';
import { useProfile } from '../../context/ProfileContext';

//const sameStyle = "";

function LoanApplicationSummary() {
  const navigate = useNavigate();

  const { loan, getLoan, isPending } = useLoan();
  // const { loanResults: loan, submitLoanData } = useLoanApplication();

  const {
    getProfile,
    profile: userProfile,
    dataProfile,
    rellenarDataProfile,
    updateProfile,
  } = useProfile();

  useEffect(() => {
    rellenarDataProfile();
  }, [userProfile]);
  useEffect(() => {
    if (!loan) getLoan();
  }, []);

  useEffect(() => {
    if (!userProfile) getProfile();
  }, []);
  // useEffect(() => {
  //   if (!isPending && !userProfile && loan) navigate('/loan/veriff');
  //   if (!isPending && !userProfile && !loan) navigate('/loan-simulation');
  // }, [isPending]);

  const handleUpdateProfile = () => {
    updateProfile().then(() => navigate('/loan/loan-life'));
    // updateProfile().then(() => navigate('/loan/upload-documentation'));
  };

  return (
    <>
      {!isPending && !loan ? (
        <div
          className='w-full  md:w-[60%] lg:w-[50%] max-w-[600px] m-auto  text-center flex flex-col items-start gap-8
        '>
          <div className='text-start flex flex-col gap-2'>
            <h2 className='text-3xl font-bold'>
              No tenes ningún préstamo solicitado
            </h2>
            <p className='text-sm'>
              Solicita un préstamo desde nuestra pagina inicial para poder
              visualizar tus cuotas pendientes.{' '}
            </p>
          </div>
          <div
            className=' w-full sm:w-[70%]  md:w-[189px] font-semibold text-white h-[51px] rounded-md bg-[#2962FF] hover:bg-blue-500 flex items-center justify-center'
            onClick={() => navigate('/loan-simulation')}>
            Simular préstamo
          </div>
        </div>
      ) : (
        <div className='md:w-[60%] m-auto lg:w-[50%] lg:max-w-[600px]'>
          <h1 className='text-2xl font-semibold mb-3 text-center'>
            Resumen de datos
          </h1>
          <p className='mb-4'>
            Por favor, revise sus datos ingresados para evitar rechazos por
            datos no coincidentes.
          </p>

          <div className='border-t-2 border-lightGrey py-4 mb-4 flex flex-col gap-2'>
            <h2 className='text-xl font-semibold mb-3 text-center'>
              Resultado de la simulación
            </h2>

            <p className='flex items-center justify-between gap-1 '>
              Monto solicitado
              <span className=' font-medium'>
                {formatNumber(loan?.requestedAmount)}$ USD
              </span>
            </p>

            <p className='flex items-center justify-between  gap-1 '>
              Plazo
              <span className=' font-medium'>{loan?.termMonths} meses</span>
            </p>

            <p className='flex items-center justify-between  gap-1'>
              Pago mensual estimado
              <span className=' font-medium'>
                {formatNumber(loan?.monthlyQuota)}$ USD
              </span>
            </p>
          </div>

          <div className='border-t-2 border-lightGrey py-4 mb-4 flex flex-col gap-2'>
            <h2 className='text-xl font-semibold mb-3 text-center'>
              Datos del prestamo
            </h2>

            <p className='flex items-center justify-between gap-1 '>
              Principal actividad económica
              <span className=' font-medium'>
                {dataProfile.economicActivity}
              </span>
            </p>

            <p className='flex items-center justify-between  gap-1 '>
              Ingresos mensuales
              <span className=' font-medium'>{dataProfile.monthlyIncome}</span>
            </p>

            <p className='flex items-center justify-between  gap-1'>
              CBU / CVU
              <span className=' font-medium'>{dataProfile.bankAccountCbu}</span>
            </p>
          </div>

          <div className='border-t-2 border-lightGrey py-4 mb-4 flex flex-col gap-2'>
            <h2 className='text-xl font-semibold mb-3 text-center'>
              Datos de tu domicilio
            </h2>
            <p className='flex items-center justify-between  gap-1'>
              País
              <span className=' font-medium'>{dataProfile.country}</span>
            </p>
            <p className='flex items-center justify-between  gap-1'>
              Provincia
              <span className=' font-medium'>{dataProfile.state}</span>
            </p>

            <p className='flex items-center justify-between  gap-1 '>
              Ciudad
              <span className=' font-medium'>{dataProfile.city}</span>
            </p>

            <p className='flex items-center justify-between  gap-1 '>
              Código postal
              <span className=' font-medium'>{dataProfile.zipCode}</span>
            </p>

            <p className='flex items-center justify-between  gap-2'>
              Calle
              <span className='text-center bg-lime-40  font-medium'>
                {dataProfile.road}
              </span>
            </p>

            <p className='flex items-center justify-between gap-1 '>
              Altura
              <span className=' font-medium'>{dataProfile.houseNumber}</span>
            </p>
          </div>

          <div className='border-t-2 border-lightGrey py-4 mb-4 flex flex-col gap-2'>
            <h2 className='text-xl font-semibold mb-3 text-center'>
              Datos personales
            </h2>
            <p className='flex items-center justify-between  gap-1 '>
              Nombre(s)
              <span className=' font-medium'>
                {dataProfile.firstNameAsInDni}
              </span>
            </p>
            <p className='flex items-center justify-between  gap-1 '>
              Apellidos(s)
              <span className=' font-medium'>
                {dataProfile.lastNameAsInDni}
              </span>
            </p>

            <p className='flex items-center justify-between   gap-1'>
              Género
              <span className=' font-medium'>{dataProfile.gender}</span>
            </p>

            <p className='flex items-center justify-between  gap-1 '>
              Fecha de nacimiento
              <span className=' font-medium'>{dataProfile.dateOfBirth}</span>
            </p>

            <p className='flex items-center justify-between  gap-1 '>
              País de nacimiento
              <span className=' font-medium'>{dataProfile.nationality}</span>
            </p>

            <p className='flex items-center justify-between  gap-1 '>
              Nivel de estudios
              <span className=' font-medium'>{dataProfile.educationLevel}</span>
            </p>

            <p className='flex items-center justify-between  gap-1 '>
              Teléfono celular
              <span className=' font-medium'>{dataProfile.mobilePhone}</span>
            </p>

            <p className='flex items-center justify-between   gap-1'>
              Teléfono fijo
              <span className=' font-medium'>{dataProfile.landlinePhone}</span>
            </p>
          </div>

          <div className='border-t-2 border-lightGrey py-4  flex gap-7 items-center  justify-center'>
            <Button type='secondary' to='/loan/personal-information'>
              Modificar datos
            </Button>
            <Button type='secondary' onClick={handleUpdateProfile}>
              Continuar
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default LoanApplicationSummary;
