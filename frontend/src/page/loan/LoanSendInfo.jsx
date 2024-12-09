import { CircleAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const LoanSendInfo = () => {
  const navigate = useNavigate();
  return (
    <div className=' flex flex-col w-full md:w-[80%] md:m-auto lg:w-[50%] lg:max-w-[760px]  '>
      <div className='pb-8'>
        <div>
          <h2 className='font-bold text-2xl'>Solicitud enviada con éxito!</h2>
          <p className='text-base'>
            Hemos recibido todos tus datos y estamos procesando tu solicitud de
            préstamo.
          </p>
          <div className='w-full my-5 border m-auto border-[#94A3B8]'></div>
        </div>
        <div>
          <h2 className='font-bold text-xl'>
            Estamos procesando tu solicitud!
          </h2>
          <p className='text-sm'>
            En breve uno de nuestros especialistas se pondrá en contacto contigo
            via mail para solicitar la información de tus garantes y continuar
            con el proceso.
          </p>
        </div>
      </div>
      <div>
        <div className='flex flex-col gap-3 pb-4'>
          <div className='flex items-center py-2 text-[#2962FF] h-24 rounded-md bg-[#F4F7FF] '>
            <CircleAlert className='w-1/6' />
            <p className='font-semibold w-4/6'>
              La validación de tus datos puede demorar entre 48 y 72 horas.
            </p>
          </div>
          <div className='flex items-center py-2 text-[#F97316] h-24 rounded-md bg-[#FFF7ED] '>
            <CircleAlert className='w-1/6' />
            <p className='font-semibold w-4/6'>
              Ningún dato será pedido via mail, únicamente desde la plataforma!
            </p>
          </div>
        </div>
        <div className=' pt-4 border-t w-full lg:max-w-[386px] lg:m-auto  '>
          <div
            className='bg-[#2962FF] h-[48px] rounded-md flex justify-center items-center text-white'
            onClick={() => navigate('/home')}>
            Volver a la página principal
          </div>
        </div>
      </div>
    </div>
  );
};
