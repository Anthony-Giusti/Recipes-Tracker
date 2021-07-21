/* eslint-disable react/prop-types */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import useStyles from './Styles';

import IRecipeTags from '../../shared/interfaces/RecipeTags.interface';

interface IProps {
  catergories: IRecipeTags;
}

const CategoryTags: React.FC<IProps> = ({ catergories }) => {
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
