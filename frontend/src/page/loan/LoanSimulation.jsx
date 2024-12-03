import CalculatePersonalLoan from "../../features/loan/CalculatePersonalLoan";
import LoanSimulationResult from "./LoanSimulationResult";
import { useLoanSimulationResult } from "../../features/loan/useLoanSimulationResult";

function LoanSimulation() {
  const loanSimulationData = useLoanSimulationResult();

  return (
    <section className="px-5 py-8">
      {loanSimulationData ? (
        <LoanSimulationResult />
      ) : (
        <CalculatePersonalLoan />
      )}
    </section>
  );
}

export default LoanSimulation;
