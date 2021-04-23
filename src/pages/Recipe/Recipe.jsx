/* eslint-disable react/prop-types */
import React from 'react';
import { BrowserRoute as Router } from 'react-router-dom';

const Recipe = ({ match, recipes }) => {
  const recipe = recipes.find((recipe) => parseInt(match.params.recipeID === recipe.id));

  return (
    <>
      {match.isExact && (
        <>
          <h1>{recipe.title}</h1>
        </>
      )}
    </>
  );
};
export default Recipe;
