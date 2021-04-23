/* eslint-disable react/prop-types */
import {
  AppBar,
  Button,
  Grid,
  IconButton,
  Modal,
  Paper,
  Toolbar,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router';

import MenuIcon from '@material-ui/icons/Menu';

import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import RecipeForm from '../../../components/RecipeForm/RecipeForm';
import RecipeEdit from '../../../components/RecipeEdit/RecipeEdit';

import IngredientsSearch from '../../../components/IngredientsSearch/IngredientsSearch';

import useStyles from './Styles-RecipeModal';
import Edit from '../../Edit/Edit';

const RecipeModal = ({ modalOpen, recipe, children, handleCurrentRecipe }) => {
  const classes = useStyles();

  const history = useHistory();

  console.log(children);

  const enterEditingMode = () => {
    handleCurrentRecipe(recipe);
    // .then(() => history.push('/edit'));
  };

  return (
    <Modal ref={React.createRef(recipe)} open={modalOpen} className={classes.recipeModal}>
      <Paper className={classes.recipeModal}>
        <AppBar position="relative">
          <Toolbar>
            <Button endIcon={<EditIcon />} onClick={() => enterEditingMode()}>
              Edit Recipe
            </Button>
          </Toolbar>
        </AppBar>

        <Typography variant="h3">{recipe.title}</Typography>

        <Typography variant="body1">{recipe.detials}</Typography>
        <Grid>
          {recipe.categories.raw.map((category) => (
            <Grid item key={category}>
              {category}
            </Grid>
          ))}
        </Grid>
        {recipe.dietTags.length >= 1 && (
          <Grid>
            {recipe.dietTags.map((tag) => (
              <Grid key={tag} item>
                {tag}
              </Grid>
            ))}
          </Grid>
        )}
        <Typography>Contains</Typography>
        {recipe.intolerances.length >= 1 && (
          <Grid>
            {recipe.intolerances.map((intolerance) => (
              <Grid key={intolerance} item>
                {intolerance}
              </Grid>
            ))}
          </Grid>
        )}
        <ul>
          {recipe.ingredients.map((ingredient) => (
            <li key={ingredient.id}>
              {ingredient.name} - {ingredient.quantity} {ingredient.unit}
            </li>
          ))}
        </ul>
        <ol>
          {recipe.steps.map((step) => (
            <li key={step.id}>{step.step}</li>
          ))}
        </ol>
      </Paper>
    </Modal>
  );
};

export default RecipeModal;
