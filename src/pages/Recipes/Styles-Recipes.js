import { makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

export default makeStyles({
  myMasonryGrid: {
    display: 'flex',
    marginLeft: 0,
    width: 'auto',
  },
  myMasonryGridColumn: {
    paddingLeft: 10,
    backgroundClip: 'padding-box',
  },
  masonryGridItem: {
    backgroundColor: grey,
    marginBottom: 30,
  },
  recipeModal: {
    position: 'relative',
    margin: 'auto',
    top: '20%',
    width: '80%',
  },
});
