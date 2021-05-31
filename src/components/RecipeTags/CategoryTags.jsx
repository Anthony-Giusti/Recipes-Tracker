import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import useStyles from './Styles';

const CategoryTags = ({ catergories }) => {
  const classes = useStyles();

  return (
    <Grid container direction="row" spacing={1}>
      {catergories.formatted.map((category) => (
        <Grid item key={category}>
          <div className={classes.catergoryTag}>
            <Typography className={classes.tagText}>{category}</Typography>
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

CategoryTags.propTypes = {
  catergories: PropTypes.object,
};

export default CategoryTags;
