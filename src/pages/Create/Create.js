import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  Container,
  Card,
  makeStyles,
  TextField,
  Paper,
  FormControlLabel,
  FormLabel,
  FormControl,
  Checkbox,
  FormGroup,
  responsiveFontSizes,
  FormHelperText,
  Grid,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useHistory } from 'react-router';
import { Block } from '@material-ui/icons';

import { green } from '@material-ui/core/colors';
import useStyles from './Styles-Create';

import Ingredient from '../../components/Ingredient/Ingredient';
import Step from './Step/Step';

export default function Create() {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [categories, setCategories] = useState([]);
  const [dietTags, setDietTags] = useState([]);
  const [intolerances, setIntolerances] = useState([]);
  const [ingredientsSearch, setIngredientsSearch] = useState([]);
  const [ingredientSeachIntolerances, setIngredientSeachIntolerances] = useState([]);
  const [ingredientsWidgetsData, setIngredientsWidgetsData] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [ingredientComments, setIngredientComments] = useState([]);
  const [steps, setSteps] = useState([]);
  const [stepId, setStepId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [ingredientsError, setIngredientsError] = useState(false);
  const [stepsError, setStepsError] = useState(false);
  const history = useHistory();
  const classes = useStyles();

  const key = process.env.REACT_APP_SPOONACULAR_KEY;
  let newStepField;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitleError(false);
    setDetailsError(false);
    setCategoryError(false);
    setIngredientsError(false);
    setStepsError(false);

    if (title === '') setTitleError(true);
    if (details === '') setDetailsError(true);
    if (categories.length === 0) setCategoryError(true);
    if (ingredients.length === 0) setIngredientsError(true);
    if (steps.length === 0) setStepsError(true);

    if (title && details && categories.length > 0 && ingredients.length > 0 && steps.length > 0) {
      fetch('http://localhost:8000/recipes', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          title,
          details,
          imageURL,
          categories,
          dietTags,
          intolerances,
          ingredients,
          steps,
        }),
      });
      // .then(() => history.push('/'));
    }
  };

  const handleCategoryChange = (newCategory) => {
    if (categories.includes(newCategory)) {
      const newCatagories = categories.filter((category) => category !== newCategory);
      setCategories(newCatagories);
    } else {
      setCategories((prev) => [...prev, newCategory]);
    }
  };

  const handleDietTagChange = (newTag) => {
    if (dietTags.includes(newTag)) {
      const newDietTags = dietTags.filter((tag) => tag !== newTag);
      setDietTags(newDietTags);
    } else {
      setDietTags((prev) => [...prev, newTag]);
    }
  };

  const handleIntolerancesChange = (newIntolerance) => {
    if (intolerances.includes(newIntolerance)) {
      const newIntolerances = intolerances.filter((intolerance) => intolerance !== newIntolerance);
      setIntolerances(newIntolerances);
    } else {
      setIntolerances((prev) => [...prev, newIntolerance]);
    }
  };

  const searchIngredients = (query) => {
    if (query.length < 3) {
      return;
    }
    fetch(
      `https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=${key}&query=${query}&number=10&intolerances=${ingredientSeachIntolerances.toString()}&metaInformation=true`
    )
      .then((response) => response.json())
      .then((data) => {
        setIngredientsSearch(data);
      });
  };

  const handleIntolerances = (value) => {
    if (ingredientSeachIntolerances.includes(value)) {
      const newIntolerances = ingredientSeachIntolerances.filter((item) => item !== value);
      setIngredientSeachIntolerances(newIntolerances);
    } else {
      setIngredientSeachIntolerances((prev) => [...prev, value]);
    }
  };

  const formatName = (name) => {
    const words = name.split(' ');
    if (name.length > 1) {
      for (let i = 0; i < words.length; i += 1) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
      }
      return words.join(' ');
    }
    return words;
  };

  const formatUnits = (units) => {
    const formattedUnits = [];
    units.forEach((unit) => {
      if (unit.length < 3) {
        formattedUnits.push(unit.toUpperCase());
      } else {
        formattedUnits.push(formatName(unit));
      }
    });
    return formattedUnits;
  };

  const changeIngredientValue = (ingredientID, property, value) => {
    const alteredIngredient = ingredients.find((ingredient) => ingredientID === ingredient.id);
    alteredIngredient[property] = value;
    const newIngredients = ingredients.filter((ingredient) => ingredientID !== ingredient.id);
    newIngredients.push(alteredIngredient);

    setIngredients(newIngredients);
  };

  const removeComment = (ingredientID) => {
    const newComments = ingredientComments.filter((ingredient) => ingredientID !== ingredient.id);
    setIngredientComments(newComments);
  };

  const addIngredient = (ingredient) => {
    if (ingredientsWidgetsData.every((element) => element.id !== ingredient.id)) {
      const newIngredient = {
        id: ingredient.id,
        category: ingredient.aisle,
        name: formatName(ingredient.name),
        units: formatUnits(ingredient.possibleUnits),
        comment: null,
        unit: ingredient.possibleUnits[0],
        quantity: 1,
      };
      setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
      setIngredientsWidgetsData((prevIngredientWidgets) => [
        ...prevIngredientWidgets,
        { id: newIngredient.id, name: newIngredient.name, units: newIngredient.units },
      ]);
    }
  };

  const removeIngredient = (ingredient) => {
    const newIngredients = ingredients.filter((item) => item.id !== ingredient.id);
    setIngredientsWidgetsData(newIngredients);
    setIngredients(newIngredients);
    removeComment(ingredient.id);
  };

  const addNewStep = (newStep) => {
    if (!newStep) {
      return;
    }
    setSteps((prevSteps) => [
      ...prevSteps,
      {
        id: stepId + 1,
        order: prevSteps.length === 0 ? 1 : prevSteps.length + 1,
        step: newStep,
      },
    ]);
    newStepField.value = '';
    setStepId((prev) => prev + 1);
  };

  const editStep = (stepId, stepOrder, step) => {
    const newSteps = steps.filter((step) => step.id !== stepId);
    newSteps.push({ id: stepId, order: stepOrder, step });
    newSteps.sort((a, b) => a.order - b.order);
    setSteps(newSteps);
  };

  const moveStepOrderUp = (step) => {
    if (step.order === 1) {
      return;
    }
    const moveDown = steps[step.order - 2];
    const newSteps = steps.filter(
      (element) => element.id !== step.id && element.id !== moveDown.id
    );
    step.order -= 1;
    moveDown.order += 1;
    newSteps.push(moveDown, step);
    newSteps.sort((a, b) => a.order - b.order);
    setSteps(newSteps);
  };

  const moveStepOrderDown = (step) => {
    if (step.order === steps.length) {
      return;
    }
    const moveUp = steps[step.order];
    const newSteps = steps.filter((element) => element.id !== step.id && element.id !== moveUp.id);
    step.order += 1;
    moveUp.order -= 1;
    newSteps.push(moveUp, step);
    newSteps.sort((a, b) => a.order - b.order);
    setSteps(newSteps);
  };

  const deleteStep = (step) => {
    const newSteps = steps.filter((element) => element.id !== step.id);
    for (let i = 0; i < newSteps.length; i += 1) {
      newSteps[i].order = i + 1;
    }
    setSteps(newSteps);
  };

  return (
    <Container>
      <Typography
        className={classes.title}
        variant="h6"
        // color="textSecondary"
        component="h2"
        gutterBottom
      >
        Create a New Recipe
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        {/* RECIPE NAME FIELD */}
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          className={classes.field}
          name="name"
          label="Recipe Name"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={titleError}
        />

        {/* SUMMARY FIELD */}

        <TextField
          onChange={(e) => setDetails(e.target.value)}
          className={classes.field}
          name="summary"
          label="Summary"
          variant="outlined"
          color="secondary"
          multiline
          row={4}
          fullWidth
          required
          error={detailsError}
        />

        {/* IMAGEURL FIELD */}

        <TextField
          onChange={(e) => setImageURL(e.target.value)}
          className={classes.field}
          name="imageURL"
          label="Image URL"
          variant="outlined"
          color="secondary"
          multiline
          row={4}
          fullWidth
        />

        <FormControl component="fieldset" className={classes.formControl}>
          {/* CATEGORY TAGS */}

          <FormControl className={classes.checkBoxGroup} error={categoryError}>
            <FormLabel className={classes.checkBoxLabel} required component="legend">
              Category
            </FormLabel>
            <FormGroup
              className={classes.checkBoxOptions}
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              <FormControlLabel
                control={<Checkbox name="main course" />}
                label="Main Course"
                value="main course"
              />
              <FormControlLabel
                control={<Checkbox name="dessert" />}
                label="Dessert"
                value="dessert"
              />
              <FormControlLabel
                control={<Checkbox name="appetizer" />}
                label="Appetizer"
                value="appetizer"
              />
              <FormControlLabel control={<Checkbox name="salad" />} label="Salad" value="salad" />
              <FormControlLabel control={<Checkbox name="bread" />} label="Bread" value="bread" />
              <FormControlLabel
                control={<Checkbox name="breakfast" />}
                label="Breakfast"
                value="breakfast"
              />
              <FormControlLabel control={<Checkbox name="soup" />} label="Soup" value="soup" />
              <FormControlLabel
                control={<Checkbox name="beverage" />}
                label="Beverage"
                value="berverage"
              />
              <FormControlLabel control={<Checkbox name="sauce" />} label="Sauce" value="sauce" />
              <FormControlLabel
                control={<Checkbox name="marinade" />}
                label="Marinade"
                value="marinade"
              />
              <FormControlLabel
                control={<Checkbox name="fingerfood" />}
                label="Fingerfood"
                value="fingerfood"
              />
              <FormControlLabel control={<Checkbox name="snack" />} label="Snack" value="snack" />
              <FormControlLabel control={<Checkbox name="drink" />} label="Drink" value="drink" />
            </FormGroup>
            {categoryError && <FormHelperText>You must select at least one</FormHelperText>}
          </FormControl>

          {/* DIET TAGS */}

          <Container className={classes.checkBoxGroup}>
            <FormLabel className={classes.checkBoxLabel} component="legend">
              Diet Tags
            </FormLabel>
            <FormGroup
              className={classes.checkBoxOptions}
              onChange={(e) => handleDietTagChange(e.target.value)}
            >
              <FormControlLabel
                control={<Checkbox name="gluten free" />}
                label="Gluten Free"
                value="gluten free"
              />
              <FormControlLabel
                control={<Checkbox name="ketogenic" />}
                label="Ketogenic"
                value="ketogenic"
              />
              <FormControlLabel
                control={<Checkbox name="vegetarian" />}
                label="Vegetarian"
                value="vegetarian"
              />
              <FormControlLabel
                control={<Checkbox name="lacto-vegetarian" />}
                label="Lacto-Vegetarian"
                value="lacto-vegetarian"
              />
              <FormControlLabel
                control={<Checkbox name="ovo-vegetarian" />}
                label="Ovo-Vegetarian"
                value="ovo-vegetarian"
              />
              <FormControlLabel control={<Checkbox name="vegan" />} label="Vegan" value="vegan" />
              <FormControlLabel
                control={<Checkbox name="lactose free" />}
                label="Lactose Free"
                value="lactose free"
              />
              <FormControlLabel control={<Checkbox name="paleo" />} label="Paleo" value="paleo" />
              <FormControlLabel
                control={<Checkbox name="primal" />}
                label="Primal"
                value="primal"
              />
              <FormControlLabel
                control={<Checkbox name="whole30" />}
                label="Whole30"
                value="whole30"
              />
            </FormGroup>
          </Container>

          {/* INTOLERANCES TAGS */}

          <Container className={classes.checkBoxGroup}>
            <FormLabel className={classes.checkBoxLabel} component="legend">
              Intolerances
            </FormLabel>
            <FormGroup
              className={classes.checkBoxOptions}
              onChange={(e) => handleIntolerancesChange(e.target.value)}
            >
              <FormControlLabel control={<Checkbox name="dairy" />} label="Dairy" value="dairy" />
              <FormControlLabel control={<Checkbox name="egg" />} label="Egg" value="egg" />
              <FormControlLabel
                control={<Checkbox name="gluten" />}
                label="Gluten"
                value="gluten"
              />
              <FormControlLabel control={<Checkbox name="grain" />} label="Grain" value="grain" />
              <FormControlLabel
                control={<Checkbox name="peanut" />}
                label="Peanut"
                value="peanut"
              />
              <FormControlLabel
                control={<Checkbox name="seafood" />}
                label="Seafood"
                value="seafood"
              />
              <FormControlLabel
                control={<Checkbox name="sesame" />}
                label="Sesame"
                value="sesame"
              />
              <FormControlLabel
                control={<Checkbox name="shellfish" />}
                label="Shellfish"
                value="shellfish"
              />
              <FormControlLabel control={<Checkbox name="soy" />} label="Soy" value="soy" />
              <FormControlLabel
                control={<Checkbox name="sulfite" />}
                label="Sulfite"
                value="sulfite"
              />
              <FormControlLabel
                control={<Checkbox name="tree nut" />}
                label="Tree Nut"
                value="tree nut"
              />
              <FormControlLabel control={<Checkbox name="wheat" />} label="Wheat" value="wheat" />
            </FormGroup>
          </Container>
        </FormControl>

        {/* INGREDIENTS SEARCH */}

        <Paper className={classes.ingredientsSeach}>
          <Typography variant="h3" gutterBottom>
            Ingredients
          </Typography>

          <FormControl error={ingredientsError}>
            <TextField
              className={classes.ingredientSearchField}
              label="Seach Ingredients"
              onChange={(e) => searchIngredients(e.target.value)}
            />
            {ingredientsError && (
              <FormHelperText>You must have at least one ingredient</FormHelperText>
            )}
            <Container className={classes.searchResults}>
              {ingredientsSearch.map((ingredient) =>
                ingredients.every((element) => element.id !== ingredient.id) ? (
                  <Button
                    key={ingredient.name}
                    variant="contained"
                    className={classes.searchResultsItem}
                    onClick={() => addIngredient(ingredient)}
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
                    onClick={() => removeIngredient(ingredient)}
                    endIcon={<RemoveIcon />}
                  >
                    {ingredient.name}
                  </Button>
                )
              )}
            </Container>
          </FormControl>
        </Paper>

        {/* INGREDIENTS WIDGETS */}

        <Grid className={classes.ingredients} container spacing={2}>
          {ingredientsWidgetsData.map((ingredient) => (
            <Grid item xs={12} md={6} key={ingredient.id}>
              <Ingredient
                ingredient={ingredient}
                removeIngredient={removeIngredient}
                changeIngredientValue={changeIngredientValue}
              />
            </Grid>
          ))}
        </Grid>

        {/* STEPS */}

        <Paper className={classes.steps}>
          <Typography variant="h3" gutterBottom>
            Steps
          </Typography>

          <FormControl error={stepsError} className={classes.newStepContainer}>
            <div className={classes.newStep}>
              <TextField
                className={classes.newStepField}
                label="Add New Step"
                multiline
                placeholder="Enter a new Step here"
                row={2}
                rowsMax={4}
                error={stepsError}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                inputRef={(ref) => {
                  newStepField = ref;
                }}
              />
              <Button endIcon={<AddIcon />} onClick={() => addNewStep(newStepField.value)} />
            </div>
            {stepsError && <FormHelperText>You must have at least one step</FormHelperText>}
          </FormControl>

          <div>
            {steps.map((step) => (
              <Step
                step={step}
                key={step.id}
                editStep={editStep}
                moveStepOrderUp={moveStepOrderUp}
                moveStepOrderDown={moveStepOrderDown}
                deleteStep={deleteStep}
              />
            ))}
          </div>
        </Paper>
        <br />
        <br />

        {/* SUBMIT BUTTON */}

        <Button variant="contained" type="submit" color="primary" endIcon={<AddIcon />}>
          Add Recipe
        </Button>
      </form>

      <br />
    </Container>
  );
}
