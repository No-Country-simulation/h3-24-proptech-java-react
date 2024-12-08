import { createContext, useContext, useState } from 'react';
import {
  getLoanApi,
  loanCreateApi,
  loanSimulationApi,
} from '../services/apiLoan';
import toast from 'react-hot-toast';

const LoanContext = createContext();

export const useLoan = () => {
  const context = useContext(LoanContext);
  if (!context) {
    throw new Error('useLoan must be used within a LoanProvider');
  }
  return context;
};

export const LoanProvider = ({ children }) => {
  const [loan, setLoan] = useState(null);
  const [loanSimulation, setLoanSimulation] = useState(null);
  const [loanFormData, setLoanFormData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [dataProfile, setDataProfile] = useState({});

  const simulateLoan = async (data) => {
    try {
      setIsPending(true);
      const response = await loanSimulationApi(data);
      setIsPending(false);
      setLoanSimulation(response);
      return response;
    } catch (error) {
      toast.error(String(error));
      setIsPending(false);
    }
  };
  const createLoan = async () => {
    if (loanSimulation === null) {
      toast.error('Para crear el prestamo debes simularlo.');
    } else {
      const { requestedAmount, termMonths } = loanSimulation;
      try {
        setIsPending(true);
        const data = await loanCreateApi(requestedAmount, termMonths);
        toast.success('Prestamo creado exitosamente!');
        setIsPending(false);
        setLoan(data);
        return data;
      } catch (error) {
        setIsPending(false);
        toast.error(String(error));
      }
    }
  };

  const getLoan = async () => {
    try {
      console.log('get loan');
      const res = await getLoanApi();
      setLoan(res);
    } catch (error) {
      console.log(error);
      toast.error('Errror al buscar el prestamo.');
    }
  };

  function setDataProfileForms(data) {
    console.log(data);
    setDataProfile({ ...dataProfile, ...data });
  }

  return (
    <LoanContext.Provider
      value={{
        loan,
        loanSimulation,
        loanFormData,
        isPending,
        dataProfile,
        setLoanFormData,
        simulateLoan,
        createLoan,
        setDataProfileForms,
        getLoan,
      }}>
      {children}
    </LoanContext.Provider>
  );
};
