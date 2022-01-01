import React, { useState } from 'react';
import isURl from 'validator/lib/isURL';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import CloseIcon from '@material-ui/icons/Close';

import { AxiosInstance } from 'axios';
import RecipeCheckBoxes from './RecipeCheckBoxes/RecipeCheckBoxes';
import IngredientsSearch from './IngredientsSearch/IngredientsSearch';
import Steps from './Steps/Steps';

import IRecipe from '../../shared/interfaces/Recipe.interface';
import IIngredient from '../../shared/interfaces/Ingredient.interface';

import useStyles from './Styles';
import IIngredientSearchResult from '../../shared/interfaces/IngredientSearchResult.interface';
import formatName from '../../shared/Utility Functions/FormatName';
import IRecipeFormSubmission from '../../shared/interfaces/RecipeFormSubmission.interface';
import Istep from '../../shared/interfaces/Step.interface';

interface IProps {
  recipe: IRecipe | null;
  submit: (recipe: IRecipeFormSubmission) => void;
  submitBtnText: string;
  api: AxiosInstance;
}

const RecipeForm: React.FC<IProps> = ({ recipe, submit, submitBtnText, api }) => {
  const [title] = useState(recipe ? recipe.title : '');
  const [details] = useState(recipe ? recipe.details : '');
  const [servings] = useState(recipe ? recipe.servings : 1);
  const [sourceURL] = useState(recipe ? recipe.sourceURL : '');
  const [imageURLs] = useState(recipe ? recipe.imageURLs : new Array(6).fill(''));
  const [imageURLBoxes, setImageURLBoxes] = useState(recipe ? recipe.imageURLs.length : 0);
  const [cookTime] = useState(recipe ? recipe.cookTime : { hours: 0, minutes: 15 });
  const [categories, setCategories] = useState(recipe ? recipe.categories.raw : []);
  const [dietTags, setDietTags] = useState(recipe ? recipe.dietTags.raw : []);
  const [intolerances, setIntolerances] = useState(recipe ? recipe.intolerances.raw : []);
  const [ingredients, setIngredients] = useState(recipe ? recipe.ingredients : []);
  const [steps, setSteps] = useState(recipe ? recipe.steps : []);
  const [additionalNotes, setAddtionalNotes] = useState(recipe ? recipe.additionalNotes : []);

  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [imageURLErrors, setImageURLErrors] = useState(new Array(6).fill(false));
  const [sourceURLError, setSourceURLError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [ingredientsError, setIngredientsError] = useState(false);
  const [stepsError, setStepsError] = useState(false);
  const [errorMessageOpen, setErrorMessageOpen] = useState(false);

  const classes = useStyles();

  let recipeTitleField: HTMLTextAreaElement;
  let recipeDetailsField: HTMLTextAreaElement;
  let servingsField: HTMLSelectElement;
  let sourceURLField: HTMLTextAreaElement;
  let cookTimeMinutesField: HTMLSelectElement;
  let cookTimeHoursField: HTMLSelectElement;
  const imageURLFields: HTMLTextAreaElement[] = [];

  const formatUnit = (unit: string): string[] | string => {
    if (unit.length < 3) {
      return unit.toUpperCase();
    }
    return formatName(unit);
  };

  const formatCookTime = (hours: number, minutes: number): string | null => {
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
    return null;
  };

  const validateURLs = (urls: string | string[]): boolean[] => {
    if (Array.isArray(urls)) {
      return urls.map((url) => !isURl(url));
    }
    if (urls === '') {
      return [true];
    }
    return [!isURl(urls)];
  };

  const handleCheckBoxValueChange = (newValue: string, setValues: string): void => {
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

  const handleImageURLBoxAdd = (): void => {
    if (imageURLBoxes < 6) {
      setImageURLBoxes(imageURLBoxes + 1);
    }
  };

  const handleImageURlBoxRemove = (): void => {
    if (imageURLBoxes > 0) {
      setImageURLBoxes(imageURLBoxes - 1);
    }
  };

  const handleIngredientAdd = (ingredient: IIngredientSearchResult): void => {
    if (ingredients.every((element: any) => element.id !== ingredient.id)) {
      const newIngredient = {
        id: ingredient.id,
        category: ingredient.aisle,
        name: formatName(ingredient.name),
        units: ingredient.possibleUnits.map((unit: any) => formatUnit(unit)),
        unit: formatUnit(ingredient.possibleUnits[0]),
        customUnit: null,
        customUnitAdded: false,
        comment: null,
        quantity: 1,
      };
      setIngredients((prevIngredients: any) => [...prevIngredients, newIngredient]);
    }
  };

  const handleIngredientRemove = (ingredientID: number): void => {
    const newIngredients = ingredients.filter((item) => item.id !== ingredientID.toString());
    setIngredients(newIngredients);
  };

  const changeIngredientValue = (
    ingredientID: string,
    property: 'comment' | 'unit' | 'quantity',
    value: string | number | null
  ): void => {
    const alteredIngredient = ingredients.find(
      (ingredient: IIngredient) => ingredientID === ingredient.id
    );

    if (alteredIngredient) {
      if (property === 'comment' && typeof value === 'string') {
        alteredIngredient.comment = value;
      }
      if (property === 'comment' && !value) {
        alteredIngredient.comment = null;
      }
      if (property === 'unit' && typeof value === 'string') {
        alteredIngredient.unit = value;
      }
      if (property === 'quantity' && typeof value === 'number') {
        alteredIngredient.quantity = value;
      }

      const newIngredients = ingredients;
      const index = ingredients.findIndex(
        (ingredient: IIngredient) => ingredient.id === ingredientID
      );
      newIngredients.splice(index, 1, alteredIngredient);
      setIngredients(newIngredients);
    }
  };

  const handleCustomUnit = (ingredientID: string, isActive: any, value: string): void => {
    const alteredIngredient = ingredients.find(
      (ingredient: IIngredient) => ingredientID === ingredient.id
    );

    if (alteredIngredient) {
      alteredIngredient.customUnit = value;
      alteredIngredient.customUnitAdded = isActive;
    }
  };

  const handleStepsChange = (newSteps: Istep[]): void => {
    setSteps(newSteps);
  };

  const handleNotesChange = (newNotes: Istep[]): void => {
    setAddtionalNotes(newNotes);
  };

  const handleHoursChange = (value: number): void => {
    if (value < 0) {
      cookTimeHoursField.value = '1';
    } else if (value > 99) {
      cookTimeHoursField.value = '99';
    }
  };

  const handleMinutesChange = (value: number): void => {
    if (value < 0) {
      cookTimeMinutesField.value = '1';
    } else if (value > 59) {
      cookTimeMinutesField.value = '59';
    }
  };

  const handleErrors = (): void => {
    setErrorMessageOpen(true);
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    setTitleError(false);
    setDetailsError(false);
    setCategoryError(false);
    setIngredientsError(false);
    setSourceURLError(false);
    setImageURLErrors(new Array(6).fill(false));
    setStepsError(false);

    const errors = [];

    if (recipeTitleField.value === '') {
      setTitleError(true);
      errors.push('Recipe needs a title.');
    }
    if (recipeDetailsField.value === '') {
      setDetailsError(true);
      errors.push('Recipe needs a summary.');
    }
    if (categories.length === 0) {
      setCategoryError(true);
      errors.push('Recipe needs at least one category tag.');
    }
    if (ingredients.length === 0) {
      setIngredientsError(true);
      errors.push('Recipe needs at least one ingredient.');
    }
    if (steps.length === 0) {
      setStepsError(true);
      errors.push('Recipe needs at least one step.');
    }

    const imageErrors = validateURLs(imageURLFields.map((imageURLField) => imageURLField.value));
    if (imageErrors.some((test) => test)) {
      setImageURLErrors(imageErrors);
      errors.push(`1 or more image URLs are not valid.`);
    }

    if (sourceURLField.value !== '') {
      const sourceError = validateURLs(sourceURLField.value);
      if (sourceError[0]) {
        setSourceURLError(true);
        errors.push('Source URL is not valid');
      }
    }

    if (errors.length === 0) {
      const editedRecipe: IRecipeFormSubmission = {
        title: recipeTitleField.value,
        details: recipeDetailsField.value,
        servings: servingsField.value,
        cookTime: {
          hours: parseInt(cookTimeHoursField.value),
          minutes: parseInt(cookTimeMinutesField.value),
          formatted: formatCookTime(
            parseInt(cookTimeHoursField.value),
            parseInt(cookTimeMinutesField.value)
          ),
        },
        sourceURL: sourceURLField.value,
        imageURLs: imageURLFields.map((url: any) => url.value),
        categories: {
          raw: categories,
          formatted: categories.map((category) => formatName(category)),
        },
        dietTags: {
          raw: dietTags,
          formatted: dietTags.map((dietTag) => formatName(dietTag)),
        },
        id: recipe ? recipe.id : null,
        intolerances: {
          raw: intolerances,
          formatted: intolerances.map((intolerance) => formatName(intolerance)),
        },
        ingredients,
        steps,
        additionalNotes,
      };

      submit(editedRecipe);
    } else {
      handleErrors();
    }
  };

  // ================================================================================= //
  // ================================================================================= //
  // ================================================================================= //

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Paper className={classes.section}>
        <Typography variant="h3" gutterBottom className={classes.secondaryTitle}>
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
          rows={4}
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
          rows={4}
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
        <Typography variant="h3" className={classes.secondaryTitle} gutterBottom>
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
            rows={4}
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
        <Typography variant="h3" gutterBottom className={classes.secondaryTitle}>
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
        <Typography variant="h3" gutterBottom className={classes.secondaryTitle}>
          Ingredients
        </Typography>

        <IngredientsSearch
          ingredientsError={ingredientsError}
          ingredients={ingredients}
          changeIngredientValue={changeIngredientValue}
          handleIngredientAdd={handleIngredientAdd}
          handleIngredientRemove={handleIngredientRemove}
          handleCustomUnit={handleCustomUnit}
          api={api}
        />
      </Paper>

      {/* STEPS */}

      <Paper className={classes.section}>
        <Typography variant="h3" gutterBottom className={classes.secondaryTitle}>
          Steps
        </Typography>

        <Steps
          stepType="step"
          handleStepsChange={handleStepsChange}
          steps={steps}
          stepsError={stepsError}
        />
      </Paper>

      {/* ADDITIONAL NOTES */}

      <Paper className={classes.section}>
        <Typography variant="h3" gutterBottom className={classes.secondaryTitle}>
          Additonal Notes
        </Typography>
        <Steps
          stepType="note"
          handleStepsChange={handleNotesChange}
          steps={additionalNotes}
          stepsError={false}
        />
      </Paper>

      {/* SUBMIT BUTTON */}

      <Button variant="contained" type="submit" color="primary" endIcon={<AddIcon />}>
        {submitBtnText}
      </Button>
      <br />
      <br />
      <Snackbar
        autoHideDuration={8000}
        onClose={() => setErrorMessageOpen(false)}
        open={errorMessageOpen}
        message="Your recipe contains one or more errors."
        action={
          <>
            <IconButton color="primary" onClick={() => setErrorMessageOpen(false)}>
              <CloseIcon />
            </IconButton>
          </>
        }
      />
    </form>
  );
};

export default RecipeForm;
