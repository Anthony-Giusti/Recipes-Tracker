import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Button, ThemeProvider } from '@material-ui/core/';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

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
  const [clientId] = useState(process.env.REACT_APP_GOGGLE_CLIENT_KEY);
  const [loggedIn, setLoggedIn] = useState(false);
  const [authInstance, setAuthInstance] = useState(null);
  const [user, setUser] = useState();
  const [userId, setUserId] = useState();
  const [profile, setProfile] = useState();
  const [email, setEmail] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // const [spoonApiKey] = useState(process.env.REACT_APP_SPOONACULAR_KEY);
  const [ingredientsSearch, setIngredientsSearch] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [filteredTags, setFilteredTags] = useState({
    categories: [],
    dietTags: [],
    intolerances: [],
  });
  const [currentRecipe, setCurrentRecipe] = useState(null);

  const history = useHistory();

  const initializeGoogleSignIn = () => {
    window.gapi.load('auth2', () => {
      window.gapi.auth2
        .init({
          client_id: clientId,
        })
        .then(() => {
          setAuthInstance(window.gapi.auth2.getAuthInstance());

          // setLoggedIn(authInstance.isSignedIn.get());
        });
      // .then(() => {
      //   authInstance.isSignedIn.listen((isSignedIn) => {
      //     setLoggedIn({ isSignedIn });
      //   });
      // });
    });

    window.gapi.load('signin2', () => {
      const params = {
        onsuccess: () => {
          console.log('beep is king');
        },
      };

      // window.gapi.signin2.render('loginButton', params);
    });
  };

  const insertGapiScript = () => {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.onload = () => {
      initializeGoogleSignIn();
    };

    document.body.appendChild(script);
  };

  useEffect(() => {
    insertGapiScript();
  }, []);

  useEffect(() => {
    if (authInstance) {
      setLoggedIn(authInstance.isSignedIn.get());
      authInstance.isSignedIn.listen((isSignedIn) => {
        setLoggedIn(isSignedIn);
      });
    }
  }, [authInstance]);

  useEffect(() => {
    if (loggedIn && authInstance) {
      setUser(authInstance.currentUser.get());
    }
  }, [loggedIn, authInstance]);

  useEffect(() => {
    if (user) {
      setProfile(user.getBasicProfile());
      setUserId(user.getId());
    }
  }, [user]);

  useEffect(() => {
    if (profile) {
      setEmail(profile.getEmail());
      setImageUrl(profile.getImageUrl());
    }
  }, [profile]);

  useEffect(() => {
    if (userId) {
      setTimeout(() => {
        fetch(
          `https://storage.googleapis.com/storage/v1/b?project=recipe-app-313315`
        ).then((response) => console.log(response));
      }, 3000);

      // fetch(`https://storage.googleapis.com/storage/v1/b/${userId}`).then((response) => {
      //   console.log(response);
      // });
    }
  }, [userId]);

  // const fetchRecipes = () => {
  //   fetch('http://localhost:8000/recipes').then((response) => {
  //     response.json().then((data) => {
  //       console.log(data);
  //       setRecipes(data);
  //       setFilteredRecipes(data);
  //     });
  //   });
  // };

  const fetchRecipes = () => {
    fetch('https://storage.googleapis.com/storage/v1/b/recipe-app-ag/o/recipes.json?alt=media', {
      method: 'GET',
      uthorization: clientId,
    }).then((response) => {
      response.json().then((data) => {
        console.log(data);
        setRecipes(data.recipes);
        setFilteredRecipes(data.recipes);
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
    await fetch(`http://localhost:8000/recipes/${recipeId}`, {
      method: 'DELETE',
    });
    const newRecipes = recipes.filter((recipe) => recipe.id !== recipeId);
    setRecipes(newRecipes);
  };

  const resetFilterTags = () => {
    setFilteredTags({ categories: [], dietTags: [], intolerances: [] });
  };

  const filterRecipes = () => {
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
    setFilteredRecipes(filteredRecipes);
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

    filterRecipes(tagGroup);
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

  return (
    <ThemeProvider theme={Theme}>
      <>
        <Layout
          loggedIn={loggedIn}
          imageUrl={imageUrl}
          email={email}
          profile={profile}
          user={user}
          filteredTags={filteredTags}
          filterRecipes={filterTags}
        >
          <Switch>
            <Route exact path="/">
              {loggedIn && (
                <Recipes
                  fetchRecipes={fetchRecipes}
                  recipes={recipes}
                  fileredRecipes={filteredRecipes}
                  resetFilterTags={resetFilterTags}
                  deleteRecipe={deleteRecipe}
                  getIngredientObject={addIngredient}
                  ingredientsSearch={ingredientsSearch}
                  handleIngreidentSearch={handleIngreidentSearch}
                  handleCheckBoxValueChange={handleCheckBoxValueChange}
                  handleCurrentRecipe={handleCurrentRecipe}
                />
              )}
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
          {!loggedIn && <div className="g-signin2" data-onsuccess="onSignIn" />}
          {loggedIn && <Button onClick={() => authInstance.disconnect()}>Sign Out</Button>}
        </Layout>
      </>
    </ThemeProvider>
  );
}

export default App;
