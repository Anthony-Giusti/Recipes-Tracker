import { makeStyles } from '@material-ui/core';
import { blue, green, grey } from '@material-ui/core/colors';

export default makeStyles({
  recipeModal: {
    height: '90%',
    width: '90%',
  },
  recipePaper: {
    position: 'absolute',
    top: '5%',
    left: '5%',
    height: '100%',
    width: '100%',
    // display: 'block',
    overflow: 'scroll',
  },
  modalBody: {
    padding: '1em',
  },
  image: {
    width: '100%',
    maxHeight: '15em',
    objectFit: 'cover',
  },
  tagText: {
    padding: '0.4em',
  },
  dietTag: {
    backgroundColor: green[100],
    borderRadius: '1em',
  },
  stepItem: {
    display: 'flex',
    minHeight: '5em',
  },
  stepOrderContainer: {},
  stepOrder: {
    background: blue[200],
    textAlign: 'center',
    borderRadius: '1em',
    fontSize: '1.1em',
    width: '2em',
    height: '2em',
  },
  stepTextContainer: {
    margin: '0 2em',
  },
  stepText: {},
});
