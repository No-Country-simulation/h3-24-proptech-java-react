import { useState } from 'react';
import { Document } from '../../types/loan-response.interface';

interface Props {
  documents: Document[];
}

export const LoanDocumentList = ({ documents }: Props) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null); // Estado para saber cuál item está expandido

  // Función para manejar la expansión de un ítem
  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index); // Expande o colapsa el ítem
  };

  return (
    <div>
      <ul>
        {documents.map((item, index) => (
          <li key={index} className='mb-4'>
            <button
              onClick={() => handleToggle(index)} // Al hacer clic cambia el estado
              className='text-blue-600 font-semibold hover:underline'>
              {item.cloudFile.originalFilename}{' '}
              {/* Muestra el nombre del archivo */}
            </button>
            {expandedIndex === index && (
              <div className='mt-2'>
                <img
                  src={item.cloudFile.url} // Muestra la imagen correspondiente
                  alt={item.cloudFile.originalFilename} // Texto alternativo para la imagen
                  className='max-w-full h-auto'
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
