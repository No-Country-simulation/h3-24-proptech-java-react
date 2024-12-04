import { LoanStatus } from './status.enum';

export interface LoanChangeStatus {
  loanId: string;
  status: LoanStatus;
}

export interface LoanFormData {
  requestedAmount: number;
  termMonths: number;
}

export interface LoanSimulateResponse {
  monthlyQuota: number;
  totalPayment: number;
  requestedAmount: number;
  termMonths: number;
  schedule: Schedule[];
}

export interface Schedule {
  month: number;
  quota: number;
  interest: number;
  remaining: number;
}

export interface SendEmailFormData {
  loanId: string;
  message: string;
}
