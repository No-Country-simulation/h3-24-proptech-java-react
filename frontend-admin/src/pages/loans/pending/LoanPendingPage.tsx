import { useLocation, useNavigate } from 'react-router-dom';
import {
  DocTypeCustom,
  Document,
  LoanResponse,
} from '../../../types/loan-response.interface';
import { LoanInputLabel } from '../../../components/loan/LoanInputLabel';
import { Title } from '../../../components/titles-subtitles/Title';
import { SubTitle } from '../../../components/titles-subtitles/SubTitle';
import { LoanDivSpan } from '../../../components/loan/LoanDivSpan';
import { useEffect, useState } from 'react';
import { groupDocumentsByType } from '../../../utils/groupDocumentsByType';
import { AccordionCustom } from '../../../components/accordion/AccordionCustom';
import { LoanEditModal } from './LoanEditModal';
import { Pencil } from 'lucide-react';
import { loanStore } from '../../../stores/loanStore';
import toast from 'react-hot-toast';
import { ButtonModalComponent } from '../loan-components/ButtonModalComponent';

export const LoanPendingPage = () => {
  const navigate = useNavigate();
  const [groupedDocuments, setGroupedDocuments] = useState<
    Record<DocTypeCustom, Document[]>
  >({
    identity: [],
    salary: [],
    service: [],
  });

  const { resetLoanSimulate, loanUpdated, preApprove, declined } = loanStore();
  const [showEditLoanModal, setShowEditLoanModal] = useState<boolean>(false);
  const [showEmailModal, setShowEmailModal] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [loan, setLoan] = useState<LoanResponse | null>(null);
  const location = useLocation();

  useEffect(() => {
    const loanData = location.state as LoanResponse;

    setLoan(loanData);
    if (loanData.documents.length === 0) {
      return;
    }
    const grouped = groupDocumentsByType(loanData.documents);
    setGroupedDocuments(grouped);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (loanUpdated !== null) {
      setLoan(loanUpdated);
    }
  }, [loanUpdated]);

  const handleConfirm = async (loan: LoanResponse) => {
    const data = await preApprove(loan.loanId);
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

  if (loan)
    return (
      <div>
        <div className='px-8 mb-5 flex flex-col gap-3 '>
          <div>
            <Title className='text-[#2962FF] mt-5 '>
              {`${loan.user.name} ${loan.user.lastname}`}
            </Title>
            <Title className=' mt-4'>Datos sobre la simulación</Title>
            <div className=' pt-4 flex flex-col gap-4'>
              <LoanInputLabel
                label='Nombre y Apellido'
                value={`${loan.user.name} ${loan.user.lastname}`}
                enable={false}
              />
              <LoanInputLabel
                label='Dni'
                value={`${loan.user.dni}`}
                enable={false}
              />
              <LoanInputLabel
                label='Correo'
                value={`${loan.user.email}`}
                enable={false}
              />
            </div>
          </div>
          {/* Resultado de la simulacion */}
          <div>
            <Title className='mb-5'>Resultado de la simulación</Title>
            <Pencil
              onClick={() => {
                resetLoanSimulate();
                setShowEditLoanModal(true);
              }}
            />
            <div className='flex flex-col gap-1 mb-3'>
              <LoanDivSpan
                label='Monto solicitado'
                value={loan.requestedAmount.toString()}
                span='$ USD'
              />
              <LoanDivSpan
                label='Plazo'
                value={loan.termMonths.toString()}
                span='Meses'
              />
            </div>
            <SubTitle>Condiciones</SubTitle>
            <div className='flex flex-col gap-1 mb-3'>
              <LoanDivSpan
                label='Interes total del Prestamo'
                value={loan.interestRate.toString()}
                span='%'
              />
              <LoanDivSpan
                label='Pago mensual estimado'
                value={loan.monthlyQuota.toString()}
                span='$ USD'
              />
            </div>
          </div>
          {/* Datos sobre el prestamo */}
          <div className=''>
            <Title className=''>Datos sobre el prestamo</Title>
            <div className=' pt-4 flex flex-col gap-4'>
              <LoanInputLabel
                label='¿Cuál es tu actividad económica?'
                value={loan.profile.economicActivity}
                enable={false}
              />
              <LoanInputLabel
                label='¿Cuantos son tus ingresos mensuales?'
                value={`$${loan.profile.monthlyIncome.toString()} ARS.`}
                enable={false}
              />
              <LoanInputLabel
                label='Ingrese su CBU o CVU'
                value={loan.profile.bankAccountCbu}
                enable={false}
              />
            </div>
          </div>
          {/* Datos sobre el domicilio */}
          <div>
            <Title className=''>Datos sobre su domicilio</Title>
            <div className=' pt-4 flex flex-col gap-4'>
              <LoanInputLabel
                label='¿En qué país vive actualmente?'
                value={loan.profile.country}
                enable={false}
              />
              <LoanInputLabel
                label='¿Cuál es su estado o provincia?'
                value={loan.profile.state}
                enable={false}
              />
              <LoanInputLabel
                label='¿Cuál es su ciudad o municipio?'
                value={loan.profile.city}
                enable={false}
              />
              <LoanInputLabel
                label='¿ingrese el nombre de la calle?'
                value={loan.profile.road}
                enable={false}
              />
              <LoanInputLabel
                label='¿Altura del domicilio?'
                value={loan.profile.houseNumber}
                enable={false}
              />
            </div>
          </div>
          {/* Datos personales */}
          <div>
            <Title className=''>Datos Personales</Title>
            <div className=' pt-4 flex flex-col gap-4'>
              <LoanInputLabel
                label='Nombres como figura en el DNI o cédula'
                value={loan.profile.firstNameAsInDni}
                enable={false}
              />
              <LoanInputLabel
                label='Apellidos como figura en el DNI o cédula'
                value={loan.profile.lastNameAsInDni}
                enable={false}
              />
              <LoanInputLabel
                label='Género como figura en el DNI o Cedulua'
                value={loan.profile.gender}
                enable={false}
              />
              <LoanInputLabel
                label='Fecha de nacimiento'
                value={loan.profile.dateOfBirth}
                enable={false}
              />
              <LoanInputLabel
                label='Nivel de estudios'
                value={loan.profile.educationLevel}
                enable={false}
              />
              <LoanInputLabel
                label='Télefono celular'
                value={loan.profile.mobilePhone}
                enable={false}
              />
              <LoanInputLabel
                label='Télefono fijo'
                value={loan.profile.landlinePhone}
                enable={false}
              />
            </div>
          </div>
          {/* DOCUMENTACION CARGADA */}
          <div className='flex flex-col gap-5'>
            <Title className=''>Documentacion del usuario</Title>
            <AccordionCustom doc={groupedDocuments} userType='HOLDER' />
          </div>
        </div>
        {showEditLoanModal && (
          <LoanEditModal
            amount={loan.requestedAmount}
            setShowModal={setShowEditLoanModal}
          />
        )}
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
