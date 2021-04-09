import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  Container,
  Card,
  makeStyles,
  TextField,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
  Checkbox,
  FormGroup,
  responsiveFontSizes,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router';
import { Block } from '@material-ui/icons';

import useStyles from './Styles-Create';

import Ingredient from './Ingredient/Ingredient';
import Step from './Step/Step';

export default function Create() {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState([]);
  const [categoryError, setCategoryError] = useState(false);
  const [dietTags, setDietTags] = useState([]);
  const [ingredientsSearch, setIngredientsSearch] = useState([]);
  const [ingredientsWidgetsData, setIngredientsWidgetsData] = useState([]);
  const [ingredientsError, setIngredientsError] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [ingredientsUnits, setIngredientsUnits] = useState([]);
  const [ingredientsQuantities, setIngredientsQuantities] = useState([]);
  const [ingredientComments, setIngredientComments] = useState([]);
  const [steps, setSteps] = useState([]);
  const [stepId, setStepId] = useState(0);
  const history = useHistory();
  const classes = useStyles();

  const key = process.env.REACT_APP_SPOONACULAR_KEY;
  let newStepField;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitleError(false);
    setDetailsError(false);

    if (title === '') setTitleError(true);
    if (details === '') setDetailsError(true);
    if (category.length === 0) setCategoryError(true);

    if (title && details) {
      fetch('http://localhost:8000/notes', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          title,
          details,
          category,
          dietTags,
          ingredients,
        }),
      }).then(() => history.push('/'));
    }
  };

  const handleCategoryChange = (newCategory) => {
    if (category.includes(newCategory)) {
      const papa = category.filter((category) => category !== newCategory);
      setCategory(papa);
    } else {
      setCategory((prev) => [...prev, newCategory]);
    }
  };

  const handleDietTagChange = (newTag) => {
    if (dietTags.includes(newTag)) {
      const papa = dietTags.filter((tag) => tag !== newTag);
      setDietTags(papa);
    } else {
      setDietTags((prev) => [...prev, newTag]);
    }
  };

  const searchIngredients = (query) => {
    if (query.length < 3) {
      return;
    }
    fetch(
      `https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=${key}&query=${query}&number=10&metaInformation=true`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setIngredientsSearch(data);
      });
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
        unit: null,
        quantity: null,
      };
      setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
      setIngredientsWidgetsData((prevIngredientWidgets) => [
        ...prevIngredientWidgets,
        { id: newIngredient.id, name: newIngredient.name, units: newIngredient.units },
      ]);
    }
  };

  const removeIngredient = (ingredient) => {
    const newIngredients = ingredients.filter((item) => item.name !== ingredient.name);
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
    console.log(newSteps);
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
    const moveUp = steps[step.order];
    const newSteps = steps.filter((element) => element.id !== step.id && element.id !== moveUp.id);
    step.order += 1;
    moveUp.order -= 1;
    newSteps.push(moveUp, step);
    newSteps.sort((a, b) => a.order - b.order);
    setSteps(newSteps);
  };

  const deleteStep = (step) => {};

  return (
    <Container>
      <Typography
        className={classes.title}
        variant="h6"
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        Create a New Note
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

        <FormControl component="fieldset" className={classes.formControl}>
          {/* CATEGORY TAGS */}

          <Container className={classes.checkBoxGroup}>
            <FormLabel className={classes.checkBoxLabel} required component="legend">
              Category
            </FormLabel>
            <FormGroup
              className={classes.checkBoxOptions}
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              <FormControlLabel
                control={<Checkbox name="breakfast" />}
                label="Breakfast"
                value="breakfast"
              />
              <FormControlLabel control={<Checkbox name="lunch" />} label="Lunch" value="lunch" />
              <FormControlLabel
                control={<Checkbox name="dinner" />}
                label="Dinner"
                value="dinner"
              />
              <FormControlLabel control={<Checkbox name="snack" />} label="Snack" value="snack" />
            </FormGroup>
          </Container>

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
                control={<Checkbox name="vegetarian" />}
                label="Vegetarian"
                value="vegetarian"
              />
              <FormControlLabel control={<Checkbox name="vegan" />} label="Vegan" value="vegan" />
              <FormControlLabel
                control={<Checkbox name="lactose free" />}
                label="Lactose Free"
                value="lactose free"
              />
              <FormControlLabel
                control={<Checkbox name="gluten free" />}
                label="Gluten Free"
                value="gluten free"
              />
              <FormControlLabel
                control={<Checkbox name="nut free" />}
                label="Nut Free"
                value="nut free"
              />
              <FormControlLabel
                control={<Checkbox name="soy free" />}
                label="Soy Free"
                value="soy free"
              />
              <FormControlLabel control={<Checkbox name="snack" />} label="Keto" value="keto" />
            </FormGroup>
          </Container>
        </FormControl>

        {/* INGREDIENTS SEARCH */}

        <Container>
          <FormGroup>
            <TextField
              className={classes.ingredientSearchField}
              label="Seach Ingredients"
              onChange={(e) => searchIngredients(e.target.value)}
            />
            <Container className={classes.searchResults}>
              {ingredientsSearch.map((ingredient) => (
                <Button
                  key={ingredient.name}
                  className={classes.searchResultsItem}
                  onClick={() => addIngredient(ingredient)}
                  endIcon={<AddIcon />}
                >
                  {ingredient.name}
                </Button>
              ))}
            </Container>
          </FormGroup>
        </Container>

        {/* INGREDIENTS WIDGETS */}

        <Container className={classes.ingredients}>
          {ingredientsWidgetsData.map((ingredient) => (
            <Ingredient
              key={ingredient.id}
              ingredient={ingredient}
              removeIngredient={removeIngredient}
              changeIngredientValue={changeIngredientValue}
            />
          ))}
        </Container>

        {/* STEPS */}

        <Paper className={classes.steps}>
          <Typography variant="h3" gutterBottom>
            Steps
          </Typography>

          <div className={classes.newStep}>
            <TextField
              className={classes.newStepField}
              label="Add New Step"
              multiline
              placeholder="Enter a new Step here"
              row={2}
              rowsMax={4}
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

          <div>
            {steps.map((step) => (
              <Step
                step={step}
                key={step.id}
                editStep={editStep}
                moveStepOrderUp={moveStepOrderUp}
                moveStepOrderDown={moveStepOrderDown}
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
