/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/prop-types */
import {
  AppBar,
  Button,
  Card,
  CardMedia,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Modal,
  Paper,
  Toolbar,
  Typography,
} from '@material-ui/core';

import React from 'react';

import EditIcon from '@material-ui/icons/Edit';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';

import CatergoryTags from '../../../components/RecipeTags/CategoryTags';
import DietTags from '../../../components/RecipeTags/DietTags';
import IntoleranceTags from '../../../components/RecipeTags/IntoleranceTags';

import useStyles from './Styles-RecipeModal';

const RecipeModal = ({ modalOpen, modalClose, recipe, handleCurrentRecipe }) => {
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
            <Button variant="contained" endIcon={<EditIcon />} onClick={() => enterEditingMode()}>
              Edit Recipe
            </Button>
            <IconButton className={classes.exitBtn} onClick={modalClose}>
              <FullscreenExitIcon fontSize="large" />
            </IconButton>
          </Toolbar>
        </AppBar>

        <div>
          <div>
            <img className={classes.image} src={recipe.imageURL} />
          </div>

          <div className={classes.modalBody}>
            <Typography variant="h3" gutterBottom>
              {recipe.title}
            </Typography>

            <Typography variant="body1" paragraph>
              {recipe.details}
            </Typography>

            <CatergoryTags catergories={recipe.categories} />
            <DietTags dietTags={recipe.dietTags} />

            {recipe.intolerances.length >= 1 && (
              <>
                <Typography>Contains</Typography>

                <IntoleranceTags intoleranceTags={recipe.intolerances} />
              </>
            )}

            <div>
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

export default RecipeModal;
