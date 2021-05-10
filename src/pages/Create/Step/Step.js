import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import { useTheme } from '@material-ui/core/styles';

import useStyles from './Step-STYLES';

const Step = ({ step, editStep, moveStepOrderUp, moveStepOrderDown, deleteStep }) => {
  const [currentlyEditing, setCurrentlyEditing] = useState(false);
  const classes = useStyles();

  let editField;

  const handleConfirmEdit = () => {
    editStep(step.id, step.order, editField.value);
    setCurrentlyEditing(false);
  };

  return (
    <Card className={classes.card}>
      <Typography variant="h4">{step.order}</Typography>
      <Container className={classes.cardInner}>
        <div className={classes.stepDisplay}>
          {currentlyEditing ? (
            <TextField
              className={classes.editField}
              multiline
              defaultValue={step.step}
              inputRef={(ref) => {
                editField = ref;
              }}
            />
          ) : (
            <Typography>{step.step}</Typography>
          )}
        </div>
      </Container>
      <div className={classes.cardInterface}>
        <div className={classes.cardInterfacePanel}>
          <IconButton className={classes.stepButton} onClick={() => moveStepOrderUp(step)}>
            <ArrowUpwardIcon />
          </IconButton>
          <IconButton className={classes.stepButton} onClick={() => moveStepOrderDown(step)}>
            <ArrowDownwardIcon />
          </IconButton>
        </div>
        <div className={classes.cardInterfacePanel}>
          {currentlyEditing ? (
            <IconButton className={classes.stepButton} onClick={() => handleConfirmEdit()}>
              <DoneIcon />
            </IconButton>
          ) : (
            <IconButton className={classes.stepButton} onClick={() => setCurrentlyEditing(true)}>
              <EditIcon />
            </IconButton>
          )}
          <IconButton className={classes.stepButton} onClick={() => deleteStep(step)}>
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </Card>
  );
};

Step.propTypes = {
  step: PropTypes.object,
  editStep: PropTypes.func,
  moveStepOrderUp: PropTypes.func,
  moveStepOrderDown: PropTypes.func,
  deleteStep: PropTypes.func,
};

export default Step;
