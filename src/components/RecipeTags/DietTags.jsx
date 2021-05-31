import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import useStyles from './Styles';

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

DietTags.propTypes = {
  dietTags: PropTypes.object,
};

export default DietTags;
