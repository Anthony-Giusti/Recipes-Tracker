/* eslint-disable react/prop-types */
import React from 'react';
import { Typography } from '@material-ui/core';

import RecipeForm from '../../components/RecipeForm/RecipeForm';

export default function Create({ addRecipe }) {
  // const submit = (recipe) => {
  //   fetch('http://localhost:8000/recipes', {
  //     method: 'POST',
  //     headers: { 'Content-type': 'application/json' },
  //     body: JSON.stringify(recipe),
  //   });recipe-app-313315
  // };
  const submit = (recipe) => {
    addRecipe(recipe);
  };

  return (
    <div>
      <Typography variant="h2">Create New Recipe</Typography>
      <RecipeForm recipe={null} submit={submit} submitBtnText="Add Recipe" />
    </div>
  );
}
