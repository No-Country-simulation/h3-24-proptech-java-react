import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import FormRow from '../../ui/FormRow';
import { baseURL } from '../../utils/constants';
import toast from 'react-hot-toast';
import Logo from '../../ui/Logo';
import { TextLogoWhite } from '../../ui/TextLogoWhite';
import SubmitButton from '../../ui/SubmitButton';
import { LogoSvg } from '../../ui/LogoSvg';
import TextLogo from '../../ui/TextLogo';
import Spinner from '../../ui/Spinner';

// <form
//   onSubmit={handleSubmit(onSubmit)}
//   className='flex flex-col min-h-[90vh] md:w-[60%] lg:w-[50%] max-w-[600px] m-auto p-5 lg:border lg:shadow-md '>
//   <div className='flex-grow flex flex-col gap-7 justify-center mb-5'>
//     <div className='text-center mx-auto  flex items-center gap-1 justify-center'>
//       <LogoSvg />
//       <TextLogo />
//     </div>

//     <FormRow label='Email' error={errors?.email?.message}>
//       <input
//         type='email'
//         id='email'
//         placeholder='Email'
//         // disabled={isLoading}
//         {...register('email', {
//           required: 'Este campo es obligatorio',
//           pattern: {
//             value: /\S+@\S+\.\S+/,
//             message:
//               'Proporcione una dirección de correo electrónico válida',
//           },
//         })}
//       />
//     </FormRow>
//   </div>

//   <SubmitButton>Continuar</SubmitButton>
// </form>
function RecoverPasswordForm() {
  const [isMobile, setIsMobile] = useState(false);
  const [isPending, setIsPending] = useState(false);
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
  const [email, setEmail] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const getQueryParams = (query) => {
    const urlParams = new URLSearchParams(query);
    return urlParams.get('token');
  };

  const token = getQueryParams(location.search);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  console.log({ isMobile });
  console.log(isMobile);
  console.log({ email });
  console.log({ token });

  async function onSubmit(data) {
    if (data?.email && email) {
      setIsPending(true);
      await axios
        .post(`${baseURL}/api/forgot-password`, { email: data.email })
        .then(() => {
          setEmail(false);
          toast.success('Correo enviado');
        })
        .catch((err) => {
          toast.error('Algo salio mal!');
          console.log(err);
        })
        .finally(() => {
          reset();
        });
    }

    if (data.password && data.confirmPassword && token) {
      await axios
        .post(`${baseURL}/api/reset-password`, {
          token: token,
          password: data.password,
        })
        .then(() => {
          toast.success('Contraseña cambiada');

          navigate('/passwordChangeMessage', {
            replace: true,
          });
        })
        .catch((err) => {
          toast.error('Algo salio mal!');
          console.log(err);
        })
        .finally(() => {
          reset();
        });
    }
    setIsPending(false);
  }

  return (
    <>
      {!isMobile ? (
        email && !token ? (
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
                className='flex  flex-col min-h-[80vh] mt-16 pl-32'>
                <h2 className='font-bold text-3xl mb-14'>
                  Recupera contraseña
                </h2>
                <div className='flex-grow flex flex-col gap-7   mb-5'>
                  <FormRow
                    label='Email'
                    error={errors?.email?.message}
                    extraClass={'w-[500px]'}>
                    <input
                      type='email'
                      id='email'
                      placeholder='Ingresa tu email'
                      // disabled={isLoading}
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
                </div>

                <div className=' w-full    font-semibold text-white h-[51px] rounded-md flex items-center justify-end pr-28'>
                  <button
                    className='bg-[#2962FF] h-12 w-52 rounded-md hover:bg-blue-500 '
                    disabled={isPending}>
                    {isPending ? <Spinner /> : 'Enviar correo'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
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
            <div className='w-1/2'>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex  flex-col min-h-[80vh] mt-16 pl-32  '>
                <h2 className='font-bold text-3xl mb-14'>
                  Recupera contraseña
                </h2>
                <div className='flex-grow flex flex-col gap-7 mb-5'>
                  <FormRow
                    label='Contraseña'
                    error={errors?.password?.message}
                    extraClass={'w-[500px]'}>
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
                    error={errors?.confirmPassword?.message}
                    extraClass={'w-[500px]'}>
                    <input
                      type='confirmPassword'
                      id='confirmPassword'
                      placeholder='Repetir contraseña'
                      //  disabled={isLoading}
                      {...register('confirmPassword', {
                        required: 'Este campo es obligatorio',
                        validate: (value) =>
                          value === getValues().password ||
                          'Passwords need to match',
                      })}
                    />
                  </FormRow>
                </div>

                <div className=' w-full    font-semibold text-white h-[51px] rounded-md flex items-center justify-end pr-28'>
                  <button
                    className='bg-[#2962FF] h-12 w-52 rounded-md hover:bg-blue-500 '
                    disabled={isPending}>
                    {isPending ? <Spinner /> : 'Confirmar contraseña'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )
      ) : email && !token ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col min-h-[90vh] md:w-[60%] lg:w-[50%] max-w-[600px] m-auto p-5 lg:border lg:shadow-md '>
          <div className='flex-grow flex flex-col gap-7 justify-center mb-5'>
            <div className='text-center mx-auto  flex items-center gap-1 justify-center'>
              <LogoSvg />
              <TextLogo />
            </div>

            <FormRow label='Email' error={errors?.email?.message}>
              <input
                type='email'
                id='email'
                placeholder='Email'
                // disabled={isLoading}
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
          </div>

          <SubmitButton isPending={isPending}>Continuar</SubmitButton>
        </form>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col min-h-[90vh] md:w-[60%] lg:w-[50%] max-w-[600px] m-auto p-5 lg:border lg:shadow-md '>
          <div className='flex-grow flex flex-col gap-7 justify-center mb-5'>
            <div className='text-center mx-auto  flex items-center gap-1 justify-center'>
              <LogoSvg />
              <TextLogo />
            </div>

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
                //  disabled={isLoading}
                {...register('confirmPassword', {
                  required: 'Este campo es obligatorio',
                  validate: (value) =>
                    value === getValues().password || 'Passwords need to match',
                })}
              />
            </FormRow>
          </div>

          <SubmitButton isPending={isPending}>Confirmar</SubmitButton>
        </form>
      )}
    </>
  );
}

export default RecoverPasswordForm;
