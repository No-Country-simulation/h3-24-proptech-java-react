import { create } from 'zustand';
import { LoanResponse, Status } from '../types/loan-response.interface';
import {
  LoanChangeStatus,
  LoanFormData,
  LoanSimulateResponse,
  SendEmailFormData,
} from '../types/loan-service.types';
import {
  approve,
  changeStatus,
  declinedLoan,
  findLoansByStatus,
  findMonths,
  preApprove,
  simulateLoan,
  updateLoan,
} from '../services/LoanService';
import { ErrorResponse } from '../types/error-response.interface';
import { isAxiosError } from 'axios';

interface LoanStore {
  loans: LoanResponse[] | null;
  months: number[];
  loanSimulate: LoanSimulateResponse | null;
  loanUpdated: LoanResponse | null;
  findMonths: () => Promise<void>;
  simulateLoan: (formData: LoanFormData) => Promise<void>;
  updateLoan: (formData: LoanFormData, loanId: string) => Promise<void>;
  findByStatus: (formData: Status) => Promise<void>;
  changeStatus: (status: LoanChangeStatus) => Promise<void>;
  preApprove: (loanId: string) => Promise<string | undefined>;
  approve: (loanId: string) => Promise<string | undefined>;
  declined: (formData: SendEmailFormData) => Promise<string | undefined>;
  messageError: string;
  messageSucces: string;
  isLoading: boolean;
  clearError: () => void;
  clearSucces: () => void;
  resetLoanSimulate: () => void;
}

export const loanStore = create<LoanStore>((set, get) => ({
  loans: null,
  messageError: '',
  messageSucces: '',
  isLoading: false,
  months: [],
  loanSimulate: null,
  loanUpdated: null,
  changeStatus: async (formData: LoanChangeStatus) => {
    try {
      set({ isLoading: true });
      const data = await changeStatus(formData);
      if (data) {
        set({ messageSucces: data, isLoading: false });
      }
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        const newError = error.response.data as ErrorResponse;
        set({
          messageError: newError.detail,
          isLoading: false,
        });
      }
    }
  },
  findByStatus: async (formData: Status) => {
    try {
      set({ isLoading: true });
      const data = await findLoansByStatus(formData);
      if (data) {
        set({
          messageSucces: 'Prestamos cargados correctamente ✔️',
          loans: data,
          isLoading: false,
        });
      }
    } catch (error) {
      if (
        isAxiosError(error) &&
        error.response &&
        error.response.data &&
        error.response.data.detail
      ) {
        const newError = error.response.data as ErrorResponse;
        set({
          messageError: newError.detail,
          isLoading: false,
        });
      }
      set({
        messageError: 'Error al buscar prestamos por status!.',
        isLoading: false,
      });
    }
  },
  findMonths: async () => {
    try {
      set({ isLoading: true });
      const data = await findMonths();
      if (data) {
        set({
          months: data,
          isLoading: false,
        });
      }
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        const newError = error.response.data as ErrorResponse;
        set({
          messageError: newError.detail,
          isLoading: false,
        });
      }
    }
  },
  simulateLoan: async (formData) => {
    try {
      set({ isLoading: true, loanSimulate: null });
      const data = await simulateLoan(formData);
      if (data) {
        set({
          messageSucces: 'Prestamo simulado correctamente!',
          loanSimulate: data,
          isLoading: false,
        });
      }
    } catch (error) {
      if (
        isAxiosError(error) &&
        error.response &&
        error.response.data &&
        error.response.data.detail
      ) {
        const newError = error.response.data as ErrorResponse;
        set({
          messageError: newError.detail,
          isLoading: false,
        });
      }
      set({
        messageError: 'Error al simular un prestamo el prestamo!.',
        isLoading: false,
      });
    }
  },
  updateLoan: async (formData, loanId) => {
    try {
      set({ isLoading: true });
      const data = await updateLoan(formData, loanId);
      console.log(data);
      if (data) {
        set({
          messageSucces: 'Prestamo actualizado correctamente!',
          loanUpdated: data,
          isLoading: false,
        });
      }
    } catch (error) {
      if (
        isAxiosError(error) &&
        error.response &&
        error.response.data &&
        error.response.data.detail
      ) {
        const newError = error.response.data as ErrorResponse;
        set({
          messageError: newError.detail,
          isLoading: false,
        });
      }
      set({
        messageError: 'Error al actualizar el prestamo!.',
        isLoading: false,
      });
    }
  },
  async preApprove(loanId) {
    try {
      set({ isLoading: true });
      const data = await preApprove(loanId);
      if (typeof data === 'string') {
        const newArray = get().loans?.filter((l) => l.loanId !== loanId);
        set({
          messageSucces: data,
          isLoading: false,
          loans: newArray,
        });
        return data;
      }
    } catch (error) {
      if (
        isAxiosError(error) &&
        error.response &&
        error.response.data &&
        error.response.data.detail
      ) {
        const newError = error.response.data as ErrorResponse;
        set({
          messageError: newError.detail,
          isLoading: false,
        });
      }
      set({
        messageError: 'Error al Pre aprobar el prestamo!.',
        isLoading: false,
      });
    }
  },
  async declined(formData) {
    try {
      set({ isLoading: true });
      const data = await declinedLoan(formData);
      if (typeof data === 'string') {
        const newArray = get().loans?.filter(
          (l) => l.loanId !== formData.loanId
        );
        set({
          messageSucces: data,
          isLoading: false,
          loans: newArray,
        });
        return data;
      }
    } catch (error) {
      if (
        isAxiosError(error) &&
        error.response &&
        error.response.data &&
        error.response.data.detail
      ) {
        const newError = error.response.data as ErrorResponse;
        set({
          messageError: newError.detail,
          isLoading: false,
        });
      }
      set({
        messageError: 'Error al declinar el prestamo!.',
        isLoading: false,
      });
    }
  },
  async approve(loanId) {
    try {
      set({ isLoading: true });
      const data = await approve(loanId);
      if (typeof data === 'string') {
        const newArray = get().loans?.filter((l) => l.loanId !== loanId);
        set({
          messageSucces: data,
          isLoading: false,
          loans: newArray,
        });
        return data;
      }
    } catch (error) {
      if (
        isAxiosError(error) &&
        error.response &&
        error.response.data &&
        error.response.data.detail
      ) {
        const newError = error.response.data as ErrorResponse;
        set({
          messageError: newError.detail,
          isLoading: false,
        });
      }
      set({
        messageError: 'Error al Aprobar el prestamo!.',
        isLoading: false,
      });
    }
  },
  clearError: () => set({ messageError: '' }),
  clearSucces: () => set({ messageSucces: '' }),
  resetLoanSimulate() {
    set({ loanSimulate: null });
  },
}));
