/* eslint-disable react/prop-types */
import React from 'react';
import { useHistory, useLocation } from 'react-router';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';

import AddIcon from '@material-ui/icons/Add';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';

import Divider from '@material-ui/core/Divider';
import FilterBar from '../../components/FilterBar/FilterBar';
import RecipeSeachBar from '../../components/RecipeSearchBar/RecipeSearchBar';

import useStyles from './Styles';

const Layout = ({
  children,
  filteredTags,
  filterRecipes,
  loggedIn,
  imageUrl,
  categoryOptions,
  dietTagOptions,
  intoleranceOptions,
  searchRecipes,
  isSearching,
  emptySearch,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar className={classes.toolbar}>
          <Button
            className={classes.navBtn}
            variant="contained"
            onClick={() => history.push('/')}
            endIcon={<ViewComfyIcon />}
            color={history.location.pathname === '/' ? 'secondary' : 'default'}
          >
            View Your Recipes
          </Button>
          <Button
            className={classes.navBtn}
            variant="contained"
            onClick={() => history.push('/create')}
            endIcon={<AddIcon />}
            color={history.location.pathname === '/create' ? 'secondary' : 'default'}
          >
            Create New Recipe
          </Button>

          {location.pathname === '/' && (
            <>
              <Divider className={classes.divider} orientation="vertical" />
              <RecipeSeachBar
                filterRecipes={filterRecipes}
                handleSearch={searchRecipes}
                isSearching={isSearching}
                emptySearch={emptySearch}
              />
              <FilterBar
                options={categoryOptions}
                filteredTags={filteredTags}
                filterRecipes={filterRecipes}
                tagTitle="Category"
                tagGroup="categories"
              />
              <FilterBar
                options={dietTagOptions}
                filteredTags={filteredTags}
                filterRecipes={filterRecipes}
                tagTitle="Diet"
                tagGroup="dietTags"
              />
              <FilterBar
                options={intoleranceOptions}
                filteredTags={filteredTags}
                filterRecipes={filterRecipes}
                tagTitle="Intolerance"
                tagGroup="intolerances"
              />
            </>
          )}
          <Avatar className={classes.avatar} alt="avatar" src={loggedIn ? imageUrl : ''} />
        </Toolbar>
      </AppBar>
      <div className={classes.page}>
        <div className={classes.toolbar} />
        {children}
      </div>
    </div>
  );
};

export default Layout;
