/* eslint-disable react/prop-types */
import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import useStyles from './Styles-Tags';

const IntoleranceTags = ({ intoleranceTags }) => {
  const classes = useStyles();

  return (
    <Grid container direction="row" spacing={1}>
      {intoleranceTags.formatted.map((intoleranceTag) => (
        <Grid item key={intoleranceTag}>
          <div className={classes.intoleranceTag}>
            <Typography className={classes.tagText}>{intoleranceTag}</Typography>
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

export default IntoleranceTags;
