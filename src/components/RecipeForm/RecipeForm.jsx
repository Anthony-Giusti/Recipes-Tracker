/* eslint-disable react/no-this-in-sfc */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import IconButtonWithBackground from '../../Themes/Buttons/IconButtons/IconButtons';

import RecipeCheckBoxes from '../RecipeCheckBoxes/RecipeCheckBoxes';
import IngredientsSearch from '../IngredientsSearch/IngredientsSearch';
import Step from '../../pages/Create/Step/Step';

import useStyles from './Styles-RecipeForm';

const RecipeForm = ({ recipe, submit, submitBtnText }) => {
  const [title] = useState(recipe ? recipe.title : '');
  const [details] = useState(recipe ? recipe.details : '');
  const [servings] = useState(recipe ? recipe.servings : 1);
  const [sourceURL] = useState(recipe ? recipe.sourceURLs : '');
  const [imageURLs] = useState(recipe ? recipe.imageURLs : new Array(6).fill(''));
  const [imageURLBoxes, setImageURLBoxes] = useState(recipe ? recipe.imageURLs.length : 0);
  const [cookTime] = useState(recipe ? recipe.cookTime : { hours: 0, minutes: 15 });
  const [categories, setCategories] = useState(recipe ? recipe.categories.raw : []);
  const [dietTags, setDietTags] = useState(recipe ? recipe.dietTags.raw : []);
  const [intolerances, setIntolerances] = useState(recipe ? recipe.intolerances.raw : []);
  const [ingredients, setIngredients] = useState(recipe ? recipe.ingredients : []);
  const [steps, setSteps] = useState(recipe ? recipe.steps : []);
  // const [stepId, setStepId] = useState(0);
  const [additionalNotes] = useState(recipe ? recipe.additionalNotes : '');

  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [imageURLErrors, setImageURLErrors] = useState(new Array(6).fill(false));
  const [sourceURLError, setSourceURLError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [ingredientsError, setIngredientsError] = useState(false);
  const [stepsError, setStepsError] = useState(false);
  const [currentlyEditing, setCurrentlyEditing] = useState(false);
  //   const history = useHistory();

  const classes = useStyles();

  let recipeTitleField;
  let recipeDetailsField;
  let servingsField;
  let sourceURLField;
  let cookTimeMinutesField;
  let cookTimeHoursField;
  const imageURLFields = [];
  let newStepField;
  let addtionalNotesField;

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

  const formatUnit = (unit) => {
    if (unit.length < 3) {
      return unit.toUpperCase();
    }
    return formatName(unit);
  };

  const formatCookTime = (hours, minutes) => {
    const hoursPlural = hours > 1 ? 's' : '';
    const minutesPlural = minutes > 1 ? 's' : '';

    if (hours > 0 && minutes > 0) {
      return `${hours} hour${hoursPlural} and ${minutes} minute${minutesPlural}`;
    }
    if (hours > 0) {
      return `${hours} hour${hoursPlural}`;
    }
    if (minutes > 0) {
      return `${minutes} minute${minutesPlural}`;
    }
  };

  const validateURLs = (urls) => {
    const check = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    ); // fragment locator

    if (Array.isArray(urls)) {
      return urls.map((url) => !check.test(url.value));
    }
    if (urls.value === '') {
      return true;
    }
    return !check.test(urls.value);
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

  const handleImageURLBoxAdd = () => {
    console.log(imageURLBoxes);
    if (imageURLBoxes < 6) {
      setImageURLBoxes(imageURLBoxes + 1);
      console.log(imageURLBoxes + 1);
    }
  };

  const handleImageURlBoxRemove = () => {
    if (imageURLBoxes > 0) {
      setImageURLBoxes(imageURLBoxes - 1);
    }
  };

  const handleIngredientAdd = (ingredient) => {
    if (ingredients.every((element) => element.id !== ingredient.id)) {
      const newIngredient = {
        id: ingredient.id,
        category: ingredient.aisle,
        name: formatName(ingredient.name),
        units: ingredient.possibleUnits.map((unit) => formatUnit(unit)),
        unit: formatUnit(ingredient.possibleUnits[0]),
        customUnit: null,
        customUnitAdded: false,
        comment: null,
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

  const handleCustomUnit = (ingredientID, state, value) => {
    const alteredIngredient = ingredients.find((ingredient) => ingredientID === ingredient.id);
    alteredIngredient.customUnit = value;
    alteredIngredient.customUnitAdded = state;
  };

  const addNewStep = (newStep) => {
    if (!newStep) {
      return;
    }
    setSteps((prevSteps) => [
      ...prevSteps,
      {
        id: steps.length === 0 ? 1 : Math.max(...steps.map((step) => step.id)) + 1,
        order: prevSteps.length === 0 ? 1 : prevSteps.length + 1,
        step: newStep,
      },
    ]);
    newStepField.value = '';
    // setStepId((prev) => prev + 1);
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

  const handleHoursChange = (value) => {
    if (value < 0) {
      cookTimeHoursField.value = 1;
    } else if (value > 99) {
      cookTimeHoursField.value = 99;
    }
  };

  const handleMinutesChange = (value) => {
    if (value < 0) {
      cookTimeMinutesField.value = 1;
    } else if (value > 59) {
      cookTimeMinutesField.value = 59;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitleError(false);
    setDetailsError(false);
    setCategoryError(false);
    setIngredientsError(false);
    setStepsError(false);

    if (recipeTitleField.value === '') setTitleError(true);
    if (recipeDetailsField.value === '') setDetailsError(true);
    if (categories.length === 0) setCategoryError(true);
    if (ingredients.length === 0) setIngredientsError(true);
    if (steps.length === 0) setStepsError(true);
    setImageURLErrors(validateURLs(imageURLFields));

    setSourceURLError(() => {
      if (sourceURLField.value === '') {
        return false;
      }
      return validateURLs(sourceURLField.value);
    });

    if (
      !titleError &&
      !detailsError &&
      !categoryError &&
      !ingredientsError &&
      !stepsError &&
      !currentlyEditing &&
      imageURLErrors.every((error) => !error)
    ) {
      submit({
        title: recipeTitleField.value,
        details: recipeDetailsField.value,
        servings: servingsField.value,
        cookTime: {
          hours: cookTimeHoursField.value,
          minutes: cookTimeMinutesField.value,
          formatted: formatCookTime(cookTimeHoursField.value, cookTimeMinutesField.value),
        },
        soureURL: sourceURLField.value,
        imageURLs: imageURLFields.map((url) => url.value),
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
        addtionalNotes: addtionalNotesField.value,
      });
    }
  };

  // ================================================================================= //
  // ================================================================================= //
  // ================================================================================= //

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Paper className={classes.section}>
        <Typography variant="h3" gutterBottom className={classes.sectionTitle}>
          Basic Information
        </Typography>

        {/* RECIPE NAME FIELD */}
        <TextField
          className={classes.field}
          name="name"
          defaultValue={title}
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
          defaultValue={details}
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

        {/* SOURCE URL FIELD */}

        <TextField
          className={classes.field}
          name="sourceURL"
          defaultValue={sourceURL}
          label="Source URL"
          variant="outlined"
          color="secondary"
          multiline
          row={4}
          fullWidth
          helperText={sourceURLError ? 'Invalid URL please fix and resubmit or remove' : ''}
          inputRef={(ref) => {
            sourceURLField = ref;
          }}
          error={sourceURLError}
        />

        {/* SERVINGS */}
        <div className={classes.yieldCookTimeContainer}>
          <div className={classes.yieldCookTime}>
            <div className={classes.yieldCookTimeTitle}>
              <Typography variant="h5">Yield:</Typography>
            </div>
            <TextField
              className={classes.field}
              name="cookTimeHours"
              defaultValue={servings}
              label="Servings"
              variant="outlined"
              color="secondary"
              type="number"
              onChange={(e) => handleHoursChange(parseInt(e.target.value, 10))}
              inputProps={{ min: 1, max: 99 }}
              inputRef={(ref) => {
                servingsField = ref;
              }}
            />
          </div>

          {/* COOK TIME FIELDS */}

          <div className={classes.yieldCookTime}>
            <div className={classes.yieldCookTimeTitle}>
              <Typography variant="h5">Total Cook Time:</Typography>
            </div>

            <TextField
              className={classes.field}
              name="cookTimeHours"
              defaultValue={Number(cookTime.hours)}
              label="Hours"
              variant="outlined"
              color="secondary"
              type="number"
              onChange={(e) => handleHoursChange(parseInt(e.target.value, 10))}
              inputProps={{ min: 0, max: 99 }}
              inputRef={(ref) => {
                cookTimeHoursField = ref;
              }}
            />

            <TextField
              className={classes.field}
              name="cookTimeMinutes"
              defaultValue={cookTime.minutes}
              label="Minutes"
              variant="outlined"
              color="secondary"
              type="number"
              onChange={(e) => handleMinutesChange(parseInt(e.target.value, 10))}
              inputProps={{ min: 0, max: 59 }}
              inputRef={(ref) => {
                cookTimeMinutesField = ref;
              }}
            />
          </div>
        </div>
      </Paper>

      {/* IMAGE URL FIELDS */}

      <Paper className={classes.section}>
        <Typography variant="h3" className={classes.sectionTitle} gutterBottom>
          Images
        </Typography>

        <span>
          <Button
            variant="contained"
            color="primary"
            disabled={imageURLBoxes >= 6}
            endIcon={<AddIcon />}
            className={classes.addImageURLBtn}
            onClick={() => handleImageURLBoxAdd()}
          >
            Add images (maximum of 6)
          </Button>
          <Button
            className={classes.removeImageURLbtn}
            disabled={imageURLBoxes <= 0}
            onClick={() => handleImageURlBoxRemove()}
            endIcon={<RemoveIcon />}
          >
            Remove
          </Button>
        </span>

        {[...Array(imageURLBoxes)].map((value, index) => (
          <TextField
            key={index}
            className={classes.field}
            name={`extraImageURL ${index}`}
            defaultValue={imageURLs[index]}
            label="Image URL"
            variant="outlined"
            color="secondary"
            multiline
            row={4}
            helperText={
              imageURLErrors[index] ? 'Invalid URL please fix and resubmit or remove' : ''
            }
            inputRef={(ref) => {
              imageURLFields[index] = ref;
            }}
            error={imageURLErrors[index]}
            fullWidth
          />
        ))}
      </Paper>

      {/* RECIPES CHECKBOXES */}

      <Paper className={classes.section}>
        <Typography variant="h3" gutterBottom className={classes.sectionTitle}>
          Recipe Tags
        </Typography>

        <RecipeCheckBoxes
          categoryError={categoryError}
          handleCheckBoxValueChange={handleCheckBoxValueChange}
          categories={categories}
          dietTags={dietTags}
          intolerances={intolerances}
        />
      </Paper>

      {/* INGREDIENTS SEARCH */}

      <Paper className={classes.section}>
        <Typography variant="h3" gutterBottom className={classes.sectionTitle}>
          Ingredients
        </Typography>

        <IngredientsSearch
          ingredientsError={ingredientsError}
          ingredients={ingredients}
          changeIngredientValue={changeIngredientValue}
          handleIngredientAdd={handleIngredientAdd}
          handleIngredientRemove={handleIngredientRemove}
          handleCustomUnit={handleCustomUnit}
        />
      </Paper>

      {/* STEPS */}

      <Paper className={classes.section}>
        <Typography variant="h3" gutterBottom className={classes.sectionTitle}>
          Steps
        </Typography>

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
            <IconButtonWithBackground onClick={() => addNewStep(newStepField.value)}>
              <AddIcon />
            </IconButtonWithBackground>
          </div>
          {stepsError && <FormHelperText>You must have at least one step</FormHelperText>}
        </FormControl>
      </Paper>

      {/* ADDITIONAL NOTES */}

      <Paper className={classes.section}>
        <Typography variant="h3" gutterBottom className={classes.sectionTitle}>
          Additonal Notes
        </Typography>
        <TextField
          className={classes.field}
          name="additional notes"
          defaultValue={additionalNotes}
          label="Additional Notes"
          variant="outlined"
          color="secondary"
          fullWidth
          multiline
          row={4}
          inputRef={(ref) => {
            addtionalNotesField = ref;
          }}
        />
      </Paper>

      {/* SUBMIT BUTTON */}

      <Button
        className={classes.submitBtn}
        variant="contained"
        type="submit"
        color="primary"
        endIcon={<AddIcon />}
      >
        {submitBtnText}
      </Button>
      <br />
      <br />
    </form>
  );
};

RecipeForm.propTypes = {
  recipe: PropTypes.object,
  submit: PropTypes.func,
  submitBtnText: PropTypes.string,
};

export default RecipeForm;
