import { userStore } from '../../stores/userStore';

export const Dashboard = () => {
  const { user } = userStore();
  return (
    <div className='text-black flex justify-center   '>
      <div className='mt-4 flex flex-col items-center gap-5 '>
        <p className='font-bold text-5xl px-6 text-[#2962FF] '>
          {user?.name}{' '}
          <span className='font-semibold text-black '>
            Bienvenido al panel de administrador.
          </span>
        </p>
      </div>
    </div>
  );
};
