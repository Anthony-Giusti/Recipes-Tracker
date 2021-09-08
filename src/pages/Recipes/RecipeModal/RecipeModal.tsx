/* eslint-disable react/prop-types */
import React from 'react';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
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

import { Divider, Grid } from '@material-ui/core';
import CatergoryTags from '../../../components/RecipeTags/CategoryTags';
import DietTags from '../../../components/RecipeTags/DietTags';
import IntoleranceTags from '../../../components/RecipeTags/IntoleranceTags';

import useStyles from './Styles';
import { IconButtonWithBackgroundDefault } from '../../../Themes/Buttons/IconButtons/IconButtons';

import IRecipe from '../../../shared/interfaces/Recipe.interface';
import IIngredient from '../../../shared/interfaces/Ingredient.interface';
import IStep from '../../../shared/interfaces/Step.interface';

interface IProps {
  modalOpen: boolean;
  modalClose: () => void;
  recipe: IRecipe;
  handleCurrentRecipe: (recipe: IRecipe) => void;
  printRecipe: (a: string) => void;
}

const RecipeModal: React.FC<IProps> = ({
  modalOpen,
  modalClose,
  recipe,
  handleCurrentRecipe,
  printRecipe,
}) => {
  const classes = useStyles();

  const theme = useTheme();
  const smDevice = useMediaQuery(theme.breakpoints.up('sm'));

  const enterEditingMode = () => {
    handleCurrentRecipe(recipe);
  };

  return (
    <Modal
      ref={React.createRef()}
      // ref={React.createRef(recipe)}
      open={modalOpen}
      onClose={modalClose}
      className={classes.recipeModal}
    >
      <Paper className={classes.recipePaper}>
        <AppBar className={classes.appbar} position="fixed">
          <Toolbar className={classes.toolbar}>
            <span>
              {smDevice ? (
                <>
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
                </>
              ) : (
                <>
                  <IconButtonWithBackgroundDefault
                    className={classes.moduleNavBtn}
                    onClick={() => enterEditingMode()}
                  >
                    <EditIcon />
                  </IconButtonWithBackgroundDefault>
                  <IconButtonWithBackgroundDefault
                    className={classes.moduleNavBtn}
                    onClick={() => printRecipe('recipe-print')}
                  >
                    <PrintIcon />
                  </IconButtonWithBackgroundDefault>
                </>
              )}
            </span>
            <IconButton className={classes.exitBtn} onClick={modalClose}>
              <FullscreenExitIcon fontSize="large" />
            </IconButton>
          </Toolbar>
        </AppBar>

        <div id="recipe-print">
          <div className={classes.modalBody}>
            <Typography variant="h2" gutterBottom>
              {recipe.title}
            </Typography>

            <Typography variant="body1" paragraph>
              {recipe.details}
            </Typography>

            <div className={classes.tags}>
              <CatergoryTags catergories={recipe.categories} />
              <DietTags dietTags={recipe.dietTags} />

              {recipe.intolerances.formatted.length > 0 && (
                <span className={classes.intolerances}>
                  <Typography variant="subtitle1" className={classes.intolerancesSubtitle}>
                    Contains:{' '}
                  </Typography>

                  <IntoleranceTags intoleranceTags={recipe.intolerances} />
                </span>
              )}
            </div>

            <Grid
              container
              spacing={1}
              direction={smDevice ? 'row' : 'column'}
              className={classes.timeAndServings}
            >
              <Grid item>
                <Typography
                  variant="subtitle1"
                  className={classes.subtitle}
                >{`Total Cook Time: ${recipe.cookTime.formatted}`}</Typography>
              </Grid>
              <Grid item>
                <Divider orientation={smDevice ? 'vertical' : 'horizontal'} />
              </Grid>
              <Grid item>
                <Typography
                  variant="subtitle1"
                  className={classes.subtitle}
                >{`Servings: ${recipe.servings}`}</Typography>
              </Grid>
            </Grid>

            <>
              <Typography className={classes.secondaryTitle} variant="h4">
                Ingredients
              </Typography>
              <List>
                {recipe.ingredients.map((ingredient: IIngredient) => (
                  <ListItem divider key={ingredient.id}>
                    <ListItemText>
                      {ingredient.name} - {ingredient.quantity}{' '}
                      {ingredient.customUnitAdded ? ingredient.customUnit : ingredient.unit}{' '}
                      {ingredient.comment && `(${ingredient.comment})`}
                    </ListItemText>
                  </ListItem>
                ))}
              </List>
            </>

            <div>
              <Typography className={classes.secondaryTitle} variant="h4">
                Instructions
              </Typography>
              <List>
                {recipe.steps.map((step: IStep) => (
                  <ListItem
                    divider={step.order !== recipe.steps.length}
                    key={step.id}
                    className={classes.stepItem}
                  >
                    <div className={classes.stepOrderContainer}>
                      <Typography className={classes.stepOrder}>{step.order}</Typography>
                    </div>
                    <div className={classes.stepTextContainer}>
                      <ListItemText>{step.step}</ListItemText>
                    </div>
                  </ListItem>
                ))}
              </List>
            </div>

            {recipe.additionalNotes.length > 0 && (
              <>
                <Typography className={classes.secondaryTitle} variant="h4">
                  Additional Notes
                </Typography>

                {recipe.additionalNotes.map((note: IStep) => (
                  <ListItem
                    divider={note.order !== recipe.additionalNotes.length}
                    key={note.id}
                    className={classes.stepItem}
                  >
                    <div className={classes.stepTextContainer}>
                      <ListItemText>{note.step}</ListItemText>
                    </div>
                  </ListItem>
                ))}
              </>
            )}
          </div>
        </div>
      </Paper>
    </Modal>
  );
};

export default RecipeModal;
