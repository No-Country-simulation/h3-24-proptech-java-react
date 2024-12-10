import { useUser } from '../../context/UserContext';
import Button from '../../ui/Button';

function AccountData() {
  const { user } = useUser();
  const { name, email, dni } = user;

  return (
    <div>
      <div className='border-b-[1px] border-lightGrey p-5'>
        <h2 className=' text-lg font-bold mb-4'>Datos de tu cuenta</h2>

        <p className='text-[#475569] flex  justify-between items-center mb-3'>
          Tu nombre
          <span className='text-dark font-semibold'>{name}</span>
        </p>

        <p className='text-[#475569] flex  justify-between items-center mb-3'>
          DNI
          <span className='text-dark font-semibold'>{dni}</span>
        </p>

        <p className='text-[#475569] flex  justify-between items-center mb-3'>
          <div className='flex flex-col'>
            Tu Email
            <span className='text-dark font-semibold'>{email}</span>
          </div>

          <Button type='primary'>Cambiar</Button>
        </p>
      </div>

      <div className='border-b-[1px] border-lightGrey p-5'>
        <h2 className=' text-lg font-bold mb-4'>Privacidad y seguridad</h2>

        <p className='text-[#475569] flex  justify-between items-center '>
          <div className='flex flex-col'>
            Tu contraseña
            <span className='text-dark font-semibold'></span>
          </div>

          <Button type='primary'>Cambiar</Button>
        </p>
      </div>
    </div>
  );
}

export default AccountData;
