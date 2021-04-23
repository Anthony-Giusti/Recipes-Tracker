/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';

import RecipeForm from '../../components/RecipeForm/RecipeForm';

const Edit = ({ currentRecipe }) => {
  const history = useHistory();

  const submit = (recipe) => {
    fetch('http://localhost:8000/recipes', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(recipe),
    });
  };

  return currentRecipe ? (
    <div>
      <div>
        <Typography variant="h2">Edit Recipe</Typography>
      </div>
      <div>
        <RecipeForm recipe={currentRecipe} submit={submit} submitBtnText="Confirm Edit" />
      </div>
    </div>
  ) : (
    'Select a recipe first in order to Edit'
  );
};

export default Edit;
