import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import React, { useState } from 'react';

import IFilteredTags from '../../shared/interfaces/FilteredTags.interface';
import IRecipeTagsOption from '../../shared/interfaces/RecipeTagsOption.interface';

interface IProps {
  filteredTags: IFilteredTags;
  tagGroup: 'intolerances' | 'dietTags' | 'categories';
  option: IRecipeTagsOption;
  filterTags: (optionValue: string, tagGroup: 'intolerances' | 'dietTags' | 'categories') => void;
}

const FilterCheckBoxes: React.FC<IProps> = ({ filteredTags, tagGroup, option, filterTags }) => {
  const [checked, setChecked] = useState(filteredTags[tagGroup].includes(option.value));

  const handleClick = () => {
    setChecked((prevState: boolean) => !prevState);
    filterTags(option.value, tagGroup);
  };

  return (
    <MenuItem key={option.value}>
      <FormControlLabel
        control={<Checkbox name={option.label} />}
        checked={checked}
        label={option.label}
        value={option.value}
        onChange={handleClick}
      />
    </MenuItem>
  );
};

export default FilterCheckBoxes;
