/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable react/prop-types */

import React, { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import PageContainer from '../../Themes/Pages/Pages';

import RecipeCard from '../../components/RecipeCard/RecipeCard.js';
import RecipeModal from './RecipeModal/RecipeModal';
import RecipeForm from '../../components/RecipeForm/RecipeForm';
import FilterTagsDisplay from '../../components/FilterTagsDisplay/FilterTagsDisplay';

import useStyles from './Styles';
import IRecipe from '../../shared/interfaces/Recipe.interface';
import IRecipeTags from '../../shared/interfaces/RecipeTags.interface';

interface IProps {
  visibleRecipes: IRecipe[];
  resetFilterTags: () => void;
  deleteRecipe: (recipeID: string) => void;
  getIngredientObject: () => void;
  handleCheckBoxValueChange: () => void;
  handleCurrentRecipe: () => void;
  fetchRecipes: () => void;
  isFetchingRecipes: boolean;
  filteredTags: IRecipeTags;
  filterTags: IRecipeTags;
  formatName: IRecipeTags;
  printRecipe: () => void;
  showMoreRecipes: (recipesToDisplay: number) => void;
  maxRecipes: number;
  emptySearch: () => void;
}

const Recipes: React.FC<IProps> = ({
  visibleRecipes,
  resetFilterTags,
  deleteRecipe,
  getIngredientObject,
  handleCheckBoxValueChange,
  handleCurrentRecipe,
  fetchRecipes,
  isFetchingRecipes,
  filteredTags,
  filterTags,
  formatName,
  printRecipe,
  showMoreRecipes,
  maxRecipes,
  emptySearch,
}) => {
  const [displayedRecipe, setDisplayedRecipe] = useState<IRecipe>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    resetFilterTags();
    emptySearch();
    fetchRecipes();
  }, []);

  const handleDelete = () => {
    if (typeof deleteId === 'string') {
      deleteRecipe(deleteId);
      setDeleteDialogOpen(false);
    }
  };

  const handleDeleteOpen = (id: string) => {
    setDeleteDialogOpen(true);
    setDeleteId(id);
  };

  const handleDeleteClose = () => {
    setDeleteDialogOpen(false);
    setDeleteId(null);
  };

  const handleModalOpen = (recipeId: string) => {
    setDisplayedRecipe(visibleRecipes.find((recipe) => recipe.id === recipeId));
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleMoreRecipes = () => {
    showMoreRecipes(maxRecipes + 9);
  };

  const breakPoints = {
    default: 3,
    1100: 2,
    800: 1,
  };

  return (
    <PageContainer className={classes.container}>
      <FilterTagsDisplay
        className={classes.filterTags}
        // formatName={formatName}
        filterTags={filterTags}
        filteredTags={filteredTags}
        resetFilterTags={resetFilterTags}
      />
      {isFetchingRecipes && (
        <div className={classes.searchingSpinner}>
          <CircularProgress color="primary" size="5em" />
        </div>
      )}

      <Masonry
        breakpointCols={breakPoints}
        className={classes.myMasonryGrid}
        columnClassName={classes.myMasonryGridColumn}
      >
        {visibleRecipes &&
          visibleRecipes.slice(0, maxRecipes).map((recipe) => (
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
      {maxRecipes < visibleRecipes.length && (
        <div className={classes.loadMoreBtnContainer}>
          <Button variant="contained" color="primary" onClick={handleMoreRecipes}>
            Load More
          </Button>
        </div>
      )}

      {visibleRecipes.length === 0 && !isFetchingRecipes && (
        <Typography>No Recipes Found</Typography>
      )}

      {modalOpen && (
        <RecipeModal
          getIngredientObject={getIngredientObject}
          modalOpen={modalOpen}
          modalClose={handleModalClose}
          recipe={displayedRecipe}
          handleCheckBoxValueChange={handleCheckBoxValueChange}
          handleCurrentRecipe={handleCurrentRecipe}
          printRecipe={printRecipe}
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
    </PageContainer>
  );
};

export default Recipes;
