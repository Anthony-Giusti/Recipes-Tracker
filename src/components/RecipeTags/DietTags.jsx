/* eslint-disable react/prop-types */
import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import useStyles from './Styles-Tags';

const DietTags = ({ dietTags }) => {
  const classes = useStyles();

  return (
    <Grid container direction="row" spacing={1}>
      {dietTags.formatted.map((dietTag) => (
        <Grid item key={dietTag}>
          <div className={classes.dietTag}>
            <Typography className={classes.tagText}>{dietTag}</Typography>
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

export default DietTags;
