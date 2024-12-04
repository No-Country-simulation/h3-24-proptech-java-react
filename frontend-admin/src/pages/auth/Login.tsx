import { useEffect } from 'react';
import { userStore } from '../../stores/userStore';
import { FormLogin } from '../../types/login-request.interface';
import InputForm from '../../components/input/InputForm';
import { useForm } from 'react-hook-form';
import Logo from '../../components/logos/Logo';
import TextLogo from '../../components/logos/TextLogo';
import { Button } from '../../ui/Button';
import Spinner from '../../components/Spinner';
import toast from 'react-hot-toast';

export const Login = () => {
  const { login, clearError, messageError, isLoading } = userStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormLogin>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  console.log(messageError);
  useEffect(() => {
    if (messageError) {
      toast.error(messageError);
      clearError();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageError]);
  const onSubmit = (formData: FormLogin) => {
    login(formData);
  };
  return (
    <div className='md:h-screen max-h-screen  md:flex justify-center items-center  md:flex-col'>
      <div className='max-w-[500px] min-h-[667px] md:rounded-md  h-screen max-h-screen md:max-h-[600px] relative  md:border md:w-[400px] md:shadow-md overflow-auto'>
        <div className=' py-[40px]  flex items-center justify-center gap-2'>
          <Logo />
          <TextLogo />
        </div>
        <p className='font-semibold text-2xl text-center mb-5'>
          Panel del administrador
        </p>
        <form
          action=''
          className='flex flex-col m-auto gap-10    min-w-[272px] max-w-[85%] items-center justify-center '
          onSubmit={handleSubmit(onSubmit)}>
          <InputForm
            label='Email'
            id='email'
            type='email'
            placeholder='Email'
            register={register}
            validation={{
              required: {
                value: true,
                message: 'Email is required',
              },
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: 'Email is not valid',
              },
            }}
            errors={errors}
          />
          <InputForm
            label='Contraseña'
            id='password'
            type='password'
            placeholder='Contraseña'
            register={register}
            validation={{
              required: {
                value: true,
                message: 'Password is required',
              },
              minLength: {
                value: 8,
                message: 'Min length is 8.',
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  'La contraseña debe contener al menos una letra minúscula, una mayúscula, un número y un carácter especial.',
              },
            }}
            errors={errors}
          />
          <div className='absolute w-full bottom-0 text-center border-t border-[#E2E8F0]  py-4'>
            <button></button>
            <Button type='submit'>
              {isLoading ? <Spinner /> : 'Iniciar sesión'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
