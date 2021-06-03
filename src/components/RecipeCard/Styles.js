import { makeStyles } from '@material-ui/core';
import { blue, cyan, green, red, yellow } from '@material-ui/core/colors';

export default makeStyles({
  image: {
    width: '100%',
    height: '15em',
    objectFit: 'cover',
  },
  catergoryTag: {
    backgroundColor: cyan[100],
    borderRadius: '1em',
  },
  dietTag: {
    backgroundColor: green[100],
    borderRadius: '1em',
  },
  intolerancesTitle: {
    display: 'flex',
    alignItems: 'center',
  },
  intoleranceTag: {
    backgroundColor: red[100],
    borderRadius: '1em',
  },
  tagText: {
    padding: '0.4em',
  },
  details: {
    margin: '1em 0',
  },
  intolerances: {
    margin: '0',
  },
});
