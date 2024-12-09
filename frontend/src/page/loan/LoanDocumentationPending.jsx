import { CirclePlus } from 'lucide-react';
import { useMemo, useState } from 'react';
import { uploadDocumentation } from '../../services/apiLoanDoc';
import toast from 'react-hot-toast';
import { useLoan } from '../../context/LoanContext';
import Spinner from '../../ui/Spinner';
import { useNavigate } from 'react-router-dom';

function createFormDataUpload(file, docType) {
  const formData = new FormData();
  formData.append('document', file);
  formData.append('docType', docType);
  return formData;
}

export const LoanDocumentationPending = ({ loanId }) => {
  const navigate = useNavigate();
  const [salaryReceipts, setSalaryReceipts] = useState([]);
  const [serviceReceipt, setServiceReceipt] = useState(null);
  const [identityFront, setIdentityFront] = useState(null);
  const [identityBack, setIdentityBack] = useState(null);
  const { uploadDoc, isPending, loanToPending } = useLoan();
  const isInvalid = useMemo(() => {
    return (
      salaryReceipts.length < 3 ||
      !serviceReceipt ||
      !identityFront ||
      !identityBack
    );
  }, [salaryReceipts, serviceReceipt, identityFront, identityBack]); // Dependencias

  const handleFileChange = (e, setFiles, multiple = false) => {
    const files = Array.from(e.target.files);

    if (multiple) {
      setFiles([...salaryReceipts, files[0]]);
    } else {
      setFiles(files[0]);
    }
  };

  const handleUpload = async () => {
    if (isInvalid) {
      toast.error('Faltan documentos por cargar.');
    }
    const files = [];
    try {
      for (const file of salaryReceipts) {
        const formData = createFormDataUpload(file, 'SALARY_RECEIPT');
        files.push(formData);
      }

      if (serviceReceipt) {
        const formData = createFormDataUpload(
          serviceReceipt,
          'SERVICE_RECEIPT'
        );
        files.push(formData);
      }
      if (identityFront) {
        const formData = createFormDataUpload(identityFront, 'IDENTITY_FRONT');
        files.push(formData);
      }
      if (identityBack) {
        const formData = createFormDataUpload(identityBack, 'IDENTITY_BACK');
        files.push(formData);
      }
      const promises = files.map((f) => uploadDocumentation(f, loanId));
      uploadDoc(promises).then((res) => {
        if (res) {
          loanToPending(loanId).then((resp) => {
            if (resp) {
              navigate('/loan/loan-send-information');
            }
          });
        }
      });
      setSalaryReceipts([]);
      setServiceReceipt(null);
      setIdentityFront(null);
      setIdentityBack(null);
    } catch (error) {
      toast.error('Error al cargar los documentos');
      console.error('Error subiendo documentos:', error);
    }
  };
  return (
    <div className='flex flex-col items-center  justify-evenly min-h-full  gap-4'>
      <div className='flex flex-col gap-10 items-center '>
        <div className='flex items-center relative   gap-3'>
          <div className=' p-2  bg-dark rounded-xl'>
            <CirclePlus className=' text-light ' />
          </div>

          <div className='cursor-pointer'>
            <p className='text-xs'>
              Adjunte
              {salaryReceipts.length > 0
                ? ` ${salaryReceipts.length}/3 `
                : ' 3 '}
              documentos de:
            </p>
            <p className='  font-medium text-base'>Recibos de sueldos</p>
          </div>

          <input
            type='file'
            multiple
            className='absolute w-full opacity-0'
            disabled={salaryReceipts.length === 3}
            onChange={(e) => handleFileChange(e, setSalaryReceipts, true)}
          />
        </div>
        <div className='flex items-center relative  gap-3'>
          <div className=' p-2  bg-dark rounded-xl'>
            <CirclePlus className=' text-light ' />
          </div>

          <div>
            <p className='  text-xs'>
              Adjunte {`${!serviceReceipt ? '0' : '1'} / 1 `} documento de:
            </p>
            <p className='  font-medium text-base'>Factura de servicios</p>
          </div>

          <input
            type='file'
            className='absolute  w-full opacity-0'
            onChange={(e) => handleFileChange(e, setServiceReceipt)}
          />
        </div>

        <div className='flex items-center relative  gap-3'>
          <div className=' p-2  bg-dark rounded-xl'>
            <CirclePlus className=' text-light ' />
          </div>

          <div>
            <p className='  text-xs'>
              Adjunte {`${!identityFront ? '0' : '1'} / 1 `} documento de:
            </p>
            <p className='  font-medium text-base'>Frente Doc identidad</p>
          </div>

          <input
            type='file'
            className='absolute  w-full opacity-0'
            onChange={(e) => handleFileChange(e, setIdentityFront)}
          />
        </div>

        <div className='flex items-center relative  gap-3'>
          <div className=' p-2  bg-dark rounded-xl'>
            <CirclePlus className=' text-light ' />
          </div>

          <div>
            <p className='  text-xs'>
              Adjunte {`${!identityBack ? '0' : '1'} / 1 `} documento de:
            </p>
            <p className='  font-medium text-base'>Dorso Doc identidad</p>
          </div>

          <input
            type='file'
            className='absolute  w-full opacity-0'
            onChange={(e) => handleFileChange(e, setIdentityBack)}
          />
        </div>
      </div>
      <button
        className='bg-[#2962FF] w-[90%] sm:max-w-[386px]  hover:bg-[#1F47B4] transition-all text-white px-4 py-2 rounded-md'
        onClick={handleUpload}
        disabled={isInvalid || isPending}>
        {!isPending ? 'Cargar documentacion' : <Spinner />}
      </button>
    </div>
  );
};
