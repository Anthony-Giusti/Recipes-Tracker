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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import React, { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuIcon from '@material-ui/icons/Menu';
import DeleteIcon from '@material-ui/icons/Delete';
import RemoveIcon from '@material-ui/icons/Remove';

import useStyles from './Ingredient_STYLES';

const Ingredient = ({ ingredient, removeIngredient, changeIngredientValue }) => {
  const classes = useStyles();
  const [defaultUnit] = useState(ingredient.unit);
  const [units] = useState(ingredient.units);
  const [editingComment, setEditingComment] = useState(false);
  const [commentAdded, setCommentAdded] = useState(!!ingredient.comment);
  const [quantityError, setQuantityError] = useState(false);
  const [ingMenuAnchor, setIngMenuAnchor] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [customUnitMenuOpen, setCustomUnitMeuOpen] = useState(false);
  const [customUnit, setCustomUnit] = useState('');
  const [customUnitAdded, setCustomUnitAdded] = useState(false);
  // const [customUnitDialogOpen, setCustomUnitDialogOpen] = useState(false);

  let commentField;
  let quantityField;
  let unitField;
  let customUnitField;

  const addComment = (comment) => {
    if (comment === '') {
      return;
    }
    changeIngredientValue(ingredient.id, 'comment', comment);
    setEditingComment(false);
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
    if (value < 0 || value > 9999) {
      quantityField.value = 1;
    } else {
      setQuantityError(false);
      changeIngredientValue(ingredient.id, 'quantity', value);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleIngMenuOpen = (event) => {
    setIngMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = (anchor) => {
    anchor(null);
  };

  const handleCustomUnit = () => {
    setCustomUnitMeuOpen(false);
    changeIngredientValue(ingredient.id, 'unit', customUnitField.value);
    setCustomUnitAdded(true);
    setCustomUnit(customUnitField.value);
  };

  const handleRemoveCustomUnit = () => {
    setCustomUnitMeuOpen(false);
    changeIngredientValue(ingredient.id, 'unit', ingredient.units[0]);
    setCustomUnitAdded(false);
    setCustomUnit('');
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
          {customUnitAdded ? (
            <Typography>{customUnit}</Typography>
          ) : (
            <Select
              label="Unit"
              variant="outlined"
              color="secondary"
              inputRef={(ref) => {
                unitField = ref;
              }}
              defaultValue={defaultUnit}
              onChange={(e) => handleUnitChange(e.target.value)}
            >
              {units.map((unit) => (
                <MenuItem value={unit} key={`${ingredient}-${unit}`}>
                  {unit}
                </MenuItem>
              ))}
            </Select>
          )}
        </FormControl>
        <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleIngMenuOpen}>
          <MenuIcon />
        </IconButton>
      </Container>

      <Container className={classes.comment}>
        {editingComment ? (
          <div className={classes.commentEdit}>
            <TextField
              defaultValue={ingredient.comment}
              className={classes.commentTextField}
              id={`${ingredient.name}-comment`}
              label={commentAdded ? 'Edit Comment' : 'Add Comment'}
              variant="filled"
              inputRef={(ref) => {
                commentField = ref;
              }}
            />
            <Button endIcon={<AddIcon />} onClick={() => addComment(commentField.value)} />
          </div>
        ) : (
          <Button onClick={() => setEditingComment(true)}>
            {commentAdded ? 'Edit Comment' : 'Add Comment'}
          </Button>
        )}
        <div className={classes.commentDisplay}>
          {!editingComment && <Typography>{ingredient.comment}</Typography>}
        </div>

        {/* <TextField
          defaultValue={ingredient.comment}
          className={classes.commentTextField}
          id={`${ingredient.name}-comment`}
          label={commentAdded ? 'Edit Comment' : 'Add Comment (Optional)'}
          variant="filled"
          inputRef={(ref) => {
            commentField = ref;
          }}
        /> */}

        {/* {commentAdded ? (
          <Button
            endIcon={<MoreVertIcon />}
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          />
        ) : (
          <Button endIcon={<AddIcon />} onClick={() => addComment(commentField.value)} />
        )} */}

        {/* INGREDIENT MENU  */}
      </Container>

      <Menu
        id="ingredient-options"
        anchorEl={ingMenuAnchor}
        keepMounted
        open={Boolean(ingMenuAnchor)}
        onClose={() => handleMenuClose(setIngMenuAnchor)}
      >
        {customUnitAdded ? (
          <MenuItem
            onClick={() => {
              handleMenuClose(setIngMenuAnchor);
              handleRemoveCustomUnit();
            }}
          >
            Remove Custom Unit
          </MenuItem>
        ) : (
          <MenuItem
            onClick={() => {
              handleMenuClose(setIngMenuAnchor);
              setCustomUnitMeuOpen(true);
            }}
          >
            Add Custom Unit
          </MenuItem>
        )}
        <MenuItem onClick={() => removeIngredient(ingredient)}>Delete This Ingredient</MenuItem>
      </Menu>

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

      {/* CUSTOM UNIT DIALOG BOX */}

      <Dialog
        open={customUnitMenuOpen}
        onClose={() => setCustomUnitMeuOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Custom Unit</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="custom unit"
            type="custom unit"
            fullWidth
            inputRef={(ref) => {
              customUnitField = ref;
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCustomUnitMeuOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCustomUnit} color="primary">
            Add Unit
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default Ingredient;
