import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/';

import { useHistory } from 'react-router';
import axios from 'axios';
import printJS from 'print-js';
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

import Recipes from './pages/Recipes/Recipes';
import Create from './pages/Create/Create';
import Edit from './pages/Edit/Edit';
import Layout from './Layout/Layout';
import Theme from './Themes/Theme';

import IRecipe from './shared/interfaces/Recipe.interface';
import INewRecipe from './shared/interfaces/NewRecipe.interface';
import IFilteredTags from './shared/interfaces/FilteredTags.interface';

import { categoryOptions, dietTagOptions, intoleranceOptions } from './data/_recipeTagOptions';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
    ? process.env.REACT_APP_BASE_URL
    : 'http://localhost:5000/',
});

const exampleId = () => {
  if (process.env.REACT_APP_EXAMPLE_USER_ID) {
    return process.env.REACT_APP_EXAMPLE_USER_ID;
  }
  return '';
};

const App: React.FC = () => {
  const [clientId, setClientId] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userId, setUserId] = useState('');
  const [googleProfile, setGoogleProfile] = useState({});
  const [newOfflineRecipesAdded, setNewOfflineRecipesAdded] = useState(0);

  const [isFetchingRecipes, setIsFetchingRecipes] = useState(true);
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<IRecipe[]>([]);
  const [searchedRecipes, setSearchedRecipes] = useState<IRecipe[]>([]);
  const [visibleRecipes, setVisibleRecipes] = useState<IRecipe[]>([]);
  const [exampleDataLoaded, setExampleDataLoaded] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [deleteRecipeId, setDeleteRecipeId] = useState('');
  const [filteredTags, setFilteredTags] = useState<IFilteredTags>({
    categories: [],
    dietTags: [],
    intolerances: [],
  });
  const [currentRecipe, setCurrentRecipe] = useState<IRecipe | null>(null);
  const [maxRecipes, setmaxRecipes] = useState(9);
  const [recipeSearchText, setRecipeSearchText] = useState('');

  const history = useHistory();

  const fetchUserId = async (googleID: string) => {
    await api.get(`/getUser?googleId=${googleID}`).then((response) => {
      setUserId(response.data);
    });
  };

  const handleSignIn = (googleResponse: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    // the "code" property is undefined on a successfull login
    if (!googleResponse.code) {
      const googleLoginResponse: GoogleLoginResponse = Object.assign(googleResponse);

      setIsSignedIn(true);
      setGoogleProfile(googleLoginResponse.profileObj);
      fetchUserId(googleLoginResponse.googleId);
    } else {
      console.log(googleResponse.code);
    }
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

    if (userId === exampleId()) {
      setExampleDataLoaded(true);
    } else {
      setExampleDataLoaded(false);
    }

    setmaxRecipes(9);
  };

  const addRecipe = async (recipe: INewRecipe): Promise<void> => {
    if (isSignedIn) {
      await api.post(`/addRecipe?userId=${userId}`, { recipe }).then((response) => {
        console.log(response);
        history.push('/');
      });
    } else {
      const newID = { id: newOfflineRecipesAdded.toString() };
      const newRecipe: IRecipe = Object.assign(recipe, newID);
      setNewOfflineRecipesAdded((prev) => prev + 1);
      recipes.push(newRecipe);
    }

    history.push('/');
  };

  const editRecipe = async (recipeEdited: IRecipe) => {
    if (isSignedIn) {
      await api.post(`/editRecipe?userId=${userId}`, { recipe: recipeEdited }).then((response) => {
        console.log(response);
        history.push('/');
      });
    } else {
      const newRecipes: IRecipe[] = recipes;
      newRecipes.splice(
        newRecipes.findIndex((prevRecipe) => prevRecipe.id === recipeEdited.id),
        1,
        recipeEdited
      );

      setRecipes(newRecipes);
      history.push('/');
    }
  };

  const deleteRecipe = (recipeId: string): void => {
    if (isSignedIn) {
      api.get(`/removeRecipe?userId=${userId}&recipeId=${recipeId}`);
    }

    setDeleteRecipeId(recipeId);
    setRecipes(recipes.filter((recipe) => recipe.id !== recipeId));
    setFilteredRecipes(filteredRecipes.filter((recipe) => recipe.id !== recipeId));
    setSearchedRecipes(searchedRecipes.filter((recipe) => recipe.id !== recipeId));
  };

  const filterRecipes = (recipes: IRecipe[]): IRecipe[] => {
    const filteredRecipes: IRecipe[] = [];

    recipes.forEach((recipe: IRecipe) => {
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

  const filterTags = (
    value: string,
    tagGroup: 'intolerances' | 'dietTags' | 'categories'
  ): void => {
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

  const emptySearch = (): void => {
    setIsSearching(false);
    setSearchedRecipes(recipes);
    setVisibleRecipes(filteredRecipes);
    setRecipeSearchText('');
  };

  const searchRecipes = (query: string, recipes: IRecipe[]): IRecipe[] => {
    const searchResults: IRecipe[] = [];
    const search = query.toLowerCase();

    recipes.forEach((recipe) => {
      if (recipe.title.toLowerCase().includes(search)) {
        searchResults.push(recipe);
      }
    });

    return searchResults;
  };

  const handleQuery = (query: string): void => {
    if (!query) {
      emptySearch();
      setIsSearching(false);
      return;
    }

    setRecipeSearchText(query);
    setIsSearching(true);
  };

  const handleSearch = (): void => {
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

  const handleFilterAndSearch = (): void => {
    setFilteredRecipes(filteredRecipes.filter((recipe) => recipe.id !== deleteRecipeId));
    setSearchedRecipes(searchedRecipes.filter((recipe) => recipe.id !== deleteRecipeId));
    setVisibleRecipes(visibleRecipes.filter((recipe) => recipe.id !== deleteRecipeId));
  };

  const handleCurrentRecipe = (recipe: IRecipe): void => {
    setCurrentRecipe(recipe);
    history.push('/edit');
  };

  const printRecipe = (): void => {
    printJS('recipe-print', 'html');
  };

  const showMoreRecipes = (): void => {
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
          filterTags={filterTags}
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
        >
          <Switch>
            <Route exact path="/">
              <Recipes
                fetchRecipes={fetchRecipes}
                isFetchingRecipes={isFetchingRecipes}
                visibleRecipes={visibleRecipes}
                resetFilterTags={resetFilterTags}
                deleteRecipe={deleteRecipe}
                handleCurrentRecipe={handleCurrentRecipe}
                filteredTags={filteredTags}
                filterTags={filterTags}
                printRecipe={printRecipe}
                showMoreRecipes={showMoreRecipes}
                maxRecipes={maxRecipes}
                emptySearch={emptySearch}
              />
            </Route>
            <Route path="/create">
              <Create addRecipe={addRecipe} api={api} />
            </Route>
            <Route path="/edit">
              <Edit currentRecipe={currentRecipe} editRecipe={editRecipe} api={api} />
            </Route>
          </Switch>
        </Layout>
      </>
    </ThemeProvider>
  );
};

export default App;
