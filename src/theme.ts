import { deepPurple } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: deepPurple[500],
    },
    grey: {
      800: '#2c2e30',
      900: '#1e2022',
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: ({ ownerState, theme }:any) => ({
          color: theme.palette.text.primary,
        }),
      }
    },
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState, theme }:any) => ({
          textTransform: 'none',
        }),
      },
    },
  }
});

export default theme;
