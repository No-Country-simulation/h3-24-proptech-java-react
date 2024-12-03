import { useEffect } from 'react';
import { OctagonAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import Button from '../ui/Button';
import { useStartVerification } from '../features/auth/useStartVerification';

function Veriff() {
  const navigate = useNavigate();
  const { startVerification, veriffData, isSuccess, isPending } =
    useStartVerification();

  useEffect(() => {
    let checkWindowClosed;

    const handleVerification = () => {
      if (!veriffData?.verification?.url) return;
      window.location.href = veriffData.verification.url;
      // const verificationWindow = window.open(
      //   veriffData.verification.url
      //   // "_blank"
      // );

      // if (!verificationWindow) {
      //   console.warn('No se pudo abrir la ventana de verificación.');
      //   return;
      // }

      // if (veriffData?.verification?.status === 'created') {
      //   navigate('/loan/personal-information', { replace: true });
      // }

      // checkWindowClosed = setInterval(() => {
      //   if (verificationWindow.closed) {
      //     clearInterval(checkWindowClosed);
      //     navigate('/loan/veriff', { replace: true });
      //   }
      // }, 1000);
    };

    if (isSuccess) handleVerification();

    return () => {
      if (checkWindowClosed) clearInterval(checkWindowClosed);
    };
  }, [isSuccess, veriffData, navigate]);

  return (
    <div className='flex flex-col min-h-[76vh]'>
      <h1 className='text-2xl font-semibold mb-5'>Datos personales</h1>

      <div className='flex-grow'>
        <h2 className='mb-3 text-lg font-semibold'>VERIFF</h2>

        <div className='bg-[#F1F5F9] p-5 rounded-xl flex gap-3'>
          <OctagonAlert className='text-dark w-8 h-8' />
          <div>
            <h3 className='text-lg font-semibold'>Campo obligatorio</h3>
            <p className='mb-5'>
              Este campo es necesario para validar tu identidad y garantizar la
              seguridad de tu información.
            </p>
            <Button
              type='secondary'
              onClick={startVerification}
              disabled={isPending}>
              {isPending ? 'Cargando...' : 'Cargar datos con VERIFF'}
            </Button>
          </div>
        </div>
      </div>

      {veriffData?.verification?.status === 'created' && (
        <div className='w-full flex justify-end mt-8 p-4 border-t-2 border-lightGrey'>
          <Button to='/loan/personal-information' disabled={isPending}>
            Continuar
          </Button>
        </div>
      )}
    </div>
  );
}

export default Veriff;
