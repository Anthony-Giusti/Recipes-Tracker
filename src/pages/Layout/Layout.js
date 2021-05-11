/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import AddIcon from '@material-ui/icons/Add';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';

import { Avatar } from '@material-ui/core';
import FilterBar from '../../components/FilterBar/FilterBar';
import {
  categoryOptions,
  dietTagOptions,
  intoleranceOptions,
} from '../../components/RecipeCheckBoxes/_data';

import useStyles from './Styles';

const Layout = ({
  children,
  filteredTags,
  filterRecipes,
  loggedIn,
  imageUrl,
  email,
  profile,
  user,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar>
          <Button variant="contained" onClick={() => history.push('/')} endIcon={<ViewComfyIcon />}>
            View Your Recipes
          </Button>
          <Button variant="contained" onClick={() => history.push('/create')} endIcon={<AddIcon />}>
            Create New Recipe
          </Button>

          {location.pathname === '/' && (
            <>
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
          <Avatar alt="avatar" src={loggedIn ? imageUrl : ''} />
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
