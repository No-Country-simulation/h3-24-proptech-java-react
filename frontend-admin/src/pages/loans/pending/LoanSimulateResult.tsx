import { LoanDivSpan } from '../../../components/loan/LoanDivSpan';
import { SubTitle } from '../../../components/titles-subtitles/SubTitle';

interface Props {
  requestedAmount: number;
  termMonths: number;
  interestRate: number;
  monthlyQuota: number;
}
export const LoanSimulateResult = ({
  interestRate,
  monthlyQuota,
  requestedAmount,
  termMonths,
}: Props) => {
  return (
    <div className='w-full'>
      <div className='flex flex-col gap-1 mb-3'>
        <LoanDivSpan
          label='Monto solicitado'
          value={requestedAmount.toString()}
          span='$ USD'
        />
        <LoanDivSpan label='Plazo' value={termMonths.toString()} span='Meses' />
      </div>
      <SubTitle>Condiciones</SubTitle>
      <div className='flex flex-col gap-1 mb-3'>
        <LoanDivSpan
          label='Tasa Interes '
          value={interestRate.toString()}
          span='%'
        />
        <LoanDivSpan
          label='Pago mensual'
          value={monthlyQuota.toString()}
          span='$ USD'
        />
      </div>
    </div>
  );
};
