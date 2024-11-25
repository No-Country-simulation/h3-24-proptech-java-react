import { useForm } from 'react-hook-form';

import FormRow from '../../ui/FormRow';
import { useLogin } from './useLogin';

const Login = () => {
  const { login, isPending: isLoading } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  async function onSubmit(data) {
    login(data, { onSettled: () => reset() });
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <h1 className='text-2xl font-bold mb-4'>Iniciar sesión</h1>

      <form
        className='bg-white p-6 rounded shadow-md'
        onSubmit={handleSubmit(onSubmit)}>
        <FormRow label='Correo electrónico' error={errors?.email?.message}>
          <input
            type='email'
            id='email'
            placeholder='Ingresa tu correo electrónico'
            disabled={isLoading}
            {...register('email', {
              required: 'Este campo es obligatorio',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message:
                  'Proporcione una dirección de correo electrónico válida',
              },
            })}
          />
        </FormRow>

        <FormRow label='Contraseña' error={errors?.password?.message}>
          <input
            type='password'
            id='password'
            placeholder='Ingresa tu contraseña'
            {...register('password', {
              required: 'Este campo es obligatorio',
              minLength: {
                value: 8,
                message: 'La contraseña debe tener al menos 8 caracteres.',
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/,
                message:
                  'La contraseña debe contener al menos una letra mayúscula, una minúscula, un número y un carácter especial.',
              },
            })}
          />
        </FormRow>

        <button
          className='bg-blue-500 text-white px-4 py-2 rounded'
          type='submit'
          disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Ingresar'}
        </button>
      </form>
    </div>
  );
};

export default Login;
