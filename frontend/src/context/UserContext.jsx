import { createContext, useContext, useState } from 'react';
import { loginApi, registerApi } from '../services/apiAuth';
import { saveData } from '../utils/saveDataLocalStore';
import toast from 'react-hot-toast';
import { getCurrentUser } from '../services/apiUser';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useLoan must be used within a LoanProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const login = async (formData) => {
    try {
      setIsPending(true);
      const data = await loginApi(formData);
      console.log(data);
      saveData('token', data?.token);
      setUser(data?.user);
      setIsPending(false);
      toast.success(`Bienvenido! ${data?.user.name}`);
      return true;
    } catch (error) {
      console.log(error);
      toast.error(
        error.response.data.details === 'Invalid username or password'
          ? error.response.data.details
          : 'Error al loguearse'
      );
      setIsPending(false);
      return false;
    }
  };

  const register = async (formData) => {
    try {
      setIsPending(true);
      const data = await registerApi(formData);
      console.log(data);
      saveData('token', data?.token);
      setUser(data?.user);
      setIsPending(false);
      toast.success(`Bienvenido! ${data?.user.name}`);
      return true;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.details);
      setIsPending(false);
      return false;
    }
  };

  const getUser = async () => {
    try {
      setIsPending(true);

      const data = await getCurrentUser();
      console.log(data);
      saveData('token', data?.token);
      setUser(data?.user);
      setIsPending(false);
    } catch (error) {
      setIsPending(false);
    }
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };
  return (
    <UserContext.Provider
      value={{ user, isPending, login, register, getUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
