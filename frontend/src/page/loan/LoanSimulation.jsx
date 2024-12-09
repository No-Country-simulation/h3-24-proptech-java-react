import CalculatePersonalLoan from '../../features/loan/CalculatePersonalLoan';
import LoanSimulationResult from './LoanSimulationResult';
import { useLoanSimulationResult } from '../../features/loan/useLoanSimulationResult';
import { useLoan } from '../../context/LoanContext';

function LoanSimulation() {
  const loanSimulationData = useLoanSimulationResult();
  const { loanSimulation } = useLoan();
  console.log({ loanSimulation });
  return (
    <section className='px-5 py-8'>
      {loanSimulationData || loanSimulation ? (
        <LoanSimulationResult />
      ) : (
        <CalculatePersonalLoan />
      )}
    </section>
  );
}

export default LoanSimulation;
