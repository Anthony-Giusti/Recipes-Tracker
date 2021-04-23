import { makeStyles } from '@material-ui/core';
import { blue, red } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  card: {
    marginTop: 20,
    marginBottom: 20,
    // minWidth: '45%',
  },
  x: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  options: {
    // marginTop: 20,
    // display: 'flex',
    // flexDirection: 'row',
  },
  option: {
    marginTop: 10,
    marginBottom: 10,
    '&:focus': {
      borderColor: red,
    },
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flexBasis: '30%',
    padding: 10,
  },
  unit: {
    flexBasis: '30%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  quantity: {
    flexBasis: '15%',
  },
  delete: {
    width: 10,
    margin: 0,
  },

  icon: {
    margin: 0,
    background: red,
  },
  comment: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  commentTextField: {
    flexGrow: 1,
  },
}));
