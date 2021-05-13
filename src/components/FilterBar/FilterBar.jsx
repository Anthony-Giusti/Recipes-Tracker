/* eslint-disable react/display-name */
import { Button, Menu } from '@material-ui/core';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useStyles from './Styles';

import FilterCheckBoxes from '../FilterCheckBoxes/FilterCheckBoxes';

const FilterBar = ({ options, filterRecipes, filteredTags, tagTitle, tagGroup }) => {
  const [filterMenuOpen, setFilterMenuOpen] = useState(null);
  const classes = useStyles();

  const handleFilterMenuOpen = (e) => {
    setFilterMenuOpen(e.currentTarget);
  };

  const handleFilterMenuClose = () => {
    setFilterMenuOpen(null);
  };

  return (
    <>
      <Button className={classes.navBtn} variant="contained" onClick={handleFilterMenuOpen}>
        Filter By {tagTitle}
      </Button>
      <div>
        <Menu
          id={`filter-${tagGroup}-menu`}
          open={Boolean(filterMenuOpen)}
          anchorEl={filterMenuOpen}
          onClose={handleFilterMenuClose}
        >
          {options.map((option) => (
            <div key={option.value}>
              <FilterCheckBoxes
                tagGroup={tagGroup}
                filteredTags={filteredTags}
                option={option}
                handleFilter={filterRecipes}
              />
            </div>
          ))}
        </Menu>
      </div>
    </>
  );
};

FilterBar.propTypes = {
  options: PropTypes.array,
  filterRecipes: PropTypes.func,
  filteredTags: PropTypes.object,
  tagTitle: PropTypes.string,
  tagGroup: PropTypes.string,
};

export default FilterBar;
