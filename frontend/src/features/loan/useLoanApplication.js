import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { loanApplicationApi } from "../../services/apiLoan";

function useLoanApplication() {
  const queryClient = useQueryClient();

  const submitData = useMutation({
    mutationFn: loanApplicationApi,

    onSuccess: () => {
      toast.success("Datos enviados con éxito");
      queryClient.removeQueries(["loan-application"]);
    },

    onError: () => {
      toast.error("Datos no válidos");
    },
  });

  /////////////////////////
  // Guardar o actualizar los datos del formulario
  const addLoanData = (formKey, formData) => {
    queryClient.setQueryData(["loan-application"], (oldData) => {
      if (!oldData) {
        return { [formKey]: formData };
      }

      return {
        ...oldData,
        [formKey]: { ...oldData[formKey], ...formData },
      };
    });
  };

  /////////////////////////
  // Obtener datos acumulados del QueryClient
  const applicationData = queryClient.getQueryData(["loan-application"]);

  const loanResults = applicationData
    ? Object.values(applicationData).reduce(
        (acc, stepData) => ({ ...acc, ...stepData }),
        {}
      )
    : {};

  /////////////////////////
  // Enviar los datos al backend
  const submitLoanData = (additionalData) => {
    if (!applicationData || Object.keys(applicationData).length === 0) {
      toast.error("No hay datos para enviar");
      return;
    }

    const payload = { ...loanResults, ...additionalData };

    submitData.mutate(payload);
  };

  /////////////////////////

  return { addLoanData, loanResults, submitLoanData };
}

export default useLoanApplication;
