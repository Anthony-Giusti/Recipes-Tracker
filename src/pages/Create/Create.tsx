/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-named-as-default */
import React from 'react';
import Typography from '@material-ui/core/Typography';

import { AxiosInstance } from 'axios';
import RecipeForm from '../../components/RecipeForm/RecipeForm';

import PageContainer from '../../Themes/Pages/Pages';
import IRecipe from '../../shared/interfaces/Recipe.interface';

interface IProps {
  addRecipe: (recipe: IRecipe) => void;
  api: AxiosInstance;
}

const Create: React.FC<IProps> = ({ addRecipe, api }) => {
  const submit = (recipe: IRecipe) => {
    addRecipe(recipe);
  };

  return (
    <PageContainer>
      <Typography variant="h2">Create New Recipe</Typography>
      <RecipeForm recipe={null} submit={submit} submitBtnText="Add Recipe" api={api} />
    </PageContainer>
  );
};

export default Create;
