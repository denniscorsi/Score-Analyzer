import React from 'react';
import ReactDOM from 'react-dom/client';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import App from './components/Application';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1C8BA1', // blue
    },
    secondary: {
      main: '#F3C60F', // yellow
    },
    success: {
      main: '#00843A', // green
    },
    text: {
      primary: '#00843A', // green
      secondary: '#00843A', // green
      // disabled: '#800080', // purple
    },
  },
  // typography: {
  //   fontFamily: 'Arial, sans-serif',
  //   fontSize: 14,
  // },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
