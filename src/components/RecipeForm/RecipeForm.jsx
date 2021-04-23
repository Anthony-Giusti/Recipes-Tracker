/* eslint-disable react/prop-types */
import {
  Button,
  FormControl,
  FormHelperText,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';

import RecipeCheckBoxes from '../RecipeCheckBoxes/RecipeCheckBoxes';
import IngredientsSearch from '../IngredientsSearch/IngredientsSearch';
import Step from '../../pages/Create/Step/Step';

import useStyles from './Styles-RecipeForm';

const RecipeForm = ({ recipe, submit }) => {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [categories, setCategories] = useState([]);
  const [dietTags, setDietTags] = useState([]);
  const [intolerances, setIntolerances] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  const [stepId, setStepId] = useState(0);

  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [ingredientsError, setIngredientsError] = useState(false);
  const [stepsError, setStepsError] = useState(false);
  //   const history = useHistory();

  const classes = useStyles();

  useEffect(() => {
    if (recipe) {
      setTitle(recipe.title);
      setDetails(recipe.details);
      setImageURL(recipe.imageURL);
      setCategories(recipe.categories.raw);
      setDietTags(recipe.dietTags.raw);
      setIntolerances(recipe.intolerances.raw);
      setIngredients(recipe.ingredients);
      setSteps(recipe.steps);
    }
  }, [recipe]);

  let recipeTitleField;
  let recipeDetailsField;
  let imageURLField;
  let newStepField;

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

  // const formatTags = (tags) => tags.map((tag) => formatName(tag)).join(' • ');

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitleError(false);
    setDetailsError(false);
    setCategoryError(false);
    setIngredientsError(false);
    setStepsError(false);

    if (recipeTitleField === '') setTitleError(true);
    if (recipeDetailsField === '') setDetailsError(true);
    if (categories.length === 0) setCategoryError(true);
    if (ingredients.length === 0) setIngredientsError(true);
    if (steps.length === 0) setStepsError(true);

    if (title && details && categories.length > 0 && ingredients.length > 0 && steps.length > 0) {
      submit({
        title: recipeTitleField.value,
        details: recipeDetailsField.value,
        imageURL: imageURLField.value,
        categories: {
          raw: categories,
          formatted: categories.map((category) => formatName(category)),
        },
        dietTags: {
          raw: dietTags,
          formatted: dietTags.map((dietTag) => formatName(dietTag)),
        },
        intolerances: {
          raw: intolerances,
          formatted: intolerances.map((intolerance) => formatName(intolerance)),
        },
        ingredients,
        steps,
      });
    }
  };

  const handleCheckBoxValueChange = (newValue, setValues) => {
    let changeValue;
    let prevValues;

    switch (setValues) {
      case 'categories':
        changeValue = setCategories;
        prevValues = categories;
        break;
      case 'dietTags':
        changeValue = setDietTags;
        prevValues = dietTags;
        break;
      case 'intolerances':
        changeValue = setIntolerances;
        prevValues = intolerances;
        break;
      default:
        return;
    }

    if (prevValues.includes(newValue)) {
      changeValue(prevValues.filter((category) => category !== newValue));
    } else {
      changeValue((prevValue) => [...prevValue, newValue]);
    }
  };

  const handleIngredientAdd = (ingredient) => {
    if (ingredients.every((element) => element.id !== ingredient.id)) {
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
    }
  };

  const handleIngredientRemove = (ingredient) => {
    const newIngredients = ingredients.filter((item) => item.id !== ingredient.id);
    setIngredients(newIngredients);
  };

  const changeIngredientValue = (ingredientID, property, value) => {
    const alteredIngredient = ingredients.find((ingredient) => ingredientID === ingredient.id);
    alteredIngredient[property] = value;

    const newIngredients = ingredients;
    const index = ingredients.findIndex((ingredient) => ingredient.id === ingredientID);
    newIngredients.splice(index, 1, alteredIngredient);

    setIngredients(newIngredients);
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
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      {/* RECIPE NAME FIELD */}
      <TextField
        className={classes.field}
        name="name"
        defaultValue={recipe.title}
        label="Recipe Name"
        variant="outlined"
        color="secondary"
        fullWidth
        required
        inputRef={(ref) => {
          recipeTitleField = ref;
        }}
        error={titleError}
      />

      {/* SUMMARY FIELD */}

      <TextField
        className={classes.field}
        name="summary"
        defaultValue={recipe.details}
        label="Summary"
        variant="outlined"
        color="secondary"
        multiline
        row={4}
        fullWidth
        required
        inputRef={(ref) => {
          recipeDetailsField = ref;
        }}
        error={detailsError}
      />

      {/* IMAGEURL FIELD */}

      <TextField
        className={classes.field}
        name="imageURL"
        defaultValue={imageURL}
        label="Image URL"
        variant="outlined"
        color="secondary"
        multiline
        row={4}
        inputRef={(ref) => {
          imageURLField = ref;
        }}
        fullWidth
      />

      {/* RECIPES CHECKBOXES */}

      <RecipeCheckBoxes
        categoryError={categoryError}
        handleCheckBoxValueChange={handleCheckBoxValueChange}
        categories={categories}
        dietTags={dietTags}
        intolerances={intolerances}
      />

      {/* INGREDIENTS SEARCH */}

      <IngredientsSearch
        ingredientsError={ingredientsError}
        ingredients={ingredients}
        changeIngredientValue={changeIngredientValue}
        handleIngredientAdd={handleIngredientAdd}
        handleIngredientRemove={handleIngredientRemove}
      />

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
        {console.log(steps)}
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
  );
};

export default RecipeForm;
