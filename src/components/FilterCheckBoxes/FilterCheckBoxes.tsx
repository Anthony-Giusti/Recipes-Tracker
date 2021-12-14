
import { Checkbox, FormControlLabel, MenuItem } from '@material-ui/core';
import React, { useState } from 'react';

import IFilteredTags from '../../shared/interfaces/FilteredTags.interface';
import IRecipeTag from '../../shared/interfaces/RecipeTag.interface';

interface IProps {
  filteredTags: IFilteredTags;
  tagGroup: string;
  option: IRecipeTag;
  filterTags: (optionValue: string, tagGroup: string) => void;
}

const FilterCheckBoxes: React.FC<IProps> = ({ filteredTags, tagGroup, option, filterTags }) => {
  const [checked, setChecked] = useState(filteredTags[tagGroup as keyof IFilteredTags].includes(option.value));

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
