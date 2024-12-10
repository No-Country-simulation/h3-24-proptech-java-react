import { createContext, useContext, useState } from 'react';
import { loginApi, registerApi } from '../services/apiAuth';
import { saveData } from '../utils/saveDataLocalStore';
import toast from 'react-hot-toast';

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
      saveData(data?.token);
      setUser(data?.user);
      setIsPending(false);
      toast.success(`Bienvenido! ${data?.user.name}`);
    } catch (error) {
      console.log(error);
      toast.error(
        error.response.data.details === 'Invalid username or password'
          ? error.response.data.details
          : 'Error al loguearse'
      );
      setIsPending(false);
    }
  };

  const register = async (formData) => {
    try {
      setIsPending(true);
      const data = await registerApi(formData);
      saveData(data?.token);
      setUser(data?.user);
      setIsPending(false);
      toast.success(`Bienvenido! ${data?.user.name}`);
    } catch (error) {
      console.log(error);

      setIsPending(false);
    }
  };
  return (
    <UserContext.Provider value={{ user, isPending, login, register }}>
      {children}
    </UserContext.Provider>
  );
};
