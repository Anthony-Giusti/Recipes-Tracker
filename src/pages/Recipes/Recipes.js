/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  makeStyles,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Masonry from 'react-masonry-css';
import RecipeCard from '../../components/RecipeCard/RecipeCard.jsx';
import RecipeModal from './RecipeModal/RecipeModal';
import RecipeForm from '../../components/RecipeForm/RecipeForm';

import useStyles from './Styles-Recipes';

const Recipes = ({ getIngredientObject, handleCheckBoxValueChange, handleCurrentRecipe }) => {
  const [recipes, setRecipes] = useState([]);
  const [displayedRecipe, setDisplayedRecipe] = useState();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    fetch('http://localhost:8000/recipes').then((response) => {
      response.json().then((data) => setRecipes(data));
    });
  }, []);

  const handleDelete = async () => {
    await fetch(`http://localhost:8000/recipes/${deleteId}`, {
      method: 'DELETE',
    });
    const newRecipes = recipes.filter((recipe) => recipe.id !== deleteId);
    setRecipes(newRecipes);
    setDeleteDialogOpen(false);
  };

  const handleDeleteOpen = (id) => {
    setDeleteDialogOpen(true);
    setDeleteId(id);
  };

  const handleDeleteClose = () => {
    setDeleteDialogOpen(false);
    setDeleteId(null);
  };

  const handleModalOpen = (recipe) => {
    setDisplayedRecipe(recipe);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const breakPoints = {
    default: 3,
    1100: 2,
    800: 1,
  };

  return (
    <Container>
      <Masonry
        breakpointCols={breakPoints}
        className={classes.myMasonryGrid}
        columnClassName={classes.myMasonryGridColumn}
      >
        {recipes.map((recipe) => (
          <div className={classes.masonryGridItem} key={recipe.id}>
            <RecipeCard
              handleDeleteOpen={handleDeleteOpen}
              handleModalOpen={handleModalOpen}
              recipe={recipe}
              handleDelete={handleDelete}
            />
          </div>
        ))}
      </Masonry>

      {modalOpen && (
        <RecipeModal
          getIngredientObject={getIngredientObject}
          modalOpen={modalOpen}
          modalClose={handleModalClose}
          recipe={displayedRecipe}
          handleCheckBoxValueChange={handleCheckBoxValueChange}
          handleCurrentRecipe={handleCurrentRecipe}
        >
          <RecipeForm />
        </RecipeModal>
      )}

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteClose}
        aria-labelledby="delete-dialog"
        aria-describedby="delete-recipe"
      >
        <DialogTitle id="alert-dialog-title">Permanently delete this recipe?</DialogTitle>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="primary">
            No
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Recipes;
