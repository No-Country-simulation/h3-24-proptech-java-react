import { useForm } from 'react-hook-form';

import FormRow from '../../ui/FormRow';
import { useLogin } from './useLogin';
import SubmitButton from '../../ui/SubmitButton';
import { LogoSvg } from '../../ui/LogoSvg';
import TextLogo from '../../ui/TextLogo';
import { TextLogoWhite } from '../../ui/TextLogoWhite';
import Logo from '../../ui/Logo';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Login = ({ children }) => {
  const { login, isPending: isLoading } = useLogin();
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
    <>
      {!isMobile ? (
        <div className='w-[full] hidden min-h-[100vh]  md:flex'>
          <div className='bg-gradient-to-r to-[#142B6A] from-[#0A0E19] w-1/2 text-white '>
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
          <div className='  w-1/2 '>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='hidden md:flex flex-grow flex-col md:w-[300px] xl:w-[500px] mx-auto pt-[200px]'>
              <h2 className='font-bold text-3xl mb-6'>Inicia Sesion</h2>
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

                <FormRow label='Contraseña' error={errors?.password?.message}>
                  <input
                    type='password'
                    id='password'
                    placeholder='Ingresa tu contraseña'
                    {...register('password', {
                      required: 'Este campo es obligatorio',
                      minLength: {
                        value: 8,
                        message: 'Contraseña',
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

                <div className='flex flex-col items-center justify-between'>
                  <Link to='/reset-password' className=' underline'>
                    Olvide mi contraseña
                  </Link>
                </div>
              </div>

              <div className='mt-[auto]'>{children}</div>

              <div className='border-t-[1px] border-lightGrey p-4'>
                <SubmitButton isPending={isLoading}>
                  Iniciar sesión
                </SubmitButton>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className='md:hidden  min-h-[90vh]  flex flex-col m-auto py-4  '>
          <div className='text-center mb-8 flex items-center gap-1 justify-center'>
            <LogoSvg />
            <TextLogo />
          </div>
          <h1 className=' text-3xl font-semibold mb-6 px-7'>Iniciar sesión</h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-grow flex-col w-full]'>
            <div className='px-7  flex flex-col gap-5'>
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

              <FormRow label='Contraseña' error={errors?.password?.message}>
                <input
                  type='password'
                  id='password'
                  placeholder='Ingresa tu contraseña'
                  {...register('password', {
                    required: 'Este campo es obligatorio',
                    minLength: {
                      value: 8,
                      message: 'Contraseña',
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

              <div className='flex flex-col items-center justify-between'>
                <Link to='/reset-password' className=' underline'>
                  Olvide mi contraseña
                </Link>
              </div>
            </div>

            <div className='mt-[auto]'>{children}</div>

            <div className='border-t-[1px] border-lightGrey p-4'>
              <SubmitButton isPending={isLoading}>Iniciar sesión</SubmitButton>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
