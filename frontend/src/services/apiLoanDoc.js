import axios from 'axios';

import { baseURL } from '../utils/constants';
import { getData } from '../utils/saveDataLocalStore';

export const uploadDocumentation = async (formData, loanId) => {
  try {
    console.log(formData, loanId);
    const token = getData('token');
    const { data } = await axios.post(
      `${baseURL}/api/loans/${loanId}/documents`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (error) {
    throw new Error(error);
  }
};
