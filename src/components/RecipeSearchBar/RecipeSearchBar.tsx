/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-named-as-default */
import React, { useEffect } from 'react';
import { useLocation } from 'react-router';

import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import ClearIcon from '@material-ui/icons/Clear';

import { InputBaseProps } from '@material-ui/core';
import makeStyles from './Styles';

interface IProps {
  handleSearch: (a: string) => void;
  isSearching: boolean;
  emptySearch: () => void;
  recipeSearchText: string;
}

const RecipeSearchBar: React.FC<IProps> = ({
  handleSearch,
  isSearching,
  emptySearch,
  recipeSearchText,
}) => {
  const classes = makeStyles();

  const location = useLocation();
  let searchField: InputBaseProps;

  const handleEmpty = () => {
    emptySearch();
    searchField.value = '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

export default RecipeSearchBar;
