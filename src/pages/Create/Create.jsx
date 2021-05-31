import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

import RecipeForm from '../../components/RecipeForm/RecipeForm';

import PageContainer from '../../Themes/Pages/Pages';

const Create = ({ addRecipe }) => {
  const submit = (recipe) => {
    addRecipe(recipe);
  };

  return (
    <PageContainer>
      <Typography variant="h2">Create New Recipe</Typography>
      <RecipeForm recipe={null} submit={submit} submitBtnText="Add Recipe" />
    </PageContainer>
  );
};

Create.propTypes = {
  addRecipe: PropTypes.func,
};

export default Create;
