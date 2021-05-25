/* eslint-disable react/prop-types */
import { Checkbox, FormControlLabel, MenuItem } from '@material-ui/core';
import React, { useState } from 'react';

const FilterCheckBoxes = ({ filteredTags, tagGroup, option, handleFilter }) => {
  const [checked, setChecked] = useState(filteredTags[tagGroup].includes(option.value));

  const handleClick = () => {
    setChecked((prevState) => !prevState);
    handleFilter(option.value, tagGroup);
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