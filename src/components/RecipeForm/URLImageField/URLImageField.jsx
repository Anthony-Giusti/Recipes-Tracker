import TextField from '@material-ui/core/TextField';
import React from 'react';
import PropTypes from 'prop-types';

import useStyles from './Styles';

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

URLImageField.propTypes = {
  imageURL: PropTypes.string,
  imageURLError: PropTypes.bool,
};

export default URLImageField;
