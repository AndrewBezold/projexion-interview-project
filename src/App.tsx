import React from 'react';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import { ToastProvider } from 'use-toast-mui';
import isEmpty from 'lodash/isEmpty';
import { LoginPage } from './pages/LoginPage';
import { ContentPage } from './pages/ContentPage';
import { AuthProvider, useAuth } from './components/AuthContext';
import { Header } from './components/Header';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Body = () => {
  const { user } = useAuth();
  const theme = useTheme();

  return (
    <div style={{
      "minHeight": "100vh",
      "minWidth": "100vh",
      "backgroundColor": theme.palette.background.default,
    }}>
      {isEmpty(user) ? (
        <LoginPage />
      ) : (
        <ContentPage />
      )}
    </div>
  )
}

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <ToastProvider>
          <Header />
          <Body />
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
