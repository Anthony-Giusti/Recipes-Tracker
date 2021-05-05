import React from 'react';
import { Typography } from '@material-ui/core';

import RecipeForm from '../../components/RecipeForm/RecipeForm';

export default function Create() {
  const submit = (recipe) => {
    fetch('http://localhost:8000/recipes', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(recipe),
    });
  };

  return (
    <div>
      <Typography variant="h2">Create New Recipe</Typography>
      <RecipeForm recipe={null} submit={submit} submitBtnText="Add Recipe" />
    </div>
  );
}
