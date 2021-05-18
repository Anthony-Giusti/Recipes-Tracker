/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import withWidth from '@material-ui/core/withWidth';
import Drawer from '@material-ui/core/Drawer';
import { useTheme } from '@material-ui/core/styles';

import AddIcon from '@material-ui/icons/Add';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import MenuIcon from '@material-ui/icons/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import Divider from '@material-ui/core/Divider';
import { IconButton } from '@material-ui/core';
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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('lg'));
  const matches2 = useMediaQuery(theme.breakpoints.up('md'));
  const matches3 = useMediaQuery(theme.breakpoints.up('sm'));

  console.log(matches);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

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
            {matches3 ? 'View Recipes' : 'Recipes'}
          </Button>
          <Button
            className={classes.navBtn}
            variant="contained"
            onClick={() => history.push('/create')}
            endIcon={<AddIcon />}
            color={history.location.pathname === '/create' ? 'secondary' : 'default'}
          >
            {matches3 ? 'Create New' : 'Create'}
          </Button>

          {location.pathname === '/' && (
            <>
              {matches2 ? (
                <>
                  <Divider className={classes.divider} orientation="vertical" />
                  <RecipeSeachBar
                    filterRecipes={filterRecipes}
                    handleSearch={searchRecipes}
                    isSearching={isSearching}
                    emptySearch={emptySearch}
                  />

                  {matches ? (
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
                  ) : (
                    <Button onClick={handleDrawerOpen} variant="contained">
                      Filters
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <Button onClick={handleDrawerOpen} variant="contained">
                    Filters
                  </Button>
                </>
              )}
            </>
          )}
          <Avatar className={classes.avatar} alt="avatar" src={loggedIn ? imageUrl : ''} />
        </Toolbar>
      </AppBar>

      <Drawer color="primary" open={drawerOpen} onClose={handleDrawerClose} anchor="top">
        <Toolbar className={classes.drawer}>
          {!matches2 && (
            <RecipeSeachBar
              filterRecipes={filterRecipes}
              handleSearch={searchRecipes}
              isSearching={isSearching}
              emptySearch={emptySearch}
            />
          )}

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
        </Toolbar>
      </Drawer>
      <div className={classes.page}>
        <div className={classes.toolbar} />
        {children}
      </div>
    </div>
  );
};

export default Layout;
