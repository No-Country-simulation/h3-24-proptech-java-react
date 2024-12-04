import { ConfirmModal } from '../../../components/modal/ConfirmModal';
import { EmailModal } from '../../../components/modal/EmailModal';
import { LoanResponse } from '../../../types/loan-response.interface';
import { Button } from '../../../ui/Button';

interface Props {
  setShowEmailModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowConfirmModal: React.Dispatch<React.SetStateAction<boolean>>;
  funcEmail: (
    loan: LoanResponse,
    message: string
  ) => Promise<string | undefined>;
  funcConfirm: (loan: LoanResponse) => Promise<void>;
  loan: LoanResponse;
  showEmail: boolean;
  showConfirm: boolean;
}

export const ButtonModalComponent = ({
  setShowEmailModal,
  setShowConfirmModal,
  funcConfirm,
  funcEmail,
  loan,
  showConfirm,
  showEmail,
}: Props) => {
  return (
    <>
      <div className='flex flex-col md:flex-row justify-center items-center gap-3 my-8 pt-8 border-t-2'>
        <Button
          type='button'
          className='bg-[#F23D4F] py-2 text-[16px]'
          onClick={() => setShowEmailModal(true)}>
          Rechazar
        </Button>
        <Button
          type='button'
          className='py-2 text-[16px] bg-green-500'
          onClick={() => setShowConfirmModal(true)}>
          Confirmar
        </Button>
      </div>
      {showEmail && (
        <EmailModal
          setShowEmailModal={setShowEmailModal}
          func={funcEmail}
          loan={loan}
        />
      )}
      {showConfirm && (
        <ConfirmModal
          setShowConfirmModal={setShowConfirmModal}
          func={funcConfirm}
          loan={loan}
        />
      )}
    </>
  );
};
