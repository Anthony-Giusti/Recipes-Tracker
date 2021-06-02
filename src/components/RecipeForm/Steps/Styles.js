import { makeStyles } from '@material-ui/core';
import Theme from '../../../Themes/Theme';

export default makeStyles(() => ({
  addStepBtn: {
    borderRadius: '10%',
    color: 'white',
    background: Theme.palette.primary.main,
    '&:hover': {
      background: Theme.palette.secondary.main,
    },
  },
  newStepContainer: {
    width: '100%',
  },
  newStep: {
    display: 'flex',
    flexDirection: 'row',
  },
  newStepField: {
    flexGrow: '1',
  },
}));
