import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles((theme) => ({
  page: {
    background: '#f9f9f9',
    width: '100%',
    // padding: theme.spacing(3),
  },
  title: {
    padding: theme.spacing(3),
  },
  root: {
    display: 'flex',
  },
  navBtn: {
    margin: '0 0.3em',
  },
  toolbar: theme.mixins.toolbar,
  avatar: {
    marginLeft: 'auto',
  },
  divider: {
    backgroundColor: theme.palette.common.white,
    width: 2,
    height: '3em',
    marginLeft: '0.8em',
  },
  drawer: {
    background: theme.palette.primary.main,
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
  },
}));
