/* eslint-disable react/prop-types */
import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { Button, CardMedia, Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Carousel from 'react-material-ui-carousel';
import { DeleteOutlined } from '@material-ui/icons';

import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import useStyles from './Styles';

const RecipeCard = ({ recipe, handleModalOpen, handleDeleteOpen }) => {
  const classes = useStyles(recipe);

  return (
    <div>
      <Card elevation={1}>
        <CardHeader
          // action={
          //   <IconButton aria-label="settings" onClick={() => handleDeleteOpen(recipe.id)}>
          //     <DeleteOutlined />
          //   </IconButton>
          // }
          title={recipe.title}
        />

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

          <span>
            <IconButton onClick={() => handleModalOpen(recipe)}>
              <ZoomOutMapIcon />
            </IconButton>
            <IconButton aria-label="settings" onClick={() => handleDeleteOpen(recipe.id)}>
              <DeleteOutlined />
            </IconButton>
          </span>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecipeCard;
