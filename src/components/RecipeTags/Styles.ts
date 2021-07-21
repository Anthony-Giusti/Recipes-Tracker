import { makeStyles } from '@material-ui/core';
import { cyan, green, red } from '@material-ui/core/colors';

export default makeStyles({
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
});
