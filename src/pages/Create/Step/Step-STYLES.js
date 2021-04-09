import { makeStyles } from '@material-ui/core';

export default makeStyles(() => ({
  card: {
    display: 'flex',
    marginTop: 20,
    marginBottom: 20,
  },
  cardInner: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  stepDisplay: {
    flexGrow: 1,
  },
  editField: {
    width: '100%',
  },
  cardInterface: {
    display: 'flex',
  },
  cardInterfacePanel: {
    display: 'flex',
    flexDirection: 'column',
  },
}));
