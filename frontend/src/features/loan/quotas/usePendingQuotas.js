import { useQuery } from "@tanstack/react-query";
import { pendingQuotasApi } from "../../../services/apiLoan";

function usePendingQuotas(loanId) {
  const { data: pendingQuotas, isPending } = useQuery({
    queryFn: () => pendingQuotasApi(loanId),
    queryKey: ["pending-quotas", loanId],
    retry: false,
    enabled: !!loanId,
  });

  return { pendingQuotas, isPending };
}

export default usePendingQuotas;
