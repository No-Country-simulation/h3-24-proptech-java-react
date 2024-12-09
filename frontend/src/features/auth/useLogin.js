import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { saveData } from '../../utils/saveDataLocalStore';
import { loginApi } from '../../services/apiAuth';

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: login,
    isPending,
    isError,
  } = useMutation({
    mutationFn: loginApi,

    onSuccess: (user) => {
      toast.success('¡Has iniciado sesión correctamente! 🎉');

      queryClient.setQueryData(['user'], user);
      saveData('token', user?.token);

      navigate('/home', {
        replace: true,
      });
    },

    onError: () => {
      toast.error('Correo o contraseña incorrectos');
    },
  });

  return { login, isPending, isError };
}
