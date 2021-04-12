import { makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

export default makeStyles({
  btn: {
    fontSize: 60,
    // backgroundColor: 'violet',
    '&:hover': {
      backgroundColor: 'red',
    },
  },
  title: {
    textDecoration: 'underline',
    marginBottom: '20',
  },
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block',
  },
  ingredientSearchField: {
    maxWidth: 200,
  },
  searchResults: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 0,
  },
  searchResultsItem: {
    display: 'block',
  },
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
  ingredients: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  newStep: {
    display: 'flex',
  },
  newStepField: {
    flexGrow: '1',
  },
});
