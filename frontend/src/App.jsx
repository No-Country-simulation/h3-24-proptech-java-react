import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";

import Home from "./page/Home";
import PageNotFound from "./page/PageNotFound";
import Auth from "./page/Auth";

import AppLayout from "./ui/AppLayout";
import ProtectedRoute from "./ui/ProtectedRoute";

import CalculatePersonalLoan from "./page/loan/CalculatePersonalLoan";
import LoanSimulationResult from "./page/loan/LoanSimulationResult";
import LoanApplication from "./page/loan/LoanApplication";
import LoanInformation from "./page/loan/LoanInformation";
import LoanAddressInformation from "./page/loan/LoanAddressInformation";
import LoanPersonalInformation from "./page/loan/LoanPersonalInformation";
import LoanApplicationSummary from "./page/loan/LoanApplicationSummary";
import Veriff from "./page/Veriff";

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
      <ReactQueryDevtools initialIsOpen={false} />

      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="home" />} />
            <Route path="home" element={<Home />} />
            <Route path="auth" element={<Auth />} />

            <Route element={<ProtectedRoute />}>
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

                <Route path="loan-information" element={<LoanInformation />} />

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
              </Route>
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "600px",
            padding: "16px 24px",
            backgroundColor: "#FFFFFF",
            color: "#0D0D0D",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
