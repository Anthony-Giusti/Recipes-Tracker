import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import useStyles from './Styles';

import {
  CategoryButton,
  DietButton,
  IntoleranceButton,
} from '../../Themes/Buttons/TagButtons/TagButtons';

const FilterTagsDisplay = ({ filteredTags, filterTags, formatName, resetFilterTags }) => {
  const classes = useStyles();

  const handleClick = (tag, category) => {
    filterTags(tag, category);
  };

  return (
    <div className={classes.container}>
      {filteredTags.categories.length >= 1 && (
        <Grid className={classes.gridContainer} container spacing={1}>
          {filteredTags.categories.map((tag) => (
            <Grid item key={tag}>
              <CategoryButton
                variant="contained"
                className={classes.categoryBtn}
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
          {filteredTags.dietTags.map((tag) => (
            <Grid item key={tag}>
              <DietButton
                variant="contained"
                className={classes.dietBtn}
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
          {filteredTags.intolerances.map((tag) => (
            <Grid item key={tag}>
              <IntoleranceButton
                variant="contained"
                className={classes.intoleranceBtn}
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

FilterTagsDisplay.propTypes = {
  filteredTags: PropTypes.object,
  filterTags: PropTypes.func,
  formatName: PropTypes.func,
  resetFilterTags: PropTypes.func,
};

export default FilterTagsDisplay;
