/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

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

IntoleranceTags.propTypes = {
  intoleranceTags: PropTypes.object,
};

export default IntoleranceTags;
