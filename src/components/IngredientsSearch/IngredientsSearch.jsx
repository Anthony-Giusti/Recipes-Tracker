import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Ingredient from '../Ingredient/Ingredient';

import useStyles from './Styles-IngredientsSearch';

const IngredientsSearch = ({
  ingredientsError,
  ingredients,
  handleIngredientAdd,
  handleIngredientRemove,
  changeIngredientValue,
  handleCustomUnit,
}) => {
  const classes = useStyles();
  const [ingredientsSearch, setIngredientsSearch] = useState([]);
  const [resultsFound, setResultsFound] = useState(null);

  const key = process.env.REACT_APP_SPOONACULAR_KEY;

  const searchIngredients = (query) => {
    if (query.length < 3) {
      return;
    }

    // setIsSearching(true);

    // axios
    //   .get(`/getIngredients?query=${query}`)
    //   .then((response) => {
    //     setIngredientsSearch(response.data);
    //     if (response.length === 0) {
    //       setResultsFound(false);
    //     } else {
    //       setResultsFound(true);
    //     }
    //   })
    //   .then(console.log(isSearching))
    //   .then(setIsSearching(false));

    fetch(
      `https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=${key}&query=${query}&number=10&metaInformation=true`
    )
      .then((response) => response.json())
      .then((data) => {
        setIngredientsSearch(data);
        if (data.length === 0) {
          setResultsFound(false);
        } else {
          setResultsFound(true);
        }
      });
  };

  const handleAddingredient = (ingredient) => {
    handleIngredientAdd(ingredient, ingredients);
  };

  return (
    <>
      <FormControl error={ingredientsError}>
        <TextField
          className={classes.ingredientSearchField}
          label="Seach Ingredients"
          onChange={(e) => searchIngredients(e.target.value)}
        />
        {/* {isSearching && <CircularProgress />} */}
        {!resultsFound && <Typography>No Results Found</Typography>}
        {ingredientsError && <FormHelperText>You must have at least one ingredient</FormHelperText>}
        <Container className={classes.searchResults}>
          {ingredientsSearch.map((ingredient) =>
            ingredients.every((element) => element.id !== ingredient.id) ? (
              <Button
                key={ingredient.name}
                variant="contained"
                className={classes.searchResultsItem}
                onClick={() => handleAddingredient(ingredient, ingredients)}
                endIcon={<AddIcon />}
              >
                {ingredient.name}
              </Button>
            ) : (
              <Button
                key={ingredient.name}
                variant="contained"
                color="primary"
                className={`${classes.searchResultsItem} ${classes.ingredientSearchBtn}`}
                onClick={() => handleIngredientRemove(ingredient)}
                endIcon={<RemoveIcon />}
              >
                {ingredient.name}
              </Button>
            )
          )}
        </Container>
      </FormControl>

      {/* INGREDIENTS WIDGETS */}
      <Grid className={classes.ingredients} container spacing={2}>
        {ingredients.map((ingredient) => (
          <Grid item xs={12} md={6} key={ingredient.id}>
            <Ingredient
              handleCustomUnit={handleCustomUnit}
              ingredient={ingredient}
              removeIngredient={handleIngredientRemove}
              changeIngredientValue={changeIngredientValue}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

IngredientsSearch.propTypes = {
  ingredientsError: PropTypes.bool,
  ingredients: PropTypes.array,
  handleIngredientAdd: PropTypes.func,
  handleIngredientRemove: PropTypes.func,
  changeIngredientValue: PropTypes.func,
  handleCustomUnit: PropTypes.func,
};

export default IngredientsSearch;
