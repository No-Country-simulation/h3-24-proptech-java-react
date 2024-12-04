import { useState } from 'react';
import { LoanResponse } from '../../types/loan-response.interface';
import { Title } from '../titles-subtitles/Title';
import { Button } from '../../ui/Button';

interface Props {
  loan: LoanResponse;
  setShowEmailModal: React.Dispatch<React.SetStateAction<boolean>>;
  func: (loan: LoanResponse, message: string) => Promise<string | undefined>;
}

export const EmailModal = ({ loan, setShowEmailModal, func }: Props) => {
  const [text, setText] = useState<string>('');

  // const handleSubmit = async () => {
  //   if (text.length == 0)
  //     return toast.error('No puede enviar un mensaje vacío');
  //   const data = await declined({
  //     loanId: loan.loanId,
  //     message: text,
  //   });

  //   if (typeof data === 'string') navigate('/');
  //   setShowEmailModal(false);
  // };
  return (
    <div className='fixed z-10 inset-0 animate-scale-up  overflow-y-auto'>
      <div className='flex items-center justify-center min-h-screen'>
        <div
          className='fixed inset-0 backdrop-blur-sm bg-opacity-70 transition-opacity'
          onClick={() => setShowEmailModal(false)}></div>
        <div className='bg-[#f7f7f7] w-[95%] h-[calc(70vh)] rounded-xl overflow-auto shadow-xl transform transition-all sm:max-w-lg sm:w-full py-6 px-8 flex flex-col  border-2'>
          <Title className='text-[#2962FF] mb-8'>{`${loan.user.name} ${loan.user.lastname}`}</Title>
          <div className='w-full flex flex-col justify-between h-full'>
            <div className='flex flex-col gap-3 mb-4 w-full'>
              <label className='text-sm font-semibold'>Aclarar problema</label>
              <textarea
                className='flex items-center border rounded-md h-32 p-3 text-[#71717A]'
                value={text}
                placeholder='Inserta tu mensaje.'
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <div className='flex flex-col w-full gap-3 md:flex-row'>
              <Button
                type='button'
                className='text-xs w-full bg-green-500'
                onClick={() => func(loan, text)}>
                Enviar rechazo
              </Button>
              <Button
                type='button'
                className='text-xs w-full '
                onClick={() => setShowEmailModal(false)}>
                Volver atras
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
