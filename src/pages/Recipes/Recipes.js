import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Masonry from 'react-masonry-css';

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';

import RecipeCard from '../../components/RecipeCard/RecipeCard.jsx';
import RecipeModal from './RecipeModal/RecipeModal';
import RecipeForm from '../../components/RecipeForm/RecipeForm';

import useStyles from './Styles-Recipes';

const Recipes = ({
  fileredRecipes,
  resetFilterTags,
  deleteRecipe,
  getIngredientObject,
  handleCheckBoxValueChange,
  handleCurrentRecipe,
  fetchRecipes,
}) => {
  const [displayedRecipe, setDisplayedRecipe] = useState();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    resetFilterTags();
    fetchRecipes();
  }, []);

  const handleDelete = async () => {
    deleteRecipe(deleteId);
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
        {fileredRecipes.map((recipe) => (
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
      {fileredRecipes.length === 0 && <Typography>No Recipes Found</Typography>}

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
      <Drawer />
    </Container>
  );
};

Recipes.propTypes = {
  fileredRecipes: PropTypes.array,
  resetFilterTags: PropTypes.func,
  deleteRecipe: PropTypes.func,
  getIngredientObject: PropTypes.func,
  handleCheckBoxValueChange: PropTypes.func,
  handleCurrentRecipe: PropTypes.func,
  fetchRecipes: PropTypes.func,
};

export default Recipes;
