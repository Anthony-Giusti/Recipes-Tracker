import React from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import useStyles from './Styles';

import IFilteredTags from '../../shared/interfaces/FilteredTags.interface';
import formatName from '../../shared/Utility Functions/FormatName';

import {
  CategoryButton,
  DietButton,
  IntoleranceButton,
} from '../../Themes/Buttons/TagButtons/TagButtons';

interface IProps {
  filteredTags: IFilteredTags;
  filterTags: (tag: string, category: 'intolerances' | 'dietTags' | 'categories') => void;
  resetFilterTags: () => void;
}

const FilterTagsDisplay: React.FC<IProps> = ({ filteredTags, filterTags, resetFilterTags }) => {
  const classes = useStyles();

  const handleClick = (tag: string, category: 'intolerances' | 'dietTags' | 'categories') => {
    filterTags(tag, category);
  };

  return (
    <div className={classes.container}>
      {filteredTags.categories.length >= 1 && (
        <Grid className={classes.gridContainer} container spacing={1}>
          {filteredTags.categories.map((tag: string) => (
            <Grid item key={tag}>
              <CategoryButton variant="contained" onClick={() => handleClick(tag, 'categories')}>
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
              <DietButton variant="contained" onClick={() => handleClick(tag, 'dietTags')}>
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
