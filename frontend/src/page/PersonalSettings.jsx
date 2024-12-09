import { LogOut } from 'lucide-react';
import AccountData from '../features/user/AccountData';
import Button from '../ui/Button';

function PersonalSettings() {
  return (
    <section className='pt-5'>
      <div className='border-b-[1px] border-lightGrey p-5'>
        <h1 className=' text-xl font-bold mb-2'>Ajustes personales</h1>
        <p>Administra tus datos y preferencias.</p>
      </div>

      <AccountData />

      <div className=' p-5'>
        <h2 className=' text-lg font-bold mb-4'>Ajustes de sesión</h2>
        <Button type='logOut' onClick={() => localStorage.removeItem('token')}>
          <div className='flex gap-2 items-center'>
            <LogOut className='w-[20px] h-[20px]' />
            Cerrar Sesión
          </div>
        </Button>
      </div>
    </section>
  );
}

export default PersonalSettings;
