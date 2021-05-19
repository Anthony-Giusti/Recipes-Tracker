import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/';
import { useState } from 'react';
import { useHistory } from 'react-router';

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
  // const [spoonApiKey] = useState(process.env.REACT_APP_SPOONACULAR_KEY);
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

  const fetchRecipes = () => {
    setIsFetchingRecipes(true);
    fetch('http://localhost:8000/recipes').then((response) => {
      response.json().then((data) => {
        console.log(data);
        setRecipes(data);
        setSearchedRecipes(data);
        setVisibleRecipes(data);
        setIsFetchingRecipes(false);
      });
    });
  };

  const addRecipe = (recipe) => {
    let returnedData = [];
    fetch(
      'https://storage.googleapis.com/storage/v1/b/recipe-app-ag/o/recipes.json?alt=media'
    ).then((response) => {
      response.json().then((data) => {
        returnedData = data;
      });
    });

    fetch(
      ' https://storage.googleapis.com/upload/storage/v1/b/recipe-app-ag/o?name=recipes.json&uploadType=media',
      {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify([recipe]),
      }
    ).then((response) => console.log(response));
  };

  const deleteRecipe = async (recipeId) => {
    // await fetch(`http://localhost:8000/recipes/${recipeId}`, {
    //   method: 'DELETE',
    // });
    // const newRecipes = recipes.filter((recipe) => recipe.id !== recipeId);
    // setRecipes(newRecipes);

    const user = 'beep';
    await fetch(`http://localhost:8000/${user}/recipes/${recipeId}`, {
      method: 'DELETE',
    });
    const newRecipes = recipes.filter((recipe) => recipe.id !== recipeId);
    setRecipes(newRecipes);
  };

  const filterRecipes = () => {
    const filterOutput = [];
    setIsFiltered(true);

    const beans = isSearching ? searchedRecipes : recipes;

    beans.forEach((recipe) => {
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
        filterOutput.push(recipe);
      }
    });

    setFilteredRecipes(filterOutput);
    setVisibleRecipes(filterOutput);
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

    filterRecipes();
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

  const searchRecipes = (value) => {
    if (!value) {
      emptySearch();
      return;
    }

    setRecipeSearchText(value);

    if (!isSearching) {
      setIsSearching(true);
    }

    const searchResults = [];
    const query = value.toLowerCase();

    const beans = isFiltered ? filteredRecipes : recipes;

    beans.forEach((recipe) => {
      if (recipe.title.toLowerCase().includes(query)) {
        searchResults.push(recipe);
      }
    });

    setSearchedRecipes(searchResults);
    setVisibleRecipes(searchResults);
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

  return (
    <ThemeProvider theme={Theme}>
      <>
        <Layout
          filteredTags={filteredTags}
          filterRecipes={filterTags}
          categoryOptions={categoryOptions}
          dietTagOptions={dietTagOptions}
          intoleranceOptions={intoleranceOptions}
          searchRecipes={searchRecipes}
          isSearching={isSearching}
          emptySearch={emptySearch}
          recipeSearchText={recipeSearchText}
        >
          <Switch>
            <Route exact path="/">
              <Recipes
                fetchRecipes={fetchRecipes}
                isFetchingRecipes={isFetchingRecipes}
                recipes={recipes}
                fileredRecipes={visibleRecipes}
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
              <Edit currentRecipe={currentRecipe} />
            </Route>
          </Switch>
        </Layout>
      </>
    </ThemeProvider>
  );
}

export default App;
