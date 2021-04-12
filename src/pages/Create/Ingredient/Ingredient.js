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
import React, { useEffect, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import useStyles from './Ingredient_STYLES';

const Ingredient = ({ ingredient, removeIngredient, changeIngredientValue }) => {
  const classes = useStyles();
  const [commentAdded, setCommentAdded] = useState(false);
  const [quantityError, setQuantityError] = useState(false);

  let commentField;
  let quantityField;

  const addComment = (comment) => {
    changeIngredientValue(ingredient.id, 'comment', comment);
    setCommentAdded(true);
  };

  const handleUnitChange = (value) => {
    changeIngredientValue(ingredient.id, 'unit', value);
  };

  const handleQunatityChange = (value) => {
    if (value <= 0 || value > 9999) {
      quantityField.value = 1;
    } else {
      setQuantityError(false);
      changeIngredientValue(ingredient.id, 'quantity', value);
    }
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
          <Select
            label="Unit"
            variant="outlined"
            defaultValue={ingredient.units[0]}
            onChange={(e) => handleUnitChange(e.target.value)}
          >
            {ingredient.units.map((unit) => (
              <MenuItem value={unit} key={`${ingredient}-${unit}`}>
                {unit}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.option}>
          <TextField
            label="Quantity"
            type="number"
            defaultValue={1}
            inputProps={{ min: 1, max: 9999 }}
            InputLabelProps={{
              shrink: true,
            }}
            inputRef={(ref) => {
              quantityField = ref;
            }}
            variant="outlined"
            error={quantityError}
            onChange={(e) => handleQunatityChange(parseInt(e.target.value, 10))}
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
          label={commentAdded ? 'Edit Comment' : 'Add Comment (Optional)'}
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
