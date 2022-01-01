import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
  GoogleLogin,
  GoogleLogout,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';

import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import { useTheme } from '@material-ui/core/styles';

import AddIcon from '@material-ui/icons/Add';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';

import FilterBar from '../components/FilterBar/FilterBar';
import RecipeSeachBar from '../components/RecipeSearchBar/RecipeSearchBar';

import useStyles from './Styles';
import IRecipesTagsOptions from '../shared/interfaces/RecipeTagsOption.interface';
import IFilteredTags from '../shared/interfaces/FilteredTags.interface';

interface IProps {
  children: any;
  filteredTags: IFilteredTags;
  filterTags: (value: string, tagGroup: 'intolerances' | 'dietTags' | 'categories') => void;
  categoryOptions: IRecipesTagsOptions[];
  dietTagOptions: IRecipesTagsOptions[];
  intoleranceOptions: IRecipesTagsOptions[];
  searchRecipes: (query: string) => void;
  isSearching: boolean;
  isFiltered: boolean;
  emptySearch: () => void;
  recipeSearchText: string;
  clientId: string;
  handleSignIn: (googleResponse: GoogleLoginResponse | GoogleLoginResponseOffline) => void;
  handleSignOut: () => void;
  isSignedIn: boolean;
  googleProfile: any;
}

const Layout: React.FC<IProps> = ({
  children,
  filteredTags,
  filterTags,
  categoryOptions,
  dietTagOptions,
  intoleranceOptions,
  searchRecipes,
  isSearching,
  isFiltered,
  emptySearch,
  recipeSearchText,
  clientId,
  handleSignIn,
  handleSignOut,
  isSignedIn,
  googleProfile,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loginMenuOpen, setLoginMenuOpen] = useState<null | HTMLElement>(null);

  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const theme = useTheme();
  const lgDevice = useMediaQuery(theme.breakpoints.up('lg'));
  const mdDevice = useMediaQuery(theme.breakpoints.up('md'));
  const smDevice = useMediaQuery(theme.breakpoints.up('sm'));

  const handleLoginMenuOpen = (e: any) => {
    setLoginMenuOpen(e.currentTarget);
  };

  const handleLoginMenuClose = () => {
    setLoginMenuOpen(null);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  useEffect(() => {
    setLoginMenuOpen(null);
  }, [isSignedIn]);

  return (
    <div className={classes.root}>
      <AppBar /* className={classes.appbar} */ elevation={0}>
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
                    filterTags={filterTags}
                    tagTitle="Category"
                    tagGroup="categories"
                  />
                  <FilterBar
                    options={dietTagOptions}
                    filteredTags={filteredTags}
                    filterTags={filterTags}
                    tagTitle="Diet"
                    tagGroup="dietTags"
                  />
                  <FilterBar
                    options={intoleranceOptions}
                    filteredTags={filteredTags}
                    filterTags={filterTags}
                    tagTitle="Intolerance"
                    tagGroup="intolerances"
                  />
                </>
              ) : (
                <Button
                  onClick={handleDrawerOpen}
                  variant="contained"
                  color={isSearching || isFiltered ? 'secondary' : 'default'}
                >
                  Filters
                </Button>
              )}
            </>
          )}
          <IconButton onClick={handleLoginMenuOpen} className={classes.avatarIconBtn}>
            {isSignedIn ? (
              <Avatar alt="avatar" src={isSignedIn ? googleProfile.imageUrl : ''} />
            ) : (
              <GoogleLogin
                cookiePolicy="single_host_origin"
                isSignedIn
                clientId={clientId}
                onSuccess={(response) => handleSignIn(response)}
                onFailure={(response) => console.log(response)}
                render={(renderProps) => <Avatar onClick={renderProps.onClick} />}
              />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer color="primary" open={drawerOpen} onClose={handleDrawerClose} anchor="top">
        <Toolbar className={classes.drawer}>
          {!mdDevice && (
            <RecipeSeachBar
              handleSearch={searchRecipes}
              isSearching={isSearching}
              emptySearch={emptySearch}
              recipeSearchText={recipeSearchText}
            />
          )}

          <FilterBar
            // className={classes.drawerFilterBtn}
            options={categoryOptions}
            filteredTags={filteredTags}
            filterTags={filterTags}
            tagTitle="Category"
            tagGroup="categories"
          />
          <FilterBar
            // className={classes.drawerFilterBtn}
            options={dietTagOptions}
            filteredTags={filteredTags}
            filterTags={filterTags}
            tagTitle="Diet"
            tagGroup="dietTags"
          />
          <FilterBar
            // className={classes.drawerFilterBtn}
            options={intoleranceOptions}
            filteredTags={filteredTags}
            filterTags={filterTags}
            tagTitle="Intolerance"
            tagGroup="intolerances"
          />
        </Toolbar>
      </Drawer>

      <Menu anchorEl={loginMenuOpen} open={Boolean(loginMenuOpen)} onClose={handleLoginMenuClose}>
        <div>
          {isSignedIn ? (
            <GoogleLogout clientId={clientId} onLogoutSuccess={handleSignOut} />
          ) : (
            <GoogleLogin
              // className={classes.googleLogin}
              cookiePolicy="single_host_origin"
              isSignedIn
              clientId={clientId}
              onSuccess={handleSignIn}
            />
          )}
        </div>
      </Menu>

      <div className={classes.page}>
        <div className={classes.toolbar} />
        {children}
      </div>
    </div>
  );
};

export default Layout;
