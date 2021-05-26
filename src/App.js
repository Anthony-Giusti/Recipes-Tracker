import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';

import printJS from 'print-js';

import Recipes from './pages/Recipes/Recipes';
import Create from './pages/Create/Create';
import Edit from './pages/Edit/Edit';

import Layout from './pages/Layout/Layout';
import Theme from './Themes/Theme';

import {
  categoryOptions,
  dietTagOptions,
  intoleranceOptions,
} from './components/RecipeCheckBoxes/_data';

function App() {
  const [exampleId] = useState('60ad6626fdffdda805fdee0d');
  const [clientId, setClientId] = useState();
  const [isSignedIn, setIsSignedIn] = useState();
  const [userId, setUserId] = useState();
  const [googleProfile, setGoogleProfile] = useState({});

  const [ingredientsSearch, setIngredientsSearch] = useState([]);
  const [isFetchingRecipes, setIsFetchingRecipes] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [filteredRecipes, setFilteredRecipes] = useState();
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [visibleRecipes, setVisibleRecipes] = useState([]);
  const [filteredTags, setFilteredTags] = useState({
    categories: [],
    dietTags: [],
    intolerances: [],
  });
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [recipeSearchText, setRecipeSearchText] = useState('');

  const history = useHistory();

  const fetchUserId = async (googleID) => {
    await axios.get(`/getUser?googleId=${googleID}`).then((reponse) => {
      setUserId(reponse.data);
    });
  };

  const handleSignIn = (response) => {
    setIsSignedIn(true);
    setGoogleProfile(response.profileObj);
    fetchUserId(response.googleId);
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    setUserId(exampleId);
  };

  const fetchGoogle = async () => {
    await axios.get('/getGoogle').then((response) => {
      setClientId(response.data);
    });
  };

  const fetchRecipes = () => {
    setIsFetchingRecipes(true);

    axios.get(`/getRecipes?userId=${userId}`).then((response) => {
      setRecipes(response.data);
      setVisibleRecipes(response.data);
      setIsFetchingRecipes(false);
    });
  };

  const addRecipe = async (recipe) => {
    axios.post(`/addRecipe?userId=${userId}`, { recipe });
    history.push('/');
  };

  const editRecipe = async (recipe) => {
    axios.post(`/editRecipe?userId=${userId}`, { recipe });
    history.push('/');
  };

  const deleteRecipe = async (recipeId) => {
    await axios.get(`/removeRecipe?userId=${userId}&recipeId=${recipeId}`);
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

  const handleFilter = () => {
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

  const resetFilterTags = () => {
    setFilteredTags({ categories: [], dietTags: [], intolerances: [] });
    setIsFiltered(false);
    setFilteredRecipes(recipes);
    setVisibleRecipes(searchedRecipes);
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

  const handleSearch = (query) => {
    if (!query) {
      emptySearch();
      return;
    }

    setRecipeSearchText(query);
    setIsSearching(true);

    const searched = searchRecipes(query, recipes);
    setSearchedRecipes(searched);

    if (isFiltered) {
      setVisibleRecipes(searchRecipes(query, filteredRecipes));
    } else {
      setVisibleRecipes(searched);
    }
  };

  const handleIngreidentSearch = (data) => {
    setIngredientsSearch(data);
  };

  const handleCurrentRecipe = (recipe) => {
    console.log(recipe);
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

  useEffect(() => {
    fetchGoogle();
  }, []);

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
          searchRecipes={handleSearch}
          isSearching={isSearching}
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
    </ThemeProvider>
  );
}

export default App;
