import React from 'react';
import PropTypes from 'prop-types';

import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import ClearIcon from '@material-ui/icons/Clear';

import makeStyles from './Styles';

const RecipeSearchBar = ({ handleSearch, isSearching, emptySearch }) => {
  const classes = makeStyles();

  let searchField;

  const handleEmpty = () => {
    emptySearch();
    searchField.value = '';
  };

  const handleChange = (e) => {
    handleSearch(e.target.value);
  };

  return (
    <div className={classes.searchBar}>
      <SearchIcon className={classes.searchIcon} />
      <InputBase
        className={classes.searchField}
        placeholder="Search"
        onChange={handleChange}
        inputRef={(ref) => {
          searchField = ref;
        }}
      />
      {isSearching && <ClearIcon onClick={handleEmpty} />}
    </div>
  );
};

RecipeSearchBar.propTypes = {
  handleSearch: PropTypes.func,
  isSearching: PropTypes.bool,
  emptySearch: PropTypes.func,
};

export default RecipeSearchBar;
