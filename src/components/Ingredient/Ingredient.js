/* eslint-disable react/prop-types */
import {
  Card,
  Typography,
  Button,
  Select,
  FormControl,
  MenuItem,
  TextField,
  Container,
  Menu,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';

import useStyles from './Ingredient_STYLES';

const Ingredient = ({ ingredient, removeIngredient, changeIngredientValue }) => {
  const classes = useStyles();
  const [commentAdded, setCommentAdded] = useState(!!ingredient.comment);
  const [quantityError, setQuantityError] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  let commentField;
  let quantityField;

  const addComment = (comment) => {
    if (comment === '') {
      return;
    }
    changeIngredientValue(ingredient.id, 'comment', comment);
    setCommentAdded(true);
  };

  const deleteComment = () => {
    changeIngredientValue(ingredient.id, 'comment', null);
    commentField.value = '';
    setCommentAdded(false);
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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card>
      <Container className={classes.x}>
        <div className={classes.titleContainer}>
          <Typography variant="h6" className={classes.title}>
            {ingredient.name}
          </Typography>
        </div>
        <FormControl className={classes.option}>
          <TextField
            label="Quantity"
            color="secondary"
            type="number"
            defaultValue={ingredient.quantity ? ingredient.quantity : 1}
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

        <FormControl className={classes.unit}>
          <Select
            // label="Unit"
            variant="outlined"
            color="secondary"
            defaultValue={ingredient.unit ? ingredient.unit : ingredient.units[0]}
            onChange={(e) => handleUnitChange(e.target.value)}
          >
            {ingredient.units.map((unit) => (
              <MenuItem value={unit} key={`${ingredient}-${unit}`}>
                {unit}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          className={classes.delete}
          endIcon={<DeleteIcon className={classes.icon} />}
          onClick={() => removeIngredient(ingredient)}
        />
      </Container>
      <Container className={classes.comment}>
        <TextField
          defaultValue={ingredient.comment}
          className={classes.commentTextField}
          id={`${ingredient.name}-comment`}
          label={commentAdded ? 'Edit Comment' : 'Add Comment (Optional)'}
          variant="filled"
          inputRef={(ref) => {
            commentField = ref;
          }}
        />

        {commentAdded ? (
          <Button
            endIcon={<MoreVertIcon />}
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          />
        ) : (
          <Button endIcon={<AddIcon />} onClick={() => addComment(commentField.value)} />
        )}

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              deleteComment();
            }}
          >
            Delete Comment
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              addComment(commentField.value);
            }}
          >
            Confirm Edit
          </MenuItem>
        </Menu>
      </Container>
    </Card>
  );
};

export default Ingredient;
