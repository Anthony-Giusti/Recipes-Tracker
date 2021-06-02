import { makeStyles } from '@material-ui/core';
import useTheme from '@material-ui/core/styles/useTheme';
import { blue, cyan, green, grey, lightBlue } from '@material-ui/core/colors';

const theme = useTheme;

export default makeStyles((theme) => ({
  appbar: {
    width: '90%',
    maxWidth: 1000,
    left: '50%',
    transform: 'translate(-50%, -5%)',
    top: '5.2%',
    height: '4.25em',
    borderRadius: '0.5em 0.5em 0 0',
  },
  toolbar: {
    justifyContent: 'space-between',
  },
  secondaryTitle: {
    background: theme.palette.primary.main,
    color: theme.palette.getContrastText(theme.palette.primary.main),
    margin: '0 -10px',
    padding: '5px 20px',
    borderRadius: '1em',
  },
  moduleNavBtn: {
    margin: '0.5em',
  },
  tags: {
    padding: '0.5em 0',
  },
  exitBtn: {
    color: theme.palette.getContrastText(theme.palette.primary.main),
  },
  recipeModal: {
    height: '90%',
    width: '90%',
    margin: '0 auto',
    maxWidth: 1000,
  },
  recipeBody: {},
  recipePaper: {
    position: 'absolute',
    top: '15%',
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
  subtitle: {
    fontSize: '1.2em',
  },
  timeAndServings: {
    // display: 'flex',
  },
  tagText: {
    padding: '0.4em',
  },
  intolerancesSubtitle: { marginRight: '0.5em' },
  stepItem: {
    display: 'flex',
    minHeight: '5em',
  },
  intolerances: {
    display: 'flex',
    alignItems: 'center',
    margin: 4,
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
