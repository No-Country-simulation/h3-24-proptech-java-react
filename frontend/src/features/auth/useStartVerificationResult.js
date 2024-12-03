import { useQuery } from "@tanstack/react-query";

function useStartVerificationResult() {
  const { data: veriffResult } = useQuery({
    queryKey: ["veriff"],
    enabled: false,
    queryFn: async () => null,
  });

  return veriffResult;
}

export default useStartVerificationResult;
