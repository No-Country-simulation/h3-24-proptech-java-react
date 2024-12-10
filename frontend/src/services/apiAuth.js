import axios from 'axios';
import { baseURL } from '../utils/constants';

export async function registerApi(data) {
  try {
    const response = await axios.post(`${baseURL}/api/auth/register`, {
      ...data,
      userType: true,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function loginApi(data) {
  try {
    const response = await axios.post(`${baseURL}/api/auth/login`, data);

    return response.data;
  } catch (error) {
    throw error;
  }
}
