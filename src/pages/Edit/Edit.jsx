import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';

import RecipeForm from '../../components/RecipeForm/RecipeForm';

import PageContainer from '../../Themes/Pages/Pages';

const Edit = ({ currentRecipe, editRecipe, api }) => {
  const submit = (recipe) => {
    editRecipe(recipe);
  };

  return currentRecipe ? (
    <PageContainer>
      <Typography variant="h2">Edit Recipe</Typography>

      <RecipeForm recipe={currentRecipe} submit={submit} submitBtnText="Confirm Edit" api={api} />
    </PageContainer>
  ) : (
    'Select a recipe first in order to Edit'
  );
};

Edit.propTypes = {
  currentRecipe: PropTypes.object,
  editRecipe: PropTypes.func,
  api: PropTypes.func,
};

export default Edit;
