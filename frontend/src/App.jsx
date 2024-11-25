import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";

import Home from "./page/Home";
import PageNotFound from "./page/PageNotFound";
import Auth from "./page/Auth";
import ProtectedPage from "./page/ProtectedPage";

import AppLayout from "./ui/AppLayout";
import ProtectedRoute from "./ui/ProtectedRoute";

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

            <Route
              path="secretPage"
              element={
                <ProtectedRoute>
                  <ProtectedPage />
                </ProtectedRoute>
              }
            />

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
            backgroundColor: "#7AFF33FF",
            color: "#fff",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
