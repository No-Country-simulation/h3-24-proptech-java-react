import { useEffect, useState } from 'react';
import {
  DocTypeCustom,
  Document,
  LoanResponse,
} from '../../../types/loan-response.interface';
import { useLocation, useNavigate } from 'react-router-dom';
import { groupDocumentsByType } from '../../../utils/groupDocumentsByType';
import { Title } from '../../../components/titles-subtitles/Title';
import { AccordionCustom } from '../../../components/accordion/AccordionCustom';
import { groupDocumentsByGuarantorId } from '../../../utils/groupDocumentsByGuarantorId';
import { ButtonModalComponent } from '../loan-components/ButtonModalComponent';
import toast from 'react-hot-toast';
import { loanStore } from '../../../stores/loanStore';

export const LoanPreApprovedPage = () => {
  const navigate = useNavigate();
  const [loan, setLoan] = useState<LoanResponse | null>(null);
  const { approve, declined } = loanStore();

  const [showEmailModal, setShowEmailModal] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

  const handleConfirm = async (loan: LoanResponse) => {
    console.log('asdasd');
    const data = await approve(loan.loanId);
    console.log(data);
    setShowConfirmModal(false);
    if (typeof data === 'string') navigate(-1);
  };

  const handleSendEmail = async (loan: LoanResponse, message: string) => {
    if (message.length == 0)
      return toast.error('No puede enviar un mensaje vacío');
    const res = await declined({
      loanId: loan.loanId,
      message: message,
    });

    if (typeof res === 'string') navigate(-1);
    setShowEmailModal(false);
  };
  const location = useLocation();
  const [groupedDocuments, setGroupedDocuments] = useState<
    Record<DocTypeCustom, Document[]>[]
  >([
    {
      identity: [],
      salary: [],
      service: [],
    },
    {
      identity: [],
      salary: [],
      service: [],
    },
  ]);

  useEffect(() => {
    const loanData = location.state as LoanResponse;

    setLoan(loanData);
    if (loanData.documents.length === 0) {
      return;
    }
    const doc = groupDocumentsByGuarantorId(loanData);
    const docsGroup = doc.map((d) => groupDocumentsByType(d));
    setGroupedDocuments(docsGroup);
  }, [location.state]);
  if (loan)
    return (
      <div>
        <div className='px-8 mb-5 flex flex-col gap-3'>
          <Title className='text-[#2962FF] mt-5 '>
            {`${loan.user.name} ${loan.user.lastname}`}
          </Title>
          <Title className=' mt-4'>Datos sobre los garantes</Title>

          {groupedDocuments.map((doc, index) => (
            <div key={index}>
              <Title className='font-semibold mb-4'>{`Garante ${
                index + 1
              }`}</Title>

              <AccordionCustom doc={doc} userType='GUARANTOR' key={index} />
            </div>
          ))}
        </div>
        <ButtonModalComponent
          loan={loan}
          funcConfirm={handleConfirm}
          funcEmail={handleSendEmail}
          setShowConfirmModal={setShowConfirmModal}
          setShowEmailModal={setShowEmailModal}
          showConfirm={showConfirmModal}
          showEmail={showEmailModal}
        />
      </div>
    );
};
