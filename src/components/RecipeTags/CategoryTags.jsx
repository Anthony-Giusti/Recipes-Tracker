/* eslint-disable react/prop-types */
import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import useStyles from './Styles-Tags';

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

export default CategoryTags;
