import { makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

export default makeStyles({
  // recipeModal: {
  //   position: 'relative',
  //   margin: 'auto',
  //   top: '20%',
  //   width: '80%',
  // },
  recipeModal: {
    position: 'absolute',
    top: '10%',
    left: '10%',
    overflow: 'scroll',
    height: '90%',
    width: '90%',
    display: 'block',
  },
});
