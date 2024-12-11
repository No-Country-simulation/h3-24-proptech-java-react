import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { UserProvider } from './context/UserContext.jsx';
import { ProfileProvider } from './context/ProfileContext.jsx';
import { LoanProvider } from './context/LoanContext.jsx';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <ProfileProvider>
        <LoanProvider>
          <App />
        </LoanProvider>
      </ProfileProvider>
    </UserProvider>
    <Toaster
      position='top-center'
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
  </React.StrictMode>
);
