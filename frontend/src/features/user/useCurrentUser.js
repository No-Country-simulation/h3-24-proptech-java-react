import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiUser";

function useCurrentUser() {
  const { data: user, isPending } = useQuery({
    queryFn: getCurrentUser,
    retry: false,
    queryKey: ["user"],
  });

  const isAuthenticated = !!user?.token;
  return { user, isPending, isAuthenticated };
}

export default useCurrentUser;
