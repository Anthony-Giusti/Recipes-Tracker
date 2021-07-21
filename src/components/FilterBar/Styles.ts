import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles((theme) => ({
  navBtn: {
    margin: '0.3em',
    flexGrow: 1,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
}));
