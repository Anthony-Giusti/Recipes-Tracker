import { makeStyles } from '@material-ui/core';
import { grey, red } from '@material-ui/core/colors';
import Theme from '../../Themes/Theme';

export default makeStyles((theme) => ({
  title: {
    textDecoration: 'underline',
    marginBottom: '20',
  },
  section: {
    margin: '1em 0',
    padding: '1em',
  },
  sectionTitle: { fontSize: '2.25em' },
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
  removeImageURLbtn: {
    borderRadius: '0',
    '&:hover': {
      color: 'white',
      background: Theme.palette.error.main,
    },
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
  submitBtn: {},
}));
