import { useMutation, useQueryClient } from "@tanstack/react-query";
import { startVerificationApi } from "../../services/apiVeriff";

export function useStartVerification() {
  const queryClient = useQueryClient();

  const {
    mutate: startVerification,
    data: veriffData,
    isSuccess,
    isPending,
    isError,
  } = useMutation({
    mutationFn: startVerificationApi,

    onSuccess: (data) => {
      console.log("Verificación iniciada:", data);
      console.log(data?.verification?.url);

      queryClient.setQueryData(["veriff"], data);
    },

    onError: (error) => {
      console.error("Error iniciando verificación:", error.message);
    },
  });

  return { startVerification, veriffData, isSuccess, isPending, isError };
}
