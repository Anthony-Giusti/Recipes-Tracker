"use strict";
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
const react_router_dom_1 = require("react-router-dom");
const core_1 = require("@material-ui/core/");
const react_1 = require("react");
const react_router_1 = require("react-router");
const axios_1 = __importDefault(require("axios"));
const print_js_1 = __importDefault(require("print-js"));
const Snackbar_1 = __importDefault(require("@material-ui/core/Snackbar"));
const Close_1 = __importDefault(require("@material-ui/icons/Close"));
const Recipes_1 = __importDefault(require("./pages/Recipes/Recipes"));
const Create_1 = __importDefault(require("./pages/Create/Create"));
const Edit_1 = __importDefault(require("./pages/Edit/Edit"));
const Layout_1 = __importDefault(require("./Layout/Layout"));
const Theme_1 = __importDefault(require("./Themes/Theme"));
const _recipeTagOptions_1 = require("./data/_recipeTagOptions");
const api = axios_1.default.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});
const exampleId = process.env.REACT_APP_EXAMPLE_USER_ID;
const App = () => {
    const [clientId, setClientId] = react_1.useState();
    const [isSignedIn, setIsSignedIn] = react_1.useState();
    const [userId, setUserId] = react_1.useState();
    const [googleProfile, setGoogleProfile] = react_1.useState({});
    const [ingredientsSearch, setIngredientsSearch] = react_1.useState([]);
    const [isFetchingRecipes, setIsFetchingRecipes] = react_1.useState(true);
    const [bootUpWarning, setBootUpWarning] = react_1.useState(true);
    const [recipes, setRecipes] = react_1.useState([]);
    const [exampleDataLoaded, setExampleDataLoaded] = react_1.useState(false);
    const [isFiltered, setIsFiltered] = react_1.useState(false);
    const [isSearching, setIsSearching] = react_1.useState(false);
    const [filteredRecipes, setFilteredRecipes] = react_1.useState([]);
    const [searchedRecipes, setSearchedRecipes] = react_1.useState([]);
    const [deleteRecipeId, setDeleteRecipeId] = react_1.useState();
    const [visibleRecipes, setVisibleRecipes] = react_1.useState([]);
    const [filteredTags, setFilteredTags] = react_1.useState({
        categories: [],
        dietTags: [],
        intolerances: [],
    });
    const [currentRecipe, setCurrentRecipe] = react_1.useState(null);
    const [maxRecipes, setmaxRecipes] = react_1.useState(9);
    const [recipeSearchText, setRecipeSearchText] = react_1.useState('');
    const history = react_router_1.useHistory();
    const fetchUserId = (googleID) => __awaiter(void 0, void 0, void 0, function* () {
        yield api.get(`/getUser?googleId=${googleID}`).then((response) => {
            setUserId(response.data);
        });
    });
    const handleSignIn = (response) => {
        if (!response && !isSignedIn) {
            setUserId(exampleId);
            return;
        }
        setIsSignedIn(true);
        setGoogleProfile(response.profileObj);
        fetchUserId(response.googleId);
    };
    const handleSignOut = () => {
        setIsSignedIn(false);
        setUserId(exampleId);
    };
    const fetchGoogle = () => __awaiter(void 0, void 0, void 0, function* () {
        yield api.get('/getGoogle').then((response) => {
            setClientId(response.data);
        });
    });
    const fetchRecipes = () => {
        if (!userId) {
            return;
        }
        setIsFetchingRecipes(true);
        if (exampleDataLoaded && !isSignedIn) {
            setVisibleRecipes(recipes);
            setIsFetchingRecipes(false);
        }
        else {
            if (!isSignedIn) {
                setUserId(exampleId);
            }
            api.get(`/getRecipes?userId=${userId}`).then((response) => {
                setRecipes(response.data);
                setFilteredRecipes(response.data);
                setSearchedRecipes(response.data);
            });
        }
        if (userId === exampleId) {
            setExampleDataLoaded(true);
        }
        else {
            setExampleDataLoaded(false);
        }
        setmaxRecipes(9);
    };
    const addRecipe = (recipe) => __awaiter(void 0, void 0, void 0, function* () {
        if (isSignedIn) {
            yield api.post(`/addRecipe?userId=${userId}`, { recipe }).then((response) => {
                console.log(response);
                history.push('/');
            });
        }
        else {
            recipes.push(recipe);
        }
        history.push('/');
    });
    const editRecipe = (recipeEdited) => __awaiter(void 0, void 0, void 0, function* () {
        if (isSignedIn) {
            yield api.post(`/editRecipe?userId=${userId}`, { recipe: recipeEdited }).then((response) => {
                console.log(response);
                history.push('/');
            });
        }
        else {
            const newRecipes = recipes;
            newRecipes.splice(newRecipes.findIndex((prevRecipe) => prevRecipe.id === recipeEdited.id), 1, recipeEdited);
            setRecipes(newRecipes);
            history.push('/');
        }
    });
    const deleteRecipe = (recipeId) => {
        if (isSignedIn) {
            api.get(`/removeRecipe?userId=${userId}&recipeId=${recipeId}`);
        }
        setDeleteRecipeId(recipeId);
        setRecipes(recipes.filter((recipe) => recipe.id !== recipeId));
        setFilteredRecipes(filteredRecipes.filter((recipe) => recipe.id !== recipeId));
        setSearchedRecipes(searchedRecipes.filter((recipe) => recipe.id !== recipeId));
    };
    const filterRecipes = (recipes) => {
        const filteredRecipes = [];
        recipes.forEach((recipe) => {
            if ((recipe.categories.raw.some((category) => filteredTags.categories.indexOf(category) !== -1) ||
                filteredTags.categories.length < 1) &&
                (recipe.dietTags.raw.some((dietTag) => filteredTags.dietTags.indexOf(dietTag) !== -1) ||
                    filteredTags.dietTags.length < 1) &&
                (recipe.intolerances.raw.every((intolerance) => filteredTags.intolerances.indexOf(intolerance) === -1) ||
                    filteredTags.intolerances.length < 1 ||
                    recipe.intolerances.raw.length < 1)) {
                filteredRecipes.push(recipe);
            }
        });
        return filteredRecipes;
    };
    const resetFilterTags = () => {
        setFilteredTags({ categories: [], dietTags: [], intolerances: [] });
        setIsFiltered(false);
        setFilteredRecipes(recipes);
        setVisibleRecipes(searchedRecipes);
    };
    const handleFilter = () => {
        if (filteredTags.categories.length === 0 &&
            filteredTags.dietTags.length === 0 &&
            filteredTags.intolerances.length === 0) {
            resetFilterTags();
            return;
        }
        const filtered = filterRecipes(recipes);
        setIsFiltered(true);
        setFilteredRecipes(filtered);
        if (isSearching) {
            setVisibleRecipes(filterRecipes(searchedRecipes));
        }
        else {
            setVisibleRecipes(filtered);
        }
    };
    const filterTags = (value, tagGroup) => {
        const newTags = filteredTags;
        if (filteredTags[tagGroup].includes(value)) {
            newTags[tagGroup] = newTags[tagGroup].filter((tag) => tag !== value);
            setFilteredTags(newTags);
        }
        else {
            newTags[tagGroup].push(value);
            setFilteredTags(newTags);
        }
        handleFilter();
    };
    const emptySearch = () => {
        setIsSearching(false);
        setSearchedRecipes(recipes);
        setVisibleRecipes(filteredRecipes);
        setRecipeSearchText('');
    };
    const searchRecipes = (query, recipes) => {
        const searchResults = [];
        const search = query.toLowerCase();
        recipes.forEach((recipe) => {
            if (recipe.title.toLowerCase().includes(search)) {
                searchResults.push(recipe);
            }
        });
        return searchResults;
    };
    const handleQuery = (query) => {
        if (!query) {
            emptySearch();
            setIsSearching(false);
            return;
        }
        setRecipeSearchText(query);
        setIsSearching(true);
    };
    const handleSearch = () => {
        if (!recipeSearchText) {
            setSearchedRecipes(recipes);
            return;
        }
        const searched = searchRecipes(recipeSearchText, recipes);
        setSearchedRecipes(searched);
        if (isFiltered) {
            setVisibleRecipes(searchRecipes(recipeSearchText, filteredRecipes));
        }
        else {
            setVisibleRecipes(searched);
        }
    };
    const handleFilterAndSearch = () => {
        setFilteredRecipes(filteredRecipes.filter((recipe) => recipe.id !== deleteRecipeId));
        setSearchedRecipes(searchedRecipes.filter((recipe) => recipe.id !== deleteRecipeId));
        setVisibleRecipes(visibleRecipes.filter((recipe) => recipe.id !== deleteRecipeId));
    };
    const handleIngreidentSearch = (data) => {
        setIngredientsSearch(data);
    };
    const handleCurrentRecipe = (recipe) => {
        setCurrentRecipe(recipe);
        history.push('/edit');
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
            }
            else {
                formattedUnits.push(formatName(unit));
            }
        });
        return formattedUnits;
    };
    const addIngredient = (ingredient, ingredients) => {
        if (ingredients.every((element) => element.id !== ingredient.id)) {
            return {
                id: ingredient.id,
                category: ingredient.aisle,
                name: formatName(ingredient.name),
                units: formatUnits(ingredient.possibleUnits),
                comment: null,
                unit: ingredient.possibleUnits[0],
                quantity: 1,
            };
        }
    };
    const handleCheckBoxValueChange = (newValue, prevValues, setValues) => {
        if (prevValues.includes(newValue)) {
            return prevValues.filter((category) => category !== newValue);
        }
        setValues((prev) => [...prev, newValue]);
    };
    const printRecipe = () => {
        print_js_1.default('recipe-print', 'html');
    };
    const showMoreRecipes = () => {
        setmaxRecipes(maxRecipes + 9);
    };
    react_1.useEffect(() => {
        fetchGoogle();
        if (!isSignedIn) {
            setUserId(exampleId);
        }
    }, []);
    react_1.useEffect(() => {
        handleSearch();
    }, [recipeSearchText]);
    react_1.useEffect(() => {
        if (exampleDataLoaded) {
            setIsFetchingRecipes(false);
        }
        setIsFetchingRecipes(false);
        if (!isFiltered && !isSearching) {
            setVisibleRecipes(recipes);
            return;
        }
        if (isFiltered && !isSearching) {
            handleFilter();
            return;
        }
        if (!isFiltered && isSearching) {
            handleSearch();
            return;
        }
        if (isFiltered && isSearching) {
            handleFilterAndSearch();
        }
    }, [recipes]);
    react_1.useEffect(() => {
        fetchRecipes();
    }, [userId]);
    return (React.createElement(core_1.ThemeProvider, { theme: Theme_1.default },
        React.createElement(React.Fragment, null,
            React.createElement(Layout_1.default, { filteredTags: filteredTags, filterRecipes: filterTags, categoryOptions: _recipeTagOptions_1.categoryOptions, dietTagOptions: _recipeTagOptions_1.dietTagOptions, intoleranceOptions: _recipeTagOptions_1.intoleranceOptions, searchRecipes: handleQuery, isSearching: isSearching, isFiltered: isFiltered, emptySearch: emptySearch, recipeSearchText: recipeSearchText, clientId: clientId, handleSignIn: handleSignIn, handleSignOut: handleSignOut, isSignedIn: isSignedIn, googleProfile: googleProfile, isFetchingRecipes: isFetchingRecipes },
                React.createElement(react_router_dom_1.Switch, null,
                    React.createElement(react_router_dom_1.Route, { exact: true, path: "/" },
                        React.createElement(Recipes_1.default, { fetchRecipes: fetchRecipes, isFetchingRecipes: isFetchingRecipes, recipes: recipes, visibleRecipes: visibleRecipes, resetFilterTags: resetFilterTags, deleteRecipe: deleteRecipe, getIngredientObject: addIngredient, ingredientsSearch: ingredientsSearch, handleIngreidentSearch: handleIngreidentSearch, handleCheckBoxValueChange: handleCheckBoxValueChange, handleCurrentRecipe: handleCurrentRecipe, filteredTags: filteredTags, filterTags: filterTags, formatName: formatName, printRecipe: printRecipe, showMoreRecipes: showMoreRecipes, maxRecipes: maxRecipes, emptySearch: emptySearch })),
                    React.createElement(react_router_dom_1.Route, { path: "/create" },
                        React.createElement(Create_1.default, { addRecipe: addRecipe, ingredientsSearch: ingredientsSearch, handleIngreidentSearch: handleIngreidentSearch, api: api })),
                    React.createElement(react_router_dom_1.Route, { path: "/edit" },
                        React.createElement(Edit_1.default, { currentRecipe: currentRecipe, editRecipe: editRecipe, api: api }))))),
        bootUpWarning && (React.createElement(Snackbar_1.default, { autoHideDuration: 8000, open: bootUpWarning, onClose: () => setBootUpWarning(false), anchorOrigin: { vertical: 'bottom', horizontal: 'left' }, message: "This app uses free options of Mongo and Heroku it may be slow initially if inactive for a few hours.", action: React.createElement(React.Fragment, null,
                React.createElement(core_1.IconButton, { size: "small", "aria-label": "close", color: "inherit", onClick: () => setBootUpWarning(false) },
                    React.createElement(Close_1.default, { fontSize: "small" }))) }))));
};
exports.default = App;
