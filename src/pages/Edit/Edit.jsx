import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

import Typography from '@material-ui/core/Typography';

import RecipeForm from '../../components/RecipeForm/RecipeForm';

import PageContainer from '../../Themes/Pages/Pages';

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
    <PageContainer>
      <Typography variant="h2">Edit Recipe</Typography>

      <RecipeForm recipe={currentRecipe} submit={submit} submitBtnText="Confirm Edit" />
    </PageContainer>
  ) : (
    'Select a recipe first in order to Edit'
  );
};

Edit.propTypes = {
  currentRecipe: PropTypes.object,
};

export default Edit;
