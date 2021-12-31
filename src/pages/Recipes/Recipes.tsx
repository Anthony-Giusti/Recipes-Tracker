import React, { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';

import CloseIcon from '@material-ui/icons/Close';
import { setTimeout } from 'timers';
import PageContainer from '../../Themes/Pages/Pages';

import RecipeCard from '../../components/RecipeCard/RecipeCard';
import RecipeModal from './RecipeModal/RecipeModal';
import FilterTagsDisplay from '../../components/FilterTagsDisplay/FilterTagsDisplay';

import useStyles from './Styles';
import IRecipe from '../../shared/interfaces/Recipe.interface';
import IFilteredTags from '../../shared/interfaces/FilteredTags.interface';

interface IProps {
  visibleRecipes: IRecipe[];
  resetFilterTags: () => void;
  deleteRecipe: (recipeID: string) => void;
  handleCurrentRecipe: (recipe: IRecipe) => void;
  fetchRecipes: () => void;
  isFetchingRecipes: boolean;
  filteredTags: IFilteredTags;
  filterTags: (value: string, tagGroup: 'intolerances' | 'dietTags' | 'categories') => void;
  printRecipe: () => void;
  showMoreRecipes: (recipesToDisplay: number) => void;
  maxRecipes: number;
  emptySearch: () => void;
}

const Recipes: React.FC<IProps> = ({
  visibleRecipes,
  resetFilterTags,
  deleteRecipe,
  handleCurrentRecipe,
  fetchRecipes,
  isFetchingRecipes,
  filteredTags,
  filterTags,
  printRecipe,
  showMoreRecipes,
  maxRecipes,
  emptySearch,
}) => {
  const [displayedRecipe, setDisplayedRecipe] = useState<IRecipe>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [bootUpWarning, setBootUpWarning] = useState(false);
  const classes = useStyles();

  const checkIfStillBootingUp = () => {
    if (isFetchingRecipes) {
      setBootUpWarning(true);
    } else {
      setBootUpWarning(false);
    }
  };

  useEffect(() => {
    resetFilterTags();
    emptySearch();
    fetchRecipes();

    setTimeout(() => {
      checkIfStillBootingUp();
    }, 1500);
  }, []);

  useEffect(() => {
    checkIfStillBootingUp();
  }, [isFetchingRecipes]);

  const handleDelete = () => {
    if (typeof deleteId === 'string') {
      deleteRecipe(deleteId);
      setDeleteDialogOpen(false);
    }
  };

  const handleDeleteOpen = (id: string): void => {
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
        // className={classes.filterTags}
        filterTags={filterTags}
        filteredTags={filteredTags}
        resetFilterTags={resetFilterTags}
      />
      {isFetchingRecipes && (
        <div className={classes.searchingSpinner}>
          <CircularProgress color="primary" size="5em" />
          <Snackbar
            // autoHideDuration={8000}
            open={bootUpWarning}
            onClose={() => setBootUpWarning(false)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            message="Booting up Heroku server after period of inactivity..."
            action={
              <>
                <IconButton
                  size="small"
                  aria-label="close"
                  color="inherit"
                  onClick={() => setBootUpWarning(false)}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </>
            }
          />
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

      {modalOpen && displayedRecipe && (
        <RecipeModal
          modalOpen={modalOpen}
          modalClose={handleModalClose}
          recipe={displayedRecipe}
          handleCurrentRecipe={handleCurrentRecipe}
          printRecipe={printRecipe}
        />
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
