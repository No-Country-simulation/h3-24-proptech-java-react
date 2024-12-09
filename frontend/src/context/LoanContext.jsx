import { createContext, useContext, useState } from 'react';
import {
  getLoanApi,
  loanCreateApi,
  loanSimulationApi,
  loanToPendingApi,
} from '../services/apiLoan';
import toast from 'react-hot-toast';
import { uploadDocumentation } from '../services/apiLoanDoc';
import { isAxiosError } from 'axios';

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
  const [allDocumentationUploaded, setAllDocumentationUploaded] =
    useState(false);
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
      const res = await getLoanApi();
      setLoan(res.loan);
      const newArray = res.documentationStatuses.filter(
        (l) => l.allDocumentsUploaded === true
      );
      setAllDocumentationUploaded(newArray.length >= 3);
    } catch (error) {
      console.log(error);
    }
  };

  function setDataProfileForms(data) {
    setDataProfile({ ...dataProfile, ...data });
  }

  const uploadDoc = (arrayPromise) => {
    setIsPending(true);
    return Promise.allSettled(arrayPromise)
      .then(() => {
        setIsPending(false);
        toast.success('Documentacion cargada con exito!✔️');
        return true;
      })
      .catch((error) => {
        toast.error('Error al cargar la documentacion! ❌');
        console.error('Error en la ejecución de las promesas', error);
        setIsPending(false);
        return false;
      });
  };

  const loanToPending = async (loanId) => {
    try {
      const res = await loanToPendingApi(loanId);
      if (res.movedSuccessfullyToPendingStatus) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
      return res.movedSuccessfullyToPendingStatus;
    } catch (error) {
      if (isAxiosError(error) && error.response)
        toast.error(error.response.data.message);
    }
  };

  return (
    <LoanContext.Provider
      value={{
        loan,
        loanSimulation,
        loanFormData,
        isPending,
        dataProfile,
        allDocumentationUploaded,
        setLoanFormData,
        simulateLoan,
        createLoan,
        setDataProfileForms,
        getLoan,
        uploadDoc,
        loanToPending,
      }}>
      {children}
    </LoanContext.Provider>
  );
};
