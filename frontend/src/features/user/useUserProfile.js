import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../../services/apiUser";

function useUserProfile(userId) {
  const { data: userProfile, isPending } = useQuery({
    queryFn: () => getUserProfile(userId),
    queryKey: ["userProfile", userId],
    enabled: !!userId,
    retry: false,
  });

  return { userProfile, isPending };
}

export default useUserProfile;
