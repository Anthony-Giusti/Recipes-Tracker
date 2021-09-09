/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/prop-types */

import React, { useState } from 'react';
import PropTypes from 'prop-types';

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
import Ingredient from './Ingredient/Ingredient';

import useStyles from './Styles';

import IIngredient from '../../../shared/interfaces/Ingredient.interface';

interface IProps {
  ingredientsError: boolean;
  ingredients: any;
  handleIngredientAdd: (a: any, b: any) => void;
  handleIngredientRemove: (ingredient: IIngredient) => void;
  changeIngredientValue: (ingredientID: string, property: string, value: string) => void;
  handleCustomUnit: (ingredientID: string, state: any, value: string) => void;
  api: any;
}

const IngredientsSearch: React.FC<IProps> = ({
  ingredientsError,
  ingredients,
  handleIngredientAdd,
  handleIngredientRemove,
  changeIngredientValue,
  handleCustomUnit,
  api,
}) => {
  const classes = useStyles();
  const [ingredientsSearch, setIngredientsSearch] = useState([]);
  const [resultsFound, setResultsFound] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [emptyQuery, setEmptyQuery] = useState(true);

  const searchIngredients = async (query: string) => {
    if (!query) {
      setEmptyQuery(true);
    }
    setIsSearching(true);
    setEmptyQuery(false);

    await api.get(`/getIngredients?query=${query}`).then((response: any) => {
      setIngredientsSearch(response.data);

      if (response.data.length === 0) {
        setResultsFound(false);
      } else {
        setResultsFound(true);
      }
    });

    setIsSearching(false);
  };

  const handleAddingredient = (ingredient: any, ingredients: any) => {
    handleIngredientAdd(ingredient, ingredients);
  };

  return (
    <>
      <FormControl error={ingredientsError}>
        <div className={classes.searchBar}>
          <TextField
            // className={classes.ingredientSearchField}
            label="Seach Ingredients"
            onChange={(e) => searchIngredients(e.target.value)}
          />
          {isSearching && (
            <span className={classes.progress}>
              <CircularProgress size={25} />
            </span>
          )}
        </div>

        {!resultsFound && !emptyQuery && <Typography>No Results Found</Typography>}

        {ingredientsError && <FormHelperText>You must have at least one ingredient</FormHelperText>}
        <Container className={classes.searchResults}>
          {ingredientsSearch.map((ingredient: any) =>
            ingredients.every((element: any) => element.id !== ingredient.id) ? (
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
                className={`${classes.searchResultsItem}`}
                // className={`${classes.searchResultsItem} ${classes.ingredientSearchBtn}`}
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
      <Grid /* className={classes.ingredients} */ container spacing={2}>
        {ingredients.map((ingredient: any) => (
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

export default IngredientsSearch;
