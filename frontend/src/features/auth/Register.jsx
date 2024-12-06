import { useForm } from 'react-hook-form';

import FormRow from '../../ui/FormRow';
import useRegister from './useRegister';
import SubmitButton from '../../ui/SubmitButton';
import { LogoSvg } from '../../ui/LogoSvg';
import TextLogo from '../../ui/TextLogo';
import Logo from '../../ui/Logo';
import { TextLogoWhite } from '../../ui/TextLogoWhite';

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
    <>
      <div className='w-[full] hidden h-[calc(93.5vh)]  md:flex'>
        <div className='bg-[#142B6A] w-1/2 text-white '>
          <div className='w-[383px] flex flex-col justify-between  m-auto  h-2/3  pt-[200px]'>
            <div className='flex flex-col gap-4'>
              <h2 className='text-5xl font-bold'>
                Pedí más y paga mucho después.
              </h2>
              <p className='text-xl'>
                Mejores montos y mejores plazos que tu banco mas cercano.
              </p>
            </div>
            <div className='text-center mb-8 flex items-center gap-1 justify-start'>
              <Logo />
              <TextLogoWhite className={''} />
            </div>
          </div>
        </div>
        <div className='w-full'>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='hidden md:flex flex-grow flex-col w-[500px] mx-auto pt-[100px]  '>
            <h2 className='font-bold text-3xl mb-6'>Registrate</h2>
            <div className=' flex flex-col gap-5'>
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
                      message:
                        'La contraseña debe tener al menos 8 caracteres.',
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
                      value === getValues().password ||
                      'Passwords need to match',
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
      </div>

      <div className=' min-h-[90vh] md:hidden flex flex-col m-auto py-4  '>
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
    </>
  );
}

export default Register;
