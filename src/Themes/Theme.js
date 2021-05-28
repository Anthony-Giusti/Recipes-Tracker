import { createMuiTheme } from '@material-ui/core';
import { blueGrey, red, grey } from '@material-ui/core/colors';

const Theme = createMuiTheme({
  palette: {
    primary: {
      main: blueGrey[500],
    },
    secondary: {
      main: red[700],
    },
    selected: {
      main: '#81c784',
    },
    default: {
      main: grey[300],
    },
  },
});

export default Theme;
