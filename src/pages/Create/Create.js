/* eslint-disable react/prop-types */
import React from 'react';
import { Typography } from '@material-ui/core';

import RecipeForm from '../../components/RecipeForm/RecipeForm';

import PageContainer from '../../Themes/Pages/Pages';

export default function Create({ addRecipe }) {
  const submit = (recipe) => {
    addRecipe(recipe);
  };

  return (
    <PageContainer>
      <Typography variant="h2">Create New Recipe</Typography>
      <RecipeForm recipe={null} submit={submit} submitBtnText="Add Recipe" />
    </PageContainer>
  );
}
