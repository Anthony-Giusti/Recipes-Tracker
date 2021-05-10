/* eslint-disable react/prop-types */
import TextField from '@material-ui/core/TextField';
import React from 'react';

import useStyles from '../Styles-RecipeForm';

const URLImageField = ({ imageURL, imageURLError }) => {
  const classes = useStyles();

  return (
    <TextField
      className={classes.field}
      name="imageURL"
      defaultValue={imageURL}
      label="Image URL"
      variant="outlined"
      color="secondary"
      multiline
      row={4}
      error={imageURLError}
      fullWidth
    />
  );
};

export default URLImageField;
