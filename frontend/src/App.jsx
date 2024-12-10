import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LoanProvider } from './context/LoanContext';
import { ProfileProvider } from './context/ProfileContext';
import { ChatBot } from './features/chat/ChatBot';
import { SuccessPaymentPage } from './features/loan/mp/SuccessPaymentPage';
import UserLoans from './features/loan/UserLoans';
import './index.css';
import Auth from './page/Auth';
import ClientProfile from './page/ClientProfile';
import Home from './page/Home';
import InvestmentPanel from './page/InvestmentPanel';
import CalculatePersonalLoan from './page/loan/CalculatePersonalLoan';
import LoanAddressInformation from './page/loan/LoanAddressInformation';
import LoanApplication from './page/loan/LoanApplication';
import LoanApplicationSummary from './page/loan/LoanApplicationSummary';
import { LoanDocumentation } from './page/loan/LoanDocumentation';
import LoanInformation from './page/loan/LoanInformation';
import LoanPersonalInformation from './page/loan/LoanPersonalInformation';
import { LoanSendInfo } from './page/loan/LoanSendInfo';
import LoanSimulationResult from './page/loan/LoanSimulationResult';
import MessagesStartingLoan from './page/loan/MessagesStartingLoan';
import PageNotFound from './page/PageNotFound';
import PasswordChangeMessage from './page/PasswordChangeMessage';
import PaymentQuotas from './page/PaymentQuotas';
import PersonalSettings from './page/PersonalSettings';
import RecoverPassword from './page/RecoverPassword';
import Veriff from './page/Veriff';
import AppLayout from './ui/AppLayout';
import ProtectedRoute from './ui/ProtectedRoute';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProfileProvider>
        <LoanProvider>
          <ReactQueryDevtools initialIsOpen={false} />

          <BrowserRouter>
            <Routes>
              <Route element={<AppLayout />}>
                <Route index element={<Navigate replace to="home" />} />
                <Route path="auth" element={<Auth />} />
                <Route index element={<Navigate replace to="home" />} />
                <Route path="auth" element={<Auth />} />
                <Route path="reset-password" element={<RecoverPassword />} />
                <Route
                  path="passwordChangeMessage"
                  element={<PasswordChangeMessage />}
                />

                {/* Rutas protegidas  */}
                <Route element={<ProtectedRoute />}>
                  <Route path="menu" element={<ClientProfile />} />
                  <Route
                    path="personalSettings"
                    element={<PersonalSettings />}
                  />
                  <Route path="loans" element={<UserLoans />} />
                  <Route
                    path="payment-quotas/:loanId"
                    element={<PaymentQuotas />}
                  />
                  <Route path="investmentPanel" element={<InvestmentPanel />} />
                  <Route
                    path="messagesStartingLoan"
                    element={<MessagesStartingLoan />}
                  />

                  <Route
                    path="loan-simulation"
                    element={<CalculatePersonalLoan />}
                  />
                  <Route
                    path="loan-simulation-result"
                    element={<LoanSimulationResult />}
                  />

                  <Route path="loan" element={<LoanApplication />}>
                    <Route index element={<Navigate replace to="veriff" />} />
                    <Route path="veriff" element={<Veriff />} />

                    <Route
                      path="loan-information"
                      element={<LoanInformation />}
                    />

                    <Route
                      path="address-details"
                      element={<LoanAddressInformation />}
                    />

                    <Route
                      path="personal-information"
                      element={<LoanPersonalInformation />}
                    />

                    <Route
                      path="data-summary"
                      element={<LoanApplicationSummary />}
                    />
                    <Route
                      path="upload-documentation"
                      element={<LoanDocumentation />}
                    />
                    <Route
                      path="loan-send-information"
                      element={<LoanSendInfo />}
                    />
                  </Route>
                </Route>

                <Route path="*" element={<PageNotFound />} />
              </Route>
              <Route path="home" element={<Home />} />
              <Route path="mp-success" element={<SuccessPaymentPage />} />
            </Routes>
          </BrowserRouter>

          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: '8px' }}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
              style: {
                fontSize: '16px',
                maxWidth: '600px',
                padding: '16px 24px',
                backgroundColor: '#FFFFFF',
                color: '#0D0D0D',
              },
            }}
          />
          <ChatBot />
        </LoanProvider>
      </ProfileProvider>
    </QueryClientProvider>
  );
}

export default App;
