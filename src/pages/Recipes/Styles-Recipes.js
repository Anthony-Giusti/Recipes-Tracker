import { makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

export default makeStyles({
  container: {
    maxWidth: 1400,
    margin: ' 0 auto',
    paddingBottom: '1em',
  },
  searchingSpinner: {
    position: 'fixed',
    height: '100%',
    width: '100%',
    background: 'rgba(100, 100, 100, 0.3)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '200',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  filterTags: {
    marginTop: '1em',
    marginBottom: '2em',
  },
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
  loadMoreBtnContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  recipeModal: {
    position: 'relative',
    margin: 'auto',
    top: '20%',
    width: '80%',
  },
});
