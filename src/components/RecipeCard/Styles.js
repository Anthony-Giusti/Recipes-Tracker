import { makeStyles } from '@material-ui/core';
import { blue, cyan, green, indigo, red, yellow } from '@material-ui/core/colors';

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
  avatar: {
    backgroundColor: (note) => {
      if (note.category === 'work') {
        return yellow[700];
      }
      if (note.category === 'beep') {
        return green[700];
      }
      if (note.category === 'reminders') {
        return blue[700];
      }
      if (note.category === 'todos') {
        return red[700];
      }
    },
  },
});
