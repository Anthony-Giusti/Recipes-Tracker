/* eslint-disable react/prop-types */
import {
  Card,
  Typography,
  Button,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  makeStyles,
  Container,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import useStyles from './Ingredient_STYLES';

const Ingredient = ({ ingredient, removeIngredient, changeIngredientValue }) => {
  const classes = useStyles();
  // const [comment, setComment] = useState('');
  const [unit, setUnit] = useState();
  const [quantity, setQunatity] = useState();
  const [commentAdded, setCommentAdded] = useState(false);

  let commentField;

  const addComment = (comment) => {
    console.log(comment);
    console.log(ingredient.id);
    changeIngredientValue(ingredient.id, 'comment', comment);
    setCommentAdded(true);
  };

  return (
    <Card className={classes.card}>
      <Container className={classes.x}>
        <div className={classes.titleContainer}>
          <Typography variant="h6" className={classes.title}>
            {ingredient.name}
          </Typography>
        </div>
        <FormControl className={classes.unit}>
          <Select variant="outlined" label="Unit" onChange={(e) => setUnit(e.target.value)}>
            {ingredient.units.map((unit) => (
              <MenuItem value={unit} key={`${ingredient}-${unit}`}>
                {unit}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.quantity}>
          <TextField
            label="Quantity"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            onChange={(e) => setQunatity(e.target.value)}
          />
        </FormControl>

        <Button
          className={classes.delete}
          endIcon={<DeleteIcon className={classes.icon} />}
          onClick={() => removeIngredient(ingredient)}
        />
      </Container>
      <Container className={classes.comment}>
        <TextField
          className={classes.commentTextField}
          id={`${ingredient.name}-comment`}
          label={commentAdded === '' ? 'Add Comment' : 'Edit Comment'}
          variant="filled"
          inputRef={(ref) => {
            commentField = ref;
          }}
        />
        <Button endIcon={<AddIcon />} onClick={() => addComment(commentField.value)} />
      </Container>
    </Card>
  );
};

export default Ingredient;
