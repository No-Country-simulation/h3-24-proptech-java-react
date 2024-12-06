import { useForm } from 'react-hook-form';

import FormRow from '../../ui/FormRow';
import useRegister from './useRegister';
import SubmitButton from '../../ui/SubmitButton';
import { LogoSvg } from '../../ui/LogoSvg';
import TextLogo from '../../ui/TextLogo';

function Register({ children }) {
  const { register: signup, isPending: isLoading } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  async function onSubmit(data) {
    signup(data, { onSettled: () => reset() });
  }

  return (
    <div className=' min-h-[90vh] md:min-h-[70vh] md:max-w-[500px] md:border md:shadow-md md:rounded-md flex flex-col m-auto py-4  '>
      <div className='text-center mb-8 flex items-center gap-1 justify-center'>
        <LogoSvg />
        <TextLogo />
      </div>
      <form
        className='flex flex-grow flex-col'
        onSubmit={handleSubmit(onSubmit)}>
        <div className='px-7  flex flex-col gap-5 mb-8'>
          <FormRow label='Email' error={errors?.email?.message}>
            <input
              type='email'
              id='email'
              placeholder='Email'
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

          <FormRow label='Nombre Completo' error={errors?.name?.message}>
            <input
              type='text'
              id='name'
              placeholder='Nombre Completo'
              disabled={isLoading}
              {...register('name', {
                required: 'Este campo es obligatorio',
              })}
            />
          </FormRow>

          <FormRow label='Apellido' error={errors?.lastname?.message}>
            <input
              type='text'
              id='lastname'
              placeholder='Apellido'
              disabled={isLoading}
              {...register('lastname', {
                required: 'Este campo es obligatorio',
              })}
            />
          </FormRow>

          <FormRow label='DNI o Cedula' error={errors?.dni?.message}>
            <input
              type='number'
              id='dni'
              placeholder='000.000.000'
              disabled={isLoading}
              {...register('dni', {
                required: 'Este campo es obligatorio',
                minLength: {
                  value: 8,
                  message: 'El DNI debe tener exactamente 8 dígitos.',
                },
                maxLength: {
                  value: 8,
                  message: 'El DNI debe tener exactamente 8 dígitos.',
                },
                validate: (value) =>
                  /^\d{8}$/.test(value) ||
                  'El DNI debe contener solo números y tener exactamente 8 dígitos.',
              })}
            />
          </FormRow>

          <FormRow label='Contraseña' error={errors?.password?.message}>
            <input
              type='password'
              id='password'
              placeholder='Contraseña'
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

          <FormRow
            label='Repetir contraseña'
            error={errors?.confirmPassword?.message}>
            <input
              type='confirmPassword'
              id='confirmPassword'
              placeholder='Repetir contraseña'
              disabled={isLoading}
              {...register('confirmPassword', {
                required: 'Este campo es obligatorio',
                validate: (value) =>
                  value === getValues().password || 'Passwords need to match',
              })}
            />
          </FormRow>
        </div>

        <div className='mt-[auto]'>{children}</div>

        <div className='border-t-[1px] border-lightGrey p-4'>
          <SubmitButton isPending={isLoading}>Continuar</SubmitButton>
        </div>
      </form>
    </div>
  );
}

export default Register;
