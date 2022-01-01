/* eslint-disable import/no-named-as-default */
/* eslint-disable react/prop-types */
import TextField from '@material-ui/core/TextField';
import React from 'react';

// eslint-disable-next-line import/no-named-as-default-member
import useStyles from './Styles';

interface IProps {
  imageURL: string;
  imageURLError: boolean;
}

const URLImageField: React.FC<IProps> = ({ imageURL, imageURLError }) => {
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
      rows={4}
      error={imageURLError}
      fullWidth
    />
  );
};

export default URLImageField;
