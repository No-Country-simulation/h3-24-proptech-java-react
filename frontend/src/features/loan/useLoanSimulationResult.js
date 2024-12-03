import { useQuery } from "@tanstack/react-query";

export function useLoanSimulationResult() {
  const { data: loanSimulationData } = useQuery({
    queryKey: ["loanSimulation"],
    enabled: false,
    queryFn: async () => null,
  });

  return loanSimulationData;
}
