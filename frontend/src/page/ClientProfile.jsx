import ProfileMenu from '../features/user/ProfileMenu';
import Button from '../ui/Button';

function ClientProfile() {
  return (
    <section className=' min-h-[86vh] flex flex-col px-4 pt-5 pb-8'>
      <ProfileMenu />

      <Button type='secondary' to='/loan-simulation' extraClass='mt-8'>
        Iniciar Solicitud
      </Button>
    </section>
  );
}

export default ClientProfile;
