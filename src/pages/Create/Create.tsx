import React from 'react';
import Typography from '@material-ui/core/Typography';

import { AxiosInstance } from 'axios';
import RecipeForm from '../../components/RecipeForm/RecipeForm';

import PageContainer from '../../Themes/Pages/Pages';
import INewRecipe from '../../shared/interfaces/NewRecipe.interface';
import IRecipeFormSubmission from '../../shared/interfaces/RecipeFormSubmission.interface';

interface IProps {
  addRecipe: (recipe: INewRecipe) => void;
  api: AxiosInstance;
}

const Create: React.FC<IProps> = ({ addRecipe, api }) => {
  const submit = (recipe: IRecipeFormSubmission): void => {
    if (!recipe.id) {
      const newRecipe: INewRecipe = Object.assign(recipe);
      addRecipe(newRecipe);
    }
  };

  return (
    <PageContainer>
      <Typography variant="h2">Create New Recipe</Typography>
      <RecipeForm recipe={null} submit={submit} submitBtnText="Add Recipe" api={api} />
    </PageContainer>
  );
};

export default Create;
