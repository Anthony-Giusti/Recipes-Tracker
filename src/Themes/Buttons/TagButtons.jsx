import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';

import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

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

export { CategoryButton, DietButton, IntoleranceButton };
