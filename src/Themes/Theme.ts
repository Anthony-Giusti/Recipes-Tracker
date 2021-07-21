import { createMuiTheme } from '@material-ui/core';
import { blueGrey, red, grey, cyan, teal } from '@material-ui/core/colors';

const Theme = createMuiTheme({
  palette: {
    primary: {
      main: blueGrey[700],
    },
    secondary: {
      main: red[900],
    },
    selected: {
      main: '#81c784',
    },
    default: {
      main: grey[300],
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

export default Theme;
