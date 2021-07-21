/* eslint-disable react/prop-types */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';

import RecipeForm from '../../components/RecipeForm/RecipeForm';

import PageContainer from '../../Themes/Pages/Pages';
import IRecipe from '../../shared/interfaces/Recipe.interface';

interface IProps {
  currentRecipe: IRecipe;
  editRecipe: (recipe: IRecipe) => void;
  api: () => void;
}

const Edit: React.FC<IProps> = ({ currentRecipe, editRecipe, api }) => {
  const submit = (recipe: IRecipe) => {
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

export default Edit;
