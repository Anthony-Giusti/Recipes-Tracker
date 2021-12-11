import { Button, Menu } from '@material-ui/core';
import React, { useState } from 'react';
import useStyles from './Styles';

import FilterCheckBoxes from '../FilterCheckBoxes/FilterCheckBoxes';
import IRecipeTags from '../../shared/interfaces/RecipeTag.interface';
import IRecipe from '../../shared/interfaces/Recipe.interface';
import IFilteredTags from '../../shared/interfaces/FilteredTags.interface';

interface IProps {
  options: IRecipeTags[];
  filterTags: (value: string, tagGroup: string) => void;
  filteredTags: IFilteredTags;
  tagTitle: string;
  tagGroup: string;
}

const FilterBar: React.FC<IProps> = ({
  options,
  filterTags,
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
        color={filteredTags[tagGroup as keyof IFilteredTags].length > 0 ? 'secondary' : 'default'}
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
              filterTags={filterTags}
            />
          </div>
        ))}
      </Menu>
    </>
  );
};

export default FilterBar;
