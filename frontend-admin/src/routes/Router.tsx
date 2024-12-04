import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { AppLayout } from '../layouts/AppLayout';
import PublicRoutes from './PublicRoutes';
import { Login } from '../pages/auth/Login';
import { NotFound } from '../pages/not-found/NotFound';
import { userStore } from '../stores/userStore';
import { useEffect } from 'react';
import { Dashboard } from '../pages/dashboard/Dashboard';
import { LoanPendingPage } from '../pages/loans/pending/LoanPendingPage';
import { LoanPreApprovedPage } from '../pages/loans/pre-approved/LoanPreApprovedPage';
import { LoanApprovedPage } from '../pages/loans/approved/LoanApprovedPage';
import { LoanInitiatedPage } from '../pages/loans/initiated/LoanInitiatedPage';
import { PendingPage } from '../pages/loans/LoansPage';

export default function Router() {
  const { checkLogin } = userStore();
  useEffect(() => {
    checkLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path='/' element={<Dashboard />} />
            <Route path='/loan-initiated' element={<PendingPage />} />
            <Route path='/loan-pending' element={<PendingPage />} />
            <Route path='/loan-pre-approved' element={<PendingPage />} />
            <Route path='/loan-approved' element={<PendingPage />} />

            <Route path='/loan-pending/:loanId' element={<LoanPendingPage />} />
            <Route
              path='/loan-pre-approved/:loanId'
              element={<LoanPreApprovedPage />}
            />
            <Route
              path='/loan-approved/:loanId'
              element={<LoanApprovedPage />}
            />
            <Route
              path='/loan-initiated/:loanId'
              element={<LoanInitiatedPage />}
            />
          </Route>
        </Route>
        <Route element={<PublicRoutes />}>
          <Route path='/login' element={<Login />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
