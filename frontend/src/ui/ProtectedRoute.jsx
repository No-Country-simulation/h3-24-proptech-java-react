import { useNavigate, Outlet } from "react-router-dom";
import { useEffect } from "react";

import useCurrentUser from "../features/user/useCurrentUser";

function ProtectedRoute() {
  const navigate = useNavigate();
  const { isPending, isAuthenticated } = useCurrentUser();

  useEffect(
    function () {
      if (!isAuthenticated && !isPending) navigate("/auth", { replace: true });
    },
    [isAuthenticated, isPending, navigate]
  );

  if (isPending) return <p>Loading...</p>;
  if (isAuthenticated) return <Outlet />;

  return null;
}

export default ProtectedRoute;
