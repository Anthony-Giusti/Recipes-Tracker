/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable react/prop-types */
// @ts-nocheck

import React from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import useStyles from './Styles';

import {
  CategoryButton,
  DietButton,
  IntoleranceButton,
} from '../../Themes/Buttons/TagButtons/TagButtons';

interface IProps {
  filteredTags: any;
  filterTags: (tag: string, category: string) => void;
  formatName: (name: string) => string;
  resetFilterTags: (a: string, b: string) => void;
}

const FilterTagsDisplay: React.FC<IProps> = ({
  filteredTags,
  filterTags,
  formatName,
  resetFilterTags,
}) => {
  const classes = useStyles();

  const handleClick = (tag: string, category: string) => {
    filterTags(tag, category);
  };

  return (
    <div className={classes.container}>
      {filteredTags.categories.length >= 1 && (
        <Grid className={classes.gridContainer} container spacing={1}>
          {filteredTags.categories.map((tag: string) => (
            <Grid item key={tag}>
              <CategoryButton
                variant="contained"
                // className={classes.categoryBtn}
                onClick={() => handleClick(tag, 'categories')}
              >
                {formatName(tag)}
              </CategoryButton>
            </Grid>
          ))}
        </Grid>
      )}
      {filteredTags.dietTags.length >= 1 && (
        <Grid className={classes.gridContainer} container spacing={1}>
          {filteredTags.dietTags.map((tag: string) => (
            <Grid item key={tag}>
              <DietButton
                variant="contained"
                // className={classes.dietBtn}
                onClick={() => handleClick(tag, 'dietTags')}
              >
                {formatName(tag)}
              </DietButton>
            </Grid>
          ))}
        </Grid>
      )}
      {filteredTags.intolerances.length >= 1 && (
        <Grid className={classes.gridContainer} container spacing={1}>
          {filteredTags.intolerances.map((tag: string) => (
            <Grid item key={tag}>
              <IntoleranceButton
                variant="contained"
                // className={classes.intoleranceBtn}
                onClick={() => handleClick(tag, 'intolerances')}
              >
                {formatName(tag)}
              </IntoleranceButton>
            </Grid>
          ))}
        </Grid>
      )}
      {(filteredTags.categories.length >= 1 ||
        filteredTags.dietTags.length >= 1 ||
        filteredTags.intolerances.length >= 1) && (
        <Button
          variant="contained"
          color="primary"
          onClick={resetFilterTags}
          className={classes.resetBtn}
        >
          Reset Tags
        </Button>
      )}
    </div>
  );
};

export default FilterTagsDisplay;
