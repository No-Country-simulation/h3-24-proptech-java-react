import { Payment } from '../../../types/loan-response.interface';
import { formatearFechaArgentina } from '../../../utils/formatearFechaArgentina';
import { formatNumber } from '../../../utils/formatNumber';
import { useState } from 'react';

interface Props {
  p: Payment;
  index: number;
}

export const QuoteCard = ({ p, index }: Props) => {
  const [show, setShow] = useState<boolean>(false);
  return (
    <div className={'w-full md:max-w-[500px] flex flex-col items-center '}>
      <div
        className={`w-full rounded-md  shadow-md border bg-[#f7f7f7] px-4 flex items-center justify-center flex-col ${
          p.status === 'APPROVED'
            ? 'bg-green-200'
            : p.status === 'REFUSED' || p.status === 'MOROSA'
            ? 'bg-red-200'
            : ''
        } `}
        onClick={() => setShow(!show)}>
        <div
          className={`flex justify-between w-full h-14 items-center border-b `}>
          <p className='font-semibold'>{index + 1}°</p>
          <p>
            {formatNumber(p.amount)}{' '}
            <span className='text-green-500 font-semibold'>$USD</span>
          </p>
        </div>
      </div>
      <div
        className={`transition-all duration-100 px-4 rounded-md ease-in-out bg-[#f7f7f7] shadow-md border-x border-b   w-full flex flex-col gap-4 overflow-hidden max-h-0 ${
          show && 'max-h-[1000px] py-10  '
        }  `}>
        <div className='flex flex-col'>
          <p className='font-semibold'>Fecha de inicio del pago</p>
          <p className='  text-center rounded-md'>
            {formatearFechaArgentina(p.dueDate)}
          </p>
        </div>
        <div className='flex flex-col'>
          <p className='font-semibold'>Fecha de limite del pago</p>
          <p className=' text-center rounded-md  px-3'>
            {formatearFechaArgentina(p.payLimitDate)}
          </p>
        </div>
        <div className=' flex flex-col justify-center items-center'>
          {p.cloudFile && (
            <img src={p.cloudFile.url} alt='' className='md:w-[300px]' />
          )}
        </div>
      </div>
    </div>
  );
};
