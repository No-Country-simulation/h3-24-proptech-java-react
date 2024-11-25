import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import useCurrentUser from "../features/user/useCurrentUser";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isPending, isAuthenticated } = useCurrentUser();

  useEffect(
    function () {
      if (!isAuthenticated && !isPending) navigate("/auth", { replace: true });
    },
    [isAuthenticated, isPending, navigate]
  );

  if (isPending) return <p>Loading...</p>;
  if (isAuthenticated) return children;

  return null;
}

export default ProtectedRoute;
