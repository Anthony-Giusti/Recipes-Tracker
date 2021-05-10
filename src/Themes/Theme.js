import { createMuiTheme } from '@material-ui/core';
import { deepOrange, blue, blueGrey, teal, cyan } from '@material-ui/core/colors';

const Theme = createMuiTheme({
  palette: {
    primary: {
      main: blueGrey[700],
    },
    secondary: {
      main: cyan[900],
    },
    selected: {
      main: '#81c784',
    },
  },
  overrides: {
    MuiButton: {
      text: {
        // color: 'white',
        // background: '#648dae',
        '&:hover': {
          // background: '#6681C4',
          // color: '#fefefe',
        },
      },
    },
  },
  MuiIconButton: {
    text: {
      // color: this.palette.primary.main,
    },
  },
});

// const Theme = createMuiTheme({
//   palette: {
//     primary: {
//       main: blue[100],
//     },
//     secondary: {
//       main: deepOrange[200],
//       // main: '#1976d2',
//       // main: '#C2D2DF',
//     },
//     selected: {
//       main: '#81c784',
//     },
//   },
//   typography: {
//     fontFamily: 'Roboto',
//   },
//   overrides: {
//     MuiButton: {
//       text: {
//         color: 'white',
//         // background: '#648dae',
//         '&:hover': {
//           background: '#6681C4',
//           // color: '#fefefe',
//         },
//       },
//     },
//   },
//   buttons: {
//     iconBtn: {
//       borderRadius: '10%',
//       // color: 'white',
//       // background: color.primary,
//       // '&:hover': {
//       //   background: color.secondary,
//       // },
//     },
//   },
//   themeTest: {
//     color: '#fefefe',
//   },
// });

export default Theme;
