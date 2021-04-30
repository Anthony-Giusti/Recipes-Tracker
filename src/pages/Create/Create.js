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
import RecipeForm from '../../components/RecipeForm/RecipeForm';

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

  const submit = (recipe) => {
    fetch('http://localhost:8000/recipes', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(recipe),
    });
  };

  return (
    <div>
      <RecipeForm recipe={null} submit={submit} submitBtnText="Add Recipe" />
    </div>
  );
}
