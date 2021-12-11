/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/prop-types */
import React from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';

import useStyles from './Styles';
import {
  categoryOptions,
  dietTagOptions,
  intoleranceOptions,
} from '../../../data/_recipeTagOptions';

import IRecipeTags from '../../../shared/interfaces/RecipeTag.interface';

interface IProps {
  categoryError: boolean;
  handleCheckBoxValueChange: (a: string, b: string) => void;
  categories: string[];
  dietTags: string[];
  intolerances: string[];
}

const RecipeCheckBoxes: React.FC<IProps> = ({
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
          onChange={(e: any) => handleCheckBoxValueChange(e.target.value, 'categories')}
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
          onChange={(e: any) => handleCheckBoxValueChange(e.target.value, 'dietTags')}
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
          onChange={(e: any) => handleCheckBoxValueChange(e.target.value, 'intolerances')}
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
