import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { registerApi } from "../../services/apiAuth";
import { saveData } from "../../utils/saveDataLocalStore";

function useRegister() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: register, isPending } = useMutation({
    mutationFn: registerApi,

    onSuccess: (user) => {
      toast.success("¡Cuenta creada con éxito! 🎉");

      queryClient.setQueryData(["user"], user?.user);
      saveData("token", user?.token);

      navigate("/secretPage", {
        replace: true,
      });
    },

    onError: () => {
      toast.error("💥 ¡Algo salió mal!");
    },
  });

  return { register, isPending };
}

export default useRegister;
