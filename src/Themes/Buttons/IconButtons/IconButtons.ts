// @ts-nocheck
import withStyles from '@material-ui/core/styles/withStyles';

import IconButton from '@material-ui/core/IconButton';

const IconButtonWithBackground = withStyles((theme) => ({
  root: {
    borderRadius: '10%',
    color: theme.palette.getContrastText(theme.palette.primary.main),
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}))(IconButton);

const IconButtonWithBackgroundDefault = withStyles((theme) => ({
  root: {
    borderRadius: '50%',
    color: theme.palette.getContrastText(theme.palette.default.main),
    backgroundColor: theme.palette.default.main,
    '&:hover': {
      color: theme.palette.primary.light,
      backgroundColor: theme.palette.primary.dark,
    },
  },
}))(IconButton);

export { IconButtonWithBackground, IconButtonWithBackgroundDefault };
