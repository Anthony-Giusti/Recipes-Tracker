import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import useStyles from './Styles';
import IRecipeTags from '../../shared/interfaces/RecipeTags.interface';

interface IProps {
  intoleranceTags: IRecipeTags;
}

const IntoleranceTags: React.FC<IProps> = ({ intoleranceTags }) => {
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
