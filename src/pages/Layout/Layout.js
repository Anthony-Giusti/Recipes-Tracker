/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import AddIcon from '@material-ui/icons/Add';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';

import FilterBar from '../../components/FilterBar/FilterBar';
import {
  categoryOptions,
  dietTagOptions,
  intoleranceOptions,
} from '../../components/RecipeCheckBoxes/_data';

import useStyles from './Styles';

const Layout = ({ children, filteredTags, filterRecipes }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar>
          <Button onClick={() => history.push('/')} endIcon={<ViewComfyIcon />}>
            View Your Recipes
          </Button>
          <Button onClick={() => history.push('/create')} endIcon={<AddIcon />}>
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
