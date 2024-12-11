import { CirclePlus, FileCheck } from 'lucide-react';
import { useEffect, useState } from 'react';

export const LoanGuarantorData = ({ loan }) => {
  const [docs, setDocs] = useState(null);
  const [documentUploaded, setDocumentUploaded] = useState({
    guarantorOne: {
      salary: false,
      service: false,
      identityF: false,
      identityB: false,
    },
    guarantorTwo: {
      salary: false,
      service: false,
      identityF: false,
      identityB: false,
    },
  });
  useEffect(() => {
    if (loan && loan.documentationStatuses) setDocs(loan.documentationStatuses);
  }, [loan]);

  useEffect(() => {
    if (docs) {
      const indexOne = docs.findIndex((d) => d.guaranteeId == '1');
      const indexTwo = docs.findIndex((d) => d.guaranteeId == '2');

      if (
        docs[indexOne].allDocumentsUploaded &&
        docs[indexTwo].allDocumentsUploaded
      ) {
        setDocumentUploaded({
          guarantorOne: {
            salary: true,
            service: true,
            identityF: true,
            identityB: true,
          },
          guarantorTwo: {
            salary: true,
            service: true,
            identityF: true,
            identityB: true,
          },
        });
      } else {
        docs[indexOne].documentTypeStatuses.forEach((d) => {
          if (d.documentType === 'SALARY_RECEIPT' && d.documents.length >= 3) {
            const newGuarantorOne = {
              ...documentUploaded.guarantorOne,
              salary: true,
            };
            setDocumentUploaded({
              ...documentUploaded,
              guarantorOne: newGuarantorOne,
            });
          }

          if (d.documentType === 'SERVICE_RECEIPT' && d.documents.length > 0) {
            const newGuarantorOne = {
              ...documentUploaded.guarantorOne,
              service: true,
            };
            setDocumentUploaded({
              ...documentUploaded,
              guarantorOne: newGuarantorOne,
            });
          }
          if (d.documentType === 'IDENTITY_FRONT' && d.documents.length > 0) {
            const newGuarantorOne = {
              ...documentUploaded.guarantorOne,
              identityF: true,
            };
            setDocumentUploaded({
              ...documentUploaded,
              guarantorOne: newGuarantorOne,
            });
          }
          if (d.documentType === 'IDENTITY_BACK' && d.documents.length > 0) {
            const newGuarantorOne = {
              ...documentUploaded.guarantorOne,
              identityB: true,
            };
            setDocumentUploaded({
              ...documentUploaded,
              guarantorOne: newGuarantorOne,
            });
          }
        });
        docs[indexTwo].documentTypeStatuses.forEach((d) => {
          if (d.documentType === 'SALARY_RECEIPT' && d.documents.length >= 3) {
            const newGuarantorTwo = {
              ...documentUploaded.guarantorTwo,
              salary: true,
            };
            setDocumentUploaded({
              ...documentUploaded,
              guarantorTwo: newGuarantorTwo,
            });
          }

          if (d.documentType === 'SERVICE_RECEIPT' && d.documents.length > 0) {
            const newGuarantorTwo = {
              ...documentUploaded.guarantorTwo,
              service: true,
            };
            setDocumentUploaded({
              ...documentUploaded,
              guarantorTwo: newGuarantorTwo,
            });
          }
          if (d.documentType === 'IDENTITY_FRONT' && d.documents.length > 0) {
            const newGuarantorTwo = {
              ...documentUploaded.guarantorTwo,
              identityF: true,
            };
            setDocumentUploaded({
              ...documentUploaded,
              guarantorTwo: newGuarantorTwo,
            });
          }
          if (d.documentType === 'IDENTITY_BACK' && d.documents.length > 0) {
            const newGuarantorTwo = {
              ...documentUploaded.guarantorTwo,
              identityB: true,
            };
            setDocumentUploaded({
              ...documentUploaded,
              guarantorTwo: newGuarantorTwo,
            });
          }
        });
      }
    }
  }, [docs]);

  return (
    <div className='mt-8 w-full '>
      <div className='  mb-8'>
        <h2 className='text-3xl font-bold'>
          Aquí podrás adjuntar los datos de tus garantes
        </h2>
        <p className='text-[#475569] text-xl'>
          Adjunte la documentación de sus garantes para podes continuar con el
          proceso de solicitud.
        </p>
      </div>
      <hr />
      <div className='flex flex-col bg-red-400  h-[600px]'>
        <div className='flex justify-around my-8 flex-wrap'>
          <div className='w-1/2'>
            <h2 className='font-bold text-xl'>Garante 1</h2>
            <div className='grid grid-cols-2 grid-rows-2 mt-8 gap-10    '>
              <div className='flex items-center relative   gap-3'>
                <div
                  className={`${
                    documentUploaded.guarantorOne.salary
                      ? 'bg-green-500'
                      : 'bg-red-500 '
                  } p-2  rounded-xl text-light `}>
                  {documentUploaded.guarantorOne.salary ? (
                    <FileCheck />
                  ) : (
                    <CirclePlus className=' text-light ' />
                  )}
                </div>
                <div className='cursor-pointer text-black'>
                  <p className='text-xs'>Adjunte 3 documentos de:</p>
                  <p className='  font-medium text-base'>Recibos de sueldos</p>
                </div>
              </div>
              <div className='flex items-center relative text-light   gap-3'>
                <div
                  className={`${
                    documentUploaded.guarantorOne.service
                      ? 'bg-green-500'
                      : 'bg-red-500 '
                  } p-2  rounded-xl`}>
                  {documentUploaded.guarantorOne.service ? (
                    <FileCheck />
                  ) : (
                    <CirclePlus className=' text-light ' />
                  )}
                </div>

                <div className='cursor-pointer text-black'>
                  <p className='text-xs'>Adjunte 1 documentos de:</p>
                  <p className='  font-medium text-base'>
                    Factura de servicios
                  </p>
                </div>
              </div>
              <div className='flex items-center relative text-light   gap-3'>
                <div
                  className={`${
                    documentUploaded.guarantorOne.identityF
                      ? 'bg-green-500'
                      : 'bg-red-500 '
                  } p-2  rounded-xl`}>
                  {documentUploaded.guarantorOne.identityF ? (
                    <FileCheck />
                  ) : (
                    <CirclePlus className=' text-light ' />
                  )}
                </div>

                <div className='cursor-pointer text-black'>
                  <p className='text-xs'>Adjunte Frente de:</p>
                  <p className='  font-medium text-base'>Documento identidad</p>
                </div>
              </div>
              <div className='flex items-center relative text-light   gap-3'>
                <div
                  className={`${
                    documentUploaded.guarantorOne.identityB
                      ? 'bg-green-500'
                      : 'bg-red-500 '
                  } p-2  rounded-xl`}>
                  {documentUploaded.guarantorOne.identityB ? (
                    <FileCheck />
                  ) : (
                    <CirclePlus className=' text-light ' />
                  )}
                </div>

                <div className='cursor-pointer text-black'>
                  <p className='text-xs'>Adjunte Dorso de:</p>
                  <p className='  font-medium text-base'>Documento identidad</p>
                </div>
              </div>
            </div>
          </div>
          <div className='w-1/2'>
            <h2 className='font-bold text-xl'>Garante 2</h2>
            <div className='grid grid-cols-2 grid-rows-2 mt-8 gap-10  '>
              <div className='flex items-center relative gap-3'>
                <div
                  className={`${
                    documentUploaded.guarantorTwo.salary
                      ? 'bg-green-500'
                      : 'bg-red-500 '
                  } p-2  rounded-xl text-light `}>
                  {documentUploaded.guarantorTwo.salary ? (
                    <FileCheck />
                  ) : (
                    <CirclePlus className=' text-light ' />
                  )}
                </div>

                <div className='cursor-pointer text-black'>
                  <p className='text-xs'>Adjunte 3 documentos de:</p>
                  <p className='  font-medium text-base'>Recibos de sueldos</p>
                </div>
              </div>

              <div className='flex items-center relative text-light   gap-3'>
                <div
                  className={`${
                    documentUploaded.guarantorTwo.service
                      ? 'bg-green-500'
                      : 'bg-red-500 '
                  } p-2  rounded-xl`}>
                  {documentUploaded.guarantorTwo.service ? (
                    <FileCheck />
                  ) : (
                    <CirclePlus className=' text-light ' />
                  )}
                </div>

                <div className='cursor-pointer text-black'>
                  <p className='text-xs'>Adjunte 1 documentos de:</p>
                  <p className='  font-medium text-base'>
                    Factura de servicios
                  </p>
                </div>
              </div>

              <div className='flex items-center relative text-light   gap-3'>
                <div
                  className={`${
                    documentUploaded.guarantorTwo.identityF
                      ? 'bg-green-500'
                      : 'bg-red-500 '
                  } p-2  rounded-xl`}>
                  {documentUploaded.guarantorTwo.identityF ? (
                    <FileCheck />
                  ) : (
                    <CirclePlus className=' text-light ' />
                  )}
                </div>

                <div className='cursor-pointer text-black'>
                  <p className='text-xs'>Adjunte Frente de:</p>
                  <p className='  font-medium text-base'>Documento identidad</p>
                </div>
              </div>
              <div className='flex items-center relative text-light   gap-3'>
                <div
                  className={`${
                    documentUploaded.guarantorTwo.identityB
                      ? 'bg-green-500'
                      : 'bg-red-500 '
                  } p-2  rounded-xl`}>
                  {documentUploaded.guarantorTwo.identityB ? (
                    <FileCheck />
                  ) : (
                    <CirclePlus className=' text-light ' />
                  )}
                </div>

                <div className='cursor-pointer text-black'>
                  <p className='text-xs'>Adjunte Dorso de:</p>
                  <p className='  font-medium text-base'>Documento identidad</p>
                </div>
              </div>
            </div>
          </div>
          <div className='bg-green-400 h-full w-full flex items-end justify-end'>
            <p>hola</p>
          </div>
        </div>
      </div>
    </div>
  );
};
