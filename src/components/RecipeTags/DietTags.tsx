/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-named-as-default */
// @ts-nocheck
import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import useStyles from './Styles';
import IRecipeTags from '../../shared/interfaces/RecipeTags.interface';

interface IProps {
  dietTags: IRecipeTags;
}

const DietTags: React.FC<IProps> = ({ dietTags }) => {
  const classes = useStyles();

  console.log(dietTags);

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
