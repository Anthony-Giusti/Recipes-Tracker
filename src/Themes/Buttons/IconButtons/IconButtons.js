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

export default IconButtonWithBackground;
