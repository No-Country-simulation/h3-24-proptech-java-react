import { LoanResponse } from '../../types/loan-response.interface';
import { Button } from '../../ui/Button';
import { SubTitle } from '../titles-subtitles/SubTitle';
import { Title } from '../titles-subtitles/Title';

interface Props {
  loan: LoanResponse;
  setShowConfirmModal: React.Dispatch<React.SetStateAction<boolean>>;
  func: (loan: LoanResponse) => Promise<void>;
}

export const ConfirmModal = ({ func, loan, setShowConfirmModal }: Props) => {
  return (
    <div className='fixed z-10 inset-0 animate-scale-up  overflow-y-auto'>
      <div className='flex items-center justify-center min-h-screen'>
        <div
          className='fixed inset-0 backdrop-blur-sm bg-opacity-70 transition-opacity'
          onClick={() => setShowConfirmModal(false)}></div>
        <div className='bg-[#f7f7f7] w-[95%] h-[calc(40vh)] rounded-xl overflow-auto shadow-xl transform transition-all sm:max-w-lg sm:w-full py-6 px-8 flex flex-col justify border-2'>
          <div className='flex flex-col h-full justify-evenly'>
            <div>
              <Title className=' text-center mb-8'>
                Confirmacion del prestamo
              </Title>
              <SubTitle className='text-center text-[18px] '>
                Desea confirmar el prestamo?
              </SubTitle>
            </div>

            <div className='flex w-full gap-3 md:flex-row'>
              <Button
                type='button'
                className='text-xs w-full bg-[#F23D4F] '
                onClick={() => setShowConfirmModal(false)}>
                Cancelar
              </Button>
              <Button
                type='button'
                className='text-xs w-full bg-green-500 '
                onClick={() => {
                  func(loan);
                }}>
                Confirmar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
