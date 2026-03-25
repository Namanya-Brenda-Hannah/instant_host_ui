import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './AppRouter';
import './index.css';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const ostelloTheme = createTheme({
  palette: {
    primary: {
      main: '#0E7C6B',
      dark: '#065C50',
      light: '#12A18B',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#F2994A',
      dark: '#D07A2D',
      light: '#FDE8D0',
      contrastText: '#3D2100',
    },
    background: {
      default: '#F5F7FA',
      paper: '#FFFFFF',
    },
    error: { main: '#D32F2F' },
    success: { main: '#2E7D32' },
    warning: { main: '#ED6C02' },
    info: { main: '#0288D1' },
    text: {
      primary: '#1A1A2E',
      secondary: '#636E82',
    },
  },
  typography: {
    fontFamily: 'Inter, Roboto, Arial, sans-serif',
    h4: { fontWeight: 800 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    subtitle1: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          '&:hover': { backgroundColor: '#065C50' },
        },
        containedSecondary: {
          '&:hover': { backgroundColor: '#D07A2D' },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#0E7C6B',
          },
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={ostelloTheme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  </React.StrictMode>
);
