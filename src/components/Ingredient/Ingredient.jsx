import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import AddIcon from '@material-ui/icons/Add';
import Divider from '@material-ui/core/Divider';

import MenuIcon from '@material-ui/icons/Menu';
import IconButtonWithBackground from '../../Themes/Buttons/IconButtons/IconButtons';

import useStyles from './Styles';

const Ingredient = ({ ingredient, removeIngredient, changeIngredientValue, handleCustomUnit }) => {
  const classes = useStyles();
  const [defaultUnit] = useState(ingredient.unit);
  const [units] = useState(ingredient.units);
  const [editingComment, setEditingComment] = useState(false);
  const [commentAdded, setCommentAdded] = useState(!!ingredient.comment);
  const [quantityError, setQuantityError] = useState(false);
  const [ingMenuAnchor, setIngMenuAnchor] = useState(null);
  const [commentMenuAnchor, setCommentMenuAnchor] = useState(null);
  const [customUnitMenuOpen, setCustomUnitMeuOpen] = useState(false);
  const [customUnit, setCustomUnit] = useState(ingredient.customUnit);
  const [customUnitAdded, setCustomUnitAdded] = useState(ingredient.customUnitAdded);

  let commentField;
  let quantityField;
  let unitField;
  let customUnitField;

  const addComment = (comment) => {
    if (comment === '') {
      setEditingComment(false);
      return;
    }
    changeIngredientValue(ingredient.id, 'comment', comment);
    setEditingComment(false);
    setCommentAdded(true);
  };

  const deleteComment = () => {
    changeIngredientValue(ingredient.id, 'comment', null);
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

  const handleCommentMenuOpen = (event) => {
    setCommentMenuAnchor(event.currentTarget);
  };

  const handleIngMenuOpen = (event) => {
    setIngMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = (anchor) => {
    anchor(null);
  };

  const handleAddCustomUnit = () => {
    setCustomUnitMeuOpen(false);
    handleCustomUnit(ingredient.id, true, customUnitField.value);
    setCustomUnitAdded(true);
    setCustomUnit(customUnitField.value);
  };

  const handleRemoveCustomUnit = () => {
    setCustomUnitMeuOpen(false);
    handleCustomUnit(ingredient.id, false, ingredient.units[0]);
    setCustomUnitAdded(false);
    setCustomUnit('');
  };

  return (
    <Card raised className={classes.ingredient}>
      <Container className={classes.ingredientUpper}>
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
            <div className={classes.customUnit}>
              <Typography className={classes.customUnitText}>{customUnit}</Typography>
              <Typography className={classes.customUnitLabel}>(Custom Unit)</Typography>
            </div>
          ) : (
            <Select
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
        <IconButtonWithBackground
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleIngMenuOpen}
        >
          <MenuIcon />
        </IconButtonWithBackground>
      </Container>

      {/* INGREDIENT MENU  */}
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

      <Divider />

      <Container className={classes.comment}>
        {editingComment ? (
          <div className={classes.commentEdit}>
            <IconButtonWithBackground onClick={() => addComment(commentField.value)}>
              <AddIcon />
            </IconButtonWithBackground>

            <TextField
              defaultValue={ingredient.comment}
              className={classes.commentTextField}
              id={`${ingredient.name}-comment`}
              label={commentAdded ? 'Edit Comment' : 'Add Comment'}
              variant="filled"
              inputRef={(ref) => {
                commentField = ref;
              }}
              inputProps={{ maxLength: 75 }}
            />
          </div>
        ) : (
          <div className={classes.commentDisplayed}>
            {commentAdded ? (
              <IconButtonWithBackground
                className={classes.editCommentBtn}
                onClick={handleCommentMenuOpen}
              >
                <MenuIcon />
              </IconButtonWithBackground>
            ) : (
              <Button color="primary" variant="contained" onClick={() => setEditingComment(true)}>
                Add Comment
              </Button>
            )}
          </div>
        )}
        {!editingComment && ingredient.comment && (
          <div className={classes.commentDisplay}>
            <Typography className={classes.commentText}>{`(${ingredient.comment})`}</Typography>
          </div>
        )}

        {/* COMMENT MENU */}
        <Menu
          id="simple-menu"
          anchorEl={commentMenuAnchor}
          keepMounted
          open={Boolean(commentMenuAnchor)}
          onClose={() => handleMenuClose(setCommentMenuAnchor)}
        >
          <MenuItem
            onClick={() => {
              handleMenuClose(setCommentMenuAnchor);
              deleteComment();
            }}
          >
            Delete Comment
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuClose(setCommentMenuAnchor);
              setEditingComment(true);
            }}
          >
            Edit Comment
          </MenuItem>
        </Menu>
      </Container>

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
          <Button onClick={handleAddCustomUnit} color="primary">
            Add Unit
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

Ingredient.propTypes = {
  ingredient: PropTypes.object,
  removeIngredient: PropTypes.func,
  changeIngredientValue: PropTypes.func,
  handleCustomUnit: PropTypes.func,
};

export default Ingredient;
