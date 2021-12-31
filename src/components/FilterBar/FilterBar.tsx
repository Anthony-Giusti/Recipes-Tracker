import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import React, { useState } from 'react';
import useStyles from './Styles';

import FilterCheckBoxes from '../FilterCheckBoxes/FilterCheckBoxes';
import IRecipeTagsOption from '../../shared/interfaces/RecipeTagsOption.interface';
import IFilteredTags from '../../shared/interfaces/FilteredTags.interface';

interface IProps {
  options: IRecipeTagsOption[];
  filterTags: (value: string, tagGroup: 'intolerances' | 'dietTags' | 'categories') => void;
  filteredTags: IFilteredTags;
  tagTitle: string;
  tagGroup: 'intolerances' | 'dietTags' | 'categories';
}

const FilterBar: React.FC<IProps> = ({ options, filterTags, filteredTags, tagTitle, tagGroup }) => {
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
              filterTags={filterTags}
            />
          </div>
        ))}
      </Menu>
    </>
  );
};

export default FilterBar;
