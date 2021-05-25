import React from 'react';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import EditIcon from '@material-ui/icons/Edit';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import PrintIcon from '@material-ui/icons/Print';

import CatergoryTags from '../../../components/RecipeTags/CategoryTags';
import DietTags from '../../../components/RecipeTags/DietTags';
import IntoleranceTags from '../../../components/RecipeTags/IntoleranceTags';

import useStyles from './Styles-RecipeModal';
import { intoleranceOptions } from '../../../components/RecipeCheckBoxes/_data';

const RecipeModal = ({ modalOpen, modalClose, recipe, handleCurrentRecipe, printRecipe }) => {
  const classes = useStyles();

  const enterEditingMode = () => {
    handleCurrentRecipe(recipe);
  };

  return (
    <Modal
      ref={React.createRef(recipe)}
      open={modalOpen}
      onClose={modalClose}
      className={classes.recipeModal}
    >
      <Paper className={classes.recipePaper}>
        <AppBar className={classes.appbar} position="fixed">
          <Toolbar className={classes.toolbar}>
            <span>
              <Button
                className={classes.moduleNavBtn}
                variant="contained"
                endIcon={<EditIcon />}
                onClick={() => enterEditingMode()}
              >
                Edit Recipe
              </Button>
              <Button
                className={classes.moduleNavBtn}
                variant="contained"
                endIcon={<PrintIcon />}
                onClick={() => printRecipe('recipe-print')}
              >
                Print Recipe
              </Button>
            </span>
            <IconButton className={classes.exitBtn} onClick={modalClose}>
              <FullscreenExitIcon fontSize="large" />
            </IconButton>
          </Toolbar>
        </AppBar>

        <div id="recipe-print">
          <div className={classes.modalBody}>
            <Typography variant="h3" gutterBottom>
              {recipe.title}
            </Typography>

            <Typography variant="body1" paragraph>
              {recipe.details}
            </Typography>

            <CatergoryTags catergories={recipe.categories} />
            <DietTags dietTags={recipe.dietTags} />

            {recipe.intolerances.formatted.length > 0 && (
              <span className={classes.intolerances}>
                <Typography className={classes.intolerancesSubtitle}>Contains: </Typography>

                <IntoleranceTags intoleranceTags={recipe.intolerances} />
              </span>
            )}

            <div className={classes.recipeBody}>
              <Typography variant="h4">Ingredients</Typography>
              <List>
                {recipe.ingredients.map((ingredient) => (
                  <ListItem divider key={ingredient.id}>
                    <ListItemText>
                      {ingredient.name} - {ingredient.quantity}{' '}
                      {ingredient.customUnitAdded ? ingredient.customUnit : ingredient.unit}{' '}
                      {ingredient.comment && `(${ingredient.comment})`}
                    </ListItemText>
                  </ListItem>
                ))}
              </List>
            </div>

            <div>
              <Typography variant="h4">Instructions</Typography>
              <List>
                {recipe.steps.map((step) => (
                  <ListItem divider key={step.id} className={classes.stepItem}>
                    <div className={classes.stepOrderContainer}>
                      <Typography className={classes.stepOrder}>{step.order}</Typography>
                    </div>
                    <div className={classes.stepTextContainer}>
                      <ListItemText className={classes.stepText}>{step.step}</ListItemText>
                    </div>
                  </ListItem>
                ))}
              </List>
            </div>
          </div>
        </div>
      </Paper>
    </Modal>
  );
};

RecipeModal.propTypes = {
  modalOpen: PropTypes.bool,
  modalClose: PropTypes.func,
  recipe: PropTypes.object,
  handleCurrentRecipe: PropTypes.func,
  printRecipe: PropTypes.func,
};

export default RecipeModal;