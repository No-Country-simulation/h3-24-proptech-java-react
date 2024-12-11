import { CirclePlus, FileCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LoanPersonalData = ({ loan, profile }) => {
  const navigate = useNavigate();
  const [documentUploaded, setDocumentUploaded] = useState({
    salary: false,
    service: false,
    identityF: false,
    identityB: false,
  });
  const [docs, setDocs] = useState(null);
  useEffect(() => {
    if (loan && loan.documentationStatuses) setDocs(loan.documentationStatuses);
  }, [loan]);
  useEffect(() => {
    if (docs) {
      const index = docs.findIndex((d) => d.guaranteeId === null);

      if (docs[index].allDocumentsUploaded) {
        setDocumentUploaded({
          salary: true,
          service: true,
          identityF: true,
          identityB: true,
        });
      } else {
        docs[index].documentTypeStatuses.forEach((d) => {
          if (d.documentType === 'SALARY_RECEIPT' && d.documents.length >= 3)
            setDocumentUploaded({ ...documentUploaded, salary: true });
          if (d.documentType === 'SERVICE_RECEIPT' && d.documents.length > 0)
            setDocumentUploaded({ ...documentUploaded, service: true });
          if (d.documentType === 'IDENTITY_FRONT' && d.documents.length > 0)
            setDocumentUploaded({ ...documentUploaded, identityF: true });
          if (d.documentType === 'IDENTITY_BACK' && d.documents.length > 0)
            setDocumentUploaded({ ...documentUploaded, identityB: true });
        });
      }
    }
  }, [docs]);

  return (
    <div className='mt-8 '>
      <div className='  mb-8'>
        <h2 className='text-3xl font-bold'>Datos personales</h2>
        <p className='text-[#475569] text-xl'>
          Por favor, revise los datos ingresados sean acordes a su estado
          actual.
        </p>
      </div>
      <hr />
      <div className='flex flex-wrap justify-between  m-auto'>
        <div className='flex justify-between gap-32 w-full'>
          <div className='  w-1/2 '>
            <h2 className='font-bold my-8 '>Datos del prestamo</h2>
            <div className=''>
              <div className='flex flex-col gap-4'>
                <div className='flex justify-between'>
                  <h3 className='text-[#475569]'>
                    Principal actividad económica
                  </h3>
                  <h3 className='font-semibold'>{profile?.economicActivity}</h3>
                </div>
                <div className='flex justify-between '>
                  <h3 className='text-[#475569]'>Ingresos mensuales</h3>
                  <h3 className='font-semibold'>
                    {profile?.monthlyIncome} $USD
                  </h3>
                </div>
                <div className='flex justify-between '>
                  <h3 className='text-[#475569]'>CBU / CVU</h3>
                  <h3 className='font-semibold'>{profile?.bankAccountCbu}</h3>
                </div>
              </div>

              <div className='grid grid-cols-2 grid-rows-2 mt-8 gap-5   '>
                <div className='flex items-center relative   gap-3'>
                  <div
                    className={`${
                      documentUploaded.salary ? 'bg-green-500' : 'bg-red-500 '
                    } p-2  rounded-xl text-light `}>
                    {documentUploaded.salary ? (
                      <FileCheck />
                    ) : (
                      <CirclePlus className=' text-light ' />
                    )}
                  </div>

                  <div className='cursor-pointer'>
                    <p className='text-xs'>Adjunte 3 documentos de:</p>
                    <p className='  font-medium text-base'>
                      Recibos de sueldos
                    </p>
                  </div>
                </div>

                <div className='flex items-center relative   gap-3'>
                  <div
                    className={`${
                      documentUploaded.service ? 'bg-green-500' : 'bg-red-500 '
                    } p-2  rounded-xl`}>
                    {documentUploaded.service ? (
                      <FileCheck />
                    ) : (
                      <CirclePlus className=' text-light ' />
                    )}
                  </div>

                  <div className='cursor-pointer'>
                    <p className='text-xs'>Adjunte 1 documentos de:</p>
                    <p className='  font-medium text-base'>
                      Factura de servicios
                    </p>
                  </div>
                </div>
                <div className='flex items-center relative   gap-3'>
                  <div
                    className={`${
                      documentUploaded.identityF
                        ? 'bg-green-500'
                        : 'bg-red-500 '
                    } p-2  rounded-xl`}>
                    {documentUploaded.identityF ? (
                      <FileCheck />
                    ) : (
                      <CirclePlus className=' text-light ' />
                    )}
                  </div>

                  <div className='cursor-pointer'>
                    <p className='text-xs'>Adjunte Frente de:</p>
                    <p className='  font-medium text-base'>
                      Documento identidad
                    </p>
                  </div>
                </div>
                <div className='flex items-center relative   gap-3'>
                  <div
                    className={`${
                      documentUploaded.identityB
                        ? 'bg-green-500'
                        : 'bg-red-500 '
                    } p-2  rounded-xl`}>
                    {documentUploaded.identityB ? (
                      <FileCheck />
                    ) : (
                      <CirclePlus className=' text-light ' />
                    )}
                  </div>

                  <div className='cursor-pointer'>
                    <p className='text-xs'>Adjunte Dorso de:</p>
                    <p className='  font-medium text-base'>
                      Documento identidad
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='  w-1/2'>
            <h2 className='font-bold my-8'>Datos del domicilio</h2>
            <div className=''>
              <div className='flex flex-col gap-10'>
                <div className='flex justify-between'>
                  <h3 className='text-[#475569]'>País</h3>
                  <h3 className='font-semibold'>{profile?.country}</h3>
                </div>
                <div className='flex justify-between '>
                  <h3 className='text-[#475569]'>Provincia</h3>
                  <h3 className='font-semibold'>{profile?.state}</h3>
                </div>
                <div className='flex justify-between '>
                  <h3 className='text-[#475569]'>Ciudad</h3>
                  <h3 className='font-semibold'>{profile?.city}</h3>
                </div>
                <div className='flex justify-between '>
                  <h3 className='text-[#475569]'>Calle</h3>
                  <h3 className='font-semibold'>{profile?.road}</h3>
                </div>
                <div className='flex justify-between '>
                  <h3 className='text-[#475569]'>Altura</h3>
                  <h3 className='font-semibold'>{profile?.houseNumber}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full mt-8 border m-auto border-[#94A3B8]'></div>

        <div className='flex flex-wrap justify-between  w-full  m-auto'>
          <div className='w-1/2'>
            <h2 className='font-bold my-8'>Datos personales</h2>
            <div className=' flex flex-col gap-4'>
              <div className='flex justify-between '>
                <h3 className='text-[#475569]'>Nombre(s)</h3>
                <h3 className='font-semibold'>{profile?.firstNameAsInDni}</h3>
              </div>
              <div className='flex  justify-between'>
                <h3 className='text-[#475569]'>Apellido(s)</h3>
                <h3 className='font-semibold'>
                  {profile?.lastNameAsInDni} $USD
                </h3>
              </div>
              <div className='flex  justify-between'>
                <h3 className='text-[#475569]'>Genero</h3>
                <h3 className='font-semibold'>{profile?.gender}</h3>
              </div>
              <div className='flex justify-between'>
                <h3 className='text-[#475569]'>Fecha de nacimiento</h3>
                <h3 className='font-semibold'>{profile?.dateOfBirth}</h3>
              </div>
              <div className='flex justify-between'>
                <h3 className='text-[#475569]'>País de nacimiento</h3>
                <h3 className='font-semibold'>{profile?.nationality}</h3>
              </div>
              <div className='flex justify-between'>
                <h3 className='text-[#475569]'>Nivel de estudios</h3>
                <h3 className='font-semibold'>{profile?.educationLevel}</h3>
              </div>
              <div className='flex justify-between'>
                <h3 className='text-[#475569]'>Teléfono celular</h3>
                <h3 className='font-semibold'>{profile?.mobilePhone}</h3>
              </div>
              <div className='flex justify-between'>
                <h3 className='text-[#475569]'>Teléfono fijo</h3>
                <h3 className='font-semibold'>
                  {profile?.landlinePhone ? profile?.landlinePhone : '---'}
                </h3>
              </div>
            </div>
          </div>
          <div className='flex justify-end items-end'>
            <div
              className='flex justify-center items-center w-[162px] h-[44px] border-2 border-[#2962FF] text-[#2962FF] hover:border-[#4e629b] hover:text-[#4e629b] font-bold rounded-md cursor-pointer'
              onClick={() => navigate('/loan/personal-information')}>
              Modificar datos
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

{
  /* <FileCheck /> */
}

{
  /* <div
className={` p-2  rounded-xl ${
  salaryReceipts.length === 3 ? 'bg-green-400' : 'bg-dark'
} `}>
<CirclePlus className=' text-light ' />
</div> */
}
