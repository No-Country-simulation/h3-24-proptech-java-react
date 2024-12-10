import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { baseURL } from '../../utils/constants';
import { getData } from '../../utils/saveDataLocalStore';

function useUserLoans(userId) {
  const { data: loans, isLoading } = useQuery({
    queryKey: ['loans', userId],
    queryFn: getUserLoans,
  });

  async function getUserLoans() {
    const token = getData('token');
    const response = await axios.get(`${baseURL}/api/loans/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  return { loans, isLoading };
}

export default useUserLoans;
