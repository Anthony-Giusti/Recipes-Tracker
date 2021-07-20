"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable react/prop-types */
const react_1 = __importStar(require("react"));
const isURL_1 = __importDefault(require("validator/lib/isURL"));
const Button_1 = __importDefault(require("@material-ui/core/Button"));
const TextField_1 = __importDefault(require("@material-ui/core/TextField"));
const Paper_1 = __importDefault(require("@material-ui/core/Paper"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const Snackbar_1 = __importDefault(require("@material-ui/core/Snackbar"));
const IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
const Add_1 = __importDefault(require("@material-ui/icons/Add"));
const Remove_1 = __importDefault(require("@material-ui/icons/Remove"));
const Close_1 = __importDefault(require("@material-ui/icons/Close"));
const RecipeCheckBoxes_1 = __importDefault(require("./RecipeCheckBoxes/RecipeCheckBoxes"));
const IngredientsSearch_1 = __importDefault(require("./IngredientsSearch/IngredientsSearch"));
const Steps_1 = __importDefault(require("./Steps/Steps"));
const Styles_1 = __importDefault(require("./Styles"));
const RecipeForm = ({ recipe, submit, submitBtnText, api }) => {
    const [title] = react_1.useState(recipe ? recipe.title : '');
    const [details] = react_1.useState(recipe ? recipe.details : '');
    const [servings] = react_1.useState(recipe ? recipe.servings : 1);
    const [sourceURL] = react_1.useState(recipe ? recipe.sourceURL : '');
    const [imageURLs] = react_1.useState(recipe ? recipe.imageURLs : new Array(6).fill(''));
    const [imageURLBoxes, setImageURLBoxes] = react_1.useState(recipe ? recipe.imageURLs.length : 0);
    const [cookTime] = react_1.useState(recipe ? recipe.cookTime : { hours: 0, minutes: 15 });
    const [categories, setCategories] = react_1.useState(recipe ? recipe.categories.raw : []);
    const [dietTags, setDietTags] = react_1.useState(recipe ? recipe.dietTags.raw : []);
    const [intolerances, setIntolerances] = react_1.useState(recipe ? recipe.intolerances.raw : []);
    const [ingredients, setIngredients] = react_1.useState(recipe ? recipe.ingredients : []);
    const [steps, setSteps] = react_1.useState(recipe ? recipe.steps : []);
    const [additionalNotes, setAddtionalNotes] = react_1.useState(recipe ? recipe.additionalNotes : []);
    const [titleError, setTitleError] = react_1.useState(false);
    const [detailsError, setDetailsError] = react_1.useState(false);
    const [imageURLErrors, setImageURLErrors] = react_1.useState(new Array(6).fill(false));
    const [sourceURLError, setSourceURLError] = react_1.useState(false);
    const [categoryError, setCategoryError] = react_1.useState(false);
    const [ingredientsError, setIngredientsError] = react_1.useState(false);
    const [stepsError, setStepsError] = react_1.useState(false);
    const [errorMessageOpen, setErrorMessageOpen] = react_1.useState(false);
    const classes = Styles_1.default();
    let recipeTitleField;
    let recipeDetailsField;
    let servingsField;
    let sourceURLField;
    let cookTimeMinutesField;
    let cookTimeHoursField;
    const imageURLFields = [];
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
        return null;
    };
    const validateURLs = (urls) => {
        if (Array.isArray(urls)) {
            return urls.map((url) => !isURL_1.default(url.value));
        }
        if (urls === '') {
            return [true];
        }
        return [!isURL_1.default(urls)];
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
        }
        else {
            changeValue((prevValue) => [...prevValue, newValue]);
        }
    };
    const handleImageURLBoxAdd = () => {
        if (imageURLBoxes < 6) {
            setImageURLBoxes(imageURLBoxes + 1);
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
    const handleStepsChange = (newSteps) => {
        setSteps(newSteps);
    };
    const handleNotesChange = (newNotes) => {
        setAddtionalNotes(newNotes);
    };
    const handleHoursChange = (value) => {
        if (value < 0) {
            cookTimeHoursField.value = 1;
        }
        else if (value > 99) {
            cookTimeHoursField.value = 99;
        }
    };
    const handleMinutesChange = (value) => {
        if (value < 0) {
            cookTimeMinutesField.value = 1;
        }
        else if (value > 59) {
            cookTimeMinutesField.value = 59;
        }
    };
    const handleErrors = () => {
        setErrorMessageOpen(true);
    };
    const handleSubmit = (e) => {
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
        const imageErrors = validateURLs(imageURLFields);
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
            submit({
                title: recipeTitleField.value,
                details: recipeDetailsField.value,
                servings: servingsField.value,
                cookTime: {
                    hours: cookTimeHoursField.value,
                    minutes: cookTimeMinutesField.value,
                    formatted: formatCookTime(cookTimeHoursField.value, cookTimeMinutesField.value),
                },
                sourceURL: sourceURLField.value,
                imageURLs: imageURLFields.map((url) => url.value),
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
            });
        }
        else {
            handleErrors();
        }
    };
    // ================================================================================= //
    // ================================================================================= //
    // ================================================================================= //
    return (react_1.default.createElement("form", { noValidate: true, autoComplete: "off", onSubmit: handleSubmit },
        react_1.default.createElement(Paper_1.default, { className: classes.section },
            react_1.default.createElement(Typography_1.default, { variant: "h3", gutterBottom: true, className: classes.secondaryTitle }, "Basic Information"),
            react_1.default.createElement(TextField_1.default, { className: classes.field, name: "name", defaultValue: title, label: "Recipe Name", variant: "outlined", color: "secondary", fullWidth: true, required: true, inputRef: (ref) => {
                    recipeTitleField = ref;
                }, error: titleError }),
            react_1.default.createElement(TextField_1.default, { className: classes.field, name: "summary", defaultValue: details, label: "Summary", variant: "outlined", color: "secondary", multiline: true, rows: 4, fullWidth: true, required: true, inputRef: (ref) => {
                    recipeDetailsField = ref;
                }, error: detailsError }),
            react_1.default.createElement(TextField_1.default, { className: classes.field, name: "sourceURL", defaultValue: sourceURL, label: "Source URL", variant: "outlined", color: "secondary", multiline: true, rows: 4, fullWidth: true, helperText: sourceURLError ? 'Invalid URL please fix and resubmit or remove' : '', inputRef: (ref) => {
                    sourceURLField = ref;
                }, error: sourceURLError }),
            react_1.default.createElement("div", { className: classes.yieldCookTimeContainer },
                react_1.default.createElement("div", { className: classes.yieldCookTime },
                    react_1.default.createElement("div", { className: classes.yieldCookTimeTitle },
                        react_1.default.createElement(Typography_1.default, { variant: "h5" }, "Yield:")),
                    react_1.default.createElement(TextField_1.default, { className: classes.field, name: "cookTimeHours", defaultValue: servings, label: "Servings", variant: "outlined", color: "secondary", type: "number", onChange: (e) => handleHoursChange(parseInt(e.target.value, 10)), inputProps: { min: 1, max: 99 }, inputRef: (ref) => {
                            servingsField = ref;
                        } })),
                react_1.default.createElement("div", { className: classes.yieldCookTime },
                    react_1.default.createElement("div", { className: classes.yieldCookTimeTitle },
                        react_1.default.createElement(Typography_1.default, { variant: "h5" }, "Total Cook Time:")),
                    react_1.default.createElement(TextField_1.default, { className: classes.field, name: "cookTimeHours", defaultValue: Number(cookTime.hours), label: "Hours", variant: "outlined", color: "secondary", type: "number", onChange: (e) => handleHoursChange(parseInt(e.target.value, 10)), inputProps: { min: 0, max: 99 }, inputRef: (ref) => {
                            cookTimeHoursField = ref;
                        } }),
                    react_1.default.createElement(TextField_1.default, { className: classes.field, name: "cookTimeMinutes", defaultValue: cookTime.minutes, label: "Minutes", variant: "outlined", color: "secondary", type: "number", onChange: (e) => handleMinutesChange(parseInt(e.target.value, 10)), inputProps: { min: 0, max: 59 }, inputRef: (ref) => {
                            cookTimeMinutesField = ref;
                        } })))),
        react_1.default.createElement(Paper_1.default, { className: classes.section },
            react_1.default.createElement(Typography_1.default, { variant: "h3", className: classes.secondaryTitle, gutterBottom: true }, "Images"),
            react_1.default.createElement("span", null,
                react_1.default.createElement(Button_1.default, { variant: "contained", color: "primary", disabled: imageURLBoxes >= 6, endIcon: react_1.default.createElement(Add_1.default, null), className: classes.addImageURLBtn, onClick: () => handleImageURLBoxAdd() }, "Add images (maximum of 6)"),
                react_1.default.createElement(Button_1.default, { className: classes.removeImageURLbtn, disabled: imageURLBoxes <= 0, onClick: () => handleImageURlBoxRemove(), endIcon: react_1.default.createElement(Remove_1.default, null) }, "Remove")),
            [...Array(imageURLBoxes)].map((value, index) => (react_1.default.createElement(TextField_1.default, { key: index, className: classes.field, name: `extraImageURL ${index}`, defaultValue: imageURLs[index], label: "Image URL", variant: "outlined", color: "secondary", multiline: true, rows: 4, helperText: imageURLErrors[index] ? 'Invalid URL please fix and resubmit or remove' : '', inputRef: (ref) => {
                    imageURLFields[index] = ref;
                }, error: imageURLErrors[index], fullWidth: true })))),
        react_1.default.createElement(Paper_1.default, { className: classes.section },
            react_1.default.createElement(Typography_1.default, { variant: "h3", gutterBottom: true, className: classes.secondaryTitle }, "Recipe Tags"),
            react_1.default.createElement(RecipeCheckBoxes_1.default, { categoryError: categoryError, handleCheckBoxValueChange: handleCheckBoxValueChange, categories: categories, dietTags: dietTags, intolerances: intolerances })),
        react_1.default.createElement(Paper_1.default, { className: classes.section },
            react_1.default.createElement(Typography_1.default, { variant: "h3", gutterBottom: true, className: classes.secondaryTitle }, "Ingredients"),
            react_1.default.createElement(IngredientsSearch_1.default, { ingredientsError: ingredientsError, ingredients: ingredients, changeIngredientValue: changeIngredientValue, handleIngredientAdd: handleIngredientAdd, handleIngredientRemove: handleIngredientRemove, handleCustomUnit: handleCustomUnit, api: api })),
        react_1.default.createElement(Paper_1.default, { className: classes.section },
            react_1.default.createElement(Typography_1.default, { variant: "h3", gutterBottom: true, className: classes.secondaryTitle }, "Steps"),
            react_1.default.createElement(Steps_1.default, { stepType: "step", handleStepsChange: handleStepsChange, steps: steps, stepsError: stepsError })),
        react_1.default.createElement(Paper_1.default, { className: classes.section },
            react_1.default.createElement(Typography_1.default, { variant: "h3", gutterBottom: true, className: classes.secondaryTitle }, "Additonal Notes"),
            react_1.default.createElement(Steps_1.default, { stepType: "note", handleStepsChange: handleNotesChange, steps: additionalNotes, stepsError: null })),
        react_1.default.createElement(Button_1.default, { variant: "contained", type: "submit", color: "primary", endIcon: react_1.default.createElement(Add_1.default, null) }, submitBtnText),
        react_1.default.createElement("br", null),
        react_1.default.createElement("br", null),
        react_1.default.createElement(Snackbar_1.default, { autoHideDuration: 8000, onClose: () => setErrorMessageOpen(false), open: errorMessageOpen, message: "Your recipe contains one or more errors.", action: react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(IconButton_1.default, { color: "primary", onClick: () => setErrorMessageOpen(false) },
                    react_1.default.createElement(Close_1.default, null))) })));
};
exports.default = RecipeForm;
