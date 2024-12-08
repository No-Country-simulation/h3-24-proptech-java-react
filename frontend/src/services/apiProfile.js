import axios from 'axios';
import { getData } from '../utils/saveDataLocalStore';
import { baseURL } from '../utils/constants';

export async function updateProfileApi(formdata) {
  try {
    const token = getData('token');

    if (!token) {
      throw new Error('No estás autenticado. Inicia sesión para continuar.');
    }

    const { data } = await axios.put(
      `${baseURL}/api/users/profiles`,
      formdata,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(data);
    return data;
  } catch (error) {
    console.error('💥Error:', error);
    throw error;
  }
}

export async function getProfileApi() {
  try {
    const token = getData('token');

    if (!token) {
      throw new Error('No estás autenticado. Inicia sesión para continuar.');
    }

    const { data } = await axios.get(`${baseURL}/api/users/profiles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    return data;
  } catch (error) {
    console.error('💥Error:', error);
    throw error;
  }
}
