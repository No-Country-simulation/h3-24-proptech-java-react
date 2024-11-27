import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
//import { useNavigate } from "react-router-dom";

import { loanSimulationApi } from "../../services/apiLoan";

export function useLoanSimulation() {
  //const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: loanSimulation,
    isPending,
    isError,
  } = useMutation({
    mutationFn: loanSimulationApi,

    onSuccess: (loan) => {
      toast.success("✅");
      queryClient.setQueryData(["loanSimulation"], loan);

      console.log("data loan:", loan);

      /*navigate("/", {
        replace: true,
      });*/
    },

    onError: () => {
      toast.error("Datos no válidos");
    },
  });

  return { loanSimulation, isPending, isError };
}
