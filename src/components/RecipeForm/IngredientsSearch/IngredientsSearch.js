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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable react/prop-types */
const react_1 = __importStar(require("react"));
const Button_1 = __importDefault(require("@material-ui/core/Button"));
const Container_1 = __importDefault(require("@material-ui/core/Container"));
const FormControl_1 = __importDefault(require("@material-ui/core/FormControl"));
const FormHelperText_1 = __importDefault(require("@material-ui/core/FormHelperText"));
const Grid_1 = __importDefault(require("@material-ui/core/Grid"));
const TextField_1 = __importDefault(require("@material-ui/core/TextField"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const CircularProgress_1 = __importDefault(require("@material-ui/core/CircularProgress"));
const Add_1 = __importDefault(require("@material-ui/icons/Add"));
const Remove_1 = __importDefault(require("@material-ui/icons/Remove"));
const Ingredient_1 = __importDefault(require("./Ingredient/Ingredient"));
const Styles_1 = __importDefault(require("./Styles"));
const IngredientsSearch = ({ ingredientsError, ingredients, handleIngredientAdd, handleIngredientRemove, changeIngredientValue, handleCustomUnit, api, }) => {
    const classes = Styles_1.default();
    const [ingredientsSearch, setIngredientsSearch] = react_1.useState([]);
    const [resultsFound, setResultsFound] = react_1.useState(false);
    const [isSearching, setIsSearching] = react_1.useState(false);
    const [emptyQuery, setEmptyQuery] = react_1.useState(true);
    const searchIngredients = (query) => __awaiter(void 0, void 0, void 0, function* () {
        if (!query) {
            setEmptyQuery(true);
        }
        setIsSearching(true);
        setEmptyQuery(false);
        yield api.get(`/getIngredients?query=${query}`).then((response) => {
            setIngredientsSearch(response.data);
            if (response.data.length === 0) {
                setResultsFound(false);
            }
            else {
                setResultsFound(true);
            }
        });
        setIsSearching(false);
    });
    const handleAddingredient = (ingredient, ingredients) => {
        handleIngredientAdd(ingredient, ingredients);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(FormControl_1.default, { error: ingredientsError },
            react_1.default.createElement("div", { className: classes.searchBar },
                react_1.default.createElement(TextField_1.default
                // className={classes.ingredientSearchField}
                , { 
                    // className={classes.ingredientSearchField}
                    label: "Seach Ingredients", onChange: (e) => searchIngredients(e.target.value) }),
                isSearching && (react_1.default.createElement("span", { className: classes.progress },
                    react_1.default.createElement(CircularProgress_1.default, { size: 25 })))),
            !resultsFound && !emptyQuery && react_1.default.createElement(Typography_1.default, null, "No Results Found"),
            ingredientsError && react_1.default.createElement(FormHelperText_1.default, null, "You must have at least one ingredient"),
            react_1.default.createElement(Container_1.default, { className: classes.searchResults }, ingredientsSearch.map((ingredient) => ingredients.every((element) => element.id !== ingredient.id) ? (react_1.default.createElement(Button_1.default, { key: ingredient.name, variant: "contained", className: classes.searchResultsItem, onClick: () => handleAddingredient(ingredient, ingredients), endIcon: react_1.default.createElement(Add_1.default, null) }, ingredient.name)) : (react_1.default.createElement(Button_1.default, { key: ingredient.name, variant: "contained", color: "primary", className: `${classes.searchResultsItem}`, 
                // className={`${classes.searchResultsItem} ${classes.ingredientSearchBtn}`}
                onClick: () => handleIngredientRemove(ingredient), endIcon: react_1.default.createElement(Remove_1.default, null) }, ingredient.name))))),
        react_1.default.createElement(Grid_1.default /* className={classes.ingredients} */, { container: true, spacing: 2 }, ingredients.map((ingredient) => (react_1.default.createElement(Grid_1.default, { item: true, xs: 12, md: 6, key: ingredient.id },
            react_1.default.createElement(Ingredient_1.default, { handleCustomUnit: handleCustomUnit, ingredient: ingredient, removeIngredient: handleIngredientRemove, changeIngredientValue: changeIngredientValue })))))));
};
exports.default = IngredientsSearch;
