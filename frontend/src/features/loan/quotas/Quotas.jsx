import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Button from '../../../ui/Button';
import { baseURL } from '../../../utils/constants';
import { formatDate, formatToARSCurrency } from '../../../utils/helpers';
import { getData } from '../../../utils/saveDataLocalStore';
import useLoanDetails from '../useLoanDetails';
import useGetPendingPaymentOfType from './useGetPendingPaymentOfType';

initMercadoPago('APP_USR-a5e2631a-7fd1-4654-8431-a36d05b602cb');

function Quotas({ loanId }) {
  const navigate = useNavigate();
  const { loanDetails, isLoading } = useLoanDetails(loanId);
  const loan = loanDetails?.loan;

  if (isLoading) {
    return (
      <div className="mt-[50px] flex justify-center font-bold text-3xl">
        Cargando pagos...
      </div>
    );
  }

  if (!loan) {
    return (
      <div className="mt-[50px] flex justify-center font-bold text-3xl">
        Préstamo no encontrado :(
      </div>
    );
  }

  if (loan.status !== 'APPROVED') {
    return navigate('/loans');
  }

  return (
    <div className="mt-[50px] mx-10">
      <div>
        <div className="md:flex justify-between items-center">
          <div>
            <h3 className="mb-1 font-bold leading-none tracking-tight text-gray-900 text-2xl">
              Cuotas a pagar
            </h3>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
              Paga y administra tus quotas pendientes
            </p>
          </div>
          <div className="flex space-x-3">
            <div className="rounded-lg bg-gray-100 p-3">
              <h4 className="text-sm">Total a pagar</h4>
              <p className="text-lg font-bold">
                {formatToARSCurrency(loan.totalPayment)} ARS
              </p>
            </div>
            <div className="rounded-lg bg-gray-100 p-3 min-w-[100px]">
              <h4 className="text-sm">Cuotas</h4>
              <p>
                <span className="font-bold text-lg">{1}</span> /{' '}
                <span className="text-sm">{loan.termMonths}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr className="mt-3" />
      <div className="w-full mt-5 space-y-10 xl:space-y-0 xl:flex">
        <PendingPayment
          loanId={loanId}
          title="Cuota actual"
          emptyPaymentTitle="No hay cuotas disponibles para pagar o ya han side pagadas las de este mes."
          paymentType="ON_TIME"
        />
        <PendingPayment
          loanId={loanId}
          title="Adelanta cuotas"
          emptyPaymentTitle="No hay coutas disponibles para adelantar o ya han sido adelantadas la de este mes."
          paymentType="ADVANCE"
        />
      </div>
    </div>
  );
}

const PendingPayment = ({ title, emptyPaymentTitle, loanId, paymentType }) => {
  const [isCreatingPreference, setIsCreatingPreference] = useState(false);
  const [preferenceId, setPreferenceId] = useState('');
  const { pendingPayment, isLoading, isError } = useGetPendingPaymentOfType(
    loanId,
    paymentType
  );

  function createPreference(paymentId) {
    const token = getData('token');
    axios
      .post(`${baseURL}/api/preferences/${paymentId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPreferenceId(response.data.preferenceId);
      })
      .catch(() => {
        toast.error('Algo salió mal. Inténtelo de nuevo.');
      })
      .finally(() => {
        setIsCreatingPreference(false);
      });
  }

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex-1 px-3">
      <h4 className="text-md font-bold">{title}</h4>
      <hr className="mt-2" />
      {isError ? (
        <div className="text-md text-center mt-3">{emptyPaymentTitle}</div>
      ) : (
        <div className="mt-5 sm:flex items-center justify-between">
          <div className="space-y-3">
            <div className="text-md">
              Cuota {pendingPayment.installmentNumber}
            </div>
            <div className="flex items-center">
              <div className="text-2xl font-bold">
                {formatToARSCurrency(
                  pendingPayment.discountAmount
                    ? pendingPayment.totalAmountWithDiscount
                    : pendingPayment.amount
                )}{' '}
                ARS
              </div>
              {pendingPayment.discountAmount ? (
                <div className="rounded-lg border border-green-300 ml-3 px-2.5 text-center text-sm transition-all shadow-sm text-green-600">
                  - {pendingPayment.discountAmount} %
                </div>
              ) : null}
            </div>
            <div className="font-light text-gray-400">
              <span>{formatDate(pendingPayment.dueDate)}</span> -{' '}
              <span>{formatDate(pendingPayment.payLimitDate)}</span>
            </div>
          </div>
          <div className="mt-3 sm:mt-0">
            {preferenceId ? (
              <div id="wallet_container">
                <Wallet
                  initialization={{ preferenceId }}
                  customization={{
                    texts: { action: 'pay', valueProp: 'smart_option' },
                  }}
                />
              </div>
            ) : (
              <Button
                disabled={isCreatingPreference}
                isLoading={isCreatingPreference}
                type={paymentType === 'ADVANCE' ? 'primary' : 'secondary'}
                extraClass={'min-w-[150px] w-full sm:w-auto'}
                onClick={() => createPreference(pendingPayment.paymentId)}
              >
                Pagar
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quotas;
