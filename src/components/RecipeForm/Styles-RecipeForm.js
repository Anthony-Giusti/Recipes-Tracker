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
  yieldCookTimeContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  yieldCookTime: {
    display: 'flex',
    marginRight: '1em',
  },
  yieldCookTimeTitle: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '1em',
  },

  ingredientSearchField: {
    maxWidth: 200,
  },

  searchResultsItem: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '0.3em',
  },
  ingredientSearchBtn: {
    '&:hover': {
      backgroundColor: 'red',
    },
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
  URLField: {
    // display: 'flex',
  },
  addImageURLBtn: {
    borderRadius: '0',
  },
  ingredients: {
    marginBottom: '1em',
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
});
