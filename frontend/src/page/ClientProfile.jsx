import { useNavigate } from 'react-router-dom';
import ProfileMenu from '../features/user/ProfileMenu';

function ClientProfile() {
  const navigate = useNavigate();
  return (
    <section className=' min-h-[86vh] flex flex-col px-4 pt-5 pb-8 md:w-[60%] md:m-auto lg:w-[50%] lg:max-w-[600px]'>
      <ProfileMenu />

      <button
        className='bg-[#2962FF] w-[90%] sm:max-w-[386px] m-auto hover:bg-[#1F47B4] transition-all text-white px-4 py-2 rounded-md'
        onClick={() => navigate('/loan-simulation')}>
        Iniciar Solicitud
      </button>
    </section>
  );
}

export default ClientProfile;
