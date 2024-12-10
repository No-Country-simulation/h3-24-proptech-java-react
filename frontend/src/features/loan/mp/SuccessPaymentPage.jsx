import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../../../ui/Button';

export function SuccessPaymentPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preferenceId = searchParams.get('preference_id');

  function goToLoansPage() {
    return navigate('/loans', { replace: true });
  }

  return (
    <div className="mt-10">
      <div className="flex flex-col justify-center items-center p-4">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
          <div className="flex justify-center items-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex justify-center items-center">
              <svg
                className="w-10 h-10 text-green-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-gray-800">
              ¡Pago exitoso!
            </h1>
            <p className="text-gray-600 mt-2">
              Tu pago ha sido procesado con éxito. Si tienes alguna duda,
              contáctate con el administrador.
            </p>
            <div className="mt-4 text-gray-700 font-medium">
              <div className="font-bold">ID de referencia:</div>
              <span className="text-gray-800 italic">
                preference-id-{preferenceId}
              </span>
            </div>
            <Button onClick={goToLoansPage} type="primary">
              Continuar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
