/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { GoogleLogin, useGoogleLogin, GoogleLogout } from 'react-google-login';

import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import Drawer from '@material-ui/core/Drawer';
import { useTheme } from '@material-ui/core/styles';

import AddIcon from '@material-ui/icons/Add';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import MenuIcon from '@material-ui/icons/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import Divider from '@material-ui/core/Divider';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
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
  recipeSearchText,
  clientId,
  handleSignIn,
  handleSignOut,
  isSignedIn,
  googleProfile,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loginMenuOpen, setLoginMenuOpen] = useState(false);

  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const theme = useTheme();
  const lgDevice = useMediaQuery(theme.breakpoints.up('lg'));
  const mdDevice = useMediaQuery(theme.breakpoints.up('md'));
  const smDevice = useMediaQuery(theme.breakpoints.up('sm'));

  const handleLoginMenuOpen = (e) => {
    setLoginMenuOpen(e.currentTarget);
  };

  const handleLoginMenuClose = () => {
    setLoginMenuOpen(false);
  };

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
            {smDevice ? 'View Recipes' : 'Recipes'}
          </Button>
          <Button
            className={classes.navBtn}
            variant="contained"
            onClick={() => history.push('/create')}
            endIcon={<AddIcon />}
            color={history.location.pathname === '/create' ? 'secondary' : 'default'}
          >
            {smDevice ? 'Create New' : 'Create'}
          </Button>

          {location.pathname === '/' && (
            <>
              <Divider className={classes.divider} orientation="vertical" />
              {mdDevice && (
                <RecipeSeachBar
                  filterRecipes={filterRecipes}
                  handleSearch={searchRecipes}
                  isSearching={isSearching}
                  emptySearch={emptySearch}
                  recipeSearchText={recipeSearchText}
                />
              )}
              {lgDevice ? (
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
                <Button
                  className={classes.filterBtn}
                  onClick={handleDrawerOpen}
                  variant="contained"
                >
                  Filters
                </Button>
              )}
            </>
          )}
          <IconButton onClick={handleLoginMenuOpen}>
            <Avatar
              className={classes.avatar}
              alt="avatar"
              src={isSignedIn ? googleProfile.imageUrl : ''}
            />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer color="primary" open={drawerOpen} onClose={handleDrawerClose} anchor="top">
        <Toolbar className={classes.drawer}>
          {!mdDevice && (
            <RecipeSeachBar
              filterRecipes={filterRecipes}
              handleSearch={searchRecipes}
              isSearching={isSearching}
              emptySearch={emptySearch}
              recipeSearchText={recipeSearchText}
            />
          )}

          <FilterBar
            className={classes.drawerFilterBtn}
            options={categoryOptions}
            filteredTags={filteredTags}
            filterRecipes={filterRecipes}
            tagTitle="Category"
            tagGroup="categories"
          />
          <FilterBar
            className={classes.drawerFilterBtn}
            options={dietTagOptions}
            filteredTags={filteredTags}
            filterRecipes={filterRecipes}
            tagTitle="Diet"
            tagGroup="dietTags"
          />
          <FilterBar
            className={classes.drawerFilterBtn}
            options={intoleranceOptions}
            filteredTags={filteredTags}
            filterRecipes={filterRecipes}
            tagTitle="Intolerance"
            tagGroup="intolerances"
          />
        </Toolbar>
      </Drawer>

      <div>
        <Menu anchorEl={loginMenuOpen} open={Boolean(loginMenuOpen)} onClose={handleLoginMenuClose}>
          {isSignedIn ? (
            <GoogleLogout clientId={clientId} onLogoutSuccess={handleSignOut} />
          ) : (
            <GoogleLogin clientId={clientId} onSuccess={handleSignIn} />
          )}
        </Menu>
      </div>
      <div className={classes.page}>
        <div className={classes.toolbar} />
        {children}
      </div>
    </div>
  );
};

export default Layout;
