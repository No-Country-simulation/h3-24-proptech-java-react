import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { UserProvider } from './context/UserContext.jsx';
import { ProfileProvider } from './context/ProfileContext.jsx';
import { LoanProvider } from './context/LoanContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <ProfileProvider>
        <LoanProvider>
          <App />
        </LoanProvider>
      </ProfileProvider>
    </UserProvider>
  </React.StrictMode>
);
