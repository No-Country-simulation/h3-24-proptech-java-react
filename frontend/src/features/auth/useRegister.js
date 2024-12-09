import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { registerApi } from '../../services/apiAuth';
import { saveData } from '../../utils/saveDataLocalStore';

function useRegister() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: register, isPending } = useMutation({
    mutationFn: registerApi,

    onSuccess: (user) => {
      console.log(user);
      toast.success('¡Cuenta creada con éxito! 🎉');

      queryClient.setQueryData(['user'], user?.user);
      saveData('token', user?.token);

      navigate('/home', {
        replace: true,
      });
    },

    onError: (error) => {
      toast.error(error.response.data.details);
      console.log(error);
    },
  });

  return { register, isPending };
}

export default useRegister;
