import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { IconButton, ThemeProvider } from '@material-ui/core/';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';

import printJS from 'print-js';

import Snackbar from '@material-ui/core/Snackbar';

import CloseIcon from '@material-ui/icons/Close';
import Recipes from './pages/Recipes/Recipes';
import Create from './pages/Create/Create';
import Edit from './pages/Edit/Edit';
import Layout from './Layout/Layout';

import Theme from './Themes/Theme';

import { categoryOptions, dietTagOptions, intoleranceOptions } from './data/_recipeTagOptions';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

console.log(process.env.REACT_APP_BASE_URL);

const exampleId = '60ad6626fdffdda805fdee0d';

function App() {
  const [clientId, setClientId] = useState();
  const [isSignedIn, setIsSignedIn] = useState();
  const [userId, setUserId] = useState();
  const [googleProfile, setGoogleProfile] = useState({});

  const [ingredientsSearch, setIngredientsSearch] = useState([]);
  const [isFetchingRecipes, setIsFetchingRecipes] = useState(true);
  const [bootUpWarning, setBootUpWarning] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [exampleDataLoaded, setExampleDataLoaded] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [filteredRecipes, setFilteredRecipes] = useState();
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [deleteRecipeId, setDeleteRecipeId] = useState();
  const [visibleRecipes, setVisibleRecipes] = useState([]);
  const [filteredTags, setFilteredTags] = useState({
    categories: [],
    dietTags: [],
    intolerances: [],
  });
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [maxRecipes, setmaxRecipes] = useState(9);
  const [recipeSearchText, setRecipeSearchText] = useState('');

  const history = useHistory();

  const fetchUserId = async (googleID) => {
    await api.get(`/getUser?googleId=${googleID}`).then((response) => {
      setUserId(response.data);
    });
  };

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

  const fetchGoogle = async () => {
    await api.get('/getGoogle').then((response) => {
      setClientId(response.data);
    });
  };

  const fetchRecipes = () => {
    if (!userId) {
      return;
    }

    setIsFetchingRecipes(true);

    if (exampleDataLoaded && !isSignedIn) {
      setVisibleRecipes(recipes);
      setIsFetchingRecipes(false);
    } else {
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
    } else {
      setExampleDataLoaded(false);
    }

    setmaxRecipes(9);
  };

  const addRecipe = async (recipe) => {
    if (isSignedIn) {
      await api.post(`/addRecipe?userId=${userId}`, { recipe }).then((response) => {
        console.log(response);
        history.push('/');
      });
    } else {
      recipes.push(recipe);
    }

    history.push('/');
  };

  const editRecipe = async (recipeEdited) => {
    if (isSignedIn) {
      await api.post(`/editRecipe?userId=${userId}`, { recipe: recipeEdited }).then((response) => {
        console.log(response);
        history.push('/');
      });
    } else {
      const newRecipes = recipes;
      newRecipes.splice(
        newRecipes.findIndex((prevRecipe) => prevRecipe.id === recipeEdited.id),
        1,
        recipeEdited
      );

      setRecipes(newRecipes);
      history.push('/');
    }
  };

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
      if (
        (recipe.categories.raw.some(
          (category) => filteredTags.categories.indexOf(category) !== -1
        ) ||
          filteredTags.categories.length < 1) &&
        (recipe.dietTags.raw.some((dietTag) => filteredTags.dietTags.indexOf(dietTag) !== -1) ||
          filteredTags.dietTags.length < 1) &&
        (recipe.intolerances.raw.every(
          (intolerance) => filteredTags.intolerances.indexOf(intolerance) === -1
        ) ||
          filteredTags.intolerances.length < 1 ||
          recipe.intolerances.raw.length < 1)
      ) {
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
    if (
      filteredTags.categories.length === 0 &&
      filteredTags.dietTags.length === 0 &&
      filteredTags.intolerances.length === 0
    ) {
      resetFilterTags();
      return;
    }

    const filtered = filterRecipes(recipes);
    setIsFiltered(true);
    setFilteredRecipes(filtered);

    if (isSearching) {
      setVisibleRecipes(filterRecipes(searchedRecipes));
    } else {
      setVisibleRecipes(filtered);
    }
  };

  const filterTags = (value, tagGroup) => {
    const newTags = filteredTags;
    if (filteredTags[tagGroup].includes(value)) {
      newTags[tagGroup] = newTags[tagGroup].filter((tag) => tag !== value);
      setFilteredTags(newTags);
    } else {
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
    query.toLowerCase();

    recipes.forEach((recipe) => {
      if (recipe.title.toLowerCase().includes(query)) {
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
    } else {
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
      } else {
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
    printJS('recipe-print', 'html');
  };

  const showMoreRecipes = () => {
    setmaxRecipes(maxRecipes + 9);
  };

  useEffect(() => {
    fetchGoogle();
    if (!isSignedIn) {
      setUserId(exampleId);
    }
  }, []);

  useEffect(() => {
    handleSearch();
  }, [recipeSearchText]);

  useEffect(() => {
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

  useEffect(() => {
    fetchRecipes();
  }, [userId]);

  return (
    <ThemeProvider theme={Theme}>
      <>
        <Layout
          filteredTags={filteredTags}
          filterRecipes={filterTags}
          categoryOptions={categoryOptions}
          dietTagOptions={dietTagOptions}
          intoleranceOptions={intoleranceOptions}
          searchRecipes={handleQuery}
          isSearching={isSearching}
          isFiltered={isFiltered}
          emptySearch={emptySearch}
          recipeSearchText={recipeSearchText}
          clientId={clientId}
          handleSignIn={handleSignIn}
          handleSignOut={handleSignOut}
          isSignedIn={isSignedIn}
          googleProfile={googleProfile}
          isFetchingRecipes={isFetchingRecipes}
        >
          <Switch>
            <Route exact path="/">
              <Recipes
                fetchRecipes={fetchRecipes}
                isFetchingRecipes={isFetchingRecipes}
                recipes={recipes}
                visibleRecipes={visibleRecipes}
                resetFilterTags={resetFilterTags}
                deleteRecipe={deleteRecipe}
                getIngredientObject={addIngredient}
                ingredientsSearch={ingredientsSearch}
                handleIngreidentSearch={handleIngreidentSearch}
                handleCheckBoxValueChange={handleCheckBoxValueChange}
                handleCurrentRecipe={handleCurrentRecipe}
                filteredTags={filteredTags}
                filterTags={filterTags}
                formatName={formatName}
                printRecipe={printRecipe}
                showMoreRecipes={showMoreRecipes}
                maxRecipes={maxRecipes}
              />
            </Route>
            <Route path="/create">
              <Create
                addRecipe={addRecipe}
                ingredientsSearch={ingredientsSearch}
                handleIngreidentSearch={handleIngreidentSearch}
              />
            </Route>
            <Route path="/edit">
              <Edit currentRecipe={currentRecipe} editRecipe={editRecipe} />
            </Route>
          </Switch>
        </Layout>
      </>

      {bootUpWarning && (
        <Snackbar
          autoHideDuration={8000}
          open={bootUpWarning}
          onClose={() => setBootUpWarning(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          message="This app uses free options of Mongo and Heroku it may be slow initially if inactive for a few hours."
          action={
            <>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => setBootUpWarning(false)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </>
          }
        />
      )}
    </ThemeProvider>
  );
}

export default App;
