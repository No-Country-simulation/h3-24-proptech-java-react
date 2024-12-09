import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { baseURL } from '../../utils/constants';
import { getData } from '../../utils/saveDataLocalStore';

function useLoanDetails(loanId) {
  const { data: loanDetails, isLoading } = useQuery({
    queryKey: ['loan-details', loanId],
    queryFn: getLoanDetails,
  });

  async function getLoanDetails() {
    const token = getData('token');
    const url = `${baseURL}/api/loans/${loanId}/details`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  return { loanDetails, isLoading };
}

export default useLoanDetails;
