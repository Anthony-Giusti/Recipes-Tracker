import { fade, makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  searchBar: {
    minWidth: '15em',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    margin: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      flexBasis: '100%',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    // height: '100%',
  },
  searchField: {
    color: theme.palette.common.white,
  },
}));
