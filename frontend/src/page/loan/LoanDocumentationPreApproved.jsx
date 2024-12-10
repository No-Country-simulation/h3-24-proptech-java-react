import { CirclePlus } from 'lucide-react';
import { useMemo, useState } from 'react';
import { uploadDocumentation } from '../../services/apiLoanDoc';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useLoan } from '../../context/LoanContext';
import Spinner from '../../ui/Spinner';

function createFormDataUpload(file, docType, guarantorId) {
  const formData = new FormData();
  formData.append('document', file);
  formData.append('docType', docType);
  formData.append('guaranteeId', String(guarantorId));
  return formData;
}

export const LoanDocumentationPreApproved = ({ loanId }) => {
  const navigate = useNavigate();
  const { uploadDoc, isPending } = useLoan();

  const [salaryReceiptGuarantedTwo, setSalaryReceiptGuarantedTwo] = useState(
    []
  );
  const [serviceReceiptGuarantedTwo, setServiceReceiptGuarantedTwo] =
    useState(null);
  const [identityFrontGuarantedTwo, setIdentityFrontGuarantedTwo] =
    useState(null);
  const [identityBackGuarantedTwo, setIdentityBackGuarantedTwo] =
    useState(null);

  const [salaryReceiptGuarantedOne, setSalaryReceiptGuarantedOne] = useState(
    []
  );
  const [serviceReceiptGuarantedOne, setServiceReceiptGuarantedOne] =
    useState(null);
  const [identityFrontGuarantedOne, setIdentityFrontGuarantedOne] =
    useState(null);
  const [identityBackGuarantedOne, setIdentityBackGuarantedOne] =
    useState(null);
  const isInvalid = useMemo(() => {
    return (
      salaryReceiptGuarantedTwo.length < 3 ||
      salaryReceiptGuarantedOne.length < 3 ||
      !serviceReceiptGuarantedTwo ||
      !serviceReceiptGuarantedOne ||
      !identityFrontGuarantedTwo ||
      !identityFrontGuarantedOne ||
      !identityBackGuarantedTwo ||
      !identityBackGuarantedOne
    );
  }, [
    identityBackGuarantedOne,
    identityBackGuarantedTwo,
    identityFrontGuarantedOne,
    identityFrontGuarantedTwo,
    salaryReceiptGuarantedTwo.length,
    serviceReceiptGuarantedOne,
    serviceReceiptGuarantedTwo,
  ]);
  const handleUpload = async () => {
    console.log(isInvalid);
    if (isInvalid) {
      toast.error('Faltan documentos por cargar.');
    }
    const files = [];
    try {
      for (const file of salaryReceiptGuarantedOne) {
        const formData = createFormDataUpload(file, 'SALARY_RECEIPT', 1);
        files.push(formData);
      }

      if (serviceReceiptGuarantedOne) {
        const formData = createFormDataUpload(
          serviceReceiptGuarantedOne,
          'SERVICE_RECEIPT',
          1
        );
        files.push(formData);
      }
      if (identityBackGuarantedOne) {
        const formData = createFormDataUpload(
          identityBackGuarantedOne,
          'IDENTITY_FRONT',
          1
        );
        files.push(formData);
      }
      if (identityBackGuarantedOne) {
        const formData = createFormDataUpload(
          identityBackGuarantedOne,
          'IDENTITY_BACK',
          1
        );
        files.push(formData);
      }

      for (const file of salaryReceiptGuarantedTwo) {
        const formData = createFormDataUpload(file, 'SALARY_RECEIPT', 2);
        files.push(formData);
      }

      if (serviceReceiptGuarantedTwo) {
        const formData = createFormDataUpload(
          serviceReceiptGuarantedTwo,
          'SERVICE_RECEIPT',
          2
        );
        files.push(formData);
      }
      if (identityBackGuarantedTwo) {
        const formData = createFormDataUpload(
          identityBackGuarantedTwo,
          'IDENTITY_FRONT',
          2
        );
        files.push(formData);
      }
      if (identityBackGuarantedTwo) {
        const formData = createFormDataUpload(
          identityBackGuarantedTwo,
          'IDENTITY_BACK',
          2
        );
        files.push(formData);
      }

      const promises = files.map((f) => uploadDocumentation(f, loanId));
      uploadDoc(promises).then((res) => {
        if (res) {
          navigate('/loan/loan-send-information');
        }
      });
      setSalaryReceiptGuarantedOne([]);
      setSalaryReceiptGuarantedTwo([]);
      setServiceReceiptGuarantedOne(null);
      setServiceReceiptGuarantedTwo(null);
      setIdentityBackGuarantedOne(null);
      setIdentityBackGuarantedTwo(null);
      setIdentityFrontGuarantedOne(null);
      setIdentityFrontGuarantedTwo(null);
    } catch (error) {
      toast.error('Error al cargar los documentos');
      console.error('Error subiendo documentos:', error);
    }
  };
  const handleFileChange = (e, setFiles, multiple = false, guarantor) => {
    const files = Array.from(e.target.files);

    if (guarantor === 1) {
      if (multiple) {
        setFiles([...salaryReceiptGuarantedOne, files[0]]);
      } else {
        setFiles(files[0]);
      }
    } else {
      if (multiple) {
        setFiles([...salaryReceiptGuarantedTwo, files[0]]);
      } else {
        setFiles(files[0]);
      }
    }
  };
  return (
    <div className='flex flex-col items-center gap-10 pb-10 max-w-[940px] m-auto  '>
      <h2 className='font-bold text-xl'>Documentacion de los garantes</h2>
      <div className='flex flex-col items-center md:flex-row md:gap-20   min-h-full  w-full md:justify-around  gap-4'>
        <div className='flex flex-col  md gap-4'>
          <h4>Garante 1</h4>
          <div className='flex flex-col gap-4'>
            <div className='flex items-center relative   gap-3'>
              <div className=' p-2  bg-dark rounded-xl'>
                <CirclePlus className=' text-light ' />
              </div>

              <div className='cursor-pointer'>
                <p className='text-xs'>
                  Adjunte
                  {salaryReceiptGuarantedOne.length > 0
                    ? ` ${salaryReceiptGuarantedOne.length}/3 `
                    : ' 3 '}
                  documentos de:
                </p>
                <p className='  font-medium text-base'>Recibos de sueldos</p>
              </div>

              <input
                type='file'
                multiple
                className='absolute w-full opacity-0'
                disabled={salaryReceiptGuarantedOne.length === 3}
                onChange={(e) =>
                  handleFileChange(e, setSalaryReceiptGuarantedOne, true, 1)
                }
              />
            </div>
            <div className='flex items-center relative  gap-3'>
              <div className=' p-2  bg-dark rounded-xl'>
                <CirclePlus className=' text-light ' />
              </div>

              <div>
                <p className='  text-xs'>
                  Adjunte {`${!serviceReceiptGuarantedOne ? '0' : '1'} / 1 `}{' '}
                  documento de:
                </p>
                <p className='  font-medium text-base'>Factura de servicios</p>
              </div>

              <input
                type='file'
                className='absolute  w-full opacity-0'
                onChange={(e) =>
                  handleFileChange(e, setServiceReceiptGuarantedOne, false, 1)
                }
              />
            </div>
            <div className='flex items-center relative  gap-3'>
              <div className=' p-2  bg-dark rounded-xl'>
                <CirclePlus className=' text-light ' />
              </div>

              <div>
                <p className='  text-xs'>
                  Adjunte {`${!identityFrontGuarantedOne ? '0' : '1'} / 1 `}{' '}
                  documento de:
                </p>
                <p className='  font-medium text-base'>Frente Doc identidad</p>
              </div>

              <input
                type='file'
                className='absolute  w-full opacity-0'
                onChange={(e) =>
                  handleFileChange(e, setIdentityFrontGuarantedOne, false, 1)
                }
              />
            </div>

            <div className='flex items-center relative  gap-3'>
              <div className=' p-2  bg-dark rounded-xl'>
                <CirclePlus className=' text-light ' />
              </div>

              <div>
                <p className='  text-xs'>
                  Adjunte {`${!identityBackGuarantedOne ? '0' : '1'} / 1 `}{' '}
                  documento de:
                </p>
                <p className='  font-medium text-base'>Dorso Doc identidad</p>
              </div>

              <input
                type='file'
                className='absolute  w-full opacity-0'
                onChange={(e) =>
                  handleFileChange(e, setIdentityBackGuarantedOne, false, 1)
                }
              />
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <h4>Garante 2</h4>
          <div className='flex flex-col gap-4'>
            <div className='flex items-center relative   gap-3'>
              <div className=' p-2  bg-dark rounded-xl'>
                <CirclePlus className=' text-light ' />
              </div>

              <div className='cursor-pointer'>
                <p className='text-xs'>
                  Adjunte
                  {salaryReceiptGuarantedTwo.length > 0
                    ? ` ${salaryReceiptGuarantedTwo.length}/3 `
                    : ' 3 '}
                  documentos de:
                </p>
                <p className='  font-medium text-base'>Recibos de sueldos</p>
              </div>

              <input
                type='file'
                multiple
                className='absolute w-full opacity-0'
                disabled={salaryReceiptGuarantedTwo.length === 3}
                onChange={(e) =>
                  handleFileChange(e, setSalaryReceiptGuarantedTwo, true, 2)
                }
              />
            </div>
            <div className='flex items-center relative  gap-3'>
              <div className=' p-2  bg-dark rounded-xl'>
                <CirclePlus className=' text-light ' />
              </div>

              <div>
                <p className='  text-xs'>
                  Adjunte {`${!serviceReceiptGuarantedTwo ? '0' : '1'} / 1 `}{' '}
                  documento de:
                </p>
                <p className='  font-medium text-base'>Factura de servicios</p>
              </div>

              <input
                type='file'
                className='absolute  w-full opacity-0'
                onChange={(e) =>
                  handleFileChange(e, setServiceReceiptGuarantedTwo, false, 2)
                }
              />
            </div>
            <div className='flex items-center relative  gap-3'>
              <div className=' p-2  bg-dark rounded-xl'>
                <CirclePlus className=' text-light ' />
              </div>

              <div>
                <p className='  text-xs'>
                  Adjunte {`${!identityFrontGuarantedTwo ? '0' : '1'} / 1 `}{' '}
                  documento de:
                </p>
                <p className='  font-medium text-base'>Frente Doc identidad</p>
              </div>

              <input
                type='file'
                className='absolute  w-full opacity-0'
                onChange={(e) =>
                  handleFileChange(e, setIdentityFrontGuarantedTwo, false, 2)
                }
              />
            </div>

            <div className='flex items-center relative  gap-3'>
              <div className=' p-2  bg-dark rounded-xl'>
                <CirclePlus className=' text-light ' />
              </div>

              <div>
                <p className='  text-xs'>
                  Adjunte {`${!identityBackGuarantedTwo ? '0' : '1'} / 1 `}{' '}
                  documento de:
                </p>
                <p className='  font-medium text-base'>Dorso Doc identidad</p>
              </div>

              <input
                type='file'
                className='absolute  w-full opacity-0'
                onChange={(e) =>
                  handleFileChange(e, setIdentityBackGuarantedTwo, false, 2)
                }
              />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <button
        className='bg-[#2962FF] w-[90%] md:w-[400px]  hover:bg-[#1F47B4] transition-all text-white px-4 py-2 rounded-md'
        onClick={handleUpload}
        disabled={isInvalid || isPending}>
        {!isPending ? 'Cargar documentacion' : <Spinner />}
      </button>
    </div>
  );
};
