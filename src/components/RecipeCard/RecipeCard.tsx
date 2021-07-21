/* eslint-disable react/prop-types */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import React from 'react';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';

import Carousel from 'react-material-ui-carousel';

import { CardActions } from '@material-ui/core';
import useStyles from './Styles';

import IRecipe from '../../shared/interfaces/Recipe.interface';

interface IProps {
  recipe: IRecipe;
  handleModalOpen: (recipeID: string) => void;
  handleDeleteOpen: (recipeID: string) => void;
}

const RecipeCard: React.FC<IProps> = ({ recipe, handleModalOpen, handleDeleteOpen }) => {
  const classes = useStyles();

  return (
    <div>
      <Card elevation={1}>
        <CardHeader title={recipe.title} />

        {/* IMAGES */}
        {recipe.imageURLs.length === 1 && (
          <CardMedia component="img" className={classes.image} image={recipe.imageURLs[0]} />
        )}
        {recipe.imageURLs.length > 1 && (
          <Carousel autoPlay={false} timeout={300}>
            {recipe.imageURLs.map((url, index) => (
              <img alt="of" key={index} className={classes.image} src={url} />
            ))}
          </Carousel>
        )}

        <CardContent>
          <Grid container direction="row" spacing={1}>
            {recipe.categories.formatted.map((category) => (
              <Grid item key={category}>
                <div className={classes.catergoryTag}>
                  <Typography className={classes.tagText}>{category}</Typography>
                </div>
              </Grid>
            ))}
          </Grid>

          {/* DIET TAGS */}
          <Grid container direction="row" spacing={1}>
            {recipe.dietTags.formatted.map((dietTag) => (
              <Grid item key={dietTag}>
                <div className={classes.dietTag}>
                  <Typography className={classes.tagText}>{dietTag}</Typography>
                </div>
              </Grid>
            ))}
          </Grid>

          {/* DETAILS */}
          <Typography className={classes.details} variant="body2" color="textSecondary">
            {recipe.details}
          </Typography>

          {/* COOK TIME */}
          {(recipe.cookTime.hours > 0 || recipe.cookTime.minutes > 0) && (
            <Typography>Cook Time: {recipe.cookTime.formatted}</Typography>
          )}

          {/* INTOLERANCES */}
          {recipe.intolerances.formatted.length >= 1 && (
            <Grid className={classes.intolerances} container direction="row" spacing={1}>
              <div className={classes.intolerancesTitle}>
                <Typography align="center">Contains:</Typography>
              </div>

              {recipe.intolerances.formatted.map((intolerance) => (
                <Grid item key={intolerance}>
                  <div className={classes.intoleranceTag}>
                    <Typography className={classes.tagText}>{intolerance}</Typography>
                  </div>
                </Grid>
              ))}
            </Grid>
          )}
        </CardContent>

        <Divider />

        <CardActions>
          <IconButton onClick={() => handleModalOpen(recipe.id)}>
            <ZoomOutMapIcon />
          </IconButton>
          <IconButton aria-label="settings" onClick={() => handleDeleteOpen(recipe.id)}>
            <DeleteOutlined />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
};
export default RecipeCard;
