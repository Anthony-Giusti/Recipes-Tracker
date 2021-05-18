import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  card: {
    display: 'flex',
    marginTop: 20,
    marginBottom: 20,
    padding: '0.5em',
  },
  cardInner: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  stepButton: {
    borderRadius: '0',
    '&:hover': {
      color: 'white',
      background: '#638CAD',
    },
  },
  stepDisplay: {
    flexGrow: 1,
  },
  editField: {
    width: '100%',
    lineHeight: '1.5em',
    border: `3px dotted ${theme.palette.primary.main}`,
  },
  cardInterface: {
    display: 'flex',
  },
  cardInterfacePanel: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
}));
