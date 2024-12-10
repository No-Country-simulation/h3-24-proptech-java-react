import { useParams } from "react-router-dom";
import Quotas from "../features/loan/quotas/Quotas";

function PaymentQuotas() {
  const { loanId } = useParams();

  return <Quotas loanId={loanId} />;
}

export default PaymentQuotas;
