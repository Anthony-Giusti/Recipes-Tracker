/* eslint-disable react/prop-types */
import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { Button, CardMedia, Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import { DeleteOutlined } from '@material-ui/icons';
import { blue, cyan, green, indigo, red, yellow } from '@material-ui/core/colors';

import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
// import Recipes from '../pages/Recipes/Recipes';

const useStyles = makeStyles({
  image: {
    height: '10em',
  },
  catergoryTag: {
    backgroundColor: cyan[100],
    borderRadius: '1em',
  },
  dietTag: {
    backgroundColor: green[100],
    borderRadius: '1em',
  },
  intoleranceTag: {
    backgroundColor: red[100],
    borderRadius: '1em',
  },
  tagText: {
    padding: '0.4em',
  },
  avatar: {
    backgroundColor: (note) => {
      if (note.category === 'work') {
        return yellow[700];
      }
      if (note.category === 'beep') {
        return green[700];
      }
      if (note.category === 'reminders') {
        return blue[700];
      }
      if (note.category === 'todos') {
        return red[700];
      }
    },
  },
});

const RecipeCard = ({ recipe, handleModalOpen, handleDeleteOpen }) => {
  const classes = useStyles(recipe);
  console.log(recipe);

  const formatName = (name) => {
    const words = name.split(' ');
    if (name.length > 1) {
      for (let i = 0; i < words.length; i += 1) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
      }
      return words.join(' ');
    }
    return words;
  };

  const formatTags = (tags) => tags.map((tag) => formatName(tag)).join(' • ');

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
          // subheader={recipe.category}
          // subheader={recipe.categories.raw}
        />
        <CardMedia className={classes.image} image={recipe.imageURL} />
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

          <Grid container direction="row" spacing={1}>
            {recipe.dietTags.formatted.map((dietTag) => (
              <Grid item key={dietTag}>
                <div className={classes.dietTag}>
                  <Typography className={classes.tagText}>{dietTag}</Typography>
                </div>
              </Grid>
            ))}
          </Grid>

          <Grid container direction="row" spacing={1}>
            <Typography align="center">Contains:</Typography>
            {recipe.intolerances.formatted.map((intolerance) => (
              <Grid item key={intolerance}>
                <div className={classes.intoleranceTag}>
                  <Typography className={classes.tagText}>{intolerance}</Typography>
                </div>
              </Grid>
            ))}
          </Grid>

          <Typography variant="body2" color="textSecondary">
            {recipe.details}
          </Typography>
          <span>
            <IconButton>
              <ZoomOutMapIcon onClick={() => handleModalOpen(recipe)} />
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
