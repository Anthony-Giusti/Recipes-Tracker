import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';

import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import IconButton from '@material-ui/core/IconButton';

const CategoryButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(blue[100]),
    backgroundColor: blue[100],
    '&:hover': {
      backgroundColor: blue[200],
    },
  },
}))(Button);

const DietButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(green[100]),
    backgroundColor: green[100],
    '&:hover': {
      backgroundColor: green[200],
    },
  },
}))(Button);

const IntoleranceButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(red[100]),
    backgroundColor: red[100],
    '&:hover': {
      backgroundColor: red[200],
    },
  },
}))(Button);

const IconButtonWithBackground = withStyles((theme) => ({
  root: {
    borderRadius: '0',
    color: theme.palette.getContrastText(theme.palette.primary.main),
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}))(IconButton);

export { CategoryButton, DietButton, IntoleranceButton, IconButtonWithBackground };
