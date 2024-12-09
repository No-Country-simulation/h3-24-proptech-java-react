import axios from 'axios';
import { baseURL } from '../utils/constants';

export async function registerApi(data) {
  try {
    console.log(data);
    const response = await axios.post(`${baseURL}/api/auth/register`, {
      ...data,
      userType: true,
    });

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function loginApi(data) {
  try {
    const response = await axios.post(`${baseURL}/api/auth/login`, data);

    if (response.status !== 200 || !response.data) {
      throw new Error('Credenciales incorrectas');
    }

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}
