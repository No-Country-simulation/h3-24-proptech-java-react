import { useEffect, useState } from 'react';
import {
  DocTypeCustom,
  Document,
  UserType,
} from '../../types/loan-response.interface';
import { SubTitle } from '../titles-subtitles/SubTitle';
import { LogoDoc } from '../logos/LogoDoc';

import { ChevronDown } from 'lucide-react';

interface Props {
  doc: Record<DocTypeCustom, Document[]>;
  userType: UserType;
}

export const AccordionCustom = ({ doc, userType }: Props) => {
  const [text, setText] = useState<DocTypeCustom | null>(null);
  const [conteo, setConteo] = useState({
    identity: 0,
    salary: 0,
    service: 0,
  });
  useEffect(() => {
    const countDocuments = (type: DocTypeCustom) =>
      doc[type].filter((m) => m.userType === userType).length;
    setConteo(() => ({
      identity: countDocuments('identity'),
      salary: countDocuments('salary'),
      service: countDocuments('service'),
    }));
  }, [doc, userType]);

  const toggleText = (type: DocTypeCustom) => {
    setText(text === type ? null : type);
  };

  const thresholds = {
    salary: 3,
    service: 1,
    identity: 2,
  };

  const accordionData: {
    label: string;
    type: DocTypeCustom;
    documents: Document[];
  }[] = [
    {
      label: 'Foto del Dni',
      type: 'identity',
      documents: doc.identity,
    },
    {
      label: 'Recibo de sueldo',
      type: 'salary',
      documents: doc.salary,
    },
    {
      label: 'Recibo de servicio',
      type: 'service',
      documents: doc.service,
    },
  ];

  const renderDocuments = (documents: Document[]) => {
    if (documents.length === 0)
      return <p className='p-4 text-center'>No hay documentos cargados...</p>;
    return documents.map(
      (d, index) =>
        d.userType == userType && (
          <div
            key={index}
            className='flex flex-col justify-center items-center '>
            <img src={d.cloudFile.url} alt='' className='h-100 mb-3 md:h-52' />
            <a
              href={d.cloudFile.url}
              target='_blank'
              rel='noopener noreferrer'
              className='bg-green-600 p-2 rounded-md text-white hover:bg-green-500 transition-all'>
              Link de la imagen
            </a>
          </div>
        )
    );
  };

  return (
    <div className='flex flex-col gap-3'>
      {accordionData.map(({ label, type, documents }) => (
        <div
          key={type}
          className='flex flex-col gap-1 border shadow-md cursor-pointer bg-[#f7f7f7]'>
          <div
            className='flex items-center justify-between rounded-md  h-14 shadow-sm w-full px-6'
            onClick={() => toggleText(type)}>
            <div className='flex items-center gap-4'>
              <LogoDoc
                className={`border ${
                  conteo[type] < (thresholds[type] || 0)
                    ? 'bg-red-400'
                    : 'bg-green-400'
                }`}
              />
              <SubTitle className='text-xl'>{label}</SubTitle>
            </div>
            <ChevronDown
              className={`w-5 h-5 transform transition-transform duration-300 ${
                text === type ? 'rotate-180' : ''
              }`}
            />
          </div>

          <div
            className={`transition-all duration-200 flex flex-col md:flex-row md:justify-center gap-4  overflow-hidden max-h-0 ${
              text === type && 'max-h-[1000px] py-8'
            }`}>
            {renderDocuments(documents)}
          </div>
        </div>
      ))}
    </div>
  );
};
