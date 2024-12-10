import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { baseURL } from '../../../utils/constants';
import { getData } from '../../../utils/saveDataLocalStore';

function useGetPendingPaymentOfType(loanId, paymentType = 'ON_TIME') {
  const {
    data: pendingPayment,
    isPending: isLoading,
    isError,
  } = useQuery({
    queryKey: ['pending-payment', loanId, paymentType],
    retry: false,
    queryFn: getPendingQuotas,
  });

  async function getPendingQuotas() {
    const token = getData('token');
    const url = `${baseURL}/api/payments/first-pending/${loanId}?paymentType=${paymentType}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  return { pendingPayment, isLoading, isError };
}

export default useGetPendingPaymentOfType;
