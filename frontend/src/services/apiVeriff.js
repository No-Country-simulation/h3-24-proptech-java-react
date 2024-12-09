import axios from 'axios';
import { baseURL } from '../utils/constants';
import { getData } from '../utils/saveDataLocalStore';

export async function startVerificationApi() {
  try {
    const token = getData('token');

    if (!token) {
      throw new Error('No estás autenticado. Inicia sesión para continuar.');
    }

    const response = await axios.post(
      `${baseURL}/api/veriff/session`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status !== 200 || !response.data) {
      throw new Error('Ocurrió un error. Intenta nuevamente..');
    }

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}
