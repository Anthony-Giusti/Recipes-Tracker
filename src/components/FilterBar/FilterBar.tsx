/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/prop-types */

import { Button, Menu } from '@material-ui/core';
import React, { useState } from 'react';
import useStyles from './Styles';

import FilterCheckBoxes from '../FilterCheckBoxes/FilterCheckBoxes';
import IRecipeTags from '../../shared/interfaces/RecipeTags.interface';

interface IProps {
  options: IRecipeTags[];
  filterRecipes: () => void;
  filteredTags: string[];
  tagTitle: string;
  tagGroup: number;
}

const FilterBar: React.FC<IProps> = ({
  options,
  filterRecipes,
  filteredTags,
  tagTitle,
  tagGroup,
}) => {
  const [filterMenuOpen, setFilterMenuOpen] = useState(null);
  const classes = useStyles();

  const handleFilterMenuOpen = (e: any) => {
    setFilterMenuOpen(e.currentTarget);
  };

  const handleFilterMenuClose = () => {
    setFilterMenuOpen(null);
  };

  return (
    <>
      <Button
        className={classes.navBtn}
        variant="contained"
        onClick={handleFilterMenuOpen}
        color={filteredTags[tagGroup].length > 0 ? 'secondary' : 'default'}
      >
        Filter By {tagTitle}
      </Button>

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
    </>
  );
};

export default FilterBar;
