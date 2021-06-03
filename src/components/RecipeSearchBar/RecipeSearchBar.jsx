import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router';

import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import ClearIcon from '@material-ui/icons/Clear';

import makeStyles from './Styles';

const RecipeSearchBar = ({ handleSearch, isSearching, emptySearch, recipeSearchText }) => {
  const classes = makeStyles();

  const location = useLocation();
  let searchField;

  const handleEmpty = () => {
    emptySearch();
    searchField.value = '';
  };

  const handleChange = (e) => {
    handleSearch(e.target.value);
  };

  useEffect(() => {
    if (location.pathname === '/' && !isSearching) {
      handleEmpty();
    }
  }, [location]);

  return (
    <span className={classes.searchBar}>
      <SearchIcon className={classes.searchIcon} />
      <InputBase
        className={classes.searchField}
        defaultValue={recipeSearchText}
        placeholder="Search"
        onChange={handleChange}
        inputRef={(ref) => {
          searchField = ref;
        }}
      />
      {isSearching && <ClearIcon className={classes.clearIcon} onClick={handleEmpty} />}
    </span>
  );
};

RecipeSearchBar.propTypes = {
  handleSearch: PropTypes.func,
  isSearching: PropTypes.bool,
  emptySearch: PropTypes.func,
  recipeSearchText: PropTypes.string,
};

export default RecipeSearchBar;
