import React from 'react';

import Typography from '@material-ui/core/Typography';

import { AxiosInstance } from 'axios';
import RecipeForm from '../../components/RecipeForm/RecipeForm';

import PageContainer from '../../Themes/Pages/Pages';
import IRecipe from '../../shared/interfaces/Recipe.interface';
import IRecipeFormSubmission from '../../shared/interfaces/RecipeFormSubmission.interface';

interface IProps {
  currentRecipe: IRecipe | null;
  editRecipe: (recipe: IRecipe) => void;
  api: AxiosInstance;
}

const Edit: React.FC<IProps> = ({ currentRecipe, editRecipe, api }) => {
  const submit = (recipe: IRecipeFormSubmission): void => {
    if (recipe.id) {
      const editedRecipe: IRecipe = Object.assign(recipe);
      editRecipe(editedRecipe);
    }
  };

  return currentRecipe ? (
    <PageContainer>
      <Typography variant="h2">Edit Recipe</Typography>

      <RecipeForm recipe={currentRecipe} submit={submit} submitBtnText="Confirm Edit" api={api} />
    </PageContainer>
  ) : (
    <PageContainer>
      <Typography>'Select a recipe first in order to Edit'</Typography>
    </PageContainer>
  );
};

export default Edit;
