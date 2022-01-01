import { makeStyles } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';

export default makeStyles((theme) => ({
  section: {
    margin: '1em 0',
    padding: '1em',
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
  secondaryTitle: {
    background: theme.palette.primary.main,
    color: theme.palette.getContrastText(theme.palette.primary.main),
    padding: '5px 20px',
    borderRadius: '1em',
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
      background: theme.palette.error.main,
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
  addImageURLBtn: {
    borderRadius: '0',
  },
}));
