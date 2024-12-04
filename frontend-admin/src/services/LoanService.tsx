import { isAxiosError } from 'axios';
import api from '../utils/axios';
import { LoanResponse, Status } from '../types/loan-response.interface';
import {
  LoanChangeStatus,
  LoanFormData,
  LoanSimulateResponse,
  SendEmailFormData,
} from '../types/loan-service.types';

export const findLoansByStatus = async (status: Status) => {
  try {
    const { data } = await api<LoanResponse[]>(`/admin/loans/status/${status}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error;
    }
  }
};

export const changeStatus = async (formData: LoanChangeStatus) => {
  try {
    const { data } = await api.post<string>(
      '/admin/loans/change-status',
      formData
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error;
    }
  }
};

export const findMonths = async () => {
  try {
    const { data } = await api<number[]>('/loan-rates/months');
    return data;
  } catch (error) {
    console.log(error);
    if (isAxiosError(error) && error.response) {
      throw error;
    }
  }
};

export const simulateLoan = async (formData: LoanFormData) => {
  try {
    const { data } = await api.post<LoanSimulateResponse>(
      '/loans/simulate',
      formData
    );
    return data;
  } catch (error) {
    console.log(error);
    if (isAxiosError(error) && error.response) {
      throw error;
    }
  }
};

export const updateLoan = async (formData: LoanFormData, loanId: string) => {
  try {
    const { data } = await api.put<LoanResponse>(
      `/admin/loans/update-loan/${loanId}`,
      formData
    );
    return data;
  } catch (error) {
    console.log(error);
    if (isAxiosError(error) && error.response) {
      throw error;
    }
  }
};

export const declinedLoan = async (formData: SendEmailFormData) => {
  try {
    const { data } = await api.post<string>(
      '/admin/loans/declined-loan',
      formData
    );
    return data;
  } catch (error) {
    console.log(error);
    if (isAxiosError(error) && error.response) {
      throw error;
    }
  }
};

export const preApprove = async (loandId: string) => {
  try {
    const { data } = await api.put<string>(
      `/admin/loans/pre-approve/${loandId}`
    );
    return data;
  } catch (error) {
    console.log(error);
    if (isAxiosError(error) && error.response) {
      throw error;
    }
  }
};

export const approve = async (loandId: string) => {
  try {
    const { data } = await api.put<string>(`/admin/loans/approve/${loandId}`);
    return data;
  } catch (error) {
    console.log(error);
    if (isAxiosError(error) && error.response) {
      throw error;
    }
  }
};
