/* eslint-disable react/prop-types */
import {
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
} from '@material-ui/core';
import React from 'react';
import useStyles from './Styles-RecipeCheckBoxes';

import { categoryOptions, dietTagOptions, intoleranceOptions } from './_data';

const RecipeCheckBoxes = ({
  categoryError,
  handleCheckBoxValueChange,
  categories,
  dietTags,
  intolerances,
}) => {
  const classes = useStyles();
  return (
    <FormControl component="fieldset" className={classes.formControl}>
      {/* CATEGORY TAGS */}

      <FormControl className={classes.checkBoxGroup} error={categoryError}>
        <FormLabel className={classes.checkBoxLabel} required component="legend">
          Category
        </FormLabel>
        <FormGroup
          className={classes.checkBoxOptions}
          onChange={(e) => handleCheckBoxValueChange(e.target.value, 'categories')}
        >
          {categoryOptions.map((option) => (
            <FormControlLabel
              key={option.value}
              control={<Checkbox name={option.value} />}
              checked={categories.includes(option.value)}
              label={option.label}
              value={option.value}
            />
          ))}
        </FormGroup>
        {categoryError && <FormHelperText>You must select at least one</FormHelperText>}
      </FormControl>

      {/* DIET TAGS */}

      <Container className={classes.checkBoxGroup}>
        <FormLabel className={classes.checkBoxLabel} component="legend">
          Diet Tags
        </FormLabel>
        <FormGroup
          className={classes.checkBoxOptions}
          onChange={(e) => handleCheckBoxValueChange(e.target.value, 'dietTags')}
        >
          {dietTagOptions.map((option) => (
            <FormControlLabel
              key={option.value}
              control={<Checkbox name={option.value} />}
              checked={dietTags.includes(option.value)}
              label={option.label}
              value={option.value}
            />
          ))}
        </FormGroup>
      </Container>

      {/* INTOLERANCES TAGS */}

      <Container className={classes.checkBoxGroup}>
        <FormLabel className={classes.checkBoxLabel} component="legend">
          Intolerances
        </FormLabel>
        <FormGroup
          className={classes.checkBoxOptions}
          onChange={(e) => handleCheckBoxValueChange(e.target.value, 'intolerances')}
        >
          {intoleranceOptions.map((option) => (
            <FormControlLabel
              key={option.value}
              control={<Checkbox name={option.value} />}
              checked={intolerances.includes(option.value)}
              label={option.label}
              value={option.value}
            />
          ))}
        </FormGroup>
      </Container>
    </FormControl>
  );
};

export default RecipeCheckBoxes;
