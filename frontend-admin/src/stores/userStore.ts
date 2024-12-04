/** @format */

import { create } from 'zustand';
import { IUser } from '../types/user.interface';

import { checkLoginService, loginService } from '../services/UserService';
import { isAxiosError } from 'axios';
import { FormLogin } from '../types/login-request.interface';

type UserStoreType = {
  user: IUser | null;
  isAuthenticated: boolean;
  messageError: string;
  messageSucces: string;
  isLoading: boolean;
  login: (formData: FormLogin) => Promise<void>;
  checkLogin: () => Promise<void>;
  logout: () => void;
  clearError: () => void;
  clearSucces: () => void;
};

export const userStore = create<UserStoreType>((set, get) => ({
  user: null,
  messageSucces: '',
  isAuthenticated: localStorage.getItem('isAuthenticated') == 'true',
  isLoading: false,
  messageError: '',
  login: async (formData: FormLogin) => {
    try {
      // en el caso que tenga que loguear o registrarme  voy a eliminar el token de localstorage ya que estare expirado.
      set({ isLoading: true });
      localStorage.removeItem('token');
      const data = await loginService(formData);
      if (data && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('isAuthenticated', 'true');
        set({ isAuthenticated: true, user: data.user, isLoading: false });
      }
    } catch (error) {
      console.error(error);
      set({ user: null, isAuthenticated: false, isLoading: false });
      if (isAxiosError(error) && error.response) {
        const newError = error.response.data as {
          status: boolean;
          message: string;
          details: string;
        };
        if (!get().messageError) {
          set({ messageError: newError.details });
        }
      } else if (isAxiosError(error) && error.message) {
        set({ messageError: error.message });
      } else {
        set({ messageError: 'Error interno' });
      }
    }
  },

  checkLogin: async () => {
    try {
      const data = await checkLoginService();
      if (data) {
        localStorage.setItem('token', data.token);
        set({ isAuthenticated: true, user: data.user });
      }
    } catch (error) {
      console.log(error);

      localStorage.removeItem('isAuthenticated');
      set({ isAuthenticated: false, user: null });
    }
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    set({ isAuthenticated: false, user: null });
  },
  clearError: () => set({ messageError: '' }),
  clearSucces: () => set({ messageSucces: '' }),
}));
