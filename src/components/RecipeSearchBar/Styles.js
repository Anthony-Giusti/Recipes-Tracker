import { fade, makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  searchBar: {
    width: '15em',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    margin: '0 0.9em 0 0.3em',
    [theme.breakpoints.down('sm')]: {
      flexBasis: '100%',
      margin: '1em 0',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
  },
  clearIcon: {
    [theme.breakpoints.down('sm')]: {
      marginLeft: 'auto',
    },
  },
  searchField: {
    color: theme.palette.common.white,
    width: '100%',
  },
}));
