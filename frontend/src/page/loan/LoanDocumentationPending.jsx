import axios from 'axios';
import { CirclePlus } from 'lucide-react';
import { useState } from 'react';
import { baseURL } from '../../utils/constants';
import { getData } from '../../utils/saveDataLocalStore';
import Button from '../../ui/Button';

function createFormDataUpload(file, docType) {
  const formData = new FormData();
  formData.append('document', file);
  formData.append('docType', docType);
  return formData;
}

export const LoanDocumentationPending = ({ loanId }) => {
  const [salaryReceipts, setSalaryReceipts] = useState([]);
  const [serviceReceipt, setServiceReceipt] = useState(null);

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

  const handleUpload = async () => {
    const token = getData('token');
    try {
      // Subida de recibos de sueldo ----
      for (const file of salaryReceipts) {
        const formData = createFormDataUpload(file, 'SALARY_RECEIPT');
        await axios.post(`${baseURL}/api/loans/${loanId}/documents`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(formData);
      }
      // Subida de factura de servicio ----
      if (serviceReceipt) {
        const formData = createFormDataUpload(
          serviceReceipt,
          'SERVICE_RECEIPT'
        );

        console.log(formData);
        // await axios.post(`${baseURL}/api/loans/${loanId}/documents`, formData, {
        //   headers: {
        //     'Content-Type': 'multipart/form-data',
        //     Authorization: `Bearer ${token}`,
        //   },
        // });
      }

      setSalaryReceipts([]);
      setServiceReceipt(null);
    } catch (error) {
      console.error('Error subiendo documentos:', error);
    }
  };
  return (
    <div className='flex flex-col  justify-evenly bg-red-400 min-h-[80vh] gap-4'>
      <div className='flex flex-col gap-5 items-center'>
        <div className='flex items-center  gap-3'>
          <div className=' p-2  bg-dark rounded-xl'>
            <CirclePlus className=' text-light w-[55px] h-[55px]' />
          </div>

          <div className='cursor-pointer'>
            <p className='text-xs'>
              Adjunte
              {salaryReceipts.length > 0 ? `${salaryReceipts.length}/3` : '3'}
              documentos de:
            </p>
            <p className='  font-medium text-base'>Recibos de sueldos</p>
          </div>

          <input
            type='file'
            multiple
            className='absolute opacity-0'
            disabled={salaryReceipts.length === 3}
            onChange={(e) => handleFileChange(e, setSalaryReceipts, true)}
          />
        </div>
        <div className='flex items-center gap-3'>
          <div className=' p-2  bg-dark rounded-xl'>
            <CirclePlus className=' text-light w-[55px] h-[55px]' />
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
      </div>
      <Button className=''>Cargar documentacion</Button>
    </div>
  );
};
