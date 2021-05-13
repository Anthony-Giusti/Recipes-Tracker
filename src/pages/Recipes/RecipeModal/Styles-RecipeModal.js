import { makeStyles } from '@material-ui/core';
import useTheme from '@material-ui/core/styles/useTheme';
import { blue, green, grey } from '@material-ui/core/colors';

const theme = useTheme;

export default makeStyles((theme) => ({
  appbar: {
    width: '90%',
    left: '4.5vw',
    top: '5%',
    height: '4.25em',
    borderRadius: '0.5em 0.5em 0 0',
  },
  toolbar: {
    justifyContent: 'space-between',
  },
  exitBtn: {
    color: theme.palette.getContrastText(theme.palette.primary.main),
  },
  recipeModal: {
    height: '90%',
    width: '90%',
  },
  recipePaper: {
    position: 'absolute',
    top: '15%',
    left: '5%',
    height: '90%',
    width: '100%',
    overflow: 'scroll',
    borderRadius: 0,
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
  stepOrderContainer: {
    background: blue[200],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '100%',
    width: '2em',
    height: '2em',
  },
  stepOrder: {
    fontSize: '1.1em',
    width: ' 2em',
    textAlign: 'center',
  },
  stepTextContainer: {
    margin: '0 2em',
  },
  stepText: {},
}));
