import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles((theme) => ({
  page: {
    background: '#f9f9f9',
    width: '100%',
  },
  title: {
    padding: theme.spacing(3),
  },
  root: {
    display: 'flex',
  },
  navBtn: {
    margin: '0.4em',
  },
  toolbar: theme.mixins.toolbar,
  divider: {
    backgroundColor: theme.palette.common.white,
    width: 2,
    height: '3em',
    margin: '0 0.8em',
  },
  avatarIconBtn: {
    marginLeft: 'auto',
    width: '2.5em',
  },
  drawer: {
    background: theme.palette.primary.main,
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      paddingBottom: 10,
    },
  },
  drawerFilterBtn: {
    flexGrow: 1,
  },
}));
