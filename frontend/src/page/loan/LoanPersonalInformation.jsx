import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { OctagonAlert } from 'lucide-react';

import FormRow from '../../ui/FormRow';
import Button from '../../ui/Button';
import SubmitButton from '../../ui/SubmitButton';
import useCurrentUser from '../../features/user/useCurrentUser';

import { useProfile } from '../../context/ProfileContext';

const paises = {
  AR: 'Argentina',
  UY: 'Uruguay',
  PY: 'Paraguay',
  CL: 'Chile',
  PE: 'Peru',
  MX: 'Mexico',
  BR: 'BRASIL',
  BO: 'Bolivia',
  CO: 'Colombia',
  CR: 'Costa rica',
  SV: 'El salvador',
  EC: 'Ecuador',
  PA: 'Panama',
  PR: 'Puerto rico',
  VE: 'Venezuela',
};

function LoanPersonalInformation() {
  const navigate = useNavigate();
  const { user } = useCurrentUser();
  const {
    getProfile,
    profile: userProfile,
    setDataProfileForms,
  } = useProfile();

  useEffect(() => {
    getProfile();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      firstNameAsInDni: userProfile?.firstNameAsInDni,
      lastNameAsInDni: userProfile?.lastNameAsInDni,
      dateOfBirth: userProfile?.dateOfBirth,
      nationality: paises[userProfile?.nationality],
      gender:
        userProfile?.gender === ''
          ? ''
          : userProfile?.gender === 'M'
          ? 'Masculino'
          : 'Femenino',
      mobilePhone: userProfile?.mobilePhone || '',
      landlinePhone: userProfile?.landlinePhone || '',
      educationLevel: userProfile?.educationLevel || '',
    },
  });
  useEffect(() => {
    if (userProfile !== undefined && userProfile?.firstNameAsInDni) {
      reset({
        firstNameAsInDni: userProfile?.firstNameAsInDni,
        lastNameAsInDni: userProfile?.lastNameAsInDni,
        dateOfBirth: userProfile?.dateOfBirth,
        nationality: paises[userProfile?.nationality],
        gender:
          userProfile?.gender === ''
            ? ''
            : userProfile?.gender === 'M'
            ? 'Masculino'
            : 'Femenino',
        mobilePhone: userProfile?.mobilePhone,
        landlinePhone: userProfile?.landlinePhone,
        educationLevel: userProfile?.educationLevel,
      });
    }
  }, [reset, userProfile]);

  function onSubmit(data) {
    setDataProfileForms(data);
    navigate('/loan/loan-information', {
      replace: true,
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='  max-w-[500px] mx-auto pb-4  min-h-[75vh]  flex flex-col gap-5'>
      <h1 className='text-2xl font-semibold mb-3'>Datos personales</h1>
      <div className='bg-[#F1F5F9] p-5 rounded-xl flex gap-3 w-full '>
        <OctagonAlert className='text-dark w-8 h-8' />
        <div>
          <h3 className='text-lg font-semibold '>Campo obligatorio</h3>
          <p className='mb-5'>
            Este campo es necesario para validar tu identidad y garantizar la
            seguridad de tu información.
          </p>
          <Button
            type={user.user.isVerified ? 'greenColor' : 'secondary'}
            disabled={user.user.isVerified}>
            Datos VERIFFicados
          </Button>
        </div>
      </div>
      <FormRow
        label='Nombres como figura en el DNI o cédula'
        error={errors?.firstNameAsInDni?.message}>
        <input
          type='text'
          placeholder=''
          // disabled={isPending}
          {...register('firstNameAsInDni', {
            required: 'Este campo es obligatorio',
          })}
        />
      </FormRow>

      <FormRow
        label='Apellidos como figura en el DNI o cédula'
        error={errors?.lastNameAsInDni?.message}>
        <input
          type='text'
          placeholder=''
          {...register('lastNameAsInDni', {
            required: 'Este campo es obligatorio',
          })}
        />
      </FormRow>

      <FormRow
        label='Género como figura en el DNI o cédula'
        error={errors?.gender?.message}>
        <select
          id='mesSelect'
          className=''
          {...register('gender', {
            required: 'Este campo es obligatorio',
          })}>
          <option value=''>Seleccione una opción</option>

          <option value='Femenino'>Femenino</option>
          <option value='Masculino'>Masculino</option>
        </select>
      </FormRow>
      <FormRow label='Fecha de nacimiento' error={errors?.dateOfBirth?.message}>
        <input
          type='date'
          placeholder='dd/mm/aaaa'
          {...register('dateOfBirth', {
            required: 'Este campo es obligatorio',
          })}
        />
      </FormRow>
      <FormRow label='País de nacimiento' error={errors?.nationality?.message}>
        <input
          type='text'
          placeholder=''
          {...register('nationality', {
            required: 'Este campo es obligatorio',
          })}
        />
      </FormRow>

      <FormRow
        label='Nivel de estudios'
        error={errors?.educationLevel?.message}>
        <select
          id='education'
          className=''
          {...register('educationLevel', {
            required: 'Este campo es obligatorio',
          })}>
          <option value='' disabled>
            Seleccione el nivel educativo
          </option>

          <option value='Universidad completa'>
            Título universitario completo
          </option>
          <option value='Técnico universitario'>
            Título técnico universitario
          </option>
          <option value='Maestría'>Maestría o postgrado</option>
          <option value='Doctorado'>Doctorado</option>
          <option value='Ninguno'>Sin estudios superiores</option>
        </select>
      </FormRow>

      <FormRow label='Télefono celular' error={errors?.mobilePhone?.message}>
        <input
          type='number'
          placeholder='Ingrese un numero'
          {...register('mobilePhone', {
            required: 'Este campo es obligatorio',
          })}
        />
      </FormRow>

      <FormRow
        label='Télefono fijo (Opcional)'
        error={errors?.landlinePhone?.message}>
        <input
          type='number'
          placeholder='Ingrese un numero'
          {...register('landlinePhone')}
        />
      </FormRow>

      <div className='ml-auto mt-3'>
        <SubmitButton>Continuar</SubmitButton>
      </div>
    </form>
  );
}

export default LoanPersonalInformation;
