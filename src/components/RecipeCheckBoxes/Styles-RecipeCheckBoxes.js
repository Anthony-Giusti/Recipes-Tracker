import { makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

export default makeStyles({
  formControl: {
    display: 'flex',
    flexDirection: 'row',
  },
  checkBoxGroup: {
    // background: '#ede8ea',
    background: grey[200],
    padding: 10,
    margin: 5,
    borderRadius: 25,
  },
  checkBoxLabel: {
    textAlign: 'center',
  },
  checkBoxOptions: {
    flexDirection: 'row',
  },
});
