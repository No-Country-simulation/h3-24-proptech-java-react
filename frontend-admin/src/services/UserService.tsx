import { isAxiosError } from 'axios';
import { FormLogin } from '../types/login-request.interface';
import api from '../utils/axios';
import { LoginResponse } from '../types/login-response.interface';

export const loginService = async (formData: FormLogin) => {
  try {
    const { data } = await api.post<LoginResponse>('/auth/login', formData);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error;
    }
    throw error;
  }
};

export const checkLoginService = async () => {
  try {
    const { data } = await api<LoginResponse>('/auth/check-login');

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
